import { Router, Request, Response } from 'express';
import Comp from '../models/Comp';
import Champion from '../models/Champion';

const router = Router();

// GET /api/comps - get all comps
router.get('/', async (req: Request, res: Response) => {
  try {
    const { sort } = req.query; // query parameters from the URL
    const sortOption = sort === 'mostLiked' 
      ? { heartCount: -1 as const } 
      : { createdAt: -1 as const };

    const comps = await Comp.find().sort(sortOption);
    const champions = await Champion.find();
    const champMap = new Map(champions.map(c => [
      c.name,
      {
        img: `https://ddragon.leagueoflegends.com/cdn/${c.patch}/img/tft-champion/${c.image.full}`,
        cost: c.cost 
      }
    ]));

    const compsWithDetails = comps.map(comp => ({
      ...comp.toObject(),
      champions: comp.champions.map(c => ({
        championName: c.championName,
        championImg: champMap.get(c.championName)?.img ?? '',
        cost: champMap.get(c.championName)?.cost ?? 0,
      })),
    }))

    res.json(compsWithDetails);
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

    const champions = await Champion.find();
    const champMap = new Map(champions.map(c => [
      c.name,
      {
        img: `https://ddragon.leagueoflegends.com/cdn/${c.patch}/img/tft-champion/${c.image.full}`,
        cost: c.cost 
      }
    ]));

    const compWithDetails = {
      ...comp.toObject(),
      champions: comp.champions.map(c => ({
        championName: c.championName,
        championImg: champMap.get(c.championName)?.img ?? '',
        cost: champMap.get(c.championName)?.cost ?? 0,
      })),
    };

    res.json(compWithDetails);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comp.' });
  }
});

// POST /api/comps - create a comp
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, username, champions, tips, howToTransition } = req.body;

    if (!title || !username || !champions || champions.length === 0 || !tips) {
      return res.status(400).json({ message: 'title, username, champions, and tips are required.' });
    }

    const comp = new Comp({
      title,
      username,
      champions,
      tips,
      howToTransition: howToTransition ?? '',
    });

    await comp.save();
    res.status(201).json(comp);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comp.' });
  }
});

// DELETE /api/comps/:id - delete a comp
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const comp = await Comp.findByIdAndDelete(req.params.id);
    if (!comp) {
      return res.status(404).json({ message: 'Comp not found.' });
    }
    res.json({ message: 'Comp deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comp.' });
  }
})

export default router;