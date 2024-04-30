import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import { PostingBox, MapBox, ProfileBox } from '../components/Boxes'
import { AllPosting } from '../services/api'


const Main = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 코드 작성
    const getJobs = async () => {
      const response = await AllPosting();
      if (response.result === "success") {
        console.log(response.return);
        setJobs(response.return);
        // console.log(jobs);
      } else {

      }


    }

    getJobs();

  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 의존성 배열을 비워둠

  // 맞춤 공고와 인기 공고를 위한 데이터 배열
  const customJobPostings = Array(4).fill(null);




  return (
    <div className='main-wrapper'>
      <Header />
      <div className='main-container'>
        <ImageSlider />
        <section className='section-map-and-resume'>
          <MapBox />
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
              } deadline={job.acceptance.toAcceptanceDate} />)
              // jobs.map((job) => console.log(job))
              // deadline={job.acceptance.toAcceptanceDate} 
            }
          </div>

        </section>
      </div>
    </div>
  )
}

export default Main;
