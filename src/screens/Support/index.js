import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { supportList } from '../../actions/PlayerActions';
import { groupsId } from '../../config';
import { convertTimestempToDate } from '../../helpers/DateTime';
import Container from '../Layouts/Container';

const Support = () => {
  const dispatch = useDispatch();
  const [listSupport, setListSupport] = React.useState([]);

  React.useEffect(() => {
    dispatch(supportList())
      .then(({ payload }) => {
        const newData = payload.data.data;
        setListSupport(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Support List</div>
        <div className="panel-body">
          For any bigger issues or major bugs, you should contact our
          Administrators.
          <table className="table table-striped table-condensed">
            <tbody>
              <tr>
                <th width="15%">Group</th>
                <th width="70%">Name</th>
                <th>Last seen</th>
              </tr>
              {listSupport.map((admins) => {
                return (
                  <tr key={admins.id}>
                    <td>
                      <span className="label label-primary">
                        {groupsId[admins.group_id]}
                      </span>
                    </td>
                    <td>
                      <Link to={`/character/${admins.name}`}>
                        {admins.name}
                      </Link>
                    </td>
                    <td>
                      <span className="label label-default">
                        <time className="timeago">
                          {convertTimestempToDate(admins.lastlogin)}
                        </time>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Support;
