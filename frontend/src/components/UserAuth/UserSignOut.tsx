import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { userSignOut } from '../../actions';
import { StoreState } from '../../reducers';

interface Props {
  userSignOut: Function;
}

export const _UserSignOut = ({ userSignOut }: Props) => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    let signOutData = {
      token: cookies.token,
      callback: () => {
        removeCookies('user', { path: '/' });
        removeCookies('token', { path: '/' });
        setOpen(false);
        navigate('/');
      },
    };

    userSignOut(signOutData);
  }, []);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const mapStateToProps = ({}: StoreState): {} => {
  return {};
};

export const UserSignOut = connect(mapStateToProps, { userSignOut })(
  _UserSignOut
);


export default UserSignOut;
