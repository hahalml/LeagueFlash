import { app } from 'electron';
import championList from './championKeyId.json';
import spellList from './spellKeyId.json';

const fs = require('fs');
const execFile = require('child_process').execFile;
const path = require('path');

const AppDataPath = process.env.APPDATA + '/LeagueFlash/settings.json';
// const AppDataPath = 'C:\Users\Ricca\AppData\Roaming\LeagueFlash\settings.json';
const settings = JSON.parse(fs.readFileSync(AppDataPath, 'utf-8'));
export const { APIKey, playerID } = settings;

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

var cwd = '';
if (process.env.NODE_ENV === 'development') {
  cwd = path.join(process.cwd(), 'extraResources');
} else {
  cwd = path.join(process.cwd(), 'resources', 'extraResources');
}

export function hideTaskBar() {
  execFile('TaskBarHider.exe', ['-hide'], { cwd });
}

export function showTaskBar() {
  execFile('TaskBarHider.exe', ['-show'], { cwd });
}
