import { useEffect, useState } from "react";
import api from "../api/axios";

interface Client {
  id: string;
  name: string;
  email?: string;
  isActive: boolean;
}

export function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    setLoading(true);
    const { data } = await api.get("/clients", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    await api.patch(
      `/clients/${id}/status`,
      { isActive: !isActive },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchClients();
  };

  const total = clients.length;
  const ativos = clients.filter((c) => c.isActive).length;

  if (loading) return <div>Carregando dados...</div>;

  return (
    <div>
      {/* KPIs */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white shadow rounded p-6 flex-1 text-center">
          <div className="text-3xl font-bold text-indigo-600">{total}</div>
          <div className="text-gray-600">Total de Clientes</div>
        </div>
        <div className="bg-white shadow rounded p-6 flex-1 text-center">
          <div className="text-3xl font-bold text-green-600">{ativos}</div>
          <div className="text-gray-600">Clientes Ativos</div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nome</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Ação</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="border px-2 py-1">{client.name}</td>
              <td className="border px-2 py-1">{client.email}</td>
              <td className="border px-2 py-1">
                {client.isActive ? (
                  <span className="text-green-600 font-bold">Ativo</span>
                ) : (
                  <span className="text-red-600 font-bold">Inativo</span>
                )}
              </td>
              <td className="border px-2 py-1">
                <button
                  className={`px-2 py-1 rounded ${
                    client.isActive
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  onClick={() => handleToggleStatus(client.id, client.isActive)}
                >
                  {client.isActive ? "Desativar" : "Ativar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}