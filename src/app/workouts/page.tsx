"use client"
import React, { useState, useEffect } from 'react'
import './workouts.css'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const [workout, setWorkout] = useState<any>(null)
    const searchParams = useSearchParams();
    const routineid = searchParams.get('id');

    const getWorkout = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutroutines/routines/' + routineid, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                setWorkout(data.data);
            } else {
                setWorkout(null);
            }
        })
        .catch(err => {
            console.log(err);
            setWorkout(null);
        })
        // let data: any = {
        //     type: 'Chest',
        //     imageUrl: 'https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        //     workoutDuration: 45,
        //     exercises: [
        //         {
        //             exercise: 'Flat Barbell Bench Press',
        //             demoUrl: 'https://gymvisual.com/img/p/3/3/8/9/5/33895.gif',
        //             sets: 3,
        //             reps: '6-8',
        //             restPeriod: 120,
        //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lobortis urna. Duis quis dui sagittis nisi malesuada rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id leo dolor.'
        //         },
        //         {
        //             exercise: 'Incline Dumbbell Bench Press',
        //             demoUrl: 'https://gymvisual.com/img/p/2/0/8/2/3/20823.gif',
        //             sets: 2,
        //             reps: '8-10',
        //             restPeriod: 120,
        //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lobortis urna. Duis quis dui sagittis nisi malesuada rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id leo dolor.'
        //         },
        //         {
        //             exercise: 'Machine Seated Fly',
        //             demoUrl: 'https://gymvisual.com/img/p/5/3/3/3/5333.gif',
        //             sets: 3,
        //             reps: '6-8',
        //             restPeriod: 90,
        //             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lobortis urna. Duis quis dui sagittis nisi malesuada rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer id leo dolor.'
        //         }
        //     ]
        // }
        // setWorkout(data)
    }

    useEffect(() => {
        getWorkout();
    }, [])

  return (
    <>
    {
        workout &&
        <div className='workout'>
            <h1 className='header1'>{workout?.name} Day</h1>
            <div className='workout-exercises'>
                {
                    workout?.exercises && workout.exercises.map((item: any, index: number) => {
                        return (
                            // alternate the side of the page the exercises are displayed on 
                            <div className={
                                index % 2 == 0 ? 'workout-exercise' : 'workout-exercise workout-exercise-reverse' 
                            }>
                                {/* number the exercises */}
                                <h3>{index + 1}</h3> 
                                <div className='workout-exercise-image'>
                                    <img src={item.imageURL} alt="Exercise demo" />
                                </div>
                                <div className='workout-exercise-details'>
                                    <h2>{item.name}</h2>
                                    <span>{item.sets} Sets x {item.reps} reps</span>
                                    <p>{item.details}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    }
    </>
  )
}

export default page