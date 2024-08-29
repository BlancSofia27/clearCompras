// src/controllers/postController.ts
import { Request, Response } from 'express';
import Post from '../models/Post';

// Crear post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, price, imageUrl, imageUrl1, imageUrl2, size, category, brand, color, userId } = req.body;
    
    // Validar que todos los campos necesarios están presentes
    if (!title || !price || !size || !category || !userId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const post = await Post.create({
      title,
      price,
      imageUrl,
      imageUrl1,
      imageUrl2,
      size,
      category,
      brand,
      color,
      userId
    });

    res.status(201).json(post);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Verifica si el error es una instancia de Error
      console.error('Error al crear el post:', error.message);
      res.status(400).json({ error: error.message });
    } else {
      // Manejo para otros tipos de errores
      console.error('Error desconocido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

// Obtener todos los posts
export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

// Obtener post por ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

// Actualizar post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, price, imageUrl, size, category, brand, color } = req.body;
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    await post.update({ title, price, imageUrl, size, category, brand, color });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el post' });
  }
};

// Eliminar post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    await post.destroy();
    res.status(200).json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
};
