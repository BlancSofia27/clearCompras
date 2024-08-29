// src/routes/userRoutes.ts
import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = Router();

router.post('/', createUser);           // Crear un usuario
router.get('/', getUsers);              // Obtener todos los usuarios
router.get('/:id', getUserById);        // Obtener un usuario por ID
router.put('/:id', updateUser);         // Actualizar un usuario por ID
router.delete('/:id', deleteUser);      // Eliminar un usuario por ID

export default router;
