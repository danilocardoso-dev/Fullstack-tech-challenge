// src/api/auth.ts
import axios from "axios";

export const loginFn = async (email: string, password: string) => {
  const response = await axios.post("https://fullstack-tech-challenge.onrender.com/auth/login", {
    email,
    password,
  });
  return response.data; // deve retornar { accessToken, refreshToken }
};
// web/src/api/auth.ts
// Função para realizar login