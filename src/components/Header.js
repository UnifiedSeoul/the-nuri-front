import React from 'react'
/* SVG */
import { ReactComponent as FullLogo } from '../images/the-nuri-full-logo.svg';
import { DeleteTokenFromCookie } from '../Auth/token';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const clickLogoutButton = () => {
    DeleteTokenFromCookie();
    window.alert("로그아웃 되었습니다.")
    setIsLogin(false);
  }

  const clickLogInButton = () => {
    navigate('/login');
  }

  const clickHomeButton = () => {
    navigate('/');
  }

  return (
    <div className='header-wrapper'>
      <FullLogo style={{ width: '178px', height: '60px', cursor: 'pointer' }} onClick={clickHomeButton} />
      {!isLogin && <button onClick={clickLogInButton} className="header-button">로그인</button>}
      {isLogin && <button onClick={clickLogoutButton} className="header-button">로그아웃</button>}

    </div>
  )
}

export default Header