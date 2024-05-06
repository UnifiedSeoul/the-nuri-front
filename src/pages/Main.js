import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import { PostingBox, MapBox, ProfileBox, PostingBoxModal } from '../components/Boxes'
import { GetPosting } from '../services/api'
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const navigate = useNavigate();
  // 전체 공고 불러오기
  const [jobs, setJobs] = useState([]);
  const [jobsCnt, setJobsCnt] = useState(0);

  // 맞춤 공고와 인기 공고를 위한 데이터 배열
  const customJobPostings = Array(4).fill(null);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const getJobs = async () => {
    const response = await GetPosting(jobsCnt);
    if (response.result === "success") {
      setJobs([...jobs, ...response.return])
      setJobsCnt(jobsCnt + 1);
    }
    console.log(jobs);
  }


  const infiniteScroll = () => {
    const wrapper = document.querySelector('.all-job-posting-wrapper');
    if (!wrapper) return;

    const scrollPosition = wrapper.scrollTop;
    const totalHeight = wrapper.scrollHeight;
    const windowHeight = wrapper.clientHeight;
    console.log(scrollPosition, totalHeight, windowHeight);
    if (totalHeight - scrollPosition - windowHeight < 400) {
      setIsNearBottom(true);
    } else {
      setIsNearBottom(false);
    }
  };

  useEffect(() => {
    const wrapper = document.querySelector('.all-job-posting-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener('scroll', infiniteScroll);

    getJobs()
    return () => {
      wrapper.removeEventListener('scroll', infiniteScroll);
    };
  }, []);

  useEffect(() => {
    if (isNearBottom) {
      // 여기서 원하는 작업을 수행합니다.
      getJobs()
    }
  }, [isNearBottom]);



  // 모달 창
  const [modalOpen, isModalOpen] = useState({ open: false, index: -1 });

  const clickPost = (index) => {
    isModalOpen({ open: true, index: index })
    console.log(index);
  }

  // 항상 가운데
  useEffect(() => {
    // PostingBoxModal의 위치를 업데이트하는 함수
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
      const modalY = scrollY + centerY - modalHeight / 2;

      // 모달 위치 업데이트
      modal.style.left = modalX + 'px';
      modal.style.top = modalY + 'px';
    };

    // 스크롤 이벤트 핸들러 등록
    window.addEventListener('scroll', updateModalPosition);
    return () => {
      window.removeEventListener('scroll', updateModalPosition);
    }
  })









  return (
    <div className='main-wrapper'>
      <Header />
      <div className='main-container'>
        <PostingBoxModal modalOpen={modalOpen} jobs={jobs} />
        <ImageSlider />
        <section className='section-map-and-resume'>
          <MapBox navigate={navigate} />
          <ProfileBox />
        </section>

        <section className='section-custom-job-posting'>
          <h2>맞춤 공고</h2>
          <div className='job-posting-group-row'>
            {customJobPostings.map((_, index) => <PostingBox key={index} />)}
          </div>
        </section>

        <section className='section-all-job-posting'>
          <h2>전체 공고</h2>
          <div className='all-job-posting-wrapper'>
            {
              jobs.map((job, index) => <PostingBox title={job.recruitmentTitle
              } deadline={job.toAcceptanceDate} clickPost={() => clickPost(index)} />)
            }
          </div>

        </section>
      </div>
    </div>
  )
}

export default Main;
