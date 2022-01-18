import React from 'react';

import { DataGrid, GridColumns } from '@mui/x-data-grid';

export interface LearnedWordsRow {
  id?: number;
  question1?: string;
  answer1?: string;
  question2?: string;
  answer2?: string;
}

interface Props {
  learnedWordsRows: LearnedWordsRow[] | null;
}

export const UserLearnedWords = ({ learnedWordsRows }: Props) => {
  const learnedWordsColumns: GridColumns = [
    { field: 'question1', headerName: 'Question', width: 200 },
    { field: 'answer1', headerName: 'Answer', width: 130 },
    { field: 'question2', headerName: 'Question', width: 200 },
    { field: 'answer2', headerName: 'Answer', width: 130 },
  ];

  return (
    <div className="container mx-auto mt-20 h-screen">
      <div className="flex mx-auto h-4/6 ">
        <div className="flex-grow">
          <DataGrid
            rows={learnedWordsRows || []}
            columns={learnedWordsColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default UserLearnedWords;
