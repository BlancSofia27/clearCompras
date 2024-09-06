// src/components/Cards.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Loader from './Loader';

// Define la interfaz User
interface User {
  id: string;
  businessName: string;
  // otras propiedades que el usuario pueda tener
}

// Define la interfaz para cada publicación (post)
interface Post {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  imageUrl1?: string;
  imageUrl2?: string;
  size: string[];
  category: string;
  brand: string;
  color: string;
  userId: string;
}

// Define la interfaz para las props del componente Cards
interface CardsProps {
  posts: Post[];
}

const Cards: React.FC<CardsProps> = ({ posts }) => {
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userIds = [...new Set(posts.map(post => post.userId))];
        const responses = await Promise.all(userIds.map(id => axios.get<User>(`http://localhost:3000/api/users/${id}`)));
        const usersData = responses.reduce((acc, response) => {
          acc[response.data.id] = response.data;
          return acc;
        }, {} as { [key: string]: User });

        console.log('Users fetched from backend:', usersData); 

        setUsers(usersData);
      } catch (err) {
        setError('Error al obtener los usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [posts]);

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {posts.map(post => (
        <PostCard
          key={post.id}
          title={post.title}
          price={post.price}
          imageUrl={post.imageUrl}
          imageUrl1={post.imageUrl1}
          imageUrl2={post.imageUrl2}
          size={post.size}
          category={post.category}
          brand={post.brand}
          color={post.color}
          user={users[post.userId]} // Pasamos el usuario completo al componente PostCard
        />
      ))}
    </div>
  );
};

export default Cards;
