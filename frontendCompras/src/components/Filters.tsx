import React, { useState, useEffect } from 'react';

// Opciones de color y categoría (definidos estáticamente)
const categories = ["Remeras", "Top Casual", "Jeans", "Pantalones", "Camperas y Buzos", "Zapatos", "Bikinis", "Deportivo", "Noche y Fiesta"];
const colors = ["Negro", "Blanco", "Rojo", "Azul", "Rosa", "Marron", "Verde"];

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<{ category: string; color: string; sortOrder: 'asc' | 'desc'; }>>;
}

const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setFilters({ category: selectedCategory, color: selectedColor, sortOrder });
  }, [selectedCategory, selectedColor, sortOrder, setFilters]);

  return (
    <div className="filters p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Color:</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar Color</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Ordenar por Precio:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder('asc')}
            className={`px-4 py-2 border rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            Precio: Bajo a Alto
          </button>
          <button
            onClick={() => setSortOrder('desc')}
            className={`px-4 py-2 border rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            Precio: Alto a Bajo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
