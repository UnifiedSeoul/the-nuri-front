import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import { PostingBox, MapBox, ProfileBox, EduBox } from '../components/Boxes'
import PostingBoxModal from '../components/PostingBoxModal'
import { GetOnePosting, GetPosting, GetEduInfo, GetCustomJobs } from '../services/api'
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const navigate = useNavigate();
  // 전체 공고 불러오기
  const [jobs, setJobs] = useState([]);
  const [jobsCnt, setJobsCnt] = useState(0);

  const [edus, setEuds] = useState([]);
  const [customJobs, setCustomJobs] = useState([]);

  const [isNearBottom, setIsNearBottom] = useState(false);



  // 모달 창 띄울지 말지
  const [modalOpen, setModalOpen] = useState({ open: false, jobData: null });
  const [scrollPos, setScrollPos] = useState({ scrollX: null, scrollY: null })

  const getJobs = async () => {
    const response = await GetPosting(jobsCnt);
    if (response.result === "success") {
      setJobs([...jobs, ...response.return])
      setJobsCnt(jobsCnt + 1);
    } else {
      console.log("에러!");
    }
  }

  const getEdu = async () => {
    const response = await GetEduInfo();
    if (response.result === "success") {
      setEuds([...edus, ...response.return])
    } else {
      console.log("에러!");
    }
  }

  const getCustomJobs = async () => {
    const response = await GetCustomJobs();
    if (response.result === "success") {
      setCustomJobs([...customJobs, ...response.return])
    } else {
      console.log("에러!");
    }
  }

  // 무한 스크롤
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
    getEdu()
    getCustomJobs()
    return () => {
      wrapper.removeEventListener('scroll', infiniteScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isNearBottom) {
      // 여기서 원하는 작업을 수행합니다.
      getJobs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNearBottom]);





  // 클릭 시 모달 띄움
  const clickPost = async (jobId) => {
    const response = await GetOnePosting(jobId);
    if (response.result === "success") {
      console.log(response.return);
      setModalOpen({ open: true, jobData: response.return })
    } else {
      console.log("한 개의 공고를 가져오는데 실패하였습니다.");
    }
  }

  // 모달창 위치 가운데로
  useEffect(() => {
    // PostingBoxModal의 위치를 업데이트하는 함수
    const updateModalPosition = () => {
      setScrollPos({ scrollX: window.scrollX, scrollY: window.scrollY })
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
        <PostingBoxModal modalOpen={modalOpen} setModalOpen={setModalOpen} scrollPos={scrollPos} />
        <ImageSlider />
        <section className='section-map-and-resume'>
          <div className='map-box-wrapper'>
            {/* <p className='map-box-header'>지도를 사용해 공고 찾기</p> */}
            <p className='map-box-subheader'>나의 위치와 가까운 일자리를 찾아 드려요 📌</p>
            <MapBox navigate={navigate} />
          </div>
          {/* 교육 정보 임시 띄움 */}
          {edus[1] && (
            <div>
              <div className='edu-header'>
                <p>교육 안내</p>
              </div>
              <EduBox 
              title={edus[1].SUBJECT}
              startDate = {edus[1].STARTDATE} endDate = {edus[1].ENDDATE}
              link={edus[1].VIEWDETAIL}
              registPeople={edus[1].REGISTPEOPLE}
              applyStartDate={edus[1].APPLICATIONSTARTDATE}
              applyEndDate={edus[1].APPLICATIONENDDATE}/>
            </div>
          )}
        </section>

        <section className='section-custom-job-posting'>
          <div className='job-posting-header'>
            <p>맞춤 공고</p>
            <p className='job-posting-subheader'>더누리가 추천해 드려요 🍀</p>
          </div>
          <div className='job-posting-group-row'>
            {customJobs.map((job) => 
            {job && <PostingBox 
              title={job.recruitmentTitle} 
              deadline={job.toAcceptanceDate}
              clickPost={() => clickPost(job.jobId)} />})}
            </div>
        </section>

        <section className='section-all-job-posting'>
          <div className='job-posting-header'>
            <p>전체 공고</p>
          </div>
          <div className='all-job-posting-wrapper'>
            {
              jobs.map((job) => 
              <PostingBox 
              title={job.recruitmentTitle} 
              deadline={job.toAcceptanceDate}
              startDate={job.fromAcceptanceDate}
              clickPost={() => clickPost(job.jobId)} />)
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default Main;
