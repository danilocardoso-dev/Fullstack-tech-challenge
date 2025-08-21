import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ClientList } from "./pages/clients/ClientsList";
import { ClientForm } from "./pages/clients/ClientForm";
import { Login } from "./pages/Login";
import  UsersPage from "./components/UserList";
import { ClientsTable } from "./components/Kpis";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="clients" element={<ClientList />} />
          <Route path="clients/new" element={<ClientForm />} />
          <Route path="clients/:id" element={<ClientForm />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="kpis" element={<ClientsTable />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard/clients" />} />
      </Routes>
  );
};


// web/src/App.tsx
// Componente principal da aplicação React
// Define as rotas usando React Router
// Inclui a página de login e o dashboard
// Facilita a navegação entre diferentes partes do aplicativo React
// Importa os componentes de página necessários
// Utiliza o sistema de rotas para renderizar os componentes corretos com base na URL 