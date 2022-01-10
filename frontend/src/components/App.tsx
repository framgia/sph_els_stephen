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
import AuthRoute from './AuthRoute';
import GuestRoute from './GuestRoute';
import UserProfileEdit from './UserProfile/UserProfileEdit';
import UserList from './UserList';

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
            {
              // #region Admin
            }
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
            {
              // #endregion
            }

            {
              // #region Auth
            }
            <Route
              path="/signin"
              element={<GuestRoute element={<UserSignIn />} />}
            />
            <Route
              path="/signup"
              element={<GuestRoute element={<UserSignUp />} />}
            />
            {
              // #endregion
            }

            {
              // #region User
            }
            <Route
              path="/users"
              element={<AuthRoute element={<UserList />} />}
            />
            <Route
              path="/users/:id"
              element={<AuthRoute element={<UserProfile />} />}
            />
            <Route
              path="/account/profile/edit"
              element={<AuthRoute element={<UserProfileEdit />} />}
            />
            <Route
              path="/quizzes"
              element={<AuthRoute element={<UserQuizzes />} />}
            />
            {
              // #endregion
            }
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
