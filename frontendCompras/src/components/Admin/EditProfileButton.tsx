import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { uploadFile } from '../../firebase/config'; // Importar la función uploadFile
import Swal from 'sweetalert2';

interface User {
  userId: string;
  email: string;
  businessName: string;
  whatsapp: string;
  header: string;
  logo: string;
  instagram: string;
}

// Inicializar el modal
Modal.setAppElement('#root');

const EditProfileButton: React.FC = () => {
  const { user } = useAuth0();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    userId: '',
    email: '',
    businessName: '',
    whatsapp: '',
    header: '',
    logo: '',
    instagram: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${user.sub}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    if (modalIsOpen) {
      fetchUserData();
    }
  }, [modalIsOpen]);





  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof User) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      try {
        const url = await uploadFile(file); // Usa la función uploadFile
        setFormData(prevData => ({ ...prevData, [fieldName]: url }));
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    if (user && formData) {
      setLoading(true);
      try {
        await axios.put(`http://localhost:3000/api/users/${user.sub}`, formData);
        Swal.fire({
          title: "¡Actualizado!",
          text: "El perfil se ha actualizado correctamente.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false
        });
        setModalIsOpen(false);
        setTimeout(() => window.location.reload(), 3000);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al actualizar el perfil.",
          icon: "error"
        });
        console.error('Error updating profile:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Editar datos
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Profile"
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Editar Perfil</h2>
        <form className="flex flex-col gap-4">
          <label className="flex flex-col">
            Header:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'header')}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            Logo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo')}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            Nombre del Negocio:
            <input
              type="text"
              name="businessName"
              placeholder="Nombre del Negocio"
              value={formData.businessName}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            WhatsApp:
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            Instagram:
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </label>
          <button
            type="button"
            onClick={handleEdit}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditProfileButton;
