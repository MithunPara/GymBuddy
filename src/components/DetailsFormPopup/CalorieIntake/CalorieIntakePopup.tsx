import React, { useState, useEffect, useCallback } from 'react'
import './popup.css'
import dayjs, { Dayjs } from 'dayjs';
import { TextField, Autocomplete, Modal, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Datepicker, DatepickerEvent } from "@meinefinsternis/react-horizontal-date-picker";
import { enCA } from "date-fns/locale";
import { MdDelete, MdClose } from "react-icons/md";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import macro from 'styled-jsx/macro';

interface CalorieIntakePopupProps {
  setCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FoodOption {
  fdcId: string,
  description: string,
  ingredients: string,
  dataType: string
}

const CalorieIntakePopup: React.FC<CalorieIntakePopupProps> = ({ setCalorieIntakePopup }) => {

  const addDays = (date: any, days: number) => {
    // console.log(date, days, "original date");
    date.setDate(date.getDate() + days);
    // console.log(date, "new date");
    return date;
  }

  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    // rangeDates: Date[] | null;
  }>({
    startValue: addDays(new Date(), -50),
    endValue: addDays(new Date(), 100),
    // rangeDates: [],
  });

  const [time, setTime] = useState<any>(dayjs(new Date()));
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [foodOptions, setFoodOptions] = useState<FoodOption[]>([])
  const [selectedFood, setSelectedFood] = useState<FoodOption | null>(null)
  const [macronutrients, setMacronutrients] = useState<any>(null);
  const [showNutrientsPopup, setShowNutrientsPopup] = useState<boolean>(false);
  const [calorieIntake, setCalorieIntake] = useState<any>({
    item: '',
    date: '',
    amount: '',
    amountType: 'g',
    fdcId: ''
  }); 
  const [items, setItems] = useState<any>([]);

