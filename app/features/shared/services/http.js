import axios from 'axios';

function createHttp() {
  return axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: process.env.NODE_ENV !== 'production',
  });
}

export default {
  get(url, params) {
    return createHttp().get(url, {params});
  },

  post(url, data) {
    return createHttp().post(url, data);
  },

  put(url, data) {
    return createHttp().put(url, data);
  },

  delete(url, params) {
    return createHttp().delete(url, {params});
  },
};

