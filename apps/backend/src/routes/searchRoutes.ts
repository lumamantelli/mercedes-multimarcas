/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { getAllItems } from '../controllers/searchController';

const router = Router();

router.get('/items', getAllItems);

export default router;
