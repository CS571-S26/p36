import { Router, Request, Response } from 'express';
import Comp from '../models/Comp';
import Champion from '../models/Champion';
import { withChampionAssets } from '../utils/withChampionAssets';

const router = Router();

// GET /api/comps - get all comps
router.get('/', async (req: Request, res: Response) => {
  try {
    const { sort } = req.query; // query parameters from the URL
    const sortOption = sort === 'mostLiked' 
      ? { heartCount: -1 as const } 
      : { createdAt: -1 as const };

    const comps = await Comp.find().sort(sortOption);
    res.json(await withChampionAssets(comps));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comps.' });
  }
});

// GET /api/comps/:id - get single comp
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const comp = await Comp.findById(req.params.id);
    if (!comp) {
      return res.status(404).json({ message: 'Comp not found.' });
    }
    res.json((await withChampionAssets([comp]))[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comp.' });
  }
});

export default router;