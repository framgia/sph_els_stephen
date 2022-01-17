import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { Skeleton, Stack } from '@mui/material';
import { Activity } from '.';
import { Link } from 'react-router-dom';

import TimeAgo from 'react-timeago';
import { useCookies } from 'react-cookie';

interface Props {
  activities: Activity[] | null;
}

export const Activities = ({ activities = [] }: Props) => {
  const [cookies] = useCookies();
  const user_id = cookies.user.id;

  const defaultAvatar = `${process.env.REACT_APP_BACKEND_URL}/storage/avatars/default.jpg`;

  const renderListItem = (act: Activity) => {
    const date = new Date(act.created_at);
    let act_logs = Array.isArray(act?.log) ? act?.log : [act?.log];

    return act_logs.map((act_log) => {
      const [doer, action, recipient] = JSON.parse(act_log.message);

      return (
        <ListItem alignItems="flex-start" key={act_log.message}>
          <ListItemAvatar>
            <Avatar
              alt={act.following ? act.following?.name : act.follower?.name}
              src={
                act.following
                  ? act.following?.avatar ?? defaultAvatar
                  : act.follower?.avatar ?? defaultAvatar
              }
            />
          </ListItemAvatar>
          <ListItemText secondary={<TimeAgo className="ml-2" date={date} />}>
            <Link
              className="mr-1"
              to={
                act?.from_id || act?.quiz_id
                  ? act?.from_id === user_id
                    ? '/dashboard'
                    : '#'
                  : `/users/${act?.follower?.id}`
              }
            >
              {act?.from_id === user_id || act?.quiz_id ? 'You' : doer}
            </Link>
            {action}
            <Link
              className="ml-1"
              to={act?.quiz_id ? '/quizzes' : `/users/${act?.following?.id}`}
            >
              {recipient}
            </Link>
          </ListItemText>
        </ListItem>
      );
    });
  };

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderColor: 'primary.main',
      }}
    >
      {activities?.length === 0 || !activities
        ? Array.from(Array(10).keys()).map((tempKey) => {
            return (
              <ListItem alignItems="flex-start" key={tempKey}>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <Stack direction="column" spacing={2}>
                  <Skeleton variant="rectangular" width={250} height={10} />
                  <Skeleton variant="rectangular" width={250} height={10} />
                </Stack>
              </ListItem>
            );
          })
        : activities?.map((act) => {
            // eslint-disable-next-line
            if (!act.log) return;
            return [...renderListItem(act)];
          })}
    </List>
  );
};

export default Activities;
