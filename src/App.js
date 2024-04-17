import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
