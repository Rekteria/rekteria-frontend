import { SELL_CHARACTER } from '../actions/CharacterBazarActions';

const initialState = {
  sellCharacter: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELL_CHARACTER: {
      const response = payload ? payload.data : null;
      const sellCharacter = response ? response.data : null;
      return { ...state, sellCharacter };
    }

    default:
      return state;
  }
}
