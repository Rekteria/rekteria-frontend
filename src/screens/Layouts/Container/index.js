import React from 'react';
import { useLocation } from 'react-router-dom';
import { getAccount } from '../../../helpers/Account';

import useMedia from '../../../Hooks/useMedia';

import Navbar from '../Navbar';
import Topbar from '../Topbar';
import Footer from '../Footer';

import AccountWidget from '../Widgets/AccountWidget';
import ComingEventsWidget from '../Widgets/ComingEventsWidget';
import BuyCharacterWidget from '../Widgets/BuyCharacterWidget';

const Container = ({ children }) => {
  const account = getAccount();
  const { pathname } = useLocation('');
  const mobile = useMedia('(max-width: 40rem)');
  const [, setMobileMenu] = React.useState(false);

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      <div className="logo"></div>
      <div className="container" id="xds">
        <Navbar mobile={mobile} />
      </div>
      {/* /.container */}
      <div className="container">
        <div className="chainbg" />
        <Topbar />
        <div className="content-border">
          <div className="content-bg">
            <div className="row">
              {/* MAIN CONTENT START */}
              <div className="col-sm-9 pr-0">{children}</div>
              {/* MAIN CONTENT END */}
              <div className="col-sm-3 hidden-xs">
                <AccountWidget account={account} />
                <ComingEventsWidget />
                <BuyCharacterWidget />
                <div className="col-bg">
                  <h3>Connect with us</h3>
                  <hr />
                  lorem ipsum
                </div>
                {/*
                  <div className="col-bg">
                      <h3>Top 5 Players</h3>
                      <hr>
                        <table className="table table-sm table-striped">
                  <tr><td style="width: 80%"><strong>1. </strong> <a className="charnametop5" href='characterprofile.php?name=Test'>Test</a></td><td align="right"><span className="badge badge-secondary">Lvl. 920</span></td></tr><tr><td style="width: 80%"><strong>2. </strong> <a className="charnametop5" href='characterprofile.php?name=Qatari'>Qatari</a></td><td align="right"><span className="badge badge-secondary">Lvl. 820</span></td></tr><tr><td style="width: 80%"><strong>3. </strong> <a className="charnametop5" href='characterprofile.php?name=Ana Qatari Tez'>Ana Qatari Tez</a></td><td align="right"><span className="badge badge-secondary">Lvl. 20</span></td></tr><tr><td style="width: 80%"><strong>4. </strong> <a className="charnametop5" href='characterprofile.php?name=Karim'>Karim</a></td><td align="right"><span className="badge badge-secondary">Lvl. 19</span></td></tr><tr><td style="width: 80%"><strong>5. </strong> <a className="charnametop5" href='characterprofile.php?name=Druid Sample'>Druid Sample</a></td><td align="right"><span className="badge badge-secondary">Lvl. 8</span></td></tr>              </table>
                    </div>
                  */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Container;
