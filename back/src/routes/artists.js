import { Router } from 'express';
import artistController from '../controller/artistsController.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; // Reusamos el de Cloudinary
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = Router();


router.get('/', verifyToken, artistController.getAll);
router.get('/:id', verifyToken, artistController.getOne);


router.post('/', 
    verifyToken, 
    verifyAdmin,
    uploadCloudinary.single('image'), 
    artistController.createArtist
);
router.put('/:id', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('image'), 
    artistController.update
);

export default router;