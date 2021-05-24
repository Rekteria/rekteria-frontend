import { API_SERVICE } from '../actions/ApiActions';

const initialState = {
  apis: [],
  api: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case API_SERVICE: {
      const response = payload ? payload.data : null;
      const api = response ? response.data : null;

      return { ...state, api };
    }

    default:
      return state;
  }
}
