import { Router, Request, Response } from 'express';
import Champion from '../models/Champion';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const champions = await Champion.find();
    res.json(champions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch champions.' });
  }
});

export default router;