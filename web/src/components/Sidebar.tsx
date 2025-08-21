import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4">
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard/clients"
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          Clientes
        </NavLink>
        <NavLink
          to="/dashboard/clients/new"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          Novo Cliente
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          Usuários
        </NavLink>
        <NavLink
          to="/dashboard/kpis"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          KPIs
        </NavLink>
      </nav>
    </aside>
  );
};