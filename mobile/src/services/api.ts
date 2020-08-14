import axios from 'axios';

const api = axios.create({
  baseURL:'http://192.168.0.123:3030'
})

export default api;