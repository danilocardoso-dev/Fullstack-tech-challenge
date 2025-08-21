export const Header = () => {
  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Sistema de Clientes</h1>
      <div>
        <button
          className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Sair
        </button>
      </div>
    </header>
  );
};
// web/src/components/Header.tsx
// Componente de cabeçalho do sistema