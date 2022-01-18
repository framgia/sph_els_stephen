import React from 'react';

import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';

const sampleRows = [
  {
    id: 1,
    question1: 'hello',
    answer1: 'world',
    question2: 'lorem',
    answer2: 'ipsum',
  },
  {
    id: 2,
    question1: 'hello',
    answer1: 'world',
    question2: 'lorem',
    answer2: 'ipsum',
  },
  {
    id: 3,
    question1: 'hello',
    answer1: 'world',
    question2: 'lorem',
    answer2: 'ipsum',
  },
  {
    id: 4,
    question1: 'hello',
    answer1: 'world',
    question2: 'lorem',
    answer2: 'ipsum',
  },
  {
    id: 5,
    question1: 'hello',
    answer1: 'world',
    question2: 'lorem',
    answer2: 'ipsum',
  },
  {
    id: 6,
    question1: 'hello',
    answer1: 'world',
    question2: 'lorem',
    answer2: 'ipsum',
  },
];

interface Props {}

const UserLearnedWords = (props: Props) => {
  const learnedWordsColumns: GridColumns = [
    { field: 'question1', headerName: 'Question', width: 200 },
    { field: 'answer1', headerName: 'Answer', width: 130 },
    { field: 'question2', headerName: 'Question', width: 200 },
    { field: 'answer2', headerName: 'Answer', width: 130 },
  ];

  return (
    <div className="container mx-auto mt-20 h-screen">
      <div className="flex mx-auto h-4/6 w-1/2 ">
        <div className="flex-grow">
          <DataGrid rows={sampleRows} columns={learnedWordsColumns} />
        </div>
      </div>
    </div>
  );
};

export default UserLearnedWords;
