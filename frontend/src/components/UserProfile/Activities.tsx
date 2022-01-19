import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { Skeleton, Stack } from '@mui/material';
import { Activity, sortLogs } from '.';
import { Link } from 'react-router-dom';

import TimeAgo from 'react-timeago';
import { useCookies } from 'react-cookie';

interface Props {
  activities: Activity[] | null;
}

export const Activities = ({ activities = [] }: Props) => {
  const [cookies] = useCookies();
  const user_id = cookies.user?.id;
  const user_avatar = cookies.user?.avatar;

  const defaultAvatar = `${process.env.REACT_APP_BACKEND_URL}/storage/avatars/default.jpg`;

  const renderListItem = (act: Activity) => {
    const date = new Date(act.created_at);
    let act_logs = Array.isArray(act?.log) ? act?.log : [act?.log];
    sortLogs(act_logs);

    return act_logs.map((act_log) => {
      const [doer, action, recipient] = JSON.parse(act_log.message);
      const isCurrentUser = act?.from_id === user_id;
      const isCurrentQuizTaker = act?.user_id === user_id;
      const avatarSrc =
        isCurrentUser || isCurrentQuizTaker || act?.follower
          ? user_avatar ?? defaultAvatar
          : act?.following
          ? act?.following?.avatar ?? defaultAvatar
          : act?.user?.avatar ?? defaultAvatar;

      return (
        <ListItem alignItems="flex-start" key={act_log.message}>
          <ListItemAvatar>
            <Avatar alt={recipient} src={avatarSrc} />
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
              {isCurrentUser || isCurrentQuizTaker ? 'You' : doer}
            </Link>
            {action}
            <Link
              className="ml-1"
              to={
                act?.quiz_id
                  ? '/quizzes'
                  : isCurrentUser
                  ? '/users'
                  : `/users/${act?.to_id}`
              }
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
