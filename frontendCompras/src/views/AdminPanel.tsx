import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      {/* Botón para publicar nueva prenda */}
      <Link to="/NewPublic">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Publicar nueva prenda
        </button>
      </Link>
      {/* Aquí puedes agregar más contenido del panel de administración */}
    </div>
  );
};

export default AdminPanel;

