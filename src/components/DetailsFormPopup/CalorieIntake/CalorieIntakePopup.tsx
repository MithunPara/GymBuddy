import React, { useState } from 'react'
import '../popup.css'
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Datepicker, DatepickerEvent} from "@meinefinsternis/react-horizontal-date-picker";
import { enCA } from "date-fns/locale";
import { MdDelete, MdClose } from "react-icons/md";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';

interface CalorieIntakePopupProps {
  setCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CalorieIntakePopupProps> = ({ setCalorieIntakePopup }) => {

  const addDays = (date: any, days: number) => {
    console.log(date, days, "original date");
    date.setDate(date.getDate() + days);
    console.log(date, "new date");
    return date;
  }

  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    // rangeDates: Date[] | null;
  }>({
    startValue: new Date(),
    endValue: addDays(new Date(), 100),
    // rangeDates: [],
  });

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue] = d;
    setDate((prev) => ({ ...prev, endValue, startValue }));
  };

  return (
    <div className='popup'>
      <div className='popup-form'>
        <button className='close' onClick={() => {setCalorieIntakePopup(false)}}>
          <MdClose />
        </button>
        <Datepicker
          onChange={handleChange}
          locale={enCA}
          startValue={date.startValue}
          endValue={date.endValue}
          // classNames={{ dayLabel: "hello" }}
        />

        <TextField id="outlined-basic" label="Food item" variant="outlined" color="success" />
        <TextField id="outlined-basic" label="Food item amount (g)" variant="outlined" color="success" />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DigitalClock 
            sx={{ // Override some of the styling options of the MUI DigitalClock component (different background colour and add rounded borders)
              '.Mui-selected': {
                backgroundColor: '#007500',
                color: 'white',
                borderRadius: '5px',
                '&:focus-visible, &:hover': {
                  backgroundColor: '#006000',
                  borderRadius: '5px',
                },
              },
            }} className='clock-style' value={value} onChange={(newValue) => setValue(newValue)}/>
        </LocalizationProvider> 

        <Button variant="contained" color="success">
          Save
        </Button>

        <div className='break-line'>
          <div className='daily-food-items'>
            <div className='food-item'>
              <h3>Chicken Breast</h3>
              <h3>150 g</h3>
              <button><MdDelete/></button>
            </div>
            <div className='food-item'>
              <h3>Avocado</h3>
              <h3>100 g</h3>
              <button><MdDelete/></button>
            </div>
            <div className='food-item'>
              <h3>White Rice</h3>
              <h3>110 g</h3>
              <button><MdDelete/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalorieIntakePopup