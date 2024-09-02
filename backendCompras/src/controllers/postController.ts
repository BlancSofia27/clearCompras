// src/controllers/postController.ts
import { Request, Response } from 'express';
import Post from '../models/Post';
const { Op } = require('sequelize');

// Crear post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, price, imageUrl, imageUrl1, imageUrl2, size, category, brand, color, userId } = req.body;
    
    // Validar que todos los campos necesarios están presentes
    if (!title || !price || !size || !category || !userId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Asegurarse de que `size` es un array
    if (!Array.isArray(size)) {
      return res.status(400).json({ error: 'El campo size debe ser un array' });
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

//traer los posts /filtrarlos / busqueda
export const getPosts = async (req: Request, res: Response) => {
  const { title, category, color, sortOrder } = req.query;

  try {
    // Construir el objeto de opciones para la consulta
    const options: any = {};

    // Aplicar filtros si se proporcionan
    if (title) {
      options.where = {
        ...options.where,
        title: {
          [Op.iLike]: `%${title}%`, // Buscar títulos que contengan el término de búsqueda (case-insensitive)
        },
      };
    }
    if (category) {
      options.where = { ...options.where, category };
    }
    if (color) {
      options.where = { ...options.where, color };
    }

    // Aplicar ordenamiento si se proporciona
    if (sortOrder === 'asc' || sortOrder === 'desc') {
      options.order = [['price', sortOrder]];
    }

    // Obtener los posts con las opciones especificadas
    const posts = await Post.findAll(options);
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

/**
 * Obtiene todos los posts para un usuario específico.
 * @param {Request} req - La solicitud HTTP.
 * @param {Response} res - La respuesta HTTP.
 * @param {NextFunction} next - La función de siguiente middleware.
 */
export const getPostsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params; // Obtiene userId de los parámetros de la ruta

  try {
    // Busca los posts en la base de datos por userId usando Sequelize
    const posts = await Post.findAll({
      where: { userId: userId }
    });

    // Verifica si se encontraron posts
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user.' });
    }

    // Envía los posts encontrados en la respuesta
    res.status(200).json(posts);
  } catch (error) {
    // Maneja errores
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//filters
export const getFilteredPosts = async (req: Request, res: Response) => {
  // Extrae los parámetros de consulta
  const { category, color, sortOrder } = req.query;

  try {
    // Configura las opciones de consulta para los filtros
    const queryOptions: any = {
      where: {
        ...(category && { category }), // Filtra por categoría si se proporciona
        ...(color && { color }),       // Filtra por color si se proporciona
      },
    };

    // Aplica el ordenamiento si se proporciona
    if (sortOrder) {
      queryOptions.order = [['price', sortOrder === 'asc' ? 'ASC' : 'DESC']];
    }

    // Obtén las publicaciones con los filtros y ordenamientos aplicados
    const posts = await Post.findAll(queryOptions);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching posts', error });
  }
};
