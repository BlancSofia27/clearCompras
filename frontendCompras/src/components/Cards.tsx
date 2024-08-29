// src/components/Cards.tsx
import React from 'react';
import PostCard from './PostCard';



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

const Cards: React.FC<CardsProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
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
        />
      ))}
    </div>
  );
};

export default Cards;

