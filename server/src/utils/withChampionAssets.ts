import Champion from '../models/Champion';

export const withChampionAssets = async (comps: any[]) => {
  const champions = await Champion.find();
  const champMap = new Map(champions.map(c => [
    c.name.trim(),
    {
      img: `https://ddragon.leagueoflegends.com/cdn/${c.patch}/img/tft-champion/${c.image.full}`,
      cost: c.cost
    }
  ]));

  return comps.map(comp => ({
    ...comp.toObject(),
    champions: comp.champions.map((c: any) => ({
      championName: c.championName,
      championImg: champMap.get(c.championName.trim())?.img ?? '',
      cost: champMap.get(c.championName.trim())?.cost ?? 0,
      position: c.position ?? null,
    })),
  }));
}