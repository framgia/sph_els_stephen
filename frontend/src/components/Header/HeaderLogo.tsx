import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <div className="flex lg:w-0 lg:flex-1">
      <Link to="/">
        <span className="sr-only">Workflow</span>
        <img
          className="h-8 w-auto sm:h-10"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt=""
        />
      </Link>
    </div>
  );
};

export default HeaderLogo;
