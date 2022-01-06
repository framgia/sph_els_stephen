import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { User } from '../AdminUser';

export interface Activity {
  id: number;
  message: string;
  user: User;
}

interface Props {
  activities: Activity[];
}

const Activities = (props: Props) => {
  return (
    <>
      <List
        sx={{
          width: '100%',
          //   maxWidth: 360,
          bgcolor: 'background.paper',
          borderColor: 'primary.main',
        }}
      >
        {props.activities.map((act) => {
          const [doer, action, recipient] = JSON.parse(act.message);
          return (
            <>
              <ListItem alignItems="flex-start" key={act.id}>
                <ListItemAvatar>
                  <Avatar alt={act.user.name} src={act.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${doer} ${action} ${recipient}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {' — x time ago…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </>
          );
        })}
      </List>
    </>
  );
};

export default Activities;
