import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.56.1:8000',
});

export default client;
