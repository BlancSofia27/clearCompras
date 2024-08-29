// src/routes/postRoutes.ts
import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController';

const router = Router();

router.post('/', createPost);           // Crear un post
router.get('/', getPosts);              // Obtener todos los posts
router.get('/:id', getPostById);        // Obtener un post por ID
router.put('/:id', updatePost);         // Actualizar un post por ID
router.delete('/:id', deletePost);      // Eliminar un post por ID

export default router;

