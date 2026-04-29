import { Request, Response } from 'express';
import Champion from '../models/Champion';

export const getChampions = async (req: Request, res: Response) => {
  try {
    const champions = await Champion.find({ id: { $not: /TraitClone/ } }).sort({ cost: 1 });
    res.json(champions.map(c => ({
      championName: c.name,
      championImg: `https://ddragon.leagueoflegends.com/cdn/${c.patch}/img/tft-champion/${c.image.full}`,
      cost: c.cost,
    })));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch champions.' });
  }
};