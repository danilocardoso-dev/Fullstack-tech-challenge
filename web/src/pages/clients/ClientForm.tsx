import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClient, createClient, updateClient, Client as ClientType } from "../../api/clients";

export const ClientForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [client, setClient] = useState<ClientType>({ name: "", email: "", phone: "" });

  // Buscar cliente para edição se existir ID
  const { data, isLoading } = useQuery<ClientType>({
    queryKey: ["client", id],
    queryFn: () => getClient(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) setClient(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (newClient: ClientType) => (id ? updateClient(id, newClient) : createClient(newClient)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      navigate("/dashboard/clients");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(client);
  };

  if (isLoading) return <div>Carregando cliente...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">{id ? "Editar Cliente" : "Novo Cliente"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={client.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={client.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={client.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          {id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};
