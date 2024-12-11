import React, { useState } from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/gymbuddy-logo.png'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { IoMdExit } from "react-icons/io";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { ToastContainer, toast } from 'react-toastify';
import { sign } from 'crypto';

interface AuthPopupProps {
    setLoginPopup: React.Dispatch<React.SetStateAction<boolean>>; // type for the state setter function prop
}

interface SignUpFormDetails {
    name: string | null,
    email: string | null,
    password: string | null,
    weight: number | null,
    height: number | null,
    gender: string | null,
    dob: Date | null,
    goal: string | null,
    activityLevel: string | null
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setLoginPopup }) => {
    const [showSignUp, setShowSignUp] = useState<boolean>(false)
    const [signUpDetails, setSignUpDetails] = useState<SignUpFormDetails>({
        name: '',
        email: '',
        password: '',
        weight: 0.0,
        height: 0.0,
        gender: '',
        dob: new Date(),
        goal: '',
        activityLevel: ''
    })
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });

    // Reference backend APIs below
    // router.post('/register', async (req, res, next) => {
    //     // Call the error middleware if the request cannot be handled successfully
    //     try {
    //         const { name, email, password, weight, height, gender, dob, goal, activityLevel } = req.body;
    //         const user = await User.findOne({ email: email }); // Query the database to check if the user already exists
    
    //         if (user) {
    //             // issue an error message if a user with the inputted email has been found
    //             return res.status(409).json(createResponse(false, 'User with this email already exists.'));
    //         }
    
    //         const newUser = new User({
    //             name,
    //             password,
    //             email,
    //             weight: [
    //                 {
    //                     weight: weight,
    //                     // add a unit field for weight
    //                     date: Date.now(),
    //                 }
    //             ],
    //             height: [
    //                 {
    //                     height: height,
    //                     date: Date.now(),
    //                 }
    //             ],
    //             gender, 
    //             dob,
    //             goal,
    //             activityLevel
    //         });
    //         await newUser.save(); // save the new user to database
    //         res.status(201).json(createResponse(true, 'User has registered successfully.')); // issue message once the new user has been successfully saved
    //     }
    //     catch (err) {
    //         next(err);
    //     }
    // });
    
    // router.post('/login', async (req, res, next) => {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await User.findOne({ email });
    //         if (!user) {
    //             // if a user with the inputted email/password cannot be found
    //             return res.status(400).json(createResponse(false, 'User with this email does not exist.'))
    //         }
    
    //         // must use bcrypt to compare passwords because password is encrypted in database
    //         const isMatch = await bcrypt.compare(password, user.password);
    
    //         if (!isMatch) {
    //             return res.status(400).json(createResponse(false, 'Incorrect password.'))
    //         }
    
    //         // if a user with the inputted details exists, generate an auth token and refresh token
    //         const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '60m' }); // Auth token is used to access resources within the webpage
    //         const refreshToken = jwt.sign({ userId: user._id}, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '120m' }); // Refresh token used to generate new auth and refresh tokens once a user's initial session has been completed to continue using the site
    
    //         // saving tokens in the cookies
    //         res.cookie('authToken', authToken, { httpOnly: true });
    //         res.cookie('refreshToken', refreshToken, { httpOnly: true });
    //         res.status(200).json(createResponse(true, 'Successfully logged in.', {
    //             authToken, // If the cookies are not working, send the tokens directly to the frontend as well
    //             refreshToken
    //         }));
    //     }
    //     catch (err) {
    //         next(err);
    //     }
    // });
    
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }
    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

  return (
    <div className='auth'>
        {
            showSignUp ? (
                <div className='auth-form'>
                    <div className='logo'>
                        <Image src={logo} alt="App logo"/>
                    </div>
                    <div className='signup-details'>
                        <div className='header-row'>
                            <h1>Sign Up</h1>
                            <button className='close-button' onClick={() => {setLoginPopup(false)}}><IoMdExit/></button>
                        </div>
                        <form>
                            <Input color="success" placeholder="Name" size="md" variant="outlined" 
                            onChange={(e) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    name: e.target.value
                                });
                            }}/>
                            <Input color="success" placeholder="Email" size="md" variant="outlined"
                            onChange={(e) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    email: e.target.value
                                });
                            }}/>
                            <Input color="success" placeholder="Password" size="md" variant="outlined" type="password"
                            onChange={(e) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    password: e.target.value
                                });
                            }}/>
                        
                            {/* <Input color="success" placeholder="Age" size="md" variant="outlined" type="number"
                                onChange={(e) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    dob: new Date(e.target.value)
                                });
                            }}/> */}
                            {/* <label htmlFor="">Date of Birth</label> */}
                            <span className='form-text'>Date of Birth</span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    defaultValue={dayjs(new Date())}
                                    onChange={(value) => {
                                        setSignUpDetails({
                                            ...signUpDetails,
                                            dob: new Date(value as any)
                                        });
                                    }}
                                    slotProps={{
                                        textField: {
                                            sx: {
                                                fontFamily: 'var(--joy-fontFamily-body, "Inter", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
                                                fontSize: 'var(--joy-fontSize-md, 1rem)',
                                                '& .MuiInputBase-root': {
                                                    borderRadius: '5px',
                                                    backgroundColor: 'white', 
                                                    color: '#2e7d32', 
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#2e7d32', 
                                                },
                                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#2e7d32', 
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: '10px',  
                                                },
                                                '& .MuiFormLabel-root': {
                                                    color: '#2e7d32', 
                                                },
                                                '& .MuiFormLabel-root.Mui-focused': {
                                                    color: '#2e7d32', 
                                                },
                                            },
                                            color: 'success',
                                            variant: 'outlined',
                                            size: 'medium', 
                                        },
                                    }}                            
                                />
                            </LocalizationProvider>

                            <span className='form-text'>Height</span>
                            <div className="left-right_inputs">
                                <Input color="success" placeholder="ft" size="md" variant="outlined" type="number"
                                onChange={(e) => {
                                    const feet = parseFloat(e.target.value);
                                    const currentInches = ((signUpDetails.height ?? 0) % 30.48) / 2.54;
                                    setSignUpDetails({
                                        ...signUpDetails,
                                        height: feet * 30.48 + currentInches * 2.54
                                    });
                                }}/>
                                <Input color="success" placeholder="in" size="md" variant="outlined" type="number"
                                onChange={(e) => {
                                    const inches = parseFloat(e.target.value);
                                    const currentFeet = Math.floor((signUpDetails.height ?? 0) / 30.48);
                                    setSignUpDetails({
                                        ...signUpDetails,
                                        height: currentFeet * 30.48 + inches * 2.54
                                    });
                                }}/>
                            </div>

                            <Input color="success" placeholder="Weight" size="md" variant="outlined" type="number"
                            onChange={(e) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    weight: parseFloat(e.target.value)
                                });
                            }}/>

                            <Select color="success" placeholder="Gender" variant="outlined" size="md"
                            onChange={(
                                e: React.SyntheticEvent | null,
                                selectedValue: string | null
                            ) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    gender: selectedValue?.toString() || '' // if there is a selected value, store it in activity level field, otherwise send empty string (to avoid null error)
                                });
                            }}>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="non-binary">Non-binary</Option>
                                <Option value="other">Other</Option>
                            </Select>

                            <Select color="success" placeholder="Goal" variant="outlined" size="md"
                            onChange={(
                                e: React.SyntheticEvent | null,
                                selectedValue: string | null
                            ) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    goal: selectedValue?.toString() || '' // if there is a selected value, store it in activity level field, otherwise send empty string (to avoid null error)
                                });
                            }}>
                                <Option value="weight-loss">Lose Weight</Option>
                                <Option value="maintain">Maintain Weight</Option>
                                <Option value="weight-gain">Gain Weight</Option>
                            </Select>

                            <Select color="success" placeholder="Activity Level" variant="outlined" size="md"
                            onChange={(
                                e: React.SyntheticEvent | null,
                                selectedValue: string | null
                            ) => {
                                setSignUpDetails({
                                    ...signUpDetails,
                                    activityLevel: selectedValue?.toString() || '' // if there is a selected value, store it in activity level field, otherwise send empty string (to avoid null error)
                                });
                            }}>
                                <Option value="sedentary">Sedentary</Option>
                                <Option value="light">Lightly Active</Option>
                                <Option value="moderate">Moderately Active</Option>
                                <Option value="very-active">Very Active</Option>
                            </Select>

                            <button onClick={(e) => {handleSignUp(e)}}>Sign Up</button>
                        </form>
                        <p>Already a member? <span className='underlined-text' onClick={() => {setShowSignUp(false)}}>Login</span></p>
                    </div>
                </div>
            ) : (
                <div className='auth-form'>
                    <div className='logo'>
                        <Image src={logo} alt="App logo"/>
                    </div>
                    <div className='signup-details'>
                        <div className='header-row'>
                            <h1>Login</h1>
                            <button className='close-button' onClick={() => {setLoginPopup(false)}}><IoMdExit/></button>
                        </div>
                        <form>
                            <Input color="success" placeholder="Email" size="md" variant="outlined"
                            onChange={(e) => {
                                setLoginDetails({
                                    ...loginDetails,
                                    email: e.target.value
                                });
                            }}/>
                            <Input color="success" placeholder="Password" size="md" variant="outlined" type="password"
                            onChange={(e) => {
                                setLoginDetails({
                                    ...loginDetails,
                                    password: e.target.value
                                });
                            }}/>
                            <button onClick={(e) => {handleLogin(e)}}>Login</button>
                        </form>
                        <p>Not a member yet? <span className='underlined-text' onClick={() => {setShowSignUp(true)}}>Sign Up</span></p>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AuthPopup