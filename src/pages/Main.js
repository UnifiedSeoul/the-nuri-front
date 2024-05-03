import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import { PostingBox, MapBox, ProfileBox } from '../components/Boxes'
import { GetPosting } from '../services/api'
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsCnt, setJobsCnt] = useState(0);


  // 맞춤 공고와 인기 공고를 위한 데이터 배열
  const customJobPostings = Array(4).fill(null);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const navigate = useNavigate();



  const getJobs = async () => {
    const response = await GetPosting(jobsCnt);
    if (response.result === "success") {
      setJobs([...jobs, ...response.return])
      setJobsCnt(jobsCnt + 1);
    }
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






  return (
    <div className='main-wrapper'>
      <Header />
      <div className='main-container'>
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
              jobs.map((job) => <PostingBox title={job.recruitmentTitle
              } deadline={job.toAcceptanceDate} />)
            }
          </div>

        </section>
      </div>
    </div>
  )
}

export default Main;
