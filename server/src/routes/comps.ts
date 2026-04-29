import { Router } from 'express';
import { getComps, getComp } from '../controllers/comps';

const router = Router();

router.get('/', getComps);
router.get('/:id', getComp);

export default router;