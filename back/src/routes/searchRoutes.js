import { Router } from 'express';
import searchController from '../controller/searchController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = Router();


router.get('/', verifyToken, searchController.searchAll);

export default router;