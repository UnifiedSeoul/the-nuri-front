import React, { useEffect, useState } from 'react'
import { GetRoute } from '../services/api'

import { ModalExitButton, MoveHomepageButton } from './Button';
import { ChangeDateForPosting } from './DateFormatter';
import Spinner from '../images/spinner.gif'

const PostingBoxModal = ({ modalOpen, setModalOpen }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [dist, setDist] = useState("");
  const [tollFare, setTollFare] = useState("");
  const [taxiFare, setTaxiFare] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const drawLine = (path, map) => {


      // 선의 경계를 나타내는 Polyline
      new naver.maps.Polyline({
        path: path,
        strokeColor: 'black', // 경계 색상
        strokeOpacity: 1,
        strokeWeight: 7, // 더 두꺼운 선으로 경계 표시
        map: map,
        strokeLineJoin: 'round',
        strokeLineCap: 'round'
      });

      new naver.maps.Polyline({
        path: path,
        strokeColor: 'green', // 내부 색상
        strokeOpacity: 1,
        strokeWeight: 4, // 충분히 두꺼운 선
        map: map,
        strokeLineJoin: 'round',
        strokeLineCap: 'round'
      });
    }
    // 시간계산
    const calTime = (duration) => {
      const milliseconds = Number(duration);
      const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
      const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
      setHour(hours);
      setMinute(minutes);
    }

    const calDist = (distance) => {
      const distNum = Number(distance);

      if (distNum < 1000) {
        setDist(distNum + 'm');
      } else {
        const km = (distNum / 1000).toFixed(1);
        setDist(km + 'km');
      }
    }

    // 경로 데이터 가져오는 함수
    const getRouteData = async (naver, map, map_start, map_end, start, end, position) => {
      console.log(start, end);

      setIsLoading(true);
      const response = await GetRoute(start, end);
      if (response.result === "success") {
        // console.log(response.return);
        // const path = response.return.route.trafast[0].guide.map((pos, index) => (
        //   new naver.maps.LatLng(response.return.route.trafast[0].path[pos.pointIndex][1], response.return.route.trafast[0].path[pos.pointIndex][0])
        // ));
        const path = response.return.route.trafast[0].path.map((pa) => (
          new naver.maps.LatLng(pa[1], pa[0])
        ));

        drawLine(path, map);
        calTime(response.return.route.trafast[0].summary.duration);
        calDist(response.return.route.trafast[0].summary.distance);
        setTaxiFare(response.return.route.trafast[0].summary.taxiFare);
        setTollFare(response.return.route.trafast[0].summary.tollFare);
        setFuelPrice(response.return.route.trafast[0].summary.fuelPrice);


        new naver.maps.Marker({
          position: map_start,
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

        new naver.maps.Marker({
          position: map_end,
          map: map,
          icon: {
            content: [
              ` <img src="/images/business_marker.png" style="width: 40px; height: 40px;"/>`,
            ].join(''),
            size: new naver.maps.Size(40, 40),
            scaledSize: new naver.maps.Size(40, 40),
            origin: new naver.maps.Point(0, 0)
          }
        })
        const center = new naver.maps.LatLng((Number(position.coords.latitude) + Number(modalOpen.jobData.latitude)) / 2, (Number(position.coords.longitude) + Number(modalOpen.jobData.longitude)) / 2)

        map.setCenter(center)

        const bounds = new naver.maps.LatLngBounds();
        bounds.extend(map_start);
        bounds.extend(map_end);
        map.fitBounds(bounds);

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
          const map_end = new naver.maps.LatLng(modalOpen.jobData.latitude, modalOpen.jobData.longitude);
          const start = position.coords.longitude + ',' + position.coords.latitude;
          const end = modalOpen.jobData.longitude + ',' + modalOpen.jobData.latitude;


          getRouteData(naver, map, map_start, map_end, start, end, position);
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen.open, modalOpen.jobData]);

  // 모달 창 위치 계산
  useEffect(() => {
    const updateModalPosition = () => {
      const modal = document.querySelector('.PostingBoxModal-wrapper');
      if (!modal) return;

      // 화면의 가로 및 세로 중앙 좌표 계산
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // 모달의 너비와 높이
      const modalWidth = modal.offsetWidth;
      const modalHeight = modal.offsetHeight;

      // 스크롤된 양을 고려하여 모달의 새로운 위치 계산
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const modalX = scrollX + centerX - modalWidth / 2;
      const modalY = scrollY + centerY - modalHeight / 2 + 50;

      // 모달 위치 업데이트
      modal.style.left = modalX + 'px';
      modal.style.top = modalY + 'px';
    };
    if (modalOpen.open) {
      updateModalPosition();
    }
  }, [modalOpen.open])

  return (
    <>
      {modalOpen.open &&
        <div className={`PostingBoxModal-wrapper ${modalOpen.open ? 'active' : ''}`}>
          <ModalExitButton setModalOpen={setModalOpen} />
          <div className='PostingBoxModal-info-wrapper'>
            <h3 className='PostingBoxModal-info-company'>{modalOpen.jobData.companyName}</h3>
            <h1 className='PostingBoxModal-info-title'>{modalOpen.jobData.recruitmentTitle
            }</h1>
            <p className='PostingBoxModal-info-date'>
              {/* {modalOpen.jobData.fromAcceptanceDate.substring(0, 4)}년 
              {modalOpen.jobData.fromAcceptanceDate.substring(4, 6)}월
              {modalOpen.jobData.fromAcceptanceDate.substring(6, 8)}일 ~
              {modalOpen.jobData.toAcceptanceDate.substring(0, 4)}년
              {modalOpen.jobData.toAcceptanceDate.substring(4, 6)}월
              {modalOpen.jobData.toAcceptanceDate.substring(6, 8)}일 */}
              {ChangeDateForPosting(modalOpen.jobData.fromAcceptanceDate)} ~ {ChangeDateForPosting(modalOpen.jobData.toAcceptanceDate)}
            </p>
            <div className='PostingBoxModal-info-count'>
              <p className='PostingBoxModal-info-retrieve'>공고 조회 {modalOpen.jobData.viewCount}회</p>
              <p className='PostingBoxModal-info-visit'>홈페이지 방문 {modalOpen.jobData.homePageVisitCount
              }회</p>
            </div>

            <div className='PostingBoxModal-info-table'>
              <div className='PostingBoxModal-info-table-inner'>
                <ul className='PostingBoxModal-info-table-col right'>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      모집인원
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {modalOpen.jobData.recruitmentPersonNumbers}명
                    </div>
                  </li>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      담당자
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {modalOpen.jobData.companyStaffName}
                    </div>
                  </li>

                </ul>
                <ul className='PostingBoxModal-info-table-col'>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      지원방식
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {modalOpen.jobData.acceptanceMethodCode}
                    </div>
                  </li>
                  <li className='PostingBoxModal-info-table-row'>
                    <div className="PostingBoxModal-info-table-left">
                      연락처
                    </div>
                    <div className="PostingBoxModal-info-table-right">
                      {modalOpen.jobData.companyStaffContact}
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>

          <div className="PostingBoxModal-notes">
            <h1 className="PostingBoxModal-notes-title">우대 사항</h1>
            <div className="PostingBoxModal-notes-content-wrapper">
              <div className="PostingBoxModal-notes-content">
                {modalOpen.jobData.etcInfo}
              </div>
            </div>
          </div>

          <div className="PostingBoxModal-map-wrapper">
            <h1 className="PostingBoxModal-map-title">가는 길</h1>
            {/* {isLoading && <div className='loading-wrapper'>
                <h3>잠시만 기다려 주세요.</h3>
                <img src={Spinner} alt="로딩" width="70%" />
              </div>} */}
            <div className="PostingBoxModal-route-wrapper">
              <div className="PostingBoxModal-map" />
              <div className="PostingBoxModal-route-info">
                <div className="PostingBoxModal-route-info-time-duration">
                  <div className="PostingBoxModal-route-info-duration">
                    {hour !== 0 ? hour : null}
                    {hour !== 0 ? <span className="time">시간 </span> : null}
                    {minute}<span className="time">분</span>
                  </div>
                  <div className="PostingBoxModal-route-info-dist">{dist}</div>
                </div>

                <div className="PostingBoxModal-route-info-cost-wrapper">
                  <div className="PostingBoxModal-route-info-cost">유류비 : {fuelPrice.toLocaleString()}원</div>
                  <div className="PostingBoxModal-route-info-cost">통행 요금 : {tollFare.toLocaleString()}원</div>
                  <div className="PostingBoxModal-route-info-cost">택시 요금 : {taxiFare.toLocaleString()}원</div>
                </div>
              </div>
            </div>
          </div>
          <div className="PostingBoxModal-Button-wrapper">
            <MoveHomepageButton
              url={modalOpen.jobData.companyHomePageUrl} jobId={modalOpen.jobData.jobId} />
          </div>
        </div>
      }
    </>
  )
}

export default PostingBoxModal