import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import { PostingBox, MapBox } from '../components/Boxes'
import PostingBoxModal from '../components/PostingBoxModal'
import { GetOnePosting, GetPosting, GetEduInfo, GetCustomJobs, CheckUser } from '../services/api'
import { useNavigate } from 'react-router-dom';
import Spinner from '../images/spinner.gif'
import EduSlider from '../components/EduSlider'
import Footer from '../components/Footer'


const Main = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  // 전체 공고 불러오기
  const [jobs, setJobs] = useState([]);
  const [jobsCnt, setJobsCnt] = useState(0);

  const [edus, setEuds] = useState([]);
  const [customJobs, setCustomJobs] = useState([]);

  const [isNearBottom, setIsNearBottom] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } else {
      console.log("에러!");
    }
  }

  const checkLoginStatus = async () => {
    const response = await CheckUser();
    if (response.result === "success") {
      setIsLogin(true);
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
    checkLoginStatus(); // 컴포넌트가 마운트될 때 한 번 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogin) { getCustomJobs() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])


  useEffect(() => {
    const wrapper = document.querySelector('.all-job-posting-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener('scroll', infiniteScroll);

    getJobs()
    getEdu()
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
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className='main-container'>
        <PostingBoxModal modalOpen={modalOpen} setModalOpen={setModalOpen} scrollPos={scrollPos} />
        <ImageSlider />
        <section className='section-map-and-resume'>
          <div className='map-box-wrapper'>
            <p className='map-box-subheader'>나의 위치와 가까운 일자리를 찾아 드려요 📌</p>
            <MapBox navigate={navigate} />
          </div>
          <div style={{ width: '400px', height: '100%' }}>
            <div className='edu-header'>
              <p>교육 안내</p>
            </div>
            {edus.length > 0 && (<EduSlider edus={edus} />)}
          </div>
        </section>

        <section className='section-custom-job-posting'>
          <div className='job-posting-header'>
            <p>맞춤 공고</p>
            <p className='job-posting-subheader'>더누리가 추천해 드려요 🍀</p>
          </div>
          <div className='job-posting-group-row'>
            {isLogin ? (isLoading ? (
              <div className='loading-wrapper'>
                <h3>잠시만 기다려 주세요.</h3>
                <img src={Spinner} alt="로딩" width="70%" />
              </div>
            ) : (
              // Render custom job postings
              customJobs.slice(0, 3).map((job) => (
                <PostingBox
                  title={job.recruitmentTitle}
                  startDate={job.fromAcceptanceDate}
                  deadline={job.toAcceptanceDate}
                  clickPost={() => clickPost(job.jobId)}
                />
              ))
            )) : (
              <div style={{
                width: '100%', height: '50px', color: 'rgb(255, 100, 100)',
                fontWeight: 'bold', marginTop: '20px', backgroundColor: 'whitesmoke', textAlign: 'center',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                로그인이 필요한 서비스입니다.
              </div>
            )}
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
      <Footer />
    </div>
  )
};

export default Main;
