import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import {App} from "./App";
import "./index.css";

// Criar instância do QueryClient
const queryClient = new QueryClient();

// Criar root
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
// web/src/index.tsx
// Ponto de entrada da aplicação React
// Configura o React Query e o React Router
// Renderiza o componente App dentro do BrowserRouter para gerenciar rotas
// Importa estilos globais do arquivo index.css