import React from 'react';

const AccountWidget = () => {
  return (
    <div className="col-bg">
      <h3>Upcoming Events</h3>
      <hr />
      <div className="information">
        <table className="table table-sm mb-0 ">
          <tbody>
            <tr>
              <td className="p-0">
                <img
                  src="http://outfit-images.ots.me/outfit.php?id=241&addons=3&head=72&body=132&legs=114&feet=132"
                  alt=""
                />
              </td>
              <td>
                <h6 className="mb-1 text-muted">Zombie event</h6>
                <small className="text-muted">
                  <strong>6:49:43</strong> Time remaining
                </small>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="http://outfit-images.ots.me/outfit.php?id=211&addons=3&head=72&body=132&legs=114&feet=132"
                  alt=""
                />
              </td>
              <td>
                <h6 className="mb-1 text-muted">Other event</h6>
                <small className="text-muted">
                  <strong>6:49:43</strong> Time remaining
                </small>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountWidget;
