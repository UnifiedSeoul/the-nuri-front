import React, { useRef, useEffect } from 'react'

const Map = () => {
  const mapRef = useRef(null);
  const lat = 37.541;
  const lng = 126.986;

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17, // 지도 확대 정도
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, []);

  return (
    <div ref={mapRef} style={{ width: "500px", height: "500px" }}></div>
  )
}

export default Map;

