import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import User from './models/UserModel';
import Post from './models/PostModel';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Sincronizar con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Rutas base para probar
app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

