import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; // Usa useNavigate en lugar de useHistory

const AdminButton: React.FC = () => {
  const { isAuthenticated } = useAuth0(); // Obtén el estado de autenticación
  const navigate = useNavigate(); // Hook para la redirección

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/AdminPanel'); // Redirige a /AdminPanel si el usuario está autenticado
    } else {
      // Aquí puedes manejar el caso en que el usuario no está autenticado, si es necesario
      alert('No estás autenticado para acceder a esta sección.');
    }
  };

  // Renderiza el botón solo si el usuario está autenticado
  return (
    <>
      {isAuthenticated && (
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded"
        >
          Ir al Panel de Administración
        </button>
      )}
    </>
  );
};

export default AdminButton;

