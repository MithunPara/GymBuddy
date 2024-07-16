import React, { useState, useEffect } from 'react'
import './HomeBar2.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const HomeBar2 = () => {
    const [routines, setRoutines] = useState<any[] | null>(null) // routine can be an array made up of any data type, it can be null as well

    const getRoutines = async () => {
        let data: any = [
            {
                type: 'Chest',
                imageUrl: 'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                workoutDuration: 45
            },
            {
                type: 'Back',
                imageUrl: 'https://images.pexels.com/photos/1865131/pexels-photo-1865131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                workoutDuration: 60
            },
            {
                type: 'Abs',
                imageUrl: 'https://images.pexels.com/photos/12895269/pexels-photo-12895269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                workoutDuration: 30
            },
            {
                type: 'Shoulders',
                imageUrl: 'https://images.pexels.com/photos/6550853/pexels-photo-6550853.jpeg?auto=compress&cs=tinysrgb&w=400',
                workoutDuration: 30
            },
            {
                type: 'Arms',
                imageUrl: 'https://images.pexels.com/photos/6550871/pexels-photo-6550871.jpeg?auto=compress&cs=tinysrgb&w=400',
                workoutDuration: 30
            }
        ]  
        setRoutines(data)
    }

    useEffect(() => {
        getRoutines()
    }, []) 

  return (
    <div>
        <h1 className='header1'>Routines</h1>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
        clickable: true,
        }}
        breakpoints={{
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 50,
        },
        }}
        modules={[Pagination]}
        className="mySwiper"
        >
        {
            routines && routines.map((item: any, index: number) => {
                return (
                    <SwiperSlide key={index}>
                        <div className='swiper-slide' style={{ backgroundImage: `url(${item.imageUrl})` }}
                        onClick={() => { window.location.href = `/workouts/${item.type}` }}>
                            <div className='swiper-slide-body'>
                                <h2>{item.type}</h2>
                                <span>{item.workoutDuration} minutes</span>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })
        }
        </Swiper>
    </div>
  )
}

export default HomeBar2