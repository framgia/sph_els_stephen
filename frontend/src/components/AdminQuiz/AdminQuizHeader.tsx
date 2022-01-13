import { TableHeaderColumn, TableHeaderColumnEmpty } from '../Table';

export const AdminQuizHeader = () => {
  return (
    <>
      <TableHeaderColumn label="Title" />
      <TableHeaderColumn label="Description" />
      <TableHeaderColumnEmpty label="actions" />
    </>
  );
};

export default AdminQuizHeader;
