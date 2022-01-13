import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const [cookies] = useCookies();
  let location = useLocation();

  if (!cookies.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

interface Props {
  element: JSX.Element;
}

const AuthRoute = ({ element }: Props): JSX.Element => {
  return <RequireAuth>{element}</RequireAuth>;
};

export default AuthRoute;
