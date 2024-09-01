import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import EditProfileButton from './Admin/EditProfileButton';

interface User {
  userId: string;
  email: string;
  businessName: string;
  whatsapp: string;
  header: string;
  logo: string;
  instagram: string;
}

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get<User>(`http://localhost:3000/api/users/${user.sub}`);
          setProfile(response.data);
        } catch (err) {
          setError('Error fetching user data');
          console.error('Error fetching user data:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center">Please log in to view this page.</div>;
  }

  if (loading) {
    return <div className="text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center">No user data available</div>;
  }

  return (
    <div className="relative max-w-full mx-auto bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="relative w-full h-[400px]">
        <img
          src={profile.header}
          alt="Header"
          width={223} height={400}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 flex justify-start items-center">
          <img
            src={profile.logo}
            alt="Logo"
            className="w-[200px] h-[200px] ml-7 rounded-full border-2 border-gray-300"
            style={{ marginTop: 'calc(16% - 2rem)' }}
          />
        </div>
      </div>

      {/* User Information */}
      <div className="p-4 mt-8">
        <h1 className="text-3xl font-bold my-2">{profile.businessName}</h1>

        {/* Additional Profile Information */}
        <p>Email: {profile.email}</p>
        <p>WhatsApp: {profile.whatsapp}</p>
        <p>Instagram: {profile.instagram}</p>
        <EditProfileButton/>
      </div>
    </div>
  );
};

export default Profile;
