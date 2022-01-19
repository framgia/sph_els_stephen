import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const [cookies] = useCookies();
  let location = useLocation();

  if (!cookies.user.is_admin) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

interface Props {
  element: JSX.Element;
}

const AdminRoute = ({ element }: Props): JSX.Element => {
  return <RequireAdmin>{element}</RequireAdmin>;
};

export default AdminRoute;
