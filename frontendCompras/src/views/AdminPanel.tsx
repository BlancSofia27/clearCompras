import React from 'react';
import { Link } from 'react-router-dom';
import AdminPostsList from '../components/AdminPostsList';
import ProfileAdmin from '../components/ProfileAdmin';
import EditProfileButton from '../components/Admin/EditProfileButton';

const AdminPanel: React.FC = () => {
  return (
    <>
    <div className="flex flex-row p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      {/* Botón para publicar nueva prenda */}
      <Link to="/NewPublic">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">
          Publicar nueva prenda
        </button>
      </Link>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">
          Volver al Inicio
        </button>
      </Link>
      {/* Aquí puedes agregar más contenido del panel de administración */}
    </div>
    <ProfileAdmin/>
    
  <AdminPostsList/>
  </>
  );
};

export default AdminPanel;

