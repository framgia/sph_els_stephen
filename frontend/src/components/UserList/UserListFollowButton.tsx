import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { followUser } from '../../actions';

import { Chip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

interface Props {
  params: GridRenderCellParams;
  handleFollowClick: Function;
}

export const _UserListFollowButton = ({ params, handleFollowClick }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Chip
      label={params.row.following ? 'Unfollow' : 'Follow'}
      onClick={(e) => handleFollowClick(e, params)}
      color={params.row.following ? 'primary' : 'info'}
      variant={params.row.following ? 'filled' : 'outlined'}
    />
  );
};

const mapStateToProps = (state: StoreState) => ({});

export const UserListFollowButton = connect(
  mapStateToProps,
  {}
)(_UserListFollowButton);

export default UserListFollowButton;
