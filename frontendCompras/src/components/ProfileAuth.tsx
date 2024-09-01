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
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>User ID: {user.sub}</p> {/* user.sub contiene el ID del usuario */}
        <p>{user.email}</p>
      </div>
    )
  );
};

export default ProfileAuth;

