import React, { useEffect, useState } from 'react';
import Activities from './Activities';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { SampleUsers, User } from '../AdminUser';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { fetchUserWithFollows, followUser, unfollowUser } from '../../actions';
import { StoreState } from '../../reducers';
import { Avatar, CircularProgress } from '@mui/material';
import { useCookies } from 'react-cookie';

const sampleActs = [
  {
    id: 1,
    message: '["john", "follows", "kobe"]',
    user: SampleUsers[0],
  },
  {
    id: 2,
    message: '["mike", "follows", "oscar"]',
    user: SampleUsers[1],
  },
  {
    id: 3,
    message: '["john", "answers", "quiz101"]',
    user: SampleUsers[2],
  },
];

interface Props {
  user?: User;
  numFollowing: number;
  numFollowers: number;
  fetchUserWithFollows: Function;
  followUser: Function;
  unfollowUser: Function;
}

const _UserProfile = ({
  user,
  numFollowing,
  numFollowers,
  fetchUserWithFollows,
  followUser,
  unfollowUser,
}: Props) => {
  let { id } = useParams();

  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const checkFollowing = () => {
    let logged_in_user_id = cookies.user.id;

    let followers = user?.followers || [];
    let followers_id: number[] = followers?.map(
      (follower) => follower['from_id']
    );
    setIsFollowing(followers_id.includes(logged_in_user_id));
  };

  const handleFollowClick = (e: any) => {
    setLoading(true);
    let data = {
      user_id: user?.id,
      token: cookies.token,
      callback: () => {
        setLoading(false);
        setIsFollowing(false);
        fetchUserWithFollows(cookies.token, id);
      },
    };
    isFollowing ? unfollowUser(data) : followUser(data);
  };

  useEffect(() => {
    fetchUserWithFollows(cookies.token, id);
    return () => {};
  }, []);

  useEffect(() => {
    checkFollowing();
    return () => {};
  }, [user]);

  return (
    <div className="container mx-auto px-24 py-8">
      <div className="grid grid-cols-6">
        <div className="col-span-2 mr-4 px-10">
          {user?.avatar ? (
            <img
              className="mx-auto mt-4"
              src={user?.avatar}
              width={200}
              height={200}
              alt="Profile Image"
            />
          ) : (
            <Avatar alt={user?.name}>{user?.name[0]}</Avatar>
          )}
          <div className="my-4 mx-auto text-center font-semibold text-xl">
            {user?.name}
          </div>
          <Divider />

          <div className="grid grid-cols-2 text-center my-4">
            <div>{numFollowers} followers</div>
            <div>{numFollowing} following</div>
          </div>

          <div className="my-4 text-center">
            {loading ? (
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
          <div className="my-4 text-center">Latest Activity</div>
        </div>
        <div className="col-span-4">
          <Activities activities={sampleActs} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  userData,
}: StoreState): { user?: User; numFollowing: number; numFollowers: number } => {
  let user = userData.data;
  let numFollowing = user?.following?.length || 0;
  let numFollowers = user?.followers?.length || 0;
  return { user, numFollowing, numFollowers };
};

export const UserProfile = connect(mapStateToProps, {
  fetchUserWithFollows,
  followUser,
  unfollowUser,
})(_UserProfile);

export default UserProfile;
