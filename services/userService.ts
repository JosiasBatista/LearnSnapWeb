import api from './axios';

export const getUserById = async (userId: number) => {
  return api.get(`/api/user/${userId}`);
}