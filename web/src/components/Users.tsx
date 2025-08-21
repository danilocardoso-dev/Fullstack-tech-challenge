import { useUsers } from "../hooks/useUsers";

export function Users() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao buscar usuários.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Lista de Usuários</h2>
      <ul className="space-y-2">
        {data.map((user: any) => (
          <li key={user.id} className="p-2 bg-gray-100 rounded">
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
