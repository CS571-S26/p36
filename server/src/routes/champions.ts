import { Router, Request, Response } from 'express';
import Champion from '../models/Champion';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const champions = await Champion.find({ id: { $not: /TraitClone/ }}).sort({ cost: 1 });
    res.json(champions.map(c => ({
      championName: c.name,
      championImg: `https://ddragon.leagueoflegends.com/cdn/${c.patch}/img/tft-champion/${c.image.full}`,
      cost: c.cost,
    })));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch champions.' });
  }
});

export default router;