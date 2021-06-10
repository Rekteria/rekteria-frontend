import {
  SELL_CHARACTER,
  GET_SELL_CHARACTER_LIST,
  BACK_TO_OLD_ACCOUNT,
  GET_ALL_OFFERS,
  BUY_CHARACTER_OFFER,
} from '../actions/CharacterBazarActions';

const initialState = {
  sellCharacter: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELL_CHARACTER:
    case GET_SELL_CHARACTER_LIST:
    case BACK_TO_OLD_ACCOUNT:
    case GET_ALL_OFFERS:
    case BUY_CHARACTER_OFFER: {
      const response = payload ? payload.data : null;
      const sellCharacter = response ? response.data : null;
      return { ...state, sellCharacter };
    }

    default:
      return state;
  }
}
