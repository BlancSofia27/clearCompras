import React from "react";
import { useAuth0, User as Auth0User } from "@auth0/auth0-react";

// Extendemos el tipo de usuario de Auth0 para asegurarnos de que incluya `name`, `email` y `picture`.
interface User extends Auth0User {
  picture: string;  // Aseguramos que `picture` es de tipo string.
  name: string;     // Aseguramos que `name` es de tipo string.
  email: string;    // Aseguramos que `email` es de tipo string.
}

const ProfileAuth: React.FC = () => {
  // Especificamos que `user` es del tipo `User`.
  const { user, isAuthenticated, isLoading } = useAuth0<{ user: User }>();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user && (
      <div className="flex flex-row p-4">
        <img 
        className="w-11 h-11 rounded-full"
        src={user.picture} alt={user.name} />
        <h2 className="p-2">{user.name}</h2>
      </div>
    )
  );
};

export default ProfileAuth;

