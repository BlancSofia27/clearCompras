// src/components/PostsList.tsx
import React, { useState, useEffect } from "react"
import PostCard from "./PostCard"
import Filters from "./Filters"
import SearchBar from "./SearchBar"
import ReactPaginate from "react-paginate"

type SortOrder = "asc" | "desc"

interface Filters {
  category: string
  color: string
  sortOrder: SortOrder
}

interface Post {
  id: string
  title: string
  price: number
  imageUrl: string
  imageUrl1?: string
  imageUrl2?: string
  size: string[]
  category: string
  brand: string
  color: string
  userId: string
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [filters, setFilters] = useState<Filters>({
    category: "",
    color: "",
    sortOrder: "asc",
  })
  const [searchTerm, setSearchTerm] = useState<string>("")
  const postsPerPage = 10

  useEffect(() => {
    fetchPosts()
  }, [filters, searchTerm])

  useEffect(() => {
    applyFilters()
  }, [posts, filters, searchTerm])

  const fetchPosts = async () => {
    const { category, color, sortOrder } = filters
    try {
      const response = await fetch(
        `http://localhost:3000/api/post?title=${searchTerm}&category=${category}&color=${color}&sortOrder=${sortOrder}`
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      console.log("Fetched posts:", data)
      setPosts(data)
    } catch (err) {
      console.error("Error fetching posts:", err)
    }
  }

  const applyFilters = () => {
    let filtered = [...posts]

    if (filters.category) {
      filtered = filtered.filter((post) => post.category === filters.category)
    }

    if (filters.color) {
      filtered = filtered.filter((post) => post.color === filters.color)
    }

    if (filters.sortOrder === "asc") {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (filters.sortOrder === "desc") {
      filtered = filtered.sort((a, b) => b.price - a.price)
    }

    setFilteredPosts(filtered)
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected)
  }

  const offset = currentPage * postsPerPage
  const currentPosts = filteredPosts.slice(offset, offset + postsPerPage)

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Filters setFilters={setFilters} />

      <div className="card-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </div>

      <ReactPaginate
        previousLabel={"< Anterior"}
        nextLabel={"Siguiente >"}
        breakLabel={"..."}
        pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  )
}

export default PostsList
