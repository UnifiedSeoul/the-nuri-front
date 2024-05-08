import React from 'react'
import { ReactComponent as CloseIcon } from '../images/close.svg';
import { OpenHomepageAPI } from '../services/api';
const MoveHomepageButton = ({ url, jobId }) => {
  // const /job/{jobId}/homepage

  const clickButton = async (url, jobId) => {
    const response = await OpenHomepageAPI(jobId);
    if (response.result === "success") {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = "http://" + url;
      }
      window.open(url, "_blank");
    } else {
      console.log("홈페이지를 불러오는데 실패하였습니다.");
    }
  }

  return (
    <div className="MoveHomepageButton-wrapper">
      {url === null ? (
        <button className="MoveHomepageButton-false">홈페이지가 없습니다</button>
      ) : (
        <button className="MoveHomepageButton-true" onClick={() => clickButton(url, jobId)}>
          홈페이지 열기
        </button>
      )}
    </div>
  )
}

const ModalExitButton = ({ setModalOpen }) => {
  const closeModal = () => {
    setModalOpen({ modalOpen: false, jobData: null })
  }
  return (
    <CloseIcon className="exit-button" onClick={closeModal} />
  )
}

export { MoveHomepageButton, ModalExitButton }