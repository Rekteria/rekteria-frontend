import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxPromise from 'redux-promise';
import accountReducer from './reducers/AccountReducer';
import playerReducer from './reducers/PlayerReducer';
import forumReducer from './reducers/ForumReducer';
import guildReducer from './reducers/GuildReducer';
import onlineReducer from './reducers/OnlineReducer';
import shopReducer from './reducers/ShopReducer';
import inventoryReducer from './reducers/InventoryReducer';
import pagarmeReducer from './reducers/PagarmeReducer';
import paymentHistoryReducer from './reducers/PaymentHistoryReducer';
import pixGerenciaReducer from './reducers/PixGerenciaReducer';
import playerDeathsReducer from './reducers/PlayerDeathsReducer';
import characterBazarReducer from './reducers/CharacterBazarReducer';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { loadingBarReducer } from 'react-redux-loading-bar';

const reducers = combineReducers({
  account: accountReducer,
  player: playerReducer,
  forum: forumReducer,
  guild: guildReducer,
  online: onlineReducer,
  shop: shopReducer,
  inventory: inventoryReducer,
  pagarme: pagarmeReducer,
  paymentHistory: paymentHistoryReducer,
  pixGerencia: pixGerenciaReducer,
  playerDeaths: playerDeathsReducer,
  characterBazar: characterBazarReducer,
  loadingBar: loadingBarReducer,
});

const store = createStore(
  reducers,
  applyMiddleware(ReduxPromise, loadingBarMiddleware())
);

export default store;
