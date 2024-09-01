import React, { useEffect, useState } from "react"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
import AdminCards from "./AdminCards"

// Define la interfaz para los datos del post
interface Post {
  id: string
  title: string
  price: string
  imageUrl: string
  imageUrl1: string
  imageUrl2: string
  size: string
  category: string
  brand: string
  color: string
}

const AdminPostsList: React.FC = () => {
  const { user, isAuthenticated } = useAuth0()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      if (isAuthenticated && user) {
        setLoading(true) // Indica que la carga ha comenzado
        setError(null) // Resetea cualquier error previo

        try {
          const userId = user.sub // Obtén el userId del usuario autenticado
          const response = await axios.get(
            `http://localhost:3000/api/post?userId=${userId}`
          )
          setPosts(response.data) // Guarda los posts en el estado
        } catch (err) {
          console.error("Error fetching posts:", err)
          setError(
            "Error al cargar las publicaciones. Inténtalo de nuevo más tarde."
          )
        } finally {
          setLoading(false) // Indica que la carga ha terminado
        }
      }
    }

    fetchPosts()
  }, [isAuthenticated, user])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return <AdminCards posts={posts} />
}

export default AdminPostsList
