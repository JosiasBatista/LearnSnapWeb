import api from "./axios";

export const getAreas = async () => {
  return api.get('/api/areas');
}