// src/views/Inicio.tsx
import React from 'react';
import Cards from '../components/Cards';

const posts = [
  {
    category:'top',
    title: 'Camisa Casual corta',
    price:'$21.000',
    size:'Unico',
    imageUrl: 'https://via.placeholder.com/150',
    brand:'askDenim',
    color:'Blanco'
  },
  {
    category:'top',
    title: 'Camisa Casual corta',
    price:'$21.000',
    size:'Unico',
    imageUrl: 'https://via.placeholder.com/150',
    brand:'askDenim',
    color:'Blanco'
  },
  {
    category:'top',
    title: 'Camisa Casual corta',
    price:'$21.000',
    size:'Unico',
    imageUrl: 'https://via.placeholder.com/150',
    brand:'askDenim',
    color:'Blanco'
  },
  {
    category:'top',
    title: 'Camisa Casual corta',
    price:'$21.000',
    size:'Unico',
    imageUrl: 'https://via.placeholder.com/150',
    brand:'askDenim',
    color:'Blanco'
  },
  {
    category:'top',
    title: 'Camisa Casual corta',
    price:'$21.000',
    size:'Unico',
    imageUrl: 'https://via.placeholder.com/150',
    brand:'askDenim',
    color:'Blanco'
  },
  {
    category:'top',
    title: 'Camisa Casual corta',
    price:'$21.000',
    size:'Unico',
    imageUrl: 'https://via.placeholder.com/150',
    brand:'askDenim',
    color:'Blanco'
  },
  {
    category:'top',
    title: 'Camisa Casual corta',
    price:'$21.000',
    size:'Unico',
    imageUrl: 'https://via.placeholder.com/150',
    brand:'askDenim',
    color:'Blanco'
  },
];

const Inicio: React.FC = () => {
  return (
    <>
    <div className="flex flex-col justify-center aling-center p-4">
      <h1 className='text-center'>Clear Compras</h1>
      <h2 className="text-center text-2xl font-bold mb-4">Catálogo</h2>
    </div>
      <Cards posts={posts} /> {/* Aquí pasas la propiedad posts */}
      </>
  );
};

export default Inicio;

