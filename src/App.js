import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Map from './pages/Map';


function App() {
  // 로그인 한 유저인지 확인

  // const [isLogin, setIsLogin] = useState(false);

  // // 컴포넌트가 렌더링된 후에 호출되어 로그인 상태를 확인
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const response = await CheckUser();
  //     if (response.result === "success") {
  //       setIsLogin(true);
  //     } else {
  //       console.log("실패");
  //     }
  //   };
  //   checkLoginStatus(); // 컴포넌트가 마운트될 때 한 번 실행
  // }); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;