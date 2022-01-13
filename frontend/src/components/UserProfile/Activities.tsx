import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { Skeleton, Stack } from '@mui/material';
import { Activity } from '.';
import { Link } from 'react-router-dom';

import TimeAgo from 'react-timeago';

interface Props {
  activities: Activity[] | null;
}

const Activities = ({ activities = [] }: Props) => {
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
            const [doer, action, recipient] = JSON.parse(act?.log?.message);
            const date = new Date(act.created_at);
            const defaultAvatar = `${process.env.REACT_APP_BACKEND_URL}/storage/avatars/default.jpg`;
            return (
              <ListItem alignItems="flex-start" key={act.id}>
                <ListItemAvatar>
                  <Avatar
                    alt={
                      act.following ? act.following?.name : act.follower?.name
                    }
                    src={
                      act.following
                        ? act.following?.avatar ?? defaultAvatar
                        : act.follower?.avatar ?? defaultAvatar
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  secondary={<TimeAgo className="ml-2" date={date} />}
                >
                  <Link
                    className="mr-1"
                    to={
                      act?.following || act?.quiz_id
                        ? '/'
                        : `/users/${act?.follower?.id}`
                    }
                  >
                    {act?.following || act?.quiz_id ? 'You' : doer}
                  </Link>
                  {action}
                  <Link
                    className="ml-1"
                    to={
                      act?.quiz_id ? '/quizzes' : `/users/${act?.follower?.id}`
                    }
                  >
                    {recipient}
                  </Link>
                </ListItemText>
              </ListItem>
            );
          })}
    </List>
  );
};

export default Activities;
