// src/components/Cards.tsx
import React from 'react';
import MyProfileCard from './AdminCard';



// Componente de lista de tarjetas
interface CardsProps {
  posts: Array<{
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    imageUrl1: string;
    imageUrl2: string;
    size: string;
    category: string;
    brand: string;
    color: string;
  }>;
}

const AdminCards: React.FC<CardsProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {posts.map(post => (
        <MyProfileCard
          key={post.id}
          id={post.id}
          title={post.title}
          price={post.price}
          imageUrl={post.imageUrl}
          imageUrl1={post.imageUrl1}
          imageUrl2={post.imageUrl2}
          size={post.size}
          category={post.category}
          brand={post.brand}
          color={post.color}
        />
      ))}
    </div>
  );
};

export default AdminCards;