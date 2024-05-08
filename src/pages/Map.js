import React, { useEffect, useState } from 'react';
import PostingBoxModal from '../components/PostingBoxModal';
import { GetPostingByDistance } from '../services/api'

const Map = () => {

  const [modalOpen, setModalOpen] = useState({ open: false, jobData: null });

  useEffect(() => {

    const clickMark = (index, naver, map, jobs, myLocation) => {
      setModalOpen({ open: true, jobData: jobs[index] });
    }


    const getJobs = async (myLocation, map, naver) => {
      const response = await GetPostingByDistance(myLocation.longitude, myLocation.latitude);
      if (response.result === "success") {

        response.return.map((job, index) => {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(job.latitude, job.longitude),
            map: map,
            icon: {
              content: [
                `<img src="/images/business_marker.png" style="width: 40px; height: 40px;"/>`,
              ].join(''),
              size: new naver.maps.Size(40, 40),
              scaledSize: new naver.maps.Size(40, 40),
              origin: new naver.maps.Point(0, 0)
            }
          });
          // 마커를 클릭할 때 이벤트를 처리하는 핸들러를 추가합니다.
          naver.maps.Event.addListener(marker, 'click', function () {
            // 클릭된 마커에 대한 이벤트 처리를 여기에 추가합니다.
            clickMark(index, naver, map, response.return, myLocation);
          });

          return marker; // 생성된 마커를 반환합니다.
        });

        // 만들어진 마커 배열을 저장한 변수를 사용하여 지도에 마커를 추가합니다.
      } else {
        console.log("에러!");
      }
    }

    // 지도 생성
    const { naver } = window;
    let myLocation = {};


    // 현재 위치 구하기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setMyLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // });
        myLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude, }


        const map_selector = document.querySelector('.Map-wrapper');
        const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const map = new naver.maps.Map(map_selector, {
          center: location,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_LEFT
          },
        });


        // 집 마커 생성
        new naver.maps.Marker({
          position: location,
          map: map,
          icon: {
            content: [
              ` <img src="/images/home_marker.png" style="width: 40px; height: 40px;"/>`,
            ].join(''),
            size: new naver.maps.Size(40, 40),
            scaledSize: new naver.maps.Size(40, 40),
            origin: new naver.maps.Point(0, 0)
          }
        });

        getJobs(myLocation, map, naver)
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  
  return (
    <>
      <div className="Map-wrapper" />
      {modalOpen.open && <PostingBoxModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </>);
}

export default Map;
