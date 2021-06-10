import { apiPost, apiGet } from '../helpers/Api';

export const SELL_CHARACTER = 'SELL_CHARACTER';
export const GET_SELL_CHARACTER_LIST = 'GET_SELL_CHARACTER_LIST';
export const BACK_TO_OLD_ACCOUNT = 'BACK_TO_OLD_ACCOUNT';
export const GET_ALL_OFFERS = 'GET_ALL_OFFERS';
export const BUY_CHARACTER_OFFER = 'BUY_CHARACTER_OFFER';

export const sellCharcter = (data) => {
  const payload = apiPost('/characterBazar/sellchar', data);
  return { type: SELL_CHARACTER, payload };
};

export const getSellCharacters = (data) => {
  const payload = apiGet('/characterBazar/getSellCharacters', data);
  return { type: GET_SELL_CHARACTER_LIST, payload };
};

export const backPlayerToOldAccount = (data) => {
  const payload = apiPost('/characterBazar/backToOldAccount', data);
  return { type: BACK_TO_OLD_ACCOUNT, payload };
};

export const getAllBazarOffers = (data) => {
  const payload = apiGet('/characterBazar/getBazarOffers', data);
  return { type: GET_ALL_OFFERS, payload };
};

export const buyCharacterOffer = (data) => {
  const payload = apiPost('/characterBazar/buyCharacterOffer', data);
  return { type: BUY_CHARACTER_OFFER, payload };
};
