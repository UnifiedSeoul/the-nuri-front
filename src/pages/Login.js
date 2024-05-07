import React, { useState } from 'react'

import { LoginAPI } from '../services/api';
import { StoreTokenInCookie } from '../Auth/token';
import { useNavigate } from 'react-router-dom';
/* SVG */
import { ReactComponent as FullLogo } from '../images/the-nuri-full-logo.svg';
import Modal from 'react-modal'
import JoinModal from '../components/Modal';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      window.alert('아이디 또는 비밀번호를 확인하세요.')
      return;
    }
    const response = await LoginAPI(username, password);
    console.log(response);
    if (response.result === "success") {
      StoreTokenInCookie(response.return);
      navigate('/main');
    } else {
      window.alert('아이디 또는 비밀번호를 확인하세요.')
      return;
    }
  }

  const handleJoinModalOpen = () => {
    setJoinModalOpen(true);
  }

  const handleJoinModalClose = () => {
    setJoinModalOpen(false);
  }


  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <FullLogo style={{ width: '48%', height: '100px' }} />
        <input className="form-inputbox" type="text" value={username} onChange={handleUsernameChange} placeholder='아이디를 입력해 주세요' />
        <input className="form-inputbox" type="password" value={password} onChange={handlePasswordChange} placeholder='비밀번호를 입력해 주세요' />
        <button className="login-button" onClick={handleLogin} style={{marginTop: '30px'}}>로그인</button>
        <button className="join-button" onClick={handleJoinModalOpen}>회원가입</button>
        {joinModalOpen && (
          <Modal style={customStyles} isOpen={joinModalOpen}>
            <JoinModal onClose={handleJoinModalClose}/>
          </Modal>
        )}
        
      </div>
    </div>
  )
}

export default Login


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // 원하는 너비로 설정
    height: '600px', // 원하는 높이로 설정
    borderRadius: '10px',
    overflowY: 'auto'
  },
  overlay: {
    /* 모달 배경(오버레이)의 스타일을 정의합니다. */
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 검은색 배경
  },
};