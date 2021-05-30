import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { highscoresList } from '../../actions/PlayerActions';
import { listSkills, characterVocations } from '../../config';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

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
    { name: 'Knight', filter: '4' }
  ]);
  const [skills] = useState([
    { name: 'level', filter: 'level' },
    { name: 'Distance Fighting', filter: 'skill_dist' },
    { name: 'Magic Level', filter: 'maglevel' },
    { name: 'Sword Fighting', filter: 'skill_sword' },
    { name: 'Axe Fighting', filter: 'skill_axe' },
    { name: 'Club Fighting', filter: 'skill_club' },
    { name: 'Shielding', filter: 'skill_shielding' },
    { name: 'Fist Fighting', filter: 'skill_fist' },
    { name: 'Fishing', filter: 'skill_fishing' }
  ])

  useEffect(() => {
    showLoading()
    highscoresList({
      vocation: filterVocation,
      skill: filterSkill,
      page: pageInitial,
    })
      .then(({ payload }) => {
        const newData = payload.data.data;
        setPlayerList(newData);
        hideLoading()
      })
      .catch((err) => {
        console.log(`😱 Request Api failed: ${err}`);
        hideLoading()
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
          <div className="row">
            {/* MAIN CONTENT START */}
            <div className="container">
              <div className="col-lg-12 col-md-12 col-sm-12 highscore-panel">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 font-weight-bold p-2 highscore-header">Highscores Filter</div>
                  <div className="col-md-12 col-sm-12 panel highscores-filter">
                    {vocations.map((voc, index) => (
                      <div className={`col-lg-2 col-md-3 col-sm-4 ${filterVocation === voc.filter ? 'highscore-filter-box' : 'highscore-filter-text'}`} key={index} onClick={() => onValueChangeVocation(voc.filter)}>{voc.name}</div>
                    ))}
                  </div>
                  <div className="col-md-12 col-sm-12 panel highscores-filter">
                    {skills.map((skill, index) => (
                      <div className={`col-lg-2 col-md-3 col-sm-4 ${filterSkill === skill.filter ? 'highscore-filter-box' : 'highscore-filter-text'}`} key={index} onClick={() => onValueChangeSkill(skill.filter)}>
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="col-lg-12 col-md-12 col-sm-12 highscore-panel">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 font-weight-bold p-2 highscore-header">Highscores</div>
                  <table className="table table-striped table-highscores">
                    <thead>
                      <tr>
                        <th width="1%">Rank</th>
                        <th width="6%">Name</th>
                        <th width="5%">{skillsName}</th>
                        <th width="8%">Vocation</th>
                        {filterSkill === 'level' && <th width="10%">Experience Points</th>}
                      </tr>

                      {playerList.map((props, index) => {
                        const skill =
                          filterSkill === 'level'
                            ? props.level
                            : props[filterSkill];
                        return (
                          <tr key={props.id} className={index % 2 !== 0 ? 'highscores-tr-odd' : ''}>
                            <td>{pageInitial * characterPerPage + index + 1}</td>

                            <td style={{ fontWeight: 'bold' }}>
                              <Link to={`/character/${props.name}`}>
                                {props.name}
                              </Link>
                            </td>
                            <td>{skill}</td>
                            <td>{characterVocations[props.vocation]}</td>
                            {filterSkill === 'level' && <td>{props.experience.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}
                          </tr>
                        );
                      })}
                    </thead>
                  </table>
                </div>
                <div className="row justify-content-center">
                  <ul className="pagination my-4">
                    {pageInitial <= 0 ? (
                      <li className="page-item">
                        <button
                          className="page-link disabled mr-3"
                          aria-label="Previous"
                          onClick={(e) => setPageInitial(pageInitial - 1)}
                          disabled
                        >
                          &#8249;
                      </button>
                      </li>
                    ) : (
                      <li className="page-item">
                        <button
                          className="page-link round mr-3"
                          aria-label="Previous"
                          onClick={(e) => setPageInitial(pageInitial - 1)}
                        >
                          &#8249;
                      </button>
                      </li>
                    )}

                    {playerList.length >= 10 ? (
                      <li className="page-item">
                        <button
                          className="page-link"
                          aria-label="Next"
                          onClick={() => setPageInitial(pageInitial + 1)}
                        >
                          &#8250;
                      </button>
                      </li>
                    ) : (
                      <li className="page-item">
                        <button
                          className="page-link disabled"
                          disabled
                          onClick={() => setPageInitial(pageInitial + 1)}
                        >
                          &#8250;
                      </button>
                      </li>
                    )}
                  </ul>
                </div>
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

export default connect(mapStateToProps, { highscoresList, showLoading, hideLoading })(Highscores);
