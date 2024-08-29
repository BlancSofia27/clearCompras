// src/components/PostForm.tsx
import React, { useState } from 'react';

const sizes = ['Small', 'Medium', 'Large', 'Extra Large']; // Ejemplo de tamaños
const categories = ['T-Shirts', 'Jeans', 'Jackets', 'Shoes']; // Ejemplo de categorías
const colors = ['Negro','Blanc', 'Rojo', 'Azul']

const PostForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    imageUrl: '',
    imageUrl1: '',
    imageUrl2: '',
    selectedSizes: [] as string[], // Almacena los tamaños seleccionados
    category:'', // Almacena las categorías seleccionadas
    brand: '',
    color: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja la selección de botones para talles
  const handleSizeClick = (size: string) => {
    setFormData(prevData => ({
      ...prevData,
      selectedSizes: prevData.selectedSizes.includes(size)
        ? prevData.selectedSizes.filter(s => s !== size) // Elimina si está seleccionado
        : [...prevData.selectedSizes, size], // Agrega si no está seleccionado
    }));
  };

 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario, por ejemplo, hacer una solicitud HTTP.
    console.log('Form Data:', formData);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg my-6">
      <h2 className="text-2xl font-bold mb-4 py-6">Nueva publicacion</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo de Título */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Titulo
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Campo de Precio */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Campo de Imagen */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Imagen 1
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Campo de Imagen Opcional */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl1">
            Imagen 2 (opcional)
          </label>
          <input
            type="text"
            name="imageUrl1"
            value={formData.imageUrl1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl2">
            Imagen 3 (opcional)
          </label>
          <input
            type="text"
            name="imageUrl2"
            value={formData.imageUrl2}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Botones de Talles */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Talles
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 rounded ${
                  formData.selectedSizes.includes(size)
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

       {/* Select de Categoría */}
       <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Categoria
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Marca */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
            Marca
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Select de Color */}
       <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Color Predominante de la prenda(opcional)
          </label>
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {colors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default PostForm;



