import React, { useState } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../../reducers';

import { Skeleton, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {}

export const _UserQuizResult = (props: Props) => {
  const [quizTitle, setquizTitle] = useState('Quiz Title');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <div className="container mx-auto pt-10 px-4">
      <Stack direction="row" justifyContent="space-evenly">
        <h1 className="text-4xl font-bold">{quizTitle}</h1>

        <Stack direction="row">
          <h1 className="text-4xl font-bold mr-2">Result :</h1>
          <h1 className="text-4xl">{`${score} of ${20}`}</h1>
        </Stack>
      </Stack>

      <Stack className="mt-12" direction="row" justifyContent="space-evenly">
        <Stack direction="row">
          <CheckIcon fontSize="large" className="fill-gray-600" />
          <h1 className="text-2xl font-bold mx-2">or</h1>
          <ClearIcon fontSize="large" className="fill-gray-600" />
        </Stack>
        <h1 className="text-2xl font-bold mr-2">Question</h1>
        <h1 className="text-2xl font-bold mr-2">Answer</h1>
      </Stack>

      <Stack direction="column" spacing={2} className="mt-4">
        {loading
          ? Array.from(Array(10).keys()).map((tempKey) => {
              return (
                <Stack
                  key={tempKey}
                  direction="row"
                  justifyContent="space-evenly"
                >
                  <Skeleton variant="circular" width={50} height={50} />
                  <Skeleton variant="text" width={210} height={50} />
                  <Skeleton variant="rectangular" width={210} height={50} />
                </Stack>
              );
            })
          : null}
      </Stack>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({});

export const UserQuizResult = connect(mapStateToProps, {})(_UserQuizResult);

export default UserQuizResult;
