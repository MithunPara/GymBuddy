"use client"
import React, { useState, useEffect } from 'react'
import './DetailsPage.css'
import CalorieIntakePopup from '@/components/DetailsFormPopup/CalorieIntake/CalorieIntakePopup'
import { LineChart } from '@mui/x-charts'
import { FaEdit } from "react-icons/fa";
import { usePathname } from 'next/navigation'

const page = () => {
    const pathName = usePathname()

    const chartParameters = {
        height: 300,
    }

    const [dataG1, setDataG1] = useState<any>(null)
    const [calorieIntakePopup, setCalorieIntakePopup] = useState<boolean>(false)

    const getDataG1 = async () => {
        let data = [
            {
                date: 'Thu May 11 2024 00:45:45 GMT-0400 (Eastern Daylight Time)',
                value: 2500,
                unit: 'cal'
            },
            {
                date: 'Wed May 10 2024 00:45:45 GMT-0400 (Eastern Daylight Time)',
                value: 2200,
                unit: 'cal'
            },
            {
                date: 'Tue May 09 2024 00:45:45 GMT-0400 (Eastern Daylight Time)',
                value: 2700,
                unit: 'cal'
            },
            {
                date: 'Mon May 08 2024 00:45:45 GMT-0400 (Eastern Daylight Time)',
                value: 3000,
                unit: 'cal'
            },
            {
                date: 'Sun May 07 2024 00:45:45 GMT-0400 (Eastern Daylight Time)',
                value: 2100,
                unit: 'cal'
            },
            {
                date: 'Sat May 06 2024 00:45:45 GMT-0400 (Eastern Daylight Time)',
                value: 2200,
                unit: 'cal'
            },
            {
                date: 'Fri May 05 2024 00:45:45 GMT-0400 (Eastern Daylight Time)',
                value: 2700,
                unit: 'cal'
            }
        ]

        let chartValues = data.map((item: any) => {
            let val = JSON.stringify(item.value) // must convert values to string to display using LineChart component
            return val
        })   

        let xAxisData = data.map((item: any) => {
            let val = new Date(item.date)
            return val
        })       

        setDataG1({
            title: 'Calorie Intake',
            data: chartValues,
            xAxis: {
                data: xAxisData,
                label: 'Last 10 Days',
                scaleType: 'time'
            }
        })

        console.log(dataG1);
    }

    useEffect(() => {
        getDataG1()
    }, [])

  return (
    <div className='details-page'>
        <div className="chart-section">
            {
                dataG1 && 
                <LineChart
                    xAxis={[{ 
                        id: 'Day',
                        data: dataG1.xAxis.data,
                        label: dataG1.xAxis.label,
                        scaleType: dataG1.xAxis.scaleType,
                        valueFormatter: (date: any) => {
                            return date.getDate().toString()
                        }
                    }]}
                    series={[
                        {
                            data: dataG1.data,
                            label: dataG1.title
                        },
                    ]}
                    {...chartParameters}
                />
            }
        </div>
        <div className="chart-section">
            {
                dataG1 && 
                <LineChart
                    xAxis={[{ 
                        id: 'Day',
                        data: dataG1.xAxis.data,
                        label: dataG1.xAxis.label,
                        scaleType: dataG1.xAxis.scaleType,
                        valueFormatter: (date: any) => {
                            return date.getDate().toString()
                        }
                    }]}
                    series={[
                        {
                            data: dataG1.data,
                            label: dataG1.title
                        },
                    ]}
                    {...chartParameters}
                />
            }
        </div>
        <div className="chart-section">
            {
                dataG1 && 
                <LineChart
                    xAxis={[{ 
                        id: 'Day',
                        data: dataG1.xAxis.data,
                        label: dataG1.xAxis.label,
                        scaleType: dataG1.xAxis.scaleType,
                        valueFormatter: (date: any) => {
                            return date.getDate().toString()
                        }
                    }]}
                    series={[
                        {
                            data: dataG1.data,
                            label: dataG1.title
                        },
                    ]}
                    {...chartParameters}
                />
            }
        </div>
        <div className="chart-section">
            {
                dataG1 && 
                <LineChart
                    xAxis={[{ 
                        id: 'Day',
                        data: dataG1.xAxis.data,
                        label: dataG1.xAxis.label,
                        scaleType: dataG1.xAxis.scaleType,
                        valueFormatter: (date: any) => {
                            return date.getDate().toString()
                        }
                    }]}
                    series={[
                        {
                            data: dataG1.data,
                            label: dataG1.title
                        },
                    ]}
                    {...chartParameters}
                />
            }
        </div>
        <button className='edit-button' onClick={() => {
            if (decodeURIComponent(pathName) == '/details/Calorie Intake') {
                setCalorieIntakePopup(true)
            }
        }}>
            <FaEdit />
        </button>

        {
            // display popup if edit button is pressed
            calorieIntakePopup && <CalorieIntakePopup setCalorieIntakePopup={setCalorieIntakePopup} /> 
        }
    </div>
  )
}

export default page