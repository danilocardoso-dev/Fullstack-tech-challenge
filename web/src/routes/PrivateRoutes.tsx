// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default PrivateRoute;
// web/src/routes/PrivateRoutes.tsx
// Componente de rota privada que protege rotas específicas
// Verifica se o token JWT está presente no localStorage