import { playerID, APIKey } from '../settings.js';
import championList from './championKeyId.json';
import spellList from './spellKeyId.json';

export function calculateInsight(participant) {
  for (var mastery of participant.masteries) {
    if (mastery.masteryId === 6241) {
      return true;
    }
  }
  return false;
}

export function getMasteries(participant) {
  const spellId1 = participant.spell1Id;
  const spellId2 = participant.spell2Id;
  const spell1 = spellList[spellId1];
  const spell2 = spellList[spellId2];
  return [spell1, spell2];
}

export function getChampion(participant) {
  const championId = participant.championId;
  return championList[championId];
}

// export function getChampionThumbnail() {
//
// }
