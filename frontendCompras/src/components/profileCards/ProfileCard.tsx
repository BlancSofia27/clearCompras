import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Slider from "react-slick";

import Swal from "sweetalert2";

interface MyProfileCard {
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
}

const MyCard: React.FC<MyProfileCard> = ({
  id,
  title,
  price,
  imageUrl,
  imageUrl1,
  imageUrl2,
  size,
  category,
  brand,
}) => {
  

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
    <div className="flex flex-col w-full max-w-sm mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="h-72 mb-4">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className="relative h-full">
              <img
                src={img}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="p-4 mt-[270px]">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-lg mb-2">${price}</p>
        <div className="mb-2">
          <p className="text-gray-600 mb-2">Talle</p>
          <div className="flex flex-wrap gap-2">
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
        <p className="text-blue-600 mb-2 font-semibold">Categoría</p>
        <p className="text-gray-600 mb-2">{category || "No especificada"}</p>
        <p className="text-gray-600 mb-2">Marca: {brand}</p>
      </div>
    </div>
  );
};

export default MyCard;
