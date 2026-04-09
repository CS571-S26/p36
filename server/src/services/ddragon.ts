import axios from 'axios';
import Champion from '../models/Champion';

const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';

export const getLatestPatch = async (): Promise<string> => {
  const { data } = await axios.get(VERSIONS_URL);
  return data[0];
};

export const syncChampions = async () => {
  const patch = await getLatestPatch();

  // check if we already have data for this patch
  const existing = await Champion.findOne({ patch });
  if (existing) {
    console.log(`Champions already synced for patch ${patch}, skipping`);
    return;
  }

  const url = `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/tft-champion.json`;
  const { data } = await axios.get(url);

  const champions = (Object.values(data.data) as any[]).filter(
    (champ) => champ.id.startsWith('TFT15_')
  );

  for (const champ of champions) {
    await Champion.findOneAndUpdate(
      { id: champ.id },
      { ...champ, patch },
      { upsert: true, returnDocument: 'after' }
    );
  }

  console.log(`Synced ${champions.length} champions for patch ${patch}`);
}