import { Request, Response } from 'express';
import Item from '../models/Item';
import { ALLOWED_ITEM_IDS } from '../services/ddragon';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({ id: { $in: [...ALLOWED_ITEM_IDS] } });
    res.json(items.map(item => ({
      itemName: item.name,
      itemImg: `https://ddragon.leagueoflegends.com/cdn/${item.patch}/img/tft-item/${item.image.full}`,
    })));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items.' });
  }
};