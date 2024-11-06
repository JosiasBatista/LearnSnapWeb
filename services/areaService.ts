import api from "./axios";

export const getAreas = async () => {
  return api.get('/api/areas');
}

export const updateUserAreasOfInterest = async (userId: number, request: {
  mainArea: string, areasOfInterest: string[]
}) => {
  return await api.post(`/api/userAreasOfInterest/update/${userId}`, request)
}