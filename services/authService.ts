import api from "./axios";

export interface LoginProp {
  email: string,
  password: string
}

export interface RegisterProp {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  type: string,
}

export const login = async (loginRequest: LoginProp) => {
  try {
    const response = await api.post('/login', loginRequest);

    const { accessToken, refreshToken, userId } = response.data;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', userId);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login')
  }
};

export const register = async (registerRequest: RegisterProp) => {
  try {
    const response = await api.post('/register', registerRequest);

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