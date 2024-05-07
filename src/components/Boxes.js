import React from 'react'

import MapImage from '../images/map_image.png'
import ProfileImage from '../images/profile_image.png'
import ResumeImage from '../images/resume.png'
import LatestPostsImage from '../images/latest_posts.png'



const PostingBox = ({ title, deadline, clickPost }) => {
  return (
    <div className='PostingBox-wrapper' onClick={clickPost}>
      <p>{title}</p>
      <p>{deadline}</p>
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


export { PostingBox, PostingInfoBox, MapBox, ProfileBox }