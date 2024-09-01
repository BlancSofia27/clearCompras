
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SesionButton: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <button
        className='border-cyan-400 '
         onClick={() => logout({ returnTo: window.location.origin })}>
          Cerrar Sesión
        </button>
      ) : (
        <button 
        className='border-cyan-400 border-4 bg-slate-500 p-4 rounded-xl text-white'
        onClick={loginWithRedirect}>
          Agregar mi negocio
        </button>
      )}
    </div>
  );
};

export default SesionButton;
