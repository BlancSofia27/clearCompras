// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';

// Crear usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { userId, email, businessName, whatsapp } = req.body;
    const user = await User.create({ userId, email, businessName, whatsapp });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
};

// Obtener todos los usuarios
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, businessName, whatsapp } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await user.update({ email, businessName, whatsapp });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
