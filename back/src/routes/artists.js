import { Router } from 'express';
import artistController from '../controller/artistsController.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; // Reusamos el de Cloudinary
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = Router();

// --- RUTAS PÚBLICAS (Solo requieren Login) ---
router.get('/', verifyToken, artistController.getAll);
router.get('/:id', verifyToken, artistController.getOne);

// --- RUTAS ADMIN (Requieren ser Admin) ---

// Usamos 'image' como el nombre del campo del formulario para la foto
router.post('/', 
    verifyToken, 
    verifyAdmin,
    uploadCloudinary.single('image'), 
    artistController.createArtist
);
router.put('/:id', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('image'), // Permite recibir una nueva foto
    artistController.update
);

export default router;