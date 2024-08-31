import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDavq8_VxopLoj-WctqudXwYpGlsvGW0ik",
    authDomain: "compras-2cfd9.firebaseapp.com",
    projectId: "compras-2cfd9",
    storageBucket: "compras-2cfd9.appspot.com",
    messagingSenderId: "641349656261",
    appId: "1:641349656261:web:715c68c8f1fd768ece1aac",
    measurementId: "G-7H3NV4JF67"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Función para subir archivos
export const uploadFile = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};


