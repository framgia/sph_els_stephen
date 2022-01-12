import axios from 'axios';

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
