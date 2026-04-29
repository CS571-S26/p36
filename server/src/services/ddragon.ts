import axios from 'axios';
import Champion from '../models/Champion';
import Item from '../models/Item';

const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';
const CURR_VERSION = 'TFT17_';

export const ALLOWED_ITEM_IDS = new Set([
  'TFT_Item_AdaptiveHelm',
  'TFT_Item_ArchangelsStaff',
  'TFT_Item_Bloodthirster',
  'TFT_Item_BlueBuff',
  'TFT_Item_BrambleVest',
  'TFT_Item_Crownguard',
  'TFT_Item_Deathblade',
  'TFT_Item_DragonsClaw',
  'TFT_Item_GuardianAngel',
  'TFT_Item_SpectralGauntlet',
  'TFT_Item_GargoyleStoneplate',
  'TFT_Item_MadredsBloodrazor',
  'TFT_Item_GuinsoosRageblade',
  'TFT_Item_UnstableConcoction',
  'TFT_Item_HextechGunblade',
  'TFT_Item_InfinityEdge',
  'TFT_Item_IonicSpark',
  'TFT_Item_JeweledGauntlet',
  'TFT_Item_RunaansHurricane',
  'TFT_Item_LastWhisper',
  'TFT_Item_Morellonomicon',
  'TFT_Item_Leviathan',
  'TFT_Item_FrozenHeart',
  'TFT_Item_Quicksilver',
  'TFT_Item_RabadonsDeathcap',
  'TFT_Item_RapidFireCannon',
  'TFT_Item_SpearOfShojin',
  'TFT_Item_Redemption',
  'TFT_Item_NightHarvester',
  'TFT_Item_SteraksGage',
  'TFT_Item_PowerGauntlet',
  'TFT_Item_RedBuff',
  'TFT_Item_ThiefsGloves',
  'TFT_Item_TitansResolve',
  'TFT_Item_StatikkShiv',
  'TFT_Item_WarmogsArmor',
  'TFT_Item_TacticiansRing',
  'TFT_Item_ForceOfNature',
  'TFT_Item_TacticiansScepter',
]);

export const getLatestPatch = async (): Promise<string> => {
  const { data } = await axios.get(VERSIONS_URL);
  return data[0];
};

export const syncChampions = async (patch: string) => {
  const existing = await Champion.findOne({ patch, id: new RegExp(`^${CURR_VERSION}`) });
  if (existing) {
    console.log(`Champions already synced for patch ${patch}, skipping`);
    return;
  }

  const url = `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/tft-champion.json`;
  const { data } = await axios.get(url);

  const champions = (Object.values(data.data) as any[]).filter(
    (champ) => champ.id.startsWith(CURR_VERSION)
  );

  for (const champ of champions) {
    await Champion.findOneAndUpdate(
      { id: champ.id },
      { ...champ, patch },
      { upsert: true, returnDocument: 'after' }
    );
  }

  console.log(`Synced ${champions.length} champions for patch ${patch}`);
};

export const syncItems = async (patch: string) => {
  const existing = await Item.findOne({ patch });
  if (existing) {
    console.log(`Items already synced for patch ${patch}, skipping`);
    return;
  }

  const url = `https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/tft-item.json`;
  const { data } = await axios.get(url);

  const items = Object.values(data.data) as any[];

  for (const item of items) {
    await Item.findOneAndUpdate(
      { id: item.id },
      { ...item, patch },
      { upsert: true, returnDocument: 'after' }
    );
  }

  console.log(`Synced ${items.length} items for patch ${patch}`);
};

export const syncAll = async () => {
  const patch = await getLatestPatch();
  await Promise.all([syncChampions(patch), syncItems(patch)]);
};