import { useEffect } from 'react';

import { UserListData } from '.';

import { fetchUsers, followUser, fetchUserWithFollows } from '../../actions';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { User } from '../AdminUser';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';

interface Props {
  fetchUsers: Function;
  followUser: Function;
  fetchUserWithFollows: Function;
  usersWithFollows: User[];
}

export const UserList = ({
  fetchUsers,
  followUser,
  fetchUserWithFollows,
  usersWithFollows,
}: Props): JSX.Element => {
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    fetchUsers();
    fetchUserWithFollows(cookies.token);
    return () => {};
  }, []);

  const handleFollowClick = (e: any, params: GridRenderCellParams) => {
    let rowId = params.id;
    followUser(rowId, cookies.token);
  };

  return (
    <div className="container mx-auto mt-20 h-screen">
      <div className="flex mx-auto h-4/6 w-1/2 ">
        <div className="flex-grow">
          <UserListData
            usersWithFollows={usersWithFollows}
            handleFollowClick={handleFollowClick}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  userData,
  usersData,
}: StoreState): { usersWithFollows: User[] } => {
  const users = usersData.data || [];

  let following = userData.data?.following || [];
  let following_ids: number[] = following?.map((f) => f['to_id']);

  const usersWithFollows = users.map((user) => {
    return {
      ...user,
      is_following: following_ids.includes(user['id']) || user['is_following'],
    };
  });
  return { usersWithFollows };
};

export default connect(mapStateToProps, {
  fetchUserWithFollows,
  fetchUsers,
  followUser,
})(UserList);
