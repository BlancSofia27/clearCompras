import React, { useState, useEffect } from "react";
import SesionButton from "../components/SesionButton";
import PostsList from "../components/PostsList";
import PanelButton from "../components/PanelButton";
import ProfileAuth from "../components/ProfileAuth";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Hero from "../components/Hero";
import { ToastContainer } from "react-toastify";

const Inicio: React.FC = () => {
  const { user } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      if (user?.sub) {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/${user.sub}`);
          if (response.data) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error verifying user:", error);
        }
      }
    };

    checkUserExists();
  }, [user]);

  return (
    <div className='bg-slate justify-center items-center'>
        <div className="xl:flex xl:flex-row xl:justify-between xs:flex-col">
      <div className="flex flex-row align-center justify-center">
        <ProfileAuth />
        <ToastContainer/>
        <SesionButton/>
      </div>
        {isAdmin && <PanelButton />}
        </div>
        <Hero/>
      <PostsList />
    </div>
  );
};

export default Inicio;
