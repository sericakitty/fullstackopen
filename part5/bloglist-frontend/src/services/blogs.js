import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
    throw new Error(error.response.data.error);
  }
};

// 5.3 - create blog
const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
    throw new Error(error.response.data.error);
  }
};

// 5.8 - update blog, takes id and updated blog as arguments
const updateBlog = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
    throw new Error(error.response.data.error);
  }
};


// 5.11 - delete blog
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(error.response.data.error);
    throw new Error(error.response.data.error);
  }
}

// default export object with all functions
export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
