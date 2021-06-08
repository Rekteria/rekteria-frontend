import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { initAccount } from './actions/AccountActions';

import Home from './screens/Home';
import AccountProfile from './screens/Account/Profile';
import ProfileName from './screens/Account/ProfileName';
import ProfileAvatar from './screens/Account/ProfileAvatar';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';
import MyAccount from './screens/Account/MyAccount';
import AccountCharactersCreate from './screens/Account/MyAccount/Create';
import Highscores from './screens/Highscores';
import Character from './screens/Character';
import Forum from './screens/Forum';
import Threads from './screens/Forum/Threads';
import CreateThread from './screens/Forum/Threads/Create';
import Discussions from './screens/Forum/Discussions';
import EditPost from './screens/Forum/Discussions/EditPost';
import ForgotPassword from './screens/Account/ForgotPassword';
import ResetPassword from './screens/Account/ResetPassword';
import ChangePassword from './screens/Account/ChangePassword';
import Downloads from './screens/Downloads';
import Guilds from './screens/Guilds';
import GuildList from './screens/Guilds/GuildList';
import GuildCreate from './screens/Guilds/GuildCreate';
import Online from './screens/Online';
import Shop from './screens/Shop';
import BuyCoins from './screens/BuyCoins';
import ServerInfo from './screens/Serverinfo';
import Support from './screens/Support';
import LastDeaths from './screens/LastDeaths';
import TopKillers from './screens/TopKillers';
import CharacterBazar from './screens/CharacterBazar';
import SellCharacter from './screens/CharacterBazar/SellCharacter';

import LoadingBar from 'react-redux-loading-bar';

import PageSearch from './components/PageSearch';
import ProtectedRoute from './helpers/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';

import '../node_modules/bootstrap/js/src/modal';
import '../node_modules/bootstrap/js/src/dropdown';
import '../node_modules/bootstrap/js/src/collapse';
import '../node_modules/bootstrap/js/src/tab';

const App = ({ initAccount }) => {
  useEffect(() => {
    initAccount();
  }, [initAccount]);

  return (
    <>
      <BrowserRouter>
        <LoadingBar style={{ backgroundColor: '#216669' }} />
        <Switch>
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/reset" component={ResetPassword} />

          {/* Protected Routes */}
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute
            exact
            path="/account/profile"
            component={AccountProfile}
          />
          <ProtectedRoute
            exact
            path="/account/profile_name"
            component={ProfileName}
          />
          <ProtectedRoute
            exact
            path="/account/avatar"
            component={ProfileAvatar}
          />
          <ProtectedRoute
            exact
            path="/account/password"
            component={ChangePassword}
          />
          <ProtectedRoute
            exact
            path="/account/characters/create"
            component={AccountCharactersCreate}
          />
          <ProtectedRoute
            exact
            path="/bazar/:name/sell"
            component={SellCharacter}
          />
          {/* Finaly Protected Routes */}

          <Route exact path="/account" component={MyAccount} />
          <Route exact path="/highscores" component={Highscores} />
          <Route exact path="/character/:name" component={Character} />
          <Route exact path="/PageSearch" component={PageSearch} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/forum/:board_id" component={Threads} />
          <Route exact path="/forum/:board_id" component={CreateThread} />
          <Route
            exact
            path="/forum/thread/:board_id/:discussion"
            component={Discussions}
          />
          <Route exact path="/forum/post/edit/:id" component={EditPost} />

          <Route exact path="/downloads" component={Downloads} />

          <Route exact path="/guilds" component={Guilds} />
          <Route exact path="/guilds/create" component={GuildCreate} />
          <Route exact path="/guilds/:id" component={GuildList} />

          <Route exact path="/online" component={Online} />
          <Route exact path="/info" component={ServerInfo} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/deaths" component={LastDeaths} />
          <Route exact path="/killers" component={TopKillers} />
          <Route exact path="/bazar" component={CharacterBazar} />

          <Route exact path="/shop" component={Shop} />
          <Route exact path="/buycoins" component={BuyCoins} />

          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
  };
};

export default connect(mapStateToProps, { initAccount })(App);
