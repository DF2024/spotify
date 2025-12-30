import { Router } from 'express';
import playlistController from '../controller/playlistController.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js';
import { verifyToken } from '../middlewares/auth.js';

const router = Router();


router.use(verifyToken);


router.get('/', playlistController.getMyPlaylists);


router.post('/', uploadCloudinary.single('image'), playlistController.create);


router.get('/:id', playlistController.getOne);


router.post('/:id/songs', playlistController.addSong);


router.delete('/:id/songs/:songId', playlistController.removeSong);

export default router;