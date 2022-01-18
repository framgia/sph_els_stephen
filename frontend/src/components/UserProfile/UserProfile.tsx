import React, { useEffect, useState } from 'react';
import { getActivities, sortActivities } from './activitiesHelper';
import Activities from './Activities';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { User } from '../AdminUser';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import {
  fetchUserWithFollows,
  fetchUserWithLogs,
  followUser,
  unfollowUser,
  userDataCleanup,
} from '../../actions';
import { StoreState } from '../../reducers';
import { Avatar, CircularProgress, Skeleton, Stack } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Activity } from '.';

interface Props {
  user: User | null;
  numFollowing: number;
  numFollowers: number;
  activities: Activity[] | null;
  fetchUserWithFollows: Function;
  fetchUserWithLogs: Function;
  followUser: Function;
  unfollowUser: Function;
  userDataCleanup: Function;
}

export const _UserProfile = ({
  user,
  numFollowing,
  numFollowers,
  activities,
  fetchUserWithFollows,
  fetchUserWithLogs,
  followUser,
  unfollowUser,
  userDataCleanup,
}: Props) => {
  let { id } = useParams();

  const [cookies] = useCookies();
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = (e: any) => {
    setLoadingFollow(true);
    let data = {
      user_id: user?.id,
      token: cookies.token,
      callback: () => {
        fetchUserWithFollows({
          token: cookies.token,
          id: id,
          callback: () => {
            setLoadingFollow(false);
            setIsFollowing(false);
            fetchUserWithLogs({ id: id, token: cookies.token });
          },
        });
      },
    };
    isFollowing ? unfollowUser(data) : followUser(data);
  };

  useEffect(() => {
    setLoadingUserData(true);
    setLoadingFollow(true);
    fetchUserWithFollows({
      token: cookies.token,
      id: id,
      callback: () => {
        setLoadingUserData(false);
        setLoadingFollow(false);
        fetchUserWithLogs({ id: id, token: cookies.token });
      },
    });
    return () => {
      userDataCleanup();
    };
  }, [cookies, fetchUserWithFollows, fetchUserWithLogs, userDataCleanup, id]);

  useEffect(() => {
    const checkFollowing = () => {
      let logged_in_user_id = cookies.user.id;

      let followers = user?.followers || [];
      let followers_id: number[] = followers?.map(
        (follower) => follower['from_id']
      );
      setIsFollowing(followers_id.includes(logged_in_user_id));
    };

    checkFollowing();
  }, [user, cookies]);

  const renderLatestActivity = (act: Activity | null) => {
    let act_logs = Array.isArray(act?.log) ? act?.log : [act?.log];

    let latest = act_logs?.at(0);
    if (latest) {
      const [doer, action, recipient] = JSON.parse(latest.message);

      return (
        <Stack>
          {doer} {action} {recipient}
        </Stack>
      );
    }

    return '';
  };

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

          <div className="grid grid-cols-2 text-center my-4">
            <div>{numFollowers} followers</div>
            <div>{numFollowing} following</div>
          </div>

          <div className="my-4 text-center">
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
          </div>

          <Divider />
          {loadingUserData ? (
            <Skeleton
              className="mx-auto"
              variant="text"
              width={150}
              height={50}
            />
          ) : (
            <div className="my-4 text-center">
              {renderLatestActivity(activities?.at(1) || null)}
            </div>
          )}
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
  userWithLogsData,
}: StoreState): {
  user: User | null;
  numFollowing: number;
  numFollowers: number;
  activities: Activity[] | null;
} => {
  let user = userData.data || null;
  let numFollowing = user?.following?.length || 0;
  let numFollowers = user?.followers?.length || 0;

  let userWithLogs = userWithLogsData.data || null;
  let activities = getActivities(userWithLogs);
  sortActivities(activities);

  return { user, numFollowing, numFollowers, activities };
};

export const UserProfile = connect(mapStateToProps, {
  fetchUserWithFollows,
  followUser,
  unfollowUser,
  fetchUserWithLogs,
  getActivities,
  userDataCleanup,
})(_UserProfile);

export default UserProfile;
