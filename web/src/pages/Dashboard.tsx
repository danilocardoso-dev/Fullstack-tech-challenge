import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
export const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
       
        
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />          
        </main>
      </div>
    </div>
  );
};
// web/src/pages/Dashboard.tsx
// Página principal do dashboard