import { apiPost } from '../helpers/Api';

export const SELL_CHARACTER = 'SELL_CHARACTER';

export const sellCharcter = (data) => {
  const payload = apiPost('/characterBazar/sellchar', data);
  return { type: SELL_CHARACTER, payload };
};
