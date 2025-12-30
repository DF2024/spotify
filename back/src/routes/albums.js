import { Router } from 'express';
import albumController from '../controller/albumController.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = Router();


router.get('/', verifyToken, albumController.getAll);
router.get('/:id', verifyToken, albumController.getOne);


router.post('/', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('image'), 
    albumController.createAlbum
);

router.put('/:id', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('image'), 
    albumController.update
);


router.delete('/:id', 
    verifyToken, 
    verifyAdmin, 
    albumController.delete
);



export default router;