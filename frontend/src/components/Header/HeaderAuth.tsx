import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const HeaderAuth = () => {
  const [cookies, setCookies] = useCookies();

  if (!cookies.user) {
    return (
      <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <Link
          to="/signin"
          className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
        >
          Sign in
        </Link>
        <Link
          to="/signup"
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Sign up
        </Link>
      </div>
    );
  } else {
    return (
      <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <p className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
          Welcome Back
        </p>
      </div>
    );
  }
};

export default HeaderAuth;
