/**
 * here are the main settings of the Hati AAC
 *
 * make good use of it.
 *
 * package   HatiAAC
 * author    Pedro
 * copyright 2020 HatiAAC
 * link      github.com/pedrogiampietro/Hati
 */

module.exports = {
  serverConnection: {
    developer: {
      base_URL: 'http://localhost:3001',
    },
    production: {
      base_URL: 'https://api.rekteria.net',
    },
  },

  genders: {
    0: 'Female',
    1: 'Male',
  },

  groupsId: {
    1: 'Player',
    2: 'Tutor',
    3: 'Senior Tutor',
    4: 'GameMaster',
    5: 'Community Manager',
    6: 'Administator',
  },

  createVocations: [
    // { vocation_id: '0', name: 'Rook' }, -> comment or uncomment to use the desired vocations in creating account
    { vocation_id: '1', name: 'Sorcerer' },
    { vocation_id: '2', name: 'Druid' },
    { vocation_id: '3', name: 'Paladin' },
    { vocation_id: '4', name: 'Knight' },
  ],

  characterVocations: {
    0: 'No Vocation',
    1: 'Sorcerer',
    2: 'Druid',
    3: 'Paladin',
    4: 'Knight',
    5: 'Master Sorcerer',
    6: 'Elder Druid',
    7: 'Royal Paladin',
    8: 'Elite Knight',
  },

  towns: {
    5: `Ab'dendriel`,
    6: 'Carlin',
    7: 'Kazordoon',
    8: 'Thais',
    9: 'Venore',
    10: 'Ankrahmun',
    11: 'Edron',
    12: 'Farmine',
    13: 'Darashia',
    14: 'Liberty Bay',
    15: 'Port Hope',
    16: 'Svargrond',
    17: 'Yalahar',
    18: 'Gray Beach',
    19: 'Krailos',
    20: 'Rathleton',
    21: 'Roshamuul',
  },

  listSkills: [
    { type: 'level', name: 'Level' },
    { type: 'maglevel', name: 'Magic Level' },
    { type: 'skill_fist', name: 'First Fighting' },
    { type: 'skill_axe', name: 'Axe Fighting' },
    { type: 'skill_club', name: 'Club Fighting' },
    { type: 'skill_sword', name: 'Sword Fighting' },
    { type: 'skill_dist', name: 'Distance Fighting' },
    { type: 'skill_shielding', name: 'Shield Fighting' },
    { type: 'skill_fishing', name: 'Fishing' },
  ],

  arrItems: {
    slotHead: 1,
    slotNecklace: 2,
    slotBackpack: 3,
    slotArmor: 4,
    slotRight: 5,
    slotLeft: 6,
    slotLegs: 7,
    slotFeet: 8,
    slotRing: 9,
    slotAmmo: 10,
  },
};
