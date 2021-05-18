import axios from 'axios';

const instance= axios.create({
  baseURL: `http://ec2-65-2-30-247.ap-south-1.compute.amazonaws.com:4794/api/1.0/`,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if(token!=="")
  {
    config.headers.token =  token ? `${token}` : '';
  }
  return config;
});

export default instance;