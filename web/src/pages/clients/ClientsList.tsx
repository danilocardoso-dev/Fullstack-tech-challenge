import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, deleteClient, Client as ClientType } from "../../api/clients";
import { useNavigate } from "react-router-dom";

export const ClientList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: clients, isLoading } = useQuery<ClientType[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  if (isLoading) return <div>Carregando clientes...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      <button
        onClick={() => navigate("/dashboard/clients/new")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Novo Cliente
      </button>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Telefone</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((c) => (
            <tr key={c.id}>
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">{c.email}</td>
              <td className="border px-4 py-2">{c.phone}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/dashboard/clients/${c.id}`)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteMutation.mutate(c.id!)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
