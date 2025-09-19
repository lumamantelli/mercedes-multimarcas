/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express';
import carroRoutes from './routes/carroRoutes';
import motoRoutes from './routes/motoRoutes';
import caminhaoRoutes from './routes/caminhaoRoutes';
import maquinaRoutes from './routes/maquinaRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://admin.meusite.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

// Middleware para parsear JSON
app.use(express.json());

// Rota inicial
app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo ao servidor Express!');
});

app.use('/api', motoRoutes);
app.use('/api', carroRoutes);
app.use('/api', caminhaoRoutes);
app.use('/api', maquinaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
