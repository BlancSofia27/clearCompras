import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import routes from './routes/indexRoutes';
// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use('/api', routes);

// Sincroniza los modelos con la base de datos y arranca el servidor
sequelize.sync({ alter: true }).then(() => {
    console.log('Base de datos conectada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  }).catch((err: unknown) => {
    if (err instanceof Error) {
      // Manejo del error específicamente si es una instancia de Error
      console.error('Error conectando a la base de datos:', err.message);
    } else {
      // Manejo genérico si err no es del tipo Error
      console.error('Unknown error occurred:', err);
    }
  });
