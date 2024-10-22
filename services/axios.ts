// services/axios.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Crie uma instância do axios com a URL base da sua API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000', // Adicione sua URL de backend aqui
  headers: {
    'Content-Type': 'application/json',
  },
});

// Variável para controlar se a renovação do token está em andamento
let isRefreshing = false;
let failedQueue: Array<{ config: AxiosRequestConfig; resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void; reject: (reason?: any) => void }> = [];

// Função para processar a fila de requisições que falharam enquanto o token estava sendo renovado
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token && prom.config.headers) {
      prom.config.headers.Authorization = `Bearer ${token}`;
      prom.resolve(api(prom.config)); // Reexecuta a requisição com o token renovado
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Recupera o token JWT do localStorage (ou de outro local como cookies)
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho da requisição
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 (token expirado) e o pedido não for o de refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      // Marcar a requisição para que não tente o refresh repetidamente
      originalRequest._retry = true;

      // Se não estiver atualmente renovando o token
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken'); // Pega o refresh token
          
          // Faz a requisição para o endpoint de renovação de token
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, { token: refreshToken });

          const { token: newToken } = response.data; // Pega o novo token JWT da resposta
          localStorage.setItem('token', newToken); // Atualiza o token no localStorage

          isRefreshing = false;
          processQueue(null, newToken); // Processa a fila das requisições que falharam

          // Refaz a requisição original com o novo token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          processQueue(err, null); // Rejeita as requisições que estavam pendentes

          // Se a renovação falhar, faça logout ou redirecione para a página de login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
          return Promise.reject(err);
        }
      }

      // Enquanto o token está sendo renovado, empilha as requisições que falharam
      return new Promise((resolve, reject) => {
        failedQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
