import React, { useEffect, useState } from 'react';
import {
  Activity,
  getActivities,
  sortActivities,
  Activities,
  sortLogs,
  removeDuplicateLogs,
} from '.';
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
  const [isLoadingFollow, setIsLoadingFollow] = useState(true);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = (e: any) => {
    setIsLoadingFollow(true);
    let data = {
      user_id: user?.id,
      token: cookies.token,
      callback: () => {
        fetchUserWithFollows({
          token: cookies.token,
          id: id,
          callback: () => {
            setIsLoadingFollow(false);
            setIsFollowing(false);
            fetchUserWithLogs({ id: id, token: cookies.token });
          },
        });
      },
    };
    isFollowing ? unfollowUser(data) : followUser(data);
  };

  useEffect(() => {
    setIsLoadingUserData(true);
    setIsLoadingFollow(true);
    fetchUserWithFollows({
      token: cookies.token,
      id: id,
      callback: () => {
        setIsLoadingFollow(false);
        fetchUserWithLogs({
          id: id,
          token: cookies.token,
          callback: () => {
            setIsLoadingUserData(false);
          },
        });
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
      let followers_id: (number | undefined)[] = followers?.map(
        (follower) => follower.from_id
      );
      setIsFollowing(followers_id.includes(logged_in_user_id));
    };

    checkFollowing();
  }, [user, cookies]);

  const renderLatestActivity = (act: Activity | null) => {
    if (!act) return;

    let act_logs = Array.isArray(act?.log) ? act?.log : [act?.log];
    sortLogs(act_logs);
    let latest = act_logs?.at(0);

    if (!latest) return;

    const [doer, action, recipient] = JSON.parse(latest.message);

    return (
      <Stack>
        {doer} {action} {recipient}
      </Stack>
    );
  };

  return (
    <div className="container mx-auto px-24 py-8">
      <div className="grid grid-cols-6">
        <div className="col-span-2 mr-4 px-10">
          {isLoadingUserData ? (
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
            {isLoadingFollow ? (
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
          {isLoadingUserData ? (
            <Skeleton
              className="mx-auto"
              variant="text"
              width={150}
              height={50}
            />
          ) : (
            <div className="my-4 text-center">
              {renderLatestActivity(activities?.at(0) || null)}
            </div>
          )}
        </div>
        <div className="col-span-4">
          <h1 className="text-2xl font-bold">Activities</h1>
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
  let activities = getActivities(userWithLogs) || [];
  for (let following of userWithLogs?.following || []) {
    let followed_user = following.following;

    if (!followed_user) continue;

    let newActivities = getActivities(followed_user) || [];
    activities = activities.concat(newActivities);
  }
  activities = removeDuplicateLogs(activities) || [];
  sortActivities(activities);

  return { user, numFollowing, numFollowers, activities };
};

export const UserProfile = connect(mapStateToProps, {
  fetchUserWithFollows,
  followUser,
  unfollowUser,
  fetchUserWithLogs,
  userDataCleanup,
})(_UserProfile);

export default UserProfile;
