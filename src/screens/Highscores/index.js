import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { highscoresList } from '../../actions/PlayerActions';
import { listSkills, characterVocations } from '../../config';

import Navbar from '../Layouts/Navbar';
import Topbar from '../Layouts/Topbar';
import Footer from '../Layouts/Footer';

import './styles.css';

const Highscores = ({ highscoresList, mobile }) => {
  const [playerList, setPlayerList] = useState([]);
  const [filterVocation, setFilterVocation] = useState('all');
  const [filterSkill, setFilterSkill] = useState('level');
  const [skillsName, setSkillsName] = useState('Level');
  const [pageInitial, setPageInitial] = useState(0);
  const [characterPerPage] = useState(10);

  useEffect(() => {
    highscoresList({
      vocation: filterVocation,
      skill: filterSkill,
      page: pageInitial,
    })
      .then(({ payload }) => {
        const newData = payload.data.data;
        setPlayerList(newData);
      })
      .catch((err) => {
        alert('os players não foram carregados.');
        console.log(err);
      });
  }, [highscoresList, filterVocation, filterSkill, pageInitial]);

  function onValueChangeVocation(e) {
    const options = e.target.value;
    setFilterVocation(options);
  }

  function onValueChangeSkill(e) {
    const options = e.target.value;

    listSkills.forEach(({ type, name }) => {
      if (type === options) {
        setSkillsName(name);
      }
    });

    setFilterSkill(options);
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

            <div className="col-md-4 col-sm-12 panel panel-default m-3">
              <form>
                <select
                  className="form-control mb-4 mt-3"
                  onChange={onValueChangeVocation}
                >
                  <option value="all">All vocations</option>
                  <option value="0">Rooker</option>
                  <option value="1">Sorcerer</option>
                  <option value="2">Druid</option>
                  <option value="3">Paladin</option>
                  <option value="4">Knight</option>
                </select>

                <div className="funkyradio">
                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="level"
                      value="level"
                      checked={filterSkill === 'level'}
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="level">Experience</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="dist"
                      value="skill_dist"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="dist">Distance</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="magic"
                      value="maglevel"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="magic">Magic Level</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="sword"
                      value="skill_sword"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="sword">Sword Fighting</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="axe"
                      value="skill_axe"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="axe">Axe Fighting</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="club"
                      value="skill_club"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="club">Club Fighting</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="shield"
                      value="skill_shielding"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="shield">Shielding</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="fist"
                      value="skill_fist"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="fist">Fist Fighting</label>
                  </div>

                  <div className="funkyradio-primary">
                    <input
                      type="radio"
                      name="radio"
                      id="fishing"
                      value="skill_fishing"
                      onChange={onValueChangeSkill}
                    />
                    <label htmlFor="fishing">Fishing Fighting</label>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-md-7 col-sm-12 panel panel-default mt-3">
              <h4 className="font-weight-bold p-2">Highscores</h4>
              <div className="row">
                <table className="table table-striped table-highscores">
                  <thead>
                    <tr>
                      <th width="1%">Rank</th>
                      <th width="6%">Name</th>
                      <th width="5%">{skillsName}</th>
                      <th width="8%">Vocation</th>
                    </tr>

                    {playerList.map((props, index) => {
                      const skill =
                        filterSkill === 'level'
                          ? props.level
                          : props[filterSkill];
                      return (
                        <tr key={props.id}>
                          <td>{pageInitial * characterPerPage + index + 1}</td>

                          <td>
                            <Link to={`/character/${props.name}`}>
                              {props.name}
                            </Link>
                          </td>
                          <td>{skill}</td>

                          <td>{characterVocations[props.vocation]}</td>
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

export default connect(mapStateToProps, { highscoresList })(Highscores);
