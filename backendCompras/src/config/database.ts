// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Configurar variables de entorno
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false, // Puedes habilitar el registro si lo necesitas
});

export default sequelize;


