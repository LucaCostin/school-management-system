import axios from 'axios';

const devEnv = process.env.NODE_ENV !== 'production';
const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

const API = axios.create({baseURL: `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`});

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.authorization = `Bearer ${
          JSON.parse(localStorage.getItem('profile')).token
      }`;
  }
  if(localStorage.getItem('emailToLog')){
      req.headers.email = `Account ${
          JSON.parse(localStorage.getItem('emailToLog')).email
      }`;
  }
  return req;
});

export const checkEmail = (formData) => API.post('/users/checkEmail', formData);
export const checkPass = (formData) => API.post('/users/checkPass', formData);
export const createPass = (formData) => API.patch('/users/createPass', formData);
export const createUser = (formData) => API.post('/users/createUser', formData);
export const getUsers = (role) => API.get(`/users/getUsers/${role}`);
export const createGroup = (fromData) => API.post('/groups/createGroup', fromData);
export const getGroups = () => API.get('/groups/getGroups');
export const deleteUser = (userId) => API.delete(`/users/${userId}`);
export const editUser = (formData, userId) => API.patch(`/users/${userId}`, formData);
