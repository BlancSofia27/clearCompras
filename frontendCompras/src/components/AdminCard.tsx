import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";

interface MyAdminCard {
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

const MyCard: React.FC<MyAdminCard> = ({
  id,
  title,
  price,
  imageUrl,
  imageUrl1,
  imageUrl2,
  size,
  category,
  brand,
  color,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedBrand, setEditedBrand] = useState(brand);
  const [editedColor, setEditedColor] = useState(color);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(size);

  const sizes = ["Único", "S", "M", "L", "XL", "XXL"];
  const categories = [
    "Remeras",
    "Top Casual",
    "Jeans",
    "Pantalones",
    "Camperas y Buzos",
    "Zapatos",
    "Bikinis",
    "Deportivo",
    "Noche y Fiesta",
  ];
  const colors = ["Negro", "Blanco", "Rojo", "Azul", "Rosa", "Marron", "Verde"];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const images = [imageUrl, imageUrl1, imageUrl2].filter(Boolean) as string[];

  const handleSizeClick = (clickedSize: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(clickedSize)
        ? prevSizes.filter((s) => s !== clickedSize)
        : [...prevSizes, clickedSize]
    );
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/post/${id}`, {
        title: editedTitle,
        price: editedPrice,
        category: editedCategory,
        brand: editedBrand,
        color: editedColor,
        size: selectedSizes,
      });

      Swal.fire({
        title: "¡Actualizado!",
        text: "El producto se ha actualizado correctamente.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error updating product", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el producto.",
        icon: "error",
      });
    } finally {
      setModalIsOpen(false);
    }
  };

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
        <h4>ID:{id}</h4>
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
        <p className="text-gray-600 mb-2">Color: {color || "No especificado"}</p>
      </div>

      <div className="p-4 flex justify-between">
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Editar
        </button>
        <button
          onClick={handleEdit}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Editar Producto"
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
        <form className="flex flex-col gap-4">
          <label className="flex flex-col">
            Título:
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="flex flex-col">
            Precio:
            <input
              type="text"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="flex flex-col">
            Categoría:
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="border p-2 rounded w-full"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            Marca:
            <input
              type="text"
              value={editedBrand}
              onChange={(e) => setEditedBrand(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
          <label className="flex flex-col">
            Color:
            <select
              value={editedColor}
              onChange={(e) => setEditedColor(e.target.value)}
              className="border p-2 rounded w-full"
            >
              {colors.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Talles
            </label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeClick(size)}
                  className={`px-4 py-2 rounded ${
                    selectedSizes.includes(size)
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyCard;
