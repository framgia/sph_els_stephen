import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AdminUserHeader, AdminUserBody } from '.';
import { UsersData, fetchUsers } from '../../actions';
import { StoreState } from '../../reducers';
import Table from '../Table';

interface AdminUserProps {
  fetchUsers: Function;
  usersData: UsersData;
}

export const AdminUser = ({
  usersData,
  fetchUsers,
}: AdminUserProps): JSX.Element => {
  useEffect(() => {
    fetchUsers({});
  }, [fetchUsers]);

  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Users List</h1>
      <Table
        headers={<AdminUserHeader />}
        body={<AdminUserBody users={usersData.data} />}
      />
    </div>
  );
};

const mapStateToProps = ({
  usersData,
}: StoreState): { usersData: UsersData } => {
  return { usersData };
};

export default connect(mapStateToProps, { fetchUsers })(AdminUser);
