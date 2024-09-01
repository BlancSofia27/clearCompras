import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { uploadFile } from "../firebase/config"
import { Link } from "react-router-dom"

const sizes = ["Único", "S", "M", "L", "XL", "XXL"];
const categories = ["Remeras", "Top Casual", "Jeans", "Pantalones", "Camperas y Buzos", "Zapatos", "Bikinis", "Deportivo", "Noche y Fiesta"]
const colors = ["Negro", "Blanco", "Rojo", "Azul", "Rosa", "Marron", "Verde"]

const PostForm: React.FC = () => {
  const { user, isAuthenticated } = useAuth0()
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    imageUrl: "" as string,
    imageUrl1: "" as string,
    imageUrl2: "" as string,
    size: [] as string[],
    category: "" as string,
    brand: "",
    color: "" as string,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSizeClick = (size: string) => {
    setFormData((prevData) => ({
      ...prevData,
      size: prevData.size.includes(size)
        ? prevData.size.filter((s) => s !== size)
        : [...prevData.size, size],
    }))
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "imageUrl" | "imageUrl1" | "imageUrl2"
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: file, // Store the file object
      }))
    }
  }

  const uploadImagesAndSubmit = async () => {
    try {
      const urls = await Promise.all(
        Object.entries(formData)
          .filter(
            ([key, value]) =>
              key.startsWith("imageUrl") && value instanceof File
          )
          .map(async ([key, file]) => {
            // Ensure file is of type File
            if (file instanceof File) {
              const url = await uploadFile(file)
              console.log(`URL de ${key}:`, url)
              return { [key]: url }
            }
            return { [key]: "" } // Default to empty string if not a File
          })
      )

      // Update formData with image URLs
      const updatedFormData = urls.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        formData
      )

      return updatedFormData
    } catch (uploadError) {
      console.error("Error uploading images:", uploadError)
      setError("Error uploading images")
      throw uploadError
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated || !user) {
      alert(
        "No estás autenticado o no se pudo obtener la información del usuario."
      )
      return
    }

    setLoading(true)
    setError(null)

    try {
      const updatedFormData = await uploadImagesAndSubmit()

      const postData = {
        ...updatedFormData,
        userId: user.sub,
        email: user.email,
      }

      console.log("Datos enviados:", postData)

      const response = await axios.post(
        "http://localhost:3000/api/post/",
        postData
      )

      console.log("Post creado:", response.data)
      alert("Publicación creada con éxito")
    } catch (error) {
      console.error("Error al crear la publicación:", error)
      setError("Ocurrió un error al crear la publicación. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Link to="/AdminPanel">
  <button className="bg-teal-300 text-white p-5">
    Volver al Panel
  </button>
</Link>
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg my-6">
      <h2 className="text-2xl font-bold mb-4 py-6">Nueva publicación</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo de Título */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Título
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Imagen 1
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "imageUrl")}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Campo de Imagen Opcional */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl1"
          >
            Imagen 2 (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "imageUrl1")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl2"
          >
            Imagen 3 (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "imageUrl2")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Botones de Talles */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Talles
          </label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeClick(size)}
                className={`px-4 py-2 rounded ${
                  formData.size.includes(size)
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Select de Categoría */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Marca */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="brand"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="color"
          >
            Color Predominante (opcional)
          </label>
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Selecciona un color
            </option>
            {colors.map((color) => (
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
          disabled={loading}
        >
          {loading ? "Publicando..." : "Publicar"}
        </button>

        {/* Mensaje de error */}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
    </>
  )
}

export default PostForm
