import React from 'react'
/* SVG */
import { ReactComponent as FullLogo } from '../images/the-nuri-full-logo.svg';
import { ReactComponent as Logout } from '../images/logout.svg';
import { DeleteTokenFromCookie } from '../Auth/token';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const clickLogoutButton = () => {
    DeleteTokenFromCookie();
    navigate('/login');
  }

  const clickHomeButton = () => {
    navigate('/');
  }

  return (
    <div className='header-wrapper'>
      <FullLogo style={{ width: '178px', height: '60px' }} onClick={clickHomeButton} />
      <Logout onClick={clickLogoutButton} />
    </div>
  )
}

export default Header