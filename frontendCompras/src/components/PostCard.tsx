import React from 'react';

interface MyCardProps {
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
}

const MyCard: React.FC<MyCardProps> = ({
  title,
  price,
  imageUrl,
  imageUrl1,
  imageUrl2,
  size,
  category,
  brand,
  color
}) => {
  return (
    <div className="w-full max-w-sm mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-lg mb-2">{price}</p>
        <p className="text-gray-600 mb-2">Talle {size}</p>
        <p className="text-blue-600 mb-2 font-semibold">Categoría</p>
        <p className="text-gray-600 mb-2">{category}</p>
        <p className="text-gray-600 mb-2">Marca: {brand}</p>
        <p className="text-gray-600 mb-2">Color: {color}</p>
      </div>
      <div className="p-4 flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Compartir
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Visitar local
        </button>
      </div>
    </div>
  );
};

export default MyCard;



