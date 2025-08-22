import axios from "axios";

const api = axios.create({
  baseURL: "https://fullstack-tech-challenge.onrender.com",
});

// Função para adicionar o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
    console.log("🔑 Token recuperado do localStorage:", token);
    
  // Verifica se o token existe antes de adicioná-lo ao cabeçalho

  
  if (token) {
    config.headers!["authorization"] = `Bearer ${token}`;
  }
    console.log("📡 Headers enviados na request:", config.headers);
  // Retorna a configuração modificada

  const userId = localStorage.getItem("userId");
  console.log("👤 User ID recuperado do localStorage:", userId);

  const refreshToken = localStorage.getItem("refreshToken");
  console.log("🔄 Refresh Token recuperado do localStorage:", refreshToken);
  return config;
});

export interface Client {
  id?: string;
  tenantId?: string;
  publicId?: string;
  name: string;
  email: string;
  isActive?: boolean;
  contact?: string;
  address?: {
    street: string;
    neighborhood: string;
    number: string;
    state: string;
  };
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}


// Listar todos os clientes
export const getClients = async (): Promise<Client[]> => {
  const { data } = await api.get("/clients");
  return data;
};

// Buscar cliente por ID
export const getClient = async (id: string): Promise<Client> => {
  const { data } = await api.get(`/clients/${id}`);
  return data;
};

// Criar novo cliente
export const createClient = async (client: Client): Promise<Client> => {
  const { data } = await api.post("/clients", client);
  return data;
};

// Atualizar cliente
export const updateClient = async (id: string, client: Client): Promise<Client> => {
  const { data } = await api.put(`/clients/${id}`, client);;
  return data;
};

// Deletar cliente
export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`/clients/${id}`);
};
