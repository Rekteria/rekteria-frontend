import {
  GET_LAST_DEATHS,
  GET_TOP_KILLERS,
} from '../actions/PlayerDeathsActions';

const initialState = {
  death: null,
  deaths: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LAST_DEATHS:
    case GET_TOP_KILLERS: {
      const response = payload ? payload.data : null;
      const death = response ? response.data : null;
      return { ...state, death };
    }

    default:
      return state;
  }
}
