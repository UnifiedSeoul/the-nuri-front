import React, { useState } from 'react'

/* SVG */
import { ReactComponent as FullLogo } from '../images/the-nuri-full-logo.svg';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  // }



  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <FullLogo style={{ width: '250px', height: '100px' }} />
        <input className="form-inputbox" type="text" value={username} onChange={handleUsernameChange} placeholder='아이디' />
        <input className="form-inputbox" type="password" value={password} onChange={handlePasswordChange} placeholder='비밀번호' />
        <button className="login-button">로그인</button>
      </div>
    </div>
  )
}

export default Login
