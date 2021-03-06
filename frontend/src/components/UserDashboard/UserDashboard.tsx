import React, { useState, useEffect } from 'react';
import {
  fetchUserWithLogs,
  userDataCleanup,
  fetchLearnedWords,
} from '../../actions';
import {
  TabPanel,
  a11yProps,
  UserLearnedWords,
  LearnedWordsRow,
  simple_to_plural,
} from '.';

import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
  Avatar,
  Box,
  Divider,
  Skeleton,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';

import { User } from '../AdminUser';
import { StoreState } from '../../reducers';
import {
  Activities,
  Activity,
  getActivities,
  removeDuplicateLogs,
  sortActivities,
} from '../UserProfile';

interface Props {
  user: User | null;
  activities: Activity[] | null;
  learnedWordsRows: LearnedWordsRow[] | null;
  learnedWordsNum: number;
  learnedQuizzesNum: number;
  fetchUserWithLogs: Function;
  userDataCleanup: Function;
  fetchLearnedWords: Function;
}

export const _UserDashboard = ({
  user,
  activities,
  fetchUserWithLogs,
  learnedWordsRows,
  learnedWordsNum,
  learnedQuizzesNum,
  userDataCleanup,
  fetchLearnedWords,
}: Props) => {
  const [cookies] = useCookies();
  const [loadingUserData, setLoadingUserData] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoadingUserData(true);
    fetchUserWithLogs({
      id: cookies.user.id,
      token: cookies.token,
      callback: () => {
        setLoadingUserData(false);
      },
    });
    fetchLearnedWords({ token: cookies.token });
    return () => {
      userDataCleanup();
    };
  }, [cookies, fetchUserWithLogs, userDataCleanup, fetchLearnedWords]);

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

          {loadingUserData ? (
            <Stack direction="row" spacing={2}>
              <Skeleton variant="text" width={150} height={50} />
              <Skeleton variant="text" width={150} height={50} />
            </Stack>
          ) : (
            <div className="grid grid-cols-2 text-center my-4">
              <div>Learned {simple_to_plural(learnedWordsNum, 'word')}</div>
              <div>
                Learned {simple_to_plural(learnedQuizzesNum, 'quiz', 'zes')}
              </div>
            </div>
          )}

          <Divider />
        </div>
        <div className="col-span-4">
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Activities" {...a11yProps(0)} />
                <Tab label="Learned Words" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Activities activities={activities} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserLearnedWords learnedWordsRows={learnedWordsRows} />
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  userData,
  learnedWordsData,
}: StoreState): {
  user: User | null;
  activities: Activity[] | null;
  learnedWordsRows: LearnedWordsRow[] | null;
  learnedWordsNum: number;
  learnedQuizzesNum: number;
} => {
  let user = userData.data || null;
  let learnedWords = learnedWordsData.data || null;
  let learnedWordsNum = 0;
  let learnedQuizzesNum = user?.quiz_logs?.length || 0;

  let activities = getActivities(user) || [];
  for (let following of user?.following || []) {
    let followed_user = following.following;

    if (!followed_user) continue;

    let newActivities = getActivities(followed_user) || [];
    activities = activities.concat(newActivities);
  }
  activities = removeDuplicateLogs(activities) || [];
  sortActivities(activities);

  let learnedWordsRows: LearnedWordsRow[] = [];
  let isQuestion1 = true;
  let tempRow: LearnedWordsRow = {};
  let currentIndex = 1;

  if (learnedWords) {
    for (let row of learnedWords) {
      learnedWordsNum++;
      if (isQuestion1) {
        tempRow.id = currentIndex;
        tempRow.question1 = row['question'];
        tempRow.answer1 = row['answer'];
      } else {
        tempRow.question2 = row['question'];
        tempRow.answer2 = row['answer'];
      }
      isQuestion1 = !isQuestion1;
      if (isQuestion1) {
        learnedWordsRows.push(tempRow);
        tempRow = {};
        currentIndex++;
      }
    }
    if (Object.entries(tempRow).length !== 0) {
      learnedWordsRows.push(tempRow);
    }
  }

  return {
    user,
    activities,
    learnedWordsRows,
    learnedWordsNum,
    learnedQuizzesNum,
  };
};

export const UserDashboard = connect(mapStateToProps, {
  fetchUserWithLogs,
  userDataCleanup,
  fetchLearnedWords,
})(_UserDashboard);

export default UserDashboard;
