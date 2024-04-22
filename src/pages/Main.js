import React from 'react'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import { PostingBox, PostingInfoBox, MapBox, ProfileBox } from '../components/Boxes'


const Main = () => {
  // 맞춤 공고와 인기 공고를 위한 데이터 배열
  const customJobPostings = Array(4).fill(null);
  const popularJobPostings = Array(4).fill(null).map(() => ({
    postingInfo: <PostingInfoBox />,
    jobPostings: Array(4).fill(null).map(() => <PostingBox />)
  }));

  return (
    <div className='main-wrapper'>
      <Header />
      <div className='main-container'>
        <ImageSlider />
        <section className='map-and-resume'>
          <MapBox />
          <ProfileBox />
        </section>

        <section className='custom-job-posting'>
          <h2>맞춤 공고</h2>
          <div className='job-posting-group-row'>
            {customJobPostings.map((_, index) => <PostingBox key={index} />)}
          </div>
        </section>

        <section className='popular-job-posting'>
          <h2>인기 공고</h2>
          <div className='job-posting-group-wrapper'>
            {popularJobPostings.map((group, index) => (
              <div className='job-posting-group-col' key={index}>
                {group.postingInfo}
                {group.jobPostings.map((jobPosting, subIndex) => (
                  jobPosting
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Main;
