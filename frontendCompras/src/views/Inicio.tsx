// src/views/Inicio.tsx
import React from "react"
import SesionButton from "../components/SesionButton"
import PostsList from "../components/PostsList"
import PanelButton from "../components/PanelButton"
import ProfileAuth from "../components/ProfileAuth"

const Inicio: React.FC = () => {
  return (
    <>
      <div className="flex flex-row justify-between aling-center p-4">
        <h1 className="text-center">Clear Compras</h1>
        <SesionButton />
        <h2 className="text-center text-2xl font-bold mb-4">Catálogo</h2>
        <ProfileAuth />
        <PanelButton />
      </div>
      <PostsList />
    </>
  )
}

export default Inicio
