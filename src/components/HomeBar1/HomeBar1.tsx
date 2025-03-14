import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/joy'
import './HomeBar1.css'

const HomeBar1 = () => {

    const [progress, setProgress] = useState<any>(null)

    const getProgress = async () => {
        // let temp: any = [
        //     {
        //       "name": "Calories Intake",
        //       "value": 1000,
        //       "unit": "cal",
        //       "target": 2500,
        //       "targetUnit": "cal"
        //     },
        //     {
        //       "name": "Sleep",
        //       "value": 2,
        //       "unit": "hrs",
        //       "target": 8,
        //       "targetUnit": "hrs"
        //     },
        //     {
        //       "name": "Steps",
        //       "value": 100,
        //       "unit": "steps",
        //       "target": 10000,
        //       "targetUnit": "steps"
        //     },
        //     {
        //       "name": "Water",
        //       "value": 1000,
        //       "unit": "ml",
        //       "target": 3000,
        //       "targetUnit": "ml"
        //     },
        //     {
        //       "name": "Weight",
        //       "value": 80,
        //       "unit": "kg",
        //       "target": 70,
        //       "targetUnit": "kg"
        //     },
        //     {
        //       "name": "Workout",
        //       "value": 4,
        //       "unit": "days",
        //       "target": 6,
        //       "targetUnit": "days"
        //     }
        // ]
        // setProgress(temp)
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/datareport/getreport', {
          method: 'GET',
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.ok) {
            setProgress(data.data)
          } else {
            setProgress([])
          }
        }).catch(err => {
          console.log(err)
          setProgress([])
        })
    }

    useEffect(() => { // whenever this component is rendered, we want to get the updated data
        getProgress()
    }, [])

  return (
    <div className='trackers'>
        {
            progress?.length > 0 && progress.map((item: any, index: number) => { // optional chaining operator used here in case progress is null
                return (
                <div className='card' key={index}>
                    <div className='card-header'>
                        <div className='card-header-section'>
                            <div className='card-header-name'>{item.name}</div>
                            <div className='card-header-value'>{item.value} {item.unit}</div>
                        </div>
                        <div className='card-header-section'>
                            <div className='card-header-name'>Target</div>
                            <div className='card-header-value'>{item.target} {item.targetUnit}</div>
                        </div>
                    </div>
                    <CircularProgress color="neutral" determinate size="lg" variant="solid" value={Math.min((item.value / item.target) * 100, 100)}>
                      <span className='progress-text'>{(item.value / item.target) * 100} %</span>
                    </CircularProgress>
                    <button onClick={() => {
                      window.location.href = `/details/${item.name}`
                    }}>Show More</button>
                </div>
                )
            })
        }
    </div>
  )
}

export default HomeBar1