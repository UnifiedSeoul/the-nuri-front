// import React, { useEffect, useState } from 'react'
// import { ReactComponent as CloseIcon } from '../images/close.svg';
// import { ModalExitButton, MoveHomepageButton } from './Button';

// const MapPostingModal = ({ modalOpen, setModalOpen }) => {
//   const [hour, setHour] = useState("1");
//   const [minute, setMinute] = useState("1");
//   const [dist, setDist] = useState("1");


//   useEffect(() => {
//     // 시간계산
//     const calTime = (duration) => {
//       const milliseconds = Number(duration);
//       const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
//       const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
//       setHour(hours);
//       setMinute(minutes);
//     }

//     const calDist = (distance) => {
//       const distNum = Number(distance);

//       if (distNum < 1000) {
//         setDist(distNum + 'm');
//       } else {
//         const km = (distNum / 1000).toFixed(1);
//         setDist(km + 'km');
//       }
//     }
//     console.log(modalOpen.jobData);
//     // calTime(modalOpen.jobData.summary.duration);
//     // calDist(modalOpen.jobData.summary.distance);
//     // setTaxiFare(modalOpen.jobData.summary.taxiFare);
//     // setTollFare(modalOpen.jobData.summary.tollFare);
//     // setFuelPrice(modalOpen.jobData.summary.fuelPrice);

//   }, [modalOpen])
//   return (
//     <div className="MapPostingModal-wrapper">
//       <ModalExitButton setModalOpen={setModalOpen} />
//       <div className='MapPostingModal-info-wrapper'>
//         <h3 className='MapPostingModal-info-company'>TEST</h3>
//         <h1 className='MapPostingModal-info-title'>TEST</h1>
//         <p className='MapPostingModal-info-date'>
//           {modalOpen.jobData.fromAcceptanceDate.substring(0, 4)}년
//           {modalOpen.jobData.fromAcceptanceDate.substring(4, 6)}월
//           {modalOpen.jobData.fromAcceptanceDate.substring(6, 8)}일 ~
//           {modalOpen.jobData.toAcceptanceDate.substring(0, 4)}년
//           {modalOpen.jobData.toAcceptanceDate.substring(4, 6)}월
//           {modalOpen.jobData.toAcceptanceDate.substring(6, 8)}일
//         </p>
//         <div className='MapPostingModal-info-count'>
//           <p className='MapPostingModal-info-retrieve'>공고 조회{modalOpen.jobData.viewCount}회</p>
//           <p className='MapPostingModal-info-visit'>홈페이지 방문{modalOpen.jobData.homePageVisitCount}회</p>
//         </div>

//         <div className='MapPostingModal-info-table'>
//           <div className='MapPostingModal-info-table-inner'>
//             <ul className='MapPostingModal-info-table-col right'>
//               <li className='MapPostingModal-info-table-row'>
//                 <div className="MapPostingModal-info-table-left">
//                   모집인원
//                 </div>
//                 <div className="MapPostingModal-info-table-right">
//                   {modalOpen.jobData.recruitmentPersonNumbers}명
//                 </div>
//               </li>
//               <li className='MapPostingModal-info-table-row'>
//                 <div className="MapPostingModal-info-table-left">
//                   담당자
//                 </div>
//                 <div className="MapPostingModal-info-table-right">
//                   {modalOpen.jobData.companyStaffName}
//                 </div>
//               </li>

//             </ul>
//             <ul className='MapPostingModal-info-table-col'>
//               <li className='MapPostingModal-info-table-row'>
//                 <div className="MapPostingModal-info-table-left">
//                   지원방식
//                 </div>
//                 <div className="MapPostingModal-info-table-right">
//                   {modalOpen.jobData.acceptanceMethodCode}
//                 </div>
//               </li>
//               <li className='MapPostingModal-info-table-row'>
//                 <div className="MapPostingModal-info-table-left">
//                   연락처
//                 </div>
//                 <div className="MapPostingModal-info-table-right">
//                   {modalOpen.jobData.companyStaffContact}
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="MapPostingModal-notes">
//         <h1 className="MapPostingModal-notes-title">우대 사항</h1>
//         <div className="MapPostingModal-notes-content">
//           {modalOpen.jobData.etcInfo}
//         </div>
//       </div>

//       <div className="MapPostingModal-route">
//         <h1 className="MapPostingModal-route-title">경로 정보</h1>
//         <div className="MapPostingModal-route-wrapper">

//           <div className="MapPostingModal-route-info-time-duration">
//             <div className="MapPostingModal-route-info-duration">
//               {hour !== 0 ? hour : null}
//               {hour !== 0 ? <span className="time">시간 </span> : null}
//               {minute}<span className="time">분</span>
//             </div>
//             <div className="MapPostingModal-route-info-dist">{dist}</div>
//           </div>

//           <div className="MapPostingModal-route-info-cost-wrapper">
//             <div className="MapPostingModal-route-info-cost-wrapper2">
//               <div className="MapPostingModal-route-info-cost">유류비 : {fuelPrice.toLocaleString()}원</div>
//               <div className="MapPostingModal-route-info-cost">통행 요금 : {tollFare.toLocaleString()}원</div>
//               <div className="MapPostingModal-route-info-cost">택시 요금 : {taxiFare.toLocaleString()}원</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MapPostingModal