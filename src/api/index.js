import axios from 'axios';
import * as util from '../assets/util.js';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
//错误处理
instance.interceptors.response.use(function(response) {
  return response;
}, util.catchError);

export default instance;