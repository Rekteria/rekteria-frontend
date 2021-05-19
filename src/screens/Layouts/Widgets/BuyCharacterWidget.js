import React from 'react';

const BuyCharacterWidget = () => {
  return (
    <div className="col-bg">
      <h3>Buy Character</h3>
      <hr />
      <div className="information">
        <table className="table table-sm mb-0 table-borderless">
          <tbody>
            <tr>
              <td className="p-0" style={{ width: '24%' }}>
                <img src="http://outfit-images.ots.me/outfit.php?id=251&addons=3&head=72&body=132&legs=114&feet=132" />
              </td>
              <td>
                <h5 className="mb-1 text-muted">
                  <a href="#">Nickname</a>
                </h5>
                <small className="text-muted">
                  <strong>999</strong> Elite knight
                </small>
                <br />
                <span className="badge badge-secondary">100 coins</span>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <center>
                  <a className="btn btn-primary btn-sm mt-1" href="#">
                    <i className="fas fa-info-circle" /> More Information
                  </a>
                  <center />
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyCharacterWidget;
