import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axios";

// Tipos
interface LoginResponse {
  access_token: string;
}

interface User {
  id: number;
  email: string;
  role: string; // ADMIN | USER | GUEST
}

export function useAuth() {
  // Buscar o usuário logado (se já tiver token salvo)
  const { data: user, refetch: refetchUser } = useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/profile");
      return res.data;
    },
    enabled: !!localStorage.getItem("token"), // só roda se tiver token
  });

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post<LoginResponse>("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      refetchUser(); // atualiza usuário
    },
  });

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return {
    user,
    isLogged: !!user,
    login: loginMutation.mutate,
    loginPending: loginMutation.isPending,
    logout,
  };
}
