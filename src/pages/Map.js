import React, { useRef, useEffect, useState } from 'react';

const Map = () => {
  const [myLocation, setMyLocation] = useState({
    latitude: 37.541,
    longitude: 126.986
  });

  const mapRef = useRef(null); // map 객체를 저장할 ref

  useEffect(() => {
    // 현재 위치 구하기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        // 지도 생성
        const { naver } = window;
        const map_selector = document.querySelector('.Map-wrapper');
        const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const map = new naver.maps.Map(map_selector, {
          center: location,
          zoomControlOptions: {
            position: naver.maps.Position.TOP_LEFT
          },
        });

        mapRef.current = map; // map 객체를 ref에 저장

        // 마커 생성
        new naver.maps.Marker({
          position: location,
          map,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const naver = window.naver;
      const map = mapRef.current;

      const zoomControl = new naver.maps.ZoomControl();

      naver.maps.Event.once(map, 'init', function () {
        //customControl 객체 이용하기
        const locationBtnHtml = '<button class="curPosition-button" />';
        const customControl = new naver.maps.CustomControl(locationBtnHtml);
        console.log(naver.maps.Position.TOP_LEFT)

        zoomControl.setMap(map);
        customControl.setMap(map);
        console.log(naver.maps.Position.TOP_LEFT)


        naver.maps.Event.addDOMListener(customControl.getElement(), 'click', function () {
          map.setCenter(new naver.maps.LatLng(myLocation.latitude, myLocation.longitude));
        });
      });
    }
  }, [myLocation]);

  return <div className="Map-wrapper"></div>;
}

export default Map;
