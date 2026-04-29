import { Request, Response } from 'express';
import Comp from '../models/Comp';
import { withChampionAssets } from '../utils/withChampionAssets';

export const getComps = async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;
    const sortOption = sort === 'mostLiked'
      ? { heartCount: -1 as const }
      : { createdAt: -1 as const };

    const comps = await Comp.find().sort(sortOption);
    res.json(await withChampionAssets(comps));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comps.' });
  }
};

export const getComp = async (req: Request, res: Response) => {
  try {
    const comp = await Comp.findById(req.params.id);
    if (!comp) {
      return res.status(404).json({ message: 'Comp not found.' });
    }
    res.json((await withChampionAssets([comp]))[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comp.' });
  }
};