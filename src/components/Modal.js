import React, { useState } from 'react';
import { JoinAPI } from '../services/api';

const JoinModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [experiences, setExperiences] = useState([{ jobPlace: '', jobSpecific: '' }]);
    // 오류메세지 상태 저장
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    //유효성 검사
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8 || e.target.value.length > 20) {
            setPasswordMessage('8자 이상 20자 이하로 입력해주세요.');
            setIsPassword(false);
        }
        else {
            setPasswordMessage('안전한 비밀번호입니다.');
            setIsPassword(true);
        }
    }
    const handleConfirmPasswordChange = (e) => {
        const passwordConfirmCurrent = e.target.value;
        setConfirmPassword(e.target.value);
        if (passwordConfirmCurrent === password) {
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
            setIsPasswordConfirm(true);
        }
        else {
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
            setIsPasswordConfirm(false);
        }
    }
    const handleExperienceChange = (index, key, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][key] = value;
        setExperiences(updatedExperiences);
    };

    const addExperience = () => {
        if (experiences.length < 3) {
            setExperiences([...experiences, { jobPlace: '', jobSpecific: '' }]);
        }
    };

    const removeExperience = (index) => {
        const updatedExperiences = [...experiences];
        updatedExperiences.splice(index, 1);
        setExperiences(updatedExperiences);
    };

    const handleJoin = async() => {
        if (username.trim() === '' || password.trim() === '' || experiences.some(exp => exp.jobPlace.trim() === '' || exp.jobSpecific.trim() === '')) {
            // 경고 창을 띄웁니다.
            window.alert('모든 필드를 채워주세요.');
            return;
        }
        else if (password.length < 8 || password !== confirmPassword) {
            window.alert('비밀번호를 확인하세요.')
            return;
        }
        const response = await JoinAPI(username, password, experiences);
        if (response.result === 'success') {
            console.log(response);
            onClose();
        }
        else {
            window.alert('error: ' + response.result);
            console.log('error ' + response);
        }
    }


    return (
        <div style={{padding: '15px'}}>
            <div className='JoinModal-header'>회원가입</div>
            <div className='JoinModal-container'>
                <div className='join-form-wrapper'>
                    <div className='join-header'>아이디</div>
                    <input className="join-form-inputbox" type="text" value={username} onChange={handleUsernameChange} placeholder='아이디'/>

                    <div className='join-header'>비밀번호</div>
                    <input className="join-form-inputbox" type="password" value={password} onChange={handlePasswordChange} placeholder='8자 이상'/>
                    {password.length > 0 && (
                        <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                    )}

                    <div className='join-header'>비밀번호 확인</div>
                    <input className="join-form-inputbox" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='비밀번호 재입력'/>
                    {confirmPassword.length > 0 && (
                        <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                    )}
                </div>
                
                <div className='join-form-wrapper' style={{marginTop: '20px'}}>
                    <div style={{textAlign: 'center', marginTop: '30px'}}>
                        <h5 style={{fontWeight: 'bold', fontSize: '17px'}}>경력사항</h5>
                    </div>
                    {experiences.map((experience, index) => (
                        <div key={index}>
                            {index > 0 && index <= 2 && <hr/>}
                            <div className='join-header'>근무지</div>
                            <input className="join-form-inputbox" type="text" value={experience.jobPlace} onChange={(e) => handleExperienceChange(index, 'jobPlace', e.target.value)} placeholder='작성 예시) 더누리 중학교'/>
                            <div className='join-header'>상세 근무 내용</div>
                            <input className="join-form-inputbox" type="text" value={experience.jobSpecific} onChange={(e) => handleExperienceChange(index, 'jobSpecific', e.target.value)} placeholder='작성 예시) 학교 급식 도우미'/>
                            <div className='join-delete-btn-wrapper'>
                                {index > 0 && <button className='join-delete-button' onClick={() => removeExperience(index)}>삭제</button>}
                            </div>
                        </div>
                    ))}
                    {/* <div className='add-button-wrapper'>
                        <button className="add-button" onClick={addExperience} disabled={experiences.length >= 3}>추가</button>
                    </div> */}
                    <button className="add-button" onClick={addExperience} disabled={experiences.length >= 3}>⨁ 경력 추가</button>
                </div>
            </div>
            <div className='join-button-wrapper'>
                <button className='JoinModal-exit-button' onClick={onClose}>닫기</button>
                <button className="JoinModal-join-button" style={{cursor: 'pointer', fontFamily: 'MICEGothic Bold'}} onClick={handleJoin}>회원가입</button>
            </div>
        </div>
    );
};

export default JoinModal;
