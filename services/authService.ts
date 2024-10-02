import api from "./axios";

export interface LoginProp {
  email: string,
  password: string
}

export const login = async (loginRequest: LoginProp) => {
  try {
    const response = await api.post('/login', loginRequest);

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login')
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};