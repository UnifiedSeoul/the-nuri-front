import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Map from './pages/Map';


function App() {
  // 로그인 한 유저인지 확인

  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/" element={<Main isLogin={isLogin} setIsLogin={setIsLogin} />} />
        <Route path="/map" element={<Map isLogin={isLogin} setIsLogin={setIsLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;