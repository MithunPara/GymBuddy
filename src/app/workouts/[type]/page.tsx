"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const page = () => {
    const [workout, setWorkout] = useState<any>(null)

    const getWorkout = async () => {
        let data: any = {
            type: 'Chest',
            imageUrl: 'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            workoutDuration: 45,
            exercises: [
                {
                    exercise: 'Flat Barbell Bench Press',
                    demoUrl: 'https://gymvisual.com/img/p/3/3/8/9/5/33895.gif',
                    sets: 3,
                    reps: 6-8,
                    restPeriod: 120,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lobortis urna. Duis quis dui sagittis nisi malesuada rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id leo dolor.'
                },
                {
                    exercise: 'Incline Dumbbell Bench Press',
                    demoUrl: 'https://gymvisual.com/img/p/2/0/8/2/3/20823.gif',
                    sets: 2,
                    reps: 8-10,
                    restPeriod: 120,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lobortis urna. Duis quis dui sagittis nisi malesuada rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id leo dolor.'
                },
                {
                    exercise: 'Machine Seated Fly',
                    demoUrl: 'https://gymvisual.com/img/p/5/3/3/3/5333.gif',
                    sets: 3,
                    reps: 6-8,
                    restPeriod: 90,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lobortis urna. Duis quis dui sagittis nisi malesuada rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id leo dolor.'
                }
            ]
        }
        setWorkout(data)
    }

    useEffect(() => {
        getWorkout()
    }, [])

  return (
    <div>
        <h1 className='header1'>{workout?.type} Day</h1>
        <div className='workout-exercises'>
            {
                workout?.exercises && workout.exercises.map((item: any, index: number) => {
                    return (
                        // alternate the side of the page the exercises are displayed on 
                        <div className={
                            index % 2 == 0 ? 'workout-exercise' : 'workout-exercise-reverse' 
                        }>
                            {/* number the exercises */}
                            <h3>{index + 1}</h3> 
                            <div className='workout-exercise-image'>
                                <Image src={item.demoUrl} alt="Exercise demo" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default page