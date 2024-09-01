import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface MyCardProps {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  imageUrl1?: string; // Opcional
  imageUrl2?: string; // Opcional
  size: string[];
  category: string;
  brand: string;
  color: string;
  userId: string;
}

interface User {
  id: string;
  businessName: string;
  // otras propiedades del usuario si las hay
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
  color,
  userId
}) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[];

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(userId)
        const response = await axios.get<User>(`http://localhost:3000/api/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('Error al obtener el usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const handleVisitLocal = () => {
    navigate(`/Profile/${userId}`); // Redirige a /profile/{userId}
  };

  return (
    <div className="flex flex-col w-full max-w-sm mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Carrusel ocupa la mitad superior */}
      <div className="relative h-60 mb-4">
        <div className="bg-gray-100 text-center font-semibold p-5">
          {user?.businessName || 'Nombre del negocio'}
        </div>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative h-[450px]">
              <img
                src={img}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }} // Asegura que las imágenes se recorten adecuadamente
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Información adicional ocupa la mitad inferior */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-lg mb-2">${price}</p>
        <div className="mb-2">
          <p className="text-gray-600 mb-2">Talle</p>
          <div className="flex flex-wrap gap-2">
            {size.map((s, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-600 mb-2">Marca: {brand}</p>
        <p className="text-gray-600 mb-2">Categoría: {category}</p>
        <p className="text-gray-600 mb-2">Color: {color}</p>
      </div>

      {/* Botones */}
      <div className="p-4 flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Compartir
        </button>
        <button
          onClick={handleVisitLocal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Visitar local
        </button>
      </div>
    </div>
  );
};

export default MyCard;
