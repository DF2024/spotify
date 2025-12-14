import { Router } from 'express';
import searchController from '../controller/searchController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = Router();

// GET /api/search?query=texto
router.get('/', verifyToken, searchController.searchAll);

export default router;