  const fetchFoodOptions = async (query: string) => {
    if (query.length > 2) {
      // Clear the food options state variable to prevent any issues with storing previous search results
      setFoodOptions([]);

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/searchfood?query=' + encodeURIComponent(query), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setFoodOptions(data.data);
      } else {
        console.error('Error fetching food options:', response.statusText);
      }
    } else {
      setFoodOptions([]);
    }
  }

  // Debounce function, prevents the autocomplete component from displaying previous search results due to rapid input
  function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const debouncedFetchFoodOptions = useCallback(debounce(fetchFoodOptions, 300), []);

  const handleOpen = async (food: FoodOption | null) => {
    setSelectedFood(food);
    if (food && food.fdcId) {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getnutrients?fdcId=' + encodeURIComponent(food.fdcId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
  
      if (response.ok) {
        const data = await response.json();
        setMacronutrients(data.data);
        console.log(data);
        console.log(food.fdcId);
        setShowNutrientsPopup(true);
      } else {
        console.error('Error fetching nutrient details', response.statusText);
      }
    }
  }

  // Currently, this function is set up so only a start date value is stored to allow the user to select a specific date,
  // if I want to allow the user to select a date range, there should be some code to store the endValue field as well
  const handleChange = (d: DatepickerEvent) => {
    // const [startValue, endValue] = d;
    // setDate((prev) => ({ ...prev, endValue, startValue }));
    const [startValue] = d;
    setDate({ startValue, endValue: null })
  };

  const saveCalorieIntake = async () => {
      let formattedDate = date.startValue ? format(date.startValue, 'yyyy-MM-dd') : null;
      let formattedTime = time.format('HH:mm:ss');
      let formattedDateTime = formattedDate + ' ' + formattedTime;
      let finalDateTime = new Date(formattedDateTime);

      fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/addcalorieintake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          item: calorieIntake.item,
          date: finalDateTime,
          amount: calorieIntake.amount,
          amountType: calorieIntake.amountType,
          fdcId: calorieIntake.fdcId
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success('Food item has been logged successfully');
          getCalorieIntake();
        } else {
          toast.error('Error logging food item');
        }
      })
      .catch(err => {
        toast.error('Error logging food item');
        console.log(err);
      })
  }

  const getCalorieIntake = async () => {
    setItems([]);

    if (date.startValue) {
      fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebydate?date=' + encodeURIComponent(date.startValue.toString()), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          console.log(data.data)
          setItems(data.data)
        } else {
          toast.error('Error retrieving calorie intake')
        }
      })
      .catch(err => {
        toast.error('Error retrieving calorie intake')
        console.log(err);
      })
    }
  }
  
  const deleteCalorieIntake = async (item: any) => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/deletecalorieintake', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        item: item.item,
        date: item.date
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        toast.success('Calorie intake item deleted successfully');
        getCalorieIntake();
      } else {
        toast.error('Error deleting calorie intake item')
      }
    })
    .catch(err => {
      toast.error('Error deleting calorie intake item')
      console.log(err);
    })
  }

  useEffect(() => {
    getCalorieIntake();
  }, [date.startValue])
  // useEffect(() => {
  //   console.log('Updated food options:', foodOptions)
  // }, [foodOptions]);

  return (
    <div className='popup'>
      <div className='popup-form'>
        <button className='close' onClick={() => {setCalorieIntakePopup(false)}}>
          <MdClose />
        </button>
        <label>Select a date:</label>
        <p>Use the arrows to navigate through the dates and select the date you wish to log for. To select a new date, 
          deselect the current selected date.
        </p>
        <Datepicker
          onChange={handleChange}
          locale={enCA}
          startValue={date.startValue}
          endValue={date.endValue}
          startDate={addDays(new Date(), -50)}
          classNames={{ 
            selectedDay: 'custom-selected',
            dateLabel: 'custom-date-label',
            weekendItem: 'custom-weekend-item',
          }}
        />

        <Autocomplete 
          freeSolo
          options={foodOptions}
          getOptionLabel={(option) => typeof option === 'string' ? option :
          option.description}
          filterOptions={(x) => x}
          onInputChange={(event, newInputValue) => {
            debouncedFetchFoodOptions(newInputValue);
          }}
          onChange={(event, newValue) => {
            if (newValue && typeof newValue !== 'string') {
              handleOpen(newValue);
              setCalorieIntake({...calorieIntake, item: newValue.description, fdcId: newValue.fdcId});
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Food item" variant="outlined" color="success" />
          )}
        />
        {/* <TextField id="outlined-basic" label="Food item" variant="outlined" color="success" /> */}
        <TextField id="outlined-basic" label="Food item amount (g)" variant="outlined" color="success" 
          onChange={(e) => {
            setCalorieIntake({...calorieIntake, amount: e.target.value})
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DigitalClock 
            sx={{ // Override some of the styling options of the MUI DigitalClock component (different background colour and add rounded borders)
              '.Mui-selected': {
                backgroundColor: '#007500 !important', // adding the !important tag ensures that the initial default blue style is overridden
                color: 'white !important',
                borderRadius: '5px',
                '&:focus-visible, &:hover': {
                  backgroundColor: '#006000 !important',
                  borderRadius: '5px',
                },
              },
            }} className='clock-style' value={time} onChange={(newValue) => setTime(newValue)}/>
        </LocalizationProvider> 

        <Button variant="contained" color="success" onClick={saveCalorieIntake}>
          Save
        </Button>

        <div className='break-line'>
          <h3>Selected date food items:</h3>
          <div className='daily-food-items'>
            {
              items.map((item: any) => {
                return (
                  <div className='food-item'>
                    <h3>{item.item}</h3>
                    <h3>{item.amount} {item.amountType}</h3>
                    <button 
                      onClick={() => {
                        deleteCalorieIntake(item)
                      }}><MdDelete/></button>
                  </div>
                )
              })
            }
          </div>
          <div style={{ height: '20px' }}></div> {/* Spacer element to ensure spacing between bottom of form and food items */}
        </div>
      </div>

      <Modal open={showNutrientsPopup} onClose={() => setShowNutrientsPopup(false)}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: '500px', margin: 'auto', marginTop: '10%' }}>
          <h3 style={{ marginBottom: '16px' }}>{selectedFood?.description}</h3>
          {macronutrients && (
            <div style={{ marginBottom: '16px'}}>
              <p>Serving: 100g</p>
              {['Energy', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference'].map((nutrientName, index) => {
                let nutrient = macronutrients.find((n: any) => n.nutrient.name === nutrientName);

                // If there is no nutrient returned with the label 'Energy', check for another label to retrieve a calorie value
                if (nutrientName === 'Energy' && !nutrient) {
                  nutrient = macronutrients.find((n: any) => n.nutrient.name === 'Energy (Atwater Specific Factors)');
                }

                if (nutrient) {
                  if (nutrientName === 'Energy' || nutrientName === 'Energy (Atwater Specific Factors)') {
                    return <p key={index}>Calories: {nutrient.amount} cal</p>;
                  } else if (nutrientName === 'Protein') {
                    return <p key={index}>Protein: {nutrient.amount}g</p>;
                  } else if (nutrientName === 'Total lipid (fat)') {
                    return <p key={index}>Fat: {nutrient.amount}g</p>;
                  } else if (nutrientName === 'Carbohydrate, by difference') {
                    return <p key={index}>Carbs: {nutrient.amount}g</p>;
                  }
                }
                return null;
              })}
            </div>
          )}
          <Button variant='outlined' color='success' onClick={() => setShowNutrientsPopup(false)}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default CalorieIntakePopup