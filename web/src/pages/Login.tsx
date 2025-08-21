// src/pages/Login.tsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginFn } from "../api/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => loginFn(email, password),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
       if (data.userId) {
    localStorage.setItem("userId", data.userId);
  }
    }
        navigate("/dashboard");
      }
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Erro ao logar");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Bem-vindo
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Faça login na sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Senha</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Não tem conta?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
};
