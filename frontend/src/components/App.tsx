import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Header';

function Home() {
  return <h1 className="text-3xl font-bold underline">Home!</h1>;
}
function Users() {
  return <h1 className="text-3xl font-bold underline">Users!</h1>;
}
function Quizzes() {
  return <h1 className="text-3xl font-bold underline">Quizzes!</h1>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/quizzes" element={<Quizzes />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
