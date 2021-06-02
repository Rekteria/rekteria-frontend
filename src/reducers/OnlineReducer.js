import { PLAYERS_ONLINE, SERVER_STATUS } from '../actions/OnlineActions';

const initialState = {
  server_status: null,
  online: null,
  onlines: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PLAYERS_ONLINE: {
      const response = payload ? payload.data : null;
      const online = response ? response.data : null;
      return { ...state, online };
    }

    case SERVER_STATUS: {
      const response = payload ? payload.data : null;
      const server_status = response ? response.data : null;
      return { ...state, server_status };
    }

    default:
      return state;
  }
}
