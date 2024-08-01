import React, { useState } from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/gymbuddy-logo.png'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { IoMdExit } from "react-icons/io";

interface AuthPopupProps {
    setLoginPopup: React.Dispatch<React.SetStateAction<boolean>>; // type for the state setter function prop
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setLoginPopup }) => {
    const [showSignUp, setShowSignUp] = useState<boolean>(false)

    const handleLogin = () => {}
    const handleSignUp = () => {}

  return (
    <div className='auth'>
        {
            showSignUp ? (
                <div className='auth-form'>
                    <div className='logo'>
                        <Image src={logo} alt="App logo"/>
                    </div>
                    <div className='signup-details'>
                        <button className='close-button' onClick={() => {setLoginPopup(false)}}><IoMdExit/></button>
                        <h1>Sign Up</h1>
                        <form>
                            <Input color="success" placeholder="Email" size="md" variant="outlined"/>
                            <Input color="success" placeholder="Password" size="md" variant="outlined" type="password"/>
                        
                            <div className='left-right_inputs'>
                                <Input color="success" placeholder="Age" size="md" variant="outlined" type="number"/>
                                <Input color="success" placeholder="Weight" size="md" variant="outlined" type="number"/>
                            </div>

                            <span className='form-text'>Height</span>
                            <div className="left-right_inputs">
                                <Input color="success" placeholder="ft" size="md" variant="outlined" type="number"/>
                                <Input color="success" placeholder="in" size="md" variant="outlined" type="number"/>
                            </div>

                            <Select color="success" placeholder="Gender" variant="outlined" size="md">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="non-binary">Non-binary</Option>
                                <Option value="other">Other</Option>
                            </Select>

                            <button onClick={() => {handleSignUp()}}>Sign Up</button>
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
                        <button className='close-button' onClick={() => {setLoginPopup(false)}}><IoMdExit/></button>
                        <h1>Login</h1>
                        <form>
                            <Input color="success" placeholder="Email" size="md" variant="outlined"/>
                            <Input color="success" placeholder="Password" size="md" variant="outlined" type="password"/>
                            <button onClick={() => {handleLogin()}}>Login</button>
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