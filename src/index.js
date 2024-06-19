import express, { json } from 'express';
import userRoutes from './routes/user.routes.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
app.use(json());
app.disable('x-powered-by');
app.use(corsMiddleware())

// Routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.json({ "message": 'Hola mundo' })
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})