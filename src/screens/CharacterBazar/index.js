import React from 'react';
import Container from '../Layouts/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { playerList } from '../../actions/PlayerActions';
import {
  getSellCharacters,
  backPlayerToOldAccount,
  getAllBazarOffers,
} from '../../actions/CharacterBazarActions';

import { characterVocations, genders } from '../../config';
import { formatDate } from '../../helpers/DateTime';

import './styles.css';

const arrItems = {
  slotHead: 1,
  slotNecklace: 2,
  slotBackpack: 3,
  slotArmor: 4,
  slotRight: 5,
  slotLeft: 6,
  slotLegs: 7,
  slotFeet: 8,
  slotRing: 9,
  slotAmmo: 10,
};

const CharacterBazar = () => {
  const dispatch = useDispatch();

  const { player } = useSelector((state) => state.player);

  const [getCharacterList, setGetCharacterList] = React.useState([]);
  const [getBazarOffers, setGetBazarOffers] = React.useState([]);

  React.useEffect(() => {
    dispatch(playerList());
    dispatch(getSellCharacters())
      .then(({ payload }) => {
        const newData = payload.data.data;
        setGetCharacterList(newData);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getAllBazarOffers())
      .then(({ payload }) => {
        const newData = payload.data.data;
        setGetBazarOffers(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const cancelOfferHandler = (playersInAccount) => {
    dispatch(backPlayerToOldAccount(playersInAccount));
  };

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Character Bazar</div>
        <div className="panel-body">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-buycharacter-tab"
                data-toggle="tab"
                href="#nav-buycharacter"
                role="tab"
                aria-controls="nav-buycharacter"
                aria-selected="true"
              >
                Buy Characters
              </a>
              <a
                className="nav-item nav-link"
                id="nav-sellcharacter-tab"
                data-toggle="tab"
                href="#nav-sellcharacter"
                role="tab"
                aria-controls="nav-sellcharacter"
                aria-selected="false"
              >
                Sell Characters
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-buycharacter"
              role="tabpanel"
              aria-labelledby="nav-buycharacter-tab"
            >
              {getBazarOffers.map((offer) => {
                return (
                  <div className="card mt-3" key={offer.id}>
                    {/* {console.log(offer)} */}
                    <div className="card-body">
                      <div className="Auction">
                        <div className="AuctionHeader">
                          <div className="AuctionLinks">
                            <Link to="#">
                              <img
                                title="show auction details"
                                src="https://static.tibia.com/images/global/content/button-details-idle.png"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="AuctionCharacterName">
                            <Link to="#">{offer.name}</Link>
                          </div>
                          Level: {offer.player.level} | Vocation:{' '}
                          {characterVocations[offer.player.vocation]} |Sex:{' '}
                          {genders[offer.player.sex]} | <br />
                        </div>
                        <div className="AuctionBody">
                          <div className="AuctionBodyBlock AuctionDisplay AuctionOutfit">
                            <div className="AuctionNewIcon">
                              <img
                                src="https://static.tibia.com/images/global/content/ribbon-new-top-left.png"
                                alt=""
                              />
                            </div>
                            <img
                              className="AuctionOutfitImage"
                              src="https://static.tibia.com/images/charactertrade/outfits/430_0.gif"
                              alt=""
                            />
                          </div>
                          <div className="AuctionBodyBlock AuctionDisplay AuctionItemsViewBox">
                            <div
                              className="CVIcon CVIconObject"
                              title="Zaoan legs"
                            >
                              <img
                                src="https://static.tibia.com/images/charactertrade/objects/16175.gif"
                                alt=""
                              />
                            </div>
                            <div
                              className="CVIcon CVIconObject"
                              title="prismatic armor"
                            >
                              <img
                                src="https://static.tibia.com/images/charactertrade/objects/16110.gif"
                                alt=""
                              />
                            </div>
                            <div
                              className="CVIcon CVIconObject"
                              title="shiny blade"
                            >
                              <img
                                src="https://static.tibia.com/images/charactertrade/objects/16175.gif"
                                alt=""
                              />
                            </div>
                            <div
                              className="CVIcon CVIconObject"
                              title="gnome sword"
                            >
                              <img
                                src="https://static.tibia.com/images/charactertrade/objects/27651.gif"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="AuctionBodyBlock ShortAuctionData">
                            <div className="ShortAuctionDataLabel">
                              Auction Start:
                            </div>
                            <div className="ShortAuctionDataValue">
                              {formatDate(offer.dta_insert)}
                            </div>
                            <div className="ShortAuctionDataLabel">
                              Auction End:
                            </div>
                            <div className="ShortAuctionDataValue">
                              {formatDate(offer.dta_valid)}
                            </div>
                            <div className="ShortAuctionDataBidRow">
                              <div className="ShortAuctionDataLabel">
                                Value:
                              </div>
                              <div className="ShortAuctionDataValue">
                                <b>{offer.price_coins}</b>{' '}
                                <img
                                  src="https://static.tibia.com/images//account/icon-tibiacointrusted.png"
                                  className="VSCCoinImages"
                                  title="Transferable Tibia Coins"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="AuctionBodyBlock CurrentBid">
                            <div className="Container">
                              <div className="MyMaxBidLabel">
                                Current Coins: 382
                              </div>
                              <form action="https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades">
                                <div className="BigButton">
                                  <button className="btn btn-outline-warning btn-sm mt-2">
                                    Comprar
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="AuctionBodyBlock SpecialCharacterFeatures">
                          <div className="Entry">
                            <img
                              className="CharacterFeatureCategory"
                              src="https://static.tibia.com/images/charactertrade/usp-category-2.png"
                              alt=""
                            />
                            55 Achievement Points
                          </div>
                          <div className="Entry">
                            <img
                              className="CharacterFeatureCategory"
                              src="https://static.tibia.com/images/charactertrade/usp-category-3.png"
                              alt=""
                            />
                            Blessings active: 7/7, Twist of Fate active: yes
                          </div>
                          <div className="Entry">
                            <img
                              className="CharacterFeatureCategory"
                              src="https://static.tibia.com/images/charactertrade/usp-category-0.png"
                              alt=""
                            />
                            99 Sword Fighting (Loyalty bonus not included)
                          </div>
                          <div className="Entry">
                            <img
                              className="CharacterFeatureCategory"
                              src="https://static.tibia.com/images/charactertrade/usp-category-0.png"
                              alt=""
                            />
                            91 Shielding (Loyalty bonus not included)
                          </div>
                          <div className="Entry">
                            <img
                              className="CharacterFeatureCategory"
                              src="https://static.tibia.com/images/charactertrade/usp-category-1.png"
                              alt=""
                            />
                            340803 Gold total in bank, inventory and depot
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="tab-pane fade"
              id="nav-sellcharacter"
              role="tabpanel"
              aria-labelledby="nav-sellcharacter-tab"
            >
              <div className="card">
                <div className="card-body">
                  <p>
                    You can only sell characters with <b>level 100</b> or
                    higher.
                  </p>
                  <p>
                    If your character has{' '}
                    <button className="btn btn-sm btn-danger">Selling</button>{' '}
                    status, this means that it is still listed for sale.
                    <br />
                    If your character is sold, it will be removed from the list
                    below automatically.
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Character Name</th>
                        <th>Status</th>
                        <th>Can remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {player?.map((playersInAccount) => {
                        return (
                          <tr key={playersInAccount.id}>
                            <td>{playersInAccount.name}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: `/bazar/${playersInAccount.name}/sell`,
                                  state: { name: playersInAccount.name },
                                }}
                                role="button"
                                className="btn btn-sm btn-success"
                              >
                                Sell Character
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tbody>
                      {getCharacterList?.map((playersInAccount) => {
                        return (
                          <tr key={playersInAccount.id}>
                            <td>{playersInAccount.name}</td>
                            <td></td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  cancelOfferHandler(playersInAccount)
                                }
                              >
                                Cancel Offer
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CharacterBazar;
