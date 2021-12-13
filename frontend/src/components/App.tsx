import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import AdminQuiz from './AdminQuiz/AdminQuiz';

function Home() {
  return <h1 className="text-3xl font-bold underline">Home!</h1>;
}
function Users() {
  return <h1 className="text-3xl font-bold underline">Users!</h1>;
}
function Quizzes() {
  return <h1 className="text-3xl font-bold underline">Quizzes!</h1>;
}

const records = [
  {
    id: 1,
    title: 'hellow',
    description: 'world',
  },
  {
    id: 2,
    title: 'hello1',
    description: 'world2',
  },
  {
    id: 3,
    title: 'hello3',
    description: 'world4',
  },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin/quizzes"
              element={<AdminQuiz records={records} />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/quizzes" element={<Quizzes />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
