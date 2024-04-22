import React from 'react'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import JobPosting from '../components/JobPosting'
const Main = () => {
  return (
    <div className='main-wrapper'>
      <Header />
      <div className='main-container'>
        <ImageSlider />
        <section className='custom-job-posting'>
          <h2>맞춤 공고</h2>
          <div className='job-posting-group-row'>
            <JobPosting />
            <JobPosting />
            <JobPosting />
            <JobPosting />
          </div>
        </section>

      </div>
    </div>
  )
}

export default Main