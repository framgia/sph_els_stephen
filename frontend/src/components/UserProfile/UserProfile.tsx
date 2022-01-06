import React from 'react';
import Activities from './Activities';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { SampleUsers } from '../AdminUser';
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

interface Props {}

const UserProfile = (props: Props) => {
  return (
    <div className="container mx-auto px-24 py-8">
      <div className="grid grid-cols-6">
        <div className="col-span-2 mr-4 px-10">
          <img
            className="mx-auto mt-4"
            src={SampleUsers[0].avatar}
            width={200}
            height={200}
            alt="Profile Image"
          />
          <div className="my-4 mx-auto text-center font-semibold text-xl">
            {SampleUsers[0].name}
          </div>
          <Divider />

          <div className="grid grid-cols-2 text-center my-4">
            <div>20 followers</div>
            <div>20 following</div>
          </div>

          <div className="my-4 text-center">
            <Chip label="Follow" color="primary" />
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

export default UserProfile;
