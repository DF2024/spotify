import { Router } from "express";
import usersRouter from "./users.js"
import authRouter from "./auth.js"
import artistsRoutes from "./artists.js"
import playlistRoutes from "./playlists.js"
import songsRoutes from "./songs.js"
import albumsRoutes from "./albums.js"
import searchRoutes from './searchRoutes.js'; 


const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)
router.use('/artists', artistsRoutes)
router.use('/playlist', playlistRoutes)
router.use('/search', searchRoutes);
router.use('/songs', songsRoutes)
router.use('/albums', albumsRoutes)

export default router