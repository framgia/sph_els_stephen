import { Divider, Stack } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import {
  UserProfileEditDetails,
  UserProfileEditAvatar,
  UserProfileEditPassword,
} from '.';

interface Props {}

export const UserProfileEdit = (props: Props): JSX.Element => {
  return (
    <div className="container mx-auto px-24 py-8">
      <Stack direction="row" spacing={5}>
        <div className="mr-4 px-10">
          <UserProfileEditAvatar />
        </div>

        <div>
          <UserProfileEditDetails />
        </div>

        <Divider orientation="vertical" flexItem>
          DANGER ZONE
          <AnnouncementIcon />
        </Divider>

        <div>
          <UserProfileEditPassword />
        </div>
      </Stack>
    </div>
  );
};

export default UserProfileEdit;
