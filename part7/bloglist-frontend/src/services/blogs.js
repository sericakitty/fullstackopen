import axiosInstance from './axiosInstance';

const baseUrl = '/api/blogs';

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axiosInstance.get(baseUrl, config);
  return response.data;
};

const createBlog = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axiosInstance.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async (id, updatedBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axiosInstance.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
};

const commentBlog = async (id, comment, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axiosInstance.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return response.data;
};

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axiosInstance.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, createBlog, updateBlog, deleteBlog, commentBlog };
