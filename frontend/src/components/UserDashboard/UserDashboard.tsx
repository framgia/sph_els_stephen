import React, { useState, useEffect } from 'react';
import { fetchUserWithLogs } from '../../actions';

import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Avatar, Divider, Skeleton, Stack } from '@mui/material';

import { User } from '../AdminUser';
import { StoreState } from '../../reducers';
import {
  Activities,
  Activity,
  getActivities,
  sortActivities,
} from '../UserProfile';

interface Props {
  user: User | null;
  activities: Activity[] | null;
  fetchUserWithLogs: Function;
}

export const _UserDashboard = ({
  user,
  activities,
  fetchUserWithLogs,
}: Props) => {
  const [cookies] = useCookies();
  const [loadingUserData, setLoadingUserData] = useState(false);

  useEffect(() => {
    setLoadingUserData(true);
    fetchUserWithLogs({
      id: cookies.user.id,
      token: cookies.token,
      callback: () => {
        setLoadingUserData(false);
      },
    });
  }, [cookies, fetchUserWithLogs]);

  return (
    <div className="container mx-auto px-24 py-8">
      <div className="grid grid-cols-6">
        <div className="col-span-2 mr-4 px-10">
          {loadingUserData ? (
            <Stack alignItems="center" className="mb-5">
              <Skeleton variant="rectangular" width={200} height={200} />
              <Skeleton variant="text" width={150} height={50} />
            </Stack>
          ) : (
            <>
              {' '}
              {user?.avatar ? (
                <img
                  className="mx-auto mt-4"
                  src={user?.avatar}
                  width={200}
                  height={200}
                  alt="user avatar"
                />
              ) : (
                <Avatar alt={user?.name}>{user?.name[0]}</Avatar>
              )}
              <div className="my-4 mx-auto text-center font-semibold text-xl">
                {user?.name}
              </div>
            </>
          )}
          <Divider />

          {/* <div className="grid grid-cols-2 text-center my-4">
            <div>{numFollowers} followers</div>
            <div>{numFollowing} following</div>
          </div> */}

          {/* <div className="my-4 text-center">
            {loadingFollow ? (
              <CircularProgress />
            ) : (
              <Chip
                onClick={(e) => handleFollowClick(e)}
                label={isFollowing ? 'Unfollow' : 'Follow'}
                variant={isFollowing ? 'filled' : 'outlined'}
                color={isFollowing ? 'primary' : 'info'}
              />
            )}
          </div> */}

          <Divider />
        </div>
        <div className="col-span-4">
          <Activities activities={activities} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  userData,
}: StoreState): { user: User | null; activities: Activity[] | null } => {
  let user = userData.data || null;

  let activities = getActivities(user);
  sortActivities(activities);
  console.log(activities);
  return { user, activities };
};

export const UserDashboard = connect(mapStateToProps, { fetchUserWithLogs })(
  _UserDashboard
);

export default UserDashboard;
