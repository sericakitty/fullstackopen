import axiosInstance from './axiosInstance';

const baseUrl = '/api/users';

export const getAllUsers = async () => {
  const response = await axiosInstance.get(baseUrl); // fetch users from the server
  return response.data;
}


