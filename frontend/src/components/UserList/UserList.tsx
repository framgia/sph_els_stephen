import { useEffect, useState } from 'react';

import { UserListData } from '.';

import {
  fetchUsers,
  followUser,
  unfollowUser,
  fetchUserWithFollows,
  userDataCleanup,
  usersDataCleanup,
} from '../../actions';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { User } from '../AdminUser';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useCookies } from 'react-cookie';
import { CircularProgress, Stack } from '@mui/material';

interface Props {
  usersWithFollows: User[];
  fetchUsers: Function;
  followUser: Function;
  unfollowUser: Function;
  fetchUserWithFollows: Function;
  userDataCleanup: Function;
  usersDataCleanup: Function;
}

export const UserList = ({
  fetchUsers,
  followUser,
  unfollowUser,
  fetchUserWithFollows,
  usersWithFollows,
  userDataCleanup,
  usersDataCleanup,
}: Props): JSX.Element => {
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUserWithFollows({
      token: cookies.token,
      callback: () => {
        fetchUsers({
          callback: () => {
            setLoading(false);
          },
        });
      },
    });
    return () => {
      userDataCleanup();
      usersDataCleanup();
    };
  }, [
    fetchUsers,
    fetchUserWithFollows,
    userDataCleanup,
    usersDataCleanup,
    cookies,
  ]);

  const handleFollowClick = (
    e: any,
    params: GridRenderCellParams,
    callback: Function = () => {}
  ) => {
    let rowId = params.id;
    let data = {
      user_id: rowId,
      token: cookies.token,
      callback: () => {
        fetchUserWithFollows({
          token: cookies.token,
          callback: () => {
            callback();
          },
        });
      },
    };
    params.row.is_following ? unfollowUser(data) : followUser(data);
  };

  return (
    <div className="container mx-auto mt-20 h-screen">
      {loading && (
        <Stack alignItems="center" className="mb-5">
          <CircularProgress />
        </Stack>
      )}
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
  const logged_in_user = userData.data;
  const users = usersData.data || [];

  let followings = userData.data?.following || [];
  let following_ids: (number | undefined)[] = followings?.map(
    (following) => following.to_id
  );

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#for_adding_and_removing_items_during_a_map
  const usersWithFollows = users.flatMap((user) => {
    if (logged_in_user?.id === user.id) return [];

    return { ...user, is_following: following_ids.includes(user['id']) };
  });
  return { usersWithFollows };
};

export default connect(mapStateToProps, {
  fetchUserWithFollows,
  fetchUsers,
  followUser,
  unfollowUser,
  userDataCleanup,
  usersDataCleanup,
})(UserList);
