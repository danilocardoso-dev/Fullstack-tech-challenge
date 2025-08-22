import axios from 'axios';

const api = axios.create({
  baseURL: "https://fullstack-tech-challenge.onrender.com",
});
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response?.data?.message === 'jwt expired') {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await api.post('/auth/refresh', {
            userId: localStorage.getItem('userId'),
            refreshToken: localStorage.getItem('refreshToken'),
          });

          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          api.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
          processQueue(null, data.accessToken);

          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        return api(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default api;

// web/src/api/axios.ts
// Configuração do axios para chamadas à API
// Define a baseURL para o backend
// Adiciona um interceptor para incluir o token JWT no cabeçalho Authorization de cada requisição, se disponível
// Facilita o uso do axios em todo o aplicativo React