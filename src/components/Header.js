import React from 'react'
/* SVG */
import { ReactComponent as FullLogo } from '../images/the-nuri-full-logo.svg';
import { ReactComponent as Logout } from '../images/logout.svg';

const Header = () => {
  return (
    <div className='header-wrapper'>
      <FullLogo style={{ width: '178px', height: '60px' }} />
      <Logout />
    </div>
  )
}

export default Header