// src/api/auth.ts
import axios from "axios";

export const loginFn = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });
  return response.data; // deve retornar { accessToken, refreshToken }
};
// web/src/api/auth.ts
// Função para realizar login