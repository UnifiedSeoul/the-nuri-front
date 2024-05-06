import React, { useEffect, useState, useRef } from 'react'

import MapImage from '../images/map_image.png'
import ProfileImage from '../images/profile_image.png'
import ResumeImage from '../images/resume.png'
import LatestPostsImage from '../images/latest_posts.png'
import { GetRoute } from '../services/api'


const PostingBox = ({ title, deadline, clickPost }) => {
  return (
    <div className='PostingBox-wrapper' onClick={clickPost}>
      <p>{title}</p>
      <p>{deadline}</p>
    </div>
  )
}


const PostingBoxModal = ({ modalOpen, jobs }) => {
  // const [positions, setPositions] = useState({
  //   startLatitude: null,
  //   startLongtitue: null,
  //   endLatitude: null,
  //   endLongtitue: null,
  // })
  // const [pathData, setPathData] = useState([]);
  // const mapRef = useRef(null);

  useEffect(() => {
    const drawLine = async (start, end, naver, map) => {

      console.log(start, end);
      const response = await GetRoute(start, end);
      if (response.result === "success") {
        console.log(response.return);
        // const path = response.return.route.trafast[0].guide.map((pos, index) => (
        //   new naver.maps.LatLng(response.return.route.trafast[0].path[pos.pointIndex][1], response.return.route.trafast[0].path[pos.pointIndex][0])
        // ));
        const path = response.return.route.trafast[0].path.map((pa) => (
          new naver.maps.LatLng(pa[1], pa[0])
        ));
        console.log(path);

        new naver.maps.Polyline({
          path: path,      //선 위치 변수배열
          strokeColor: '#FF0000', //선 색 빨강 #빨강,초록,파랑
          strokeOpacity: 0.8, //선 투명도 0 ~ 1
          strokeWeight: 6,   //선 두께
          map: map           //오버레이할 지도
        });



      } else {
        console.log("실패하였습니다");
      }
    }

    const naver = window.naver;
    const mapSelector = document.querySelector('.PostingBoxModal-map');
    if (modalOpen.open) {
      const map = new naver.maps.Map(mapSelector, {
        zoomControlOptions: {
          position: naver.maps.Position.TOP_LEFT
        }
      },);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const map_start = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
          const map_end = new naver.maps.LatLng(jobs[modalOpen.index].latitude, jobs[modalOpen.index].longitude);
          new naver.maps.Marker({
            position: map_start,
            map,
          });
          new naver.maps.Marker({
            position: map_end,
            map,
          })
          const center = new naver.maps.LatLng((Number(position.coords.latitude) + Number(jobs[modalOpen.index].latitude)) / 2, (Number(position.coords.longitude) + Number(jobs[modalOpen.index].longitude)) / 2)

          map.setCenter(center)

          const bounds = new naver.maps.LatLngBounds();
          bounds.extend(map_start);
          bounds.extend(map_end);
          map.fitBounds(bounds);

          const start = position.coords.longitude + ',' + position.coords.latitude;
          const end = jobs[modalOpen.index].longitude + ',' + jobs[modalOpen.index].latitude;
          console.log("start,end", start, end);

          drawLine(start, end, naver, map);

        })
      }
    } else {
      console.error("Map selector not found");
    }
  });

  return (
    <>
      {modalOpen.open &&
        <div className={`PostingBoxModal-wrapper ${modalOpen.open ? 'active' : ''}`}>
          <div className='PostingBoxModal-info-wrapper'>
            <h3 className='PostingBoxModal-info-company'>{jobs[modalOpen.index].companyName}</h3>
            <h1 className='PostingBoxModal-info-title'>{jobs[modalOpen.index].recruitmentTitle
            }</h1>
            <p className='PostingBoxModal-info-date'>
              {jobs[modalOpen.index].fromAcceptanceDate.substring(0, 4)}년
              {jobs[modalOpen.index].fromAcceptanceDate.substring(4, 6)}월
              {jobs[modalOpen.index].fromAcceptanceDate.substring(6, 8)}일 ~
              {jobs[modalOpen.index].toAcceptanceDate.substring(0, 4)}년
              {jobs[modalOpen.index].toAcceptanceDate.substring(4, 6)}월
              {jobs[modalOpen.index].toAcceptanceDate.substring(6, 8)}일
            </p>
            <div className='PostingBoxModal-info-count'>
              <p className='PostingBoxModal-info-retrieve'>공고 조회 0회</p>
              <p className='PostingBoxModal-info-visit'>홈페이지 방문 0회</p>
            </div>

            <div className='PostingBoxModal-info-table'>
              <div className='PostingBoxModal-info-table-inner'>
                <ul className='PostingBoxModal-info-table-col'>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      모집인원
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {jobs[modalOpen.index].recruitmentPersonNumbers}명
                    </div>
                  </li>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      담당자
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {jobs[modalOpen.index].companyStaffName}
                    </div>
                  </li>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      연락처
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {jobs[modalOpen.index].companyStaffContact}
                    </div>
                  </li>
                </ul>
                <ul className='PostingBoxModal-info-table-col'>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      지원방식
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {jobs[modalOpen.index].acceptanceMethodCode}
                    </div>
                  </li>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      참고사항
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      대기 중
                    </div>
                  </li>
                  <li className='PostingBoxModal-info-table-row'>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="PostingBoxModal-map-wrapper">

            <div class="PostingBoxModal-map">

            </div>
          </div>

        </div>
      }
    </>
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


export { PostingBox, PostingInfoBox, MapBox, ProfileBox, PostingBoxModal }