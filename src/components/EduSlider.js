import React, { useCallback, useEffect, useState } from 'react';
import { EduBox } from './Boxes';

const EduSlider = ({edus}) => {
    // const eduComponent = [
    //     {
    //         id: 0,
    //         content: edus[0]
    //     },
    //     {
    //         id: 1,
    //         content: edus[1]
    //     },
    //     {
    //         id: 2,
    //         content: edus[2]
    //     },
    // ];
    const [currentIdx, setCurrentIdx] = useState(0);
    const nextSlide = useCallback(() => {
        setCurrentIdx((preIdx) => (preIdx + 1) % edus.length);
    }, [edus.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIdx, nextSlide]);

    return (
        <div className="slider-container">
            {edus.map((edu, index) => (
                <div
                    key={index}
                    className={`slide ${index === currentIdx ? 'active' : ''}`}
                    style={{ display: index === currentIdx ? 'block' : 'none'}}
                > 
                    <EduBox
                        title={edu.SUBJECT}
                        startDate={edu.STARTDATE}
                        endDate={edu.ENDDATE}
                        link={edu.VIEWDETAIL}
                        registPeople={edu.REGISTPEOPLE}
                        applyStartDate={edu.APPLICATIONSTARTDATE}
                        applyEndDate={edu.APPLICATIONENDDATE}
                    />
                </div>
            ))}
        </div>
    );
};

export default EduSlider;
