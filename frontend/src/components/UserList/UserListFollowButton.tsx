import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';

import { Chip, CircularProgress } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

interface Props {
  params: GridRenderCellParams;
  handleFollowClick: Function;
}

export const _UserListFollowButton = ({ params, handleFollowClick }: Props) => {
  const [loading, setLoading] = useState(false);

  const _handleFollowClick = (e: any, params: GridRenderCellParams) => {
    setLoading(true);
    handleFollowClick(e, params, () => {
      setLoading(false);
    });
  };

  return loading ? (
    <CircularProgress
      color={params.row.is_following ? 'secondary' : 'primary'}
    />
  ) : (
    <Chip
      label={params.row.is_following ? 'Unfollow' : 'Follow'}
      onClick={(e) => _handleFollowClick(e, params)}
      color={params.row.is_following ? 'primary' : 'info'}
      variant={params.row.is_following ? 'filled' : 'outlined'}
    />
  );
};

const mapStateToProps = (state: StoreState) => ({});

export const UserListFollowButton = connect(
  mapStateToProps,
  {}
)(_UserListFollowButton);

export default UserListFollowButton;
