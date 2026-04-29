import { Router } from 'express';
import { getChampions } from '../controllers/champions';

const router = Router();

router.get('/', getChampions);

export default router;