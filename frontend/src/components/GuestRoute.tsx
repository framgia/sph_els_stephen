import { useCookies } from 'react-cookie';
import { Navigate, Route, RouteProps, useLocation } from 'react-router-dom';

export function RequireGuest({ children }: { children: JSX.Element }) {
  const [cookies, setCookies] = useCookies();
  let location = useLocation();

  if (cookies.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

interface Props {
  element: JSX.Element;
}

const GuestRoute = ({ element }: Props): JSX.Element => {
  return <RequireGuest>{element}</RequireGuest>;
};

export default GuestRoute;
