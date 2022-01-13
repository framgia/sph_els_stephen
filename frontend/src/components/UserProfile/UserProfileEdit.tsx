import { Stack } from '@mui/material';
import { UserProfileEditDetails, UserProfileEditAvatar } from '.';

interface Props {}

const UserProfileEdit = (props: Props): JSX.Element => {
  return (
    <div className="container mx-auto px-24 py-8">
      <Stack direction="row">
        <div className="mr-4 px-10">
          <UserProfileEditAvatar />
        </div>

        <div>
          <UserProfileEditDetails />
        </div>
      </Stack>
    </div>
  );
};

export default UserProfileEdit;
