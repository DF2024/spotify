import { Router } from 'express';
import songController from '../controller/songController.js';


import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 

import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', verifyToken, songController.getAll);

router.post('/', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('audioFile'), 
    songController.uploadSong
);


router.put(
    '/:id', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('audioFile'), 
    songController.update);


router.delete(
    '/:id', 
    verifyToken, 
    verifyAdmin, 
    songController.delete
);

export default router;