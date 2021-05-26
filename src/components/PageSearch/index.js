import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Error from '../../helpers/Error';

import Container from '../../screens/Layouts/Container';
import NotFound from '../../assets/img/page_not.svg';
import './styles.css';

const PageSearch = () => {
  const { customNameData } = useLocation();
  const { error, name } = customNameData;
  console.log(error, name); // result: 'some_value'

  return (
    <Container>
      <div className="NoResultsSection">
        <div className="NoResultsContent">
          <h1>Oops!!</h1>

          <Error error={`${name} ${error} `} />

          <img src={NotFound} width="500" alt="No results" />
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.player.player,
  };
};

export default connect(mapStateToProps, {})(PageSearch);
