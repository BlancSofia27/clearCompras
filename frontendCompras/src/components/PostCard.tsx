import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    imageUrl1?: string;
    imageUrl2?: string;
    size: string[];
    category: string;
    brand: string;
    color: string;
    userId: string;
  };
}

interface User {
  id: string;
  businessName: string;
  direction: string;
  // otras propiedades del usuario si las hay
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    title,
    price,
    imageUrl,
    imageUrl1,
    imageUrl2,
    size,
    category,
    brand,
    color,
    userId,
  } = post;
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `http://localhost:3000/api/users/${userId}`
        );
        console.log("Fetched user:", response.data);
        setUser(response.data);
      } catch (err) {
        setError("Error al obtener el usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const handleVisitLocal = () => {
    navigate(`/Profile/${userId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[];

  return (
    <div className="flex flex-col w-[300px] h-[600px] mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-100 text-center font-semibold p-2 text-sm">
        {user?.businessName || "Nombre del negocio"}
      <h3>{user?.direction || "Venta Online"}</h3>
      </div>
      <div className="h-48 mb-4">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative ">
              <img
                src={img}
                alt={`Image ${index}`}
                className="w-full h-[320px] object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex flex-col mx-4  h-1/3 overflow-y-auto mt-[150px] justify-start">
          <h2 className="text-lg font-semibold text-center">{title}</h2>
      <div className="flex flex-row justify-between">
        <div className="">
          <p className="text-gray-700 text-xl ">${price}</p>
          <div className="mb-2">
            <p className="text-gray-600 ">Talle</p>
          </div>
        </div>
        <div className="">
          <p className="text-gray-600 text-xs mb-2">Marca: {brand}</p>
          <p className="text-gray-600 text-xs mb-2">Categoría: {category}</p>
        </div>
        </div>
            <div className="flex flex-row gap-2 text-xs">
              {size.map((s, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
      </div>

      <div className="p-4 flex justify-between text-xs">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2  rounded">
          Compartir
        </button>
        <button
          onClick={handleVisitLocal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold p-2  rounded"
        >
          Visitar local
        </button>
      </div>
    </div>
  );
};

export default PostCard;
