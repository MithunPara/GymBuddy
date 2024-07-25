import React, { useState } from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/gymbuddy-logo.png'
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';


const AuthPopup = () => {
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
                        <h1>Sign Up</h1>
                        <form>
                            <Input color="success" placeholder="Email" size="md" variant="outlined"/>
                            <Input color="success" placeholder="Password" size="md" variant="outlined" type="password"/>
                        
                            <div className='left-right_inputs'>
                                <Input color="success" placeholder="Age" size="md" variant="outlined" type="number"/>
                                <Input color="success" placeholder="Weight" size="md" variant="outlined" type="number"/>
                            </div>

                            <span>Height</span>
                            <div className="left-right_inputs">
                                <Input color="success" placeholder="ft" size="md" variant="outlined" type="number"/>
                                <Input color="success" placeholder="in" size="md" variant="outlined" type="number"/>
                            </div>

                            <Select color="success" placeholder="Gender" size="md">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="non-binary">Non-binary</Option>
                                <Option value="other">Other</Option>
                            </Select>

                            <button onClick={() => {handleSignUp()}}>Sign Up</button>
                        </form>
                        <span>Already a member? <span className='underlined-text' onClick={() => {setShowSignUp(false)}}>Login</span></span>
                    </div>
                </div>
            ) : (
                <div className='auth-form'>
                    <div className='logo'>
                        <Image src={logo} alt="App logo"/>
                    </div>
                    <div className='signup-details'>
                        <h1>Login</h1>
                        <form>
                            <Input color="success" placeholder="Email" size="md" variant="outlined"/>
                            <Input color="success" placeholder="Password" size="md" variant="outlined" type="password"/>
                            <button onClick={() => {handleLogin()}}>Login</button>
                        </form>
                        <span>Not a member yet? <span className='underlined-text' onClick={() => {setShowSignUp(true)}}>Sign Up</span></span>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AuthPopup