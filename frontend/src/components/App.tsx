import '../index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import AdminQuiz, { AdminQuizForm, AdminQuizEditForm } from './AdminQuiz';
import AdminQuizItemForm from './AdminQuizItem/AdminQuizItemForm';
import AdminUser from './AdminUser';
import { UserSignIn, UserSignOut, UserSignUp } from './UserAuth';
import UserProfile, { UserProfileEdit } from './UserProfile';
import UserQuizzes from './UserQuizzes';
import AuthRoute from './AuthRoute';
import GuestRoute from './GuestRoute';
import UserList from './UserList';
import UserDashboard from './UserDashboard';
import UserQuizAnswer from './UserQuizAnswer';
import UserQuizResult from './UserQuizResult';

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
            <Route
              path="/signout"
              element={<AuthRoute element={<UserSignOut />} />}
            />
            {
              // #endregion
            }

            {
              // #region User
            }
            <Route
              path="/dashboard"
              element={<AuthRoute element={<UserDashboard />} />}
            />
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
            <Route
              path="/quizzes/:id"
              element={<AuthRoute element={<UserQuizAnswer />} />}
            />
            <Route
              path="/quizzes/:id/result"
              element={<AuthRoute element={<UserQuizResult />} />}
            />
            <Route
              path="/users"
              element={<AuthRoute element={<UserList />} />}
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
