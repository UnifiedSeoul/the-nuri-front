import React from 'react'

import MapImage from '../images/map_image.png'
import ProfileImage from '../images/profile_image.png'
import ResumeImage from '../images/resume.png'
import LatestPostsImage from '../images/latest_posts.png'
import { Navigate } from 'react-router-dom'
import { ChangeDate, ChangeDateForPosting } from './DateFormatter'



const PostingBox = ({ title, startDate, deadline, clickPost }) => {
  return (
    <div className='PostingBox-wrapper' onClick={clickPost}>
      <p className='PostingBox-title'>{title}</p>
      <div className='PostingBox-content-wrapper'>
        <div className='PostingBox-content-date-header-wrapper'>
          <p className='PostingBox-content-date-header'>접수 기간</p>
        </div>
        <p className='PostingBox-content-date'>{ChangeDateForPosting(startDate)}~{ChangeDateForPosting(deadline)}</p>
      </div>
    </div>
  )
}

const PostingInfoBox = () => {
  return (
    <div className="PostingInfoBox-wrapper">posting Info</div>
  )
}

const MapBox = ({ navigate }) => {
  const handleMapClick = () => {
    navigate('/map');

  };

  return (
    <div className="MapBox-wrapper" onClick={handleMapClick}>
      <h2 className="Mapbox-text">지도를 사용해 공고찾기</h2>
      <img className="map-image" src={MapImage} alt="map_image" />
    </div>
  );
};


const ProfileBox = () => {
  return (
    <div className="ProfileBox-wrapper">
      <div className="ProfileBox-up-wrapper">
        <img src={ProfileImage} alt="profile_image" />
        <p>프로필 사진 수정</p>
      </div>
      <div className="ProfileBox-down-wrapper">
        <div className="ProfileBox-down-image-wrapper">
          <img className="ProfileBox-down-image" src={ResumeImage} alt="resume_image" />
          <p>이력서 관리</p>
        </div>
        <div className="ProfileBox-down-image-wrapper">
          <img className="ProfileBox-down-image" src={LatestPostsImage} alt="latest_posts_image" />
          <p>최근 본 공고</p>
        </div>
      </div>
    </div>
  )
}

const EduBox = ({title, startDate, endDate, link, registPeople, applyStartDate, applyEndDate}) => {
  const handlerEduClick = () => {
    window.open(link, "_blank")
  }

  return (
    <div className='EduBox-wrapper' onClick={handlerEduClick}>
      <p className='EduBox-header'>{title}</p>

      <div className='EduBox-content-wrapper'>
        <p className='EduBox-content-header'>교육 기간</p>
        <p className='EduBox-content'>{ChangeDate(startDate)} ~ {ChangeDate(endDate)}</p>
      </div>
      
      <div className='EduBox-content-wrapper'>
        <p className='EduBox-content-header'>모집 인원</p>
        <p className='EduBox-content'>{registPeople}명</p>
      </div>

      <div className='EduBox-content-wrapper'>
        <p className='EduBox-content-header'>접수 기간</p>
        <p className='EduBox-content'>{ChangeDate(applyStartDate)} ~ {ChangeDate(applyEndDate)}</p>
      </div>

    </div>
  )

}

export { PostingBox, PostingInfoBox, MapBox, ProfileBox, EduBox }