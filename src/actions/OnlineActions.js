import { apiGet } from '../helpers/Api';

export const SERVER_STATUS = 'SERVER_STATUS';
export const PLAYERS_ONLINE = 'PLAYERS_ONLINE';

export const serverStatus = (data) => {
  const payload = apiGet('/', data);
  return { type: SERVER_STATUS, payload };
};

export const playersOnline = (data) => {
  const payload = apiGet('/online', data);
  return { type: PLAYERS_ONLINE, payload };
};
