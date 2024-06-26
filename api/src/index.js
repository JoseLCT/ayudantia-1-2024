import express, { json } from 'express';
import userRoutes from './routes/user.routes.js';
import { corsMiddleware } from './middlewares/cors.js';
import fileUpload from 'express-fileupload';

const app = express();
app.use(json());
app.disable('x-powered-by');
app.use(corsMiddleware())
// temp files
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './public/imagenes'
}));
app.use('/public', express.static('public'))

// Routes
app.use('/usuarios', userRoutes);

app.get('/', (req, res) => {
    res.json({ "message": 'Hola mundo' })
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})