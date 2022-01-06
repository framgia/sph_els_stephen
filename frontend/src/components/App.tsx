import '../index.css';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Header from './Header';
import AdminQuiz, { AdminQuizForm, AdminQuizEditForm } from './AdminQuiz';
import AdminQuizItemForm from './AdminQuizItem/AdminQuizItemForm';
import AdminUser, { SampleUsers } from './AdminUser';
import { UserSignIn, UserSignUp } from './UserAuth';
import UserProfile from './UserProfile/UserProfile';
import UserQuizzes from './UserQuizzes/UserQuizzes';
import { useCookies } from 'react-cookie';

function Home() {
  return <h1 className="text-3xl font-bold underline">Home!</h1>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* #region Admin */}
            <Route path="/admin/quizzes" element={<AdminQuiz />} />
            <Route path="/admin/quizzes/create" element={<AdminQuizForm />} />
            <Route
              path="/admin/quizzes/:quiz_id/quiz_items/create"
              element={<AdminQuizItemForm />}
            />
            <Route
              path="/admin/quizzes/:id/edit"
              element={<AdminQuizEditForm />}
            />
            <Route path="/admin/users" element={<AdminUser />} />
            {/*#endregion*/}

            {/*#region Auth*/}
            <Route
              path="/signin"
              element={
                <RequireGuest>
                  <UserSignIn />
                </RequireGuest>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireGuest>
                  <UserSignUp />
                </RequireGuest>
              }
            />
            {/*#endregion*/}

            {/*#region User*/}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <UserProfile />
                </RequireAuth>
              }
            />
            <Route
              path="/quizzes"
              element={
                <RequireAuth>
                  <UserQuizzes />
                </RequireAuth>
              }
            />
            {/*#endregion*/}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

function RequireAuth({ children }: { children: JSX.Element }) {
  const [cookies, setCookies] = useCookies();
  let location = useLocation();

  if (!cookies.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

function RequireGuest({ children }: { children: JSX.Element }) {
  const [cookies, setCookies] = useCookies();
  let location = useLocation();

  if (cookies.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
