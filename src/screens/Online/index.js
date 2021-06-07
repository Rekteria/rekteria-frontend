import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { playersOnline } from '../../actions/OnlineActions';
import { characterVocations } from '../../config';
import useFullPageLoader from '../../Hooks/useFullPageLoader';

import Container from '../Layouts/Container';

const Online = ({ playersOnline }) => {
  const [isOnline, setIsOnline] = React.useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  React.useEffect(() => {
    showLoader();
    playersOnline().then(({ payload }) => {
      const newData = payload.data.data;
      setIsOnline(newData);
      hideLoader();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersOnline]);

  console.log(isOnline);

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Who Online</div>
        <div className="panel-body">
          <div className="card p-3 mt-2">
            <blockquote className="blockquote mb-0 card-body">
              <table border={0} cellSpacing={3} cellPadding={3} width="100%">
                <tbody>
                  <tr></tr>
                  <tr>
                    <td width="30%">
                      <b>Players Online:</b>
                    </td>
                    <td width="70%">
                      <font color="#009933">{isOnline.count}</font>
                    </td>
                  </tr>
                  <tr>
                    <td width="30%">
                      <b>Creation Date:</b>
                    </td>
                    <td width="70%">07/06/2020</td>
                  </tr>
                  <tr>
                    <td width="30%">
                      <b>Host Location:</b>
                    </td>
                    <td width="70%">
                      Virginia (EUA){' '}
                      <img src="http://flag-images.ots.me/us.png" alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <footer className="blockquote-footer">
                <small className="text-muted">
                  Difficulties prepare ordinary people for extraordinary fates{' '}
                  <cite title="Source Title">- C.S. Lewis.</cite>
                </small>
              </footer>
            </blockquote>
          </div>

          <div className="card p-4 rounded-plus bg-faded mt-2">
            <table className="table table-striped table-condensed">
              <thead>
                <tr>
                  <th width="20%">Name</th>
                  <th width="20%">Guild</th>
                  <th width="8%">Level</th>
                  <th width="8%">Vocation</th>
                </tr>

                {isOnline.rows?.map((whoOnline) => {
                  return (
                    <tr key={whoOnline}>
                      <td>
                        <Link to={`/character/${whoOnline?.player.name}`}>
                          {whoOnline?.player.name}
                        </Link>
                      </td>
                      <td>{whoOnline?.guild_memberships[0]?.guild.name}</td>
                      <td>
                        <span className="badge opacity-50 p-1 width-6 bg-primary border-primary text-white">
                          {whoOnline?.player.level}
                        </span>
                      </td>

                      <td>{characterVocations[whoOnline?.player.vocation]}</td>
                    </tr>
                  );
                })}
              </thead>
            </table>
          </div>
        </div>
      </div>
      {loader}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { playersOnline })(Online);
