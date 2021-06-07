import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { highscoresList } from '../../actions/PlayerActions';
import { listSkills, characterVocations } from '../../config';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import Navbar from '../Layouts/Navbar';
import Topbar from '../Layouts/Topbar';
import Footer from '../Layouts/Footer';

import './styles.css';

const Highscores = ({ highscoresList, mobile, showLoading, hideLoading }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filterVocation, setFilterVocation] = useState('all');
  const [filterSkill, setFilterSkill] = useState('level');
  const [skillsName, setSkillsName] = useState('Level');
  const [pageInitial, setPageInitial] = useState(0);
  const [characterPerPage] = useState(10);
  const [vocations] = useState([
    { name: 'All Vocations', filter: 'all' },
    { name: 'Rooker', filter: '0' },
    { name: 'Sorcerer', filter: '1' },
    { name: 'Druid', filter: '2' },
    { name: 'Paladin', filter: '3' },
    { name: 'Knight', filter: '4' },
  ]);
  const [skills] = useState([
    { name: 'Level', filter: 'level' },
    { name: 'Distance Fighting', filter: 'skill_dist' },
    { name: 'Magic Level', filter: 'maglevel' },
    { name: 'Sword Fighting', filter: 'skill_sword' },
    { name: 'Axe Fighting', filter: 'skill_axe' },
    { name: 'Club Fighting', filter: 'skill_club' },
    { name: 'Shielding', filter: 'skill_shielding' },
    { name: 'Fist Fighting', filter: 'skill_fist' },
    { name: 'Fishing', filter: 'skill_fishing' },
  ]);

  useEffect(() => {
    showLoading();
    highscoresList({
      vocation: filterVocation,
      skill: filterSkill,
      page: pageInitial,
    })
      .then(({ payload }) => {
        const newData = payload.data.data;
        setPlayerList(newData);
        hideLoading();
      })
      .catch((err) => {
        console.log(`😱 Request Api failed: ${err}`);
        hideLoading();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highscoresList, filterVocation, filterSkill, pageInitial]);

  function onValueChangeVocation(e) {
    setFilterVocation(e);
  }

  function onValueChangeSkill(e) {
    listSkills.forEach(({ type, name }) => {
      if (type === e) {
        setSkillsName(name);
      }
    });

    setFilterSkill(e);
  }

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
          {/* MAIN CONTENT START */}

          <div className="panel panel-default mx-auto">
            <div className="panel-heading">Highscores</div>
            <div className="panel-body">
              <div className="card-body p-2">
                <div className="text-center">
                  <div style={{ fontSize: 25, fontWeight: 'bold' }}>
                    Rankings for Experience
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Vocation: <i> All </i>
                  </div>
                  {vocations.map((voc, index) => (
                    <span key={index}>
                      <Link
                        to="#"
                        className="m-1"
                        onClick={() => onValueChangeVocation(voc.filter)}
                      >
                        {voc.name}
                      </Link>
                      |
                    </span>
                  ))}

                  <div className="mt-2">
                    {skills.map((skill, index) => (
                      <span key={index}>
                        <Link
                          to="#"
                          className="m-1"
                          onClick={() => onValueChangeSkill(skill.filter)}
                        >
                          <strong>{skill.name}</strong>
                        </Link>
                        |
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row justify-content-between p-3">
                {pageInitial <= 0 ? (
                  <button
                    className="page-link disabled mr-3"
                    aria-label="Previous"
                    onClick={(e) => setPageInitial(pageInitial - 1)}
                    disabled
                  >
                    Previous Page
                  </button>
                ) : (
                  <button
                    className="page-link round mr-3"
                    aria-label="Previous"
                    onClick={(e) => setPageInitial(pageInitial - 1)}
                  >
                    Previous Page
                  </button>
                )}

                {playerList.length >= 10 ? (
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={() => setPageInitial(pageInitial + 1)}
                  >
                    Next Page
                  </button>
                ) : (
                  <button
                    className="page-link disabled"
                    disabled
                    onClick={() => setPageInitial(pageInitial + 1)}
                  >
                    Next Page
                  </button>
                )}
              </div>

              <table className="table table-striped table-condensed">
                <tbody>
                  <tr>
                    <th width="5%">#</th>
                    <th width="70%">Name/Vocation</th>
                    <th width="15%">
                      {filterSkill === 'level'
                        ? 'Experience Points'
                        : skillsName}
                    </th>
                  </tr>

                  {playerList.map((highscores, index) => {
                    const skill =
                      filterSkill === 'level'
                        ? highscores.level
                        : highscores[filterSkill];
                    return (
                      <tr key={highscores.id}>
                        <td>{pageInitial * characterPerPage + index + 1}</td>
                        <td>
                          <div style={{ fontWeight: 'bold' }}>
                            <Link to={`/character/${highscores.name}`}>
                              {highscores.name}
                            </Link>
                          </div>

                          <span>
                            {highscores.level}{' '}
                            {characterVocations[highscores.vocation]}
                          </span>
                        </td>
                        <td>
                          {filterSkill === 'level'
                            ? highscores.experience
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : skill}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="row justify-content-between p-3">
                {pageInitial <= 0 ? (
                  <button
                    className="page-link disabled mr-3"
                    aria-label="Previous"
                    onClick={(e) => setPageInitial(pageInitial - 1)}
                    disabled
                  >
                    Previous Page
                  </button>
                ) : (
                  <button
                    className="page-link round mr-3"
                    aria-label="Previous"
                    onClick={(e) => setPageInitial(pageInitial - 1)}
                  >
                    Previous Page
                  </button>
                )}

                {playerList.length >= 10 ? (
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={() => setPageInitial(pageInitial + 1)}
                  >
                    Next Page
                  </button>
                ) : (
                  <button
                    className="page-link disabled"
                    disabled
                    onClick={() => setPageInitial(pageInitial + 1)}
                  >
                    Next Page
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT END */}
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.player.player,
  };
};

export default connect(mapStateToProps, {
  highscoresList,
  showLoading,
  hideLoading,
})(Highscores);
