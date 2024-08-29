// src/routes/indexRouter.ts
import { Router } from 'express';
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';

const router = Router();

router.use('/users', userRoutes);  // Rutas de usuarios en /api/users
router.use('/post', postRoutes);  // Rutas de posts en /api/posts

export default router;
