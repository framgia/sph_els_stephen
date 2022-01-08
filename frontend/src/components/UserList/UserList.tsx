import { useEffect } from 'react';

import { UserListData } from '.';

import { fetchUsers, followUser } from '../../actions';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { User } from '../AdminUser';
import { GridRenderCellParams } from '@mui/x-data-grid';

interface Props {
  fetchUsers: Function;
  followUser: Function;
  usersWithFollows: User[];
}

export const UserList = ({
  fetchUsers,
  followUser,
  usersWithFollows,
}: Props): JSX.Element => {
  useEffect(() => {
    fetchUsers();
    return () => {};
  }, []);

  const handleFollowClick = (e: any, params: GridRenderCellParams) => {
    let rowId = params.id;
    followUser(rowId);
  };

  return (
    <div className="container mx-auto mt-20 h-screen">
      <div className="flex mx-auto h-4/6 w-1/2 ">
        <div className="flex-grow">
          <UserListData
            handleFollowClick={handleFollowClick}
            usersWithFollows={usersWithFollows}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  usersData,
}: StoreState): { usersWithFollows: User[] } => {
  const users = usersData.data || [];
  const usersWithFollows = users.map((user) => {
    return { ...user };
  });
  return { usersWithFollows };
};

export default connect(mapStateToProps, { fetchUsers, followUser })(UserList);
