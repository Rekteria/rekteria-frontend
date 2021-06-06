import { apiGet } from '../helpers/Api';

export const GET_LAST_DEATHS = 'GET_LAST_DEATHS';
export const GET_TOP_KILLERS = 'GET_TOP_GUILDS';

export const getLastDeaths = (data) => {
  const payload = apiGet('/deaths', data);
  return { type: GET_LAST_DEATHS, payload };
};

export const getTopKillers = (data) => {
  const payload = apiGet('/deaths/killers', data);
  return { type: GET_TOP_KILLERS, payload };
};
