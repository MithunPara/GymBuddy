import React, { useState } from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/gymbuddy-logo.png'
import Input from '@mui/joy/Input';


const AuthPopup = () => {
    const [showLogin, setShowLogin] = useState<boolean>(false)

    const handleLogin = () => {}
    const handleSignUp = () => {}

  return (
    <div className='auth'>
        {
            showLogin ? (
                <div className='signup-form'>
                <div className='logo'>
                    <Image src={logo} alt="App logo"/>
                </div>
                <div className='signup-details'>
                    <h1>Sign Up</h1>
                    <form>
                        <Input color="success" disabled={false} placeholder="Email" size="md" variant="outlined"/>
                        <Input color="success" disabled={false} placeholder="Password" size="md" variant="outlined"/>
                    </form>
                    <span>Not a member yet? <button onClick={() => {handleSignUp()}}>Sign Up</button></span>
                </div>
            </div>
            ) : (
                <div className='signup-form'>
                    <div className='logo'>
                        <Image src={logo} alt="App logo"/>
                    </div>
                    <div className='signup-details'>
                        <h1>Sign Up</h1>
                        <form>
                            <Input color="success" disabled={false} placeholder="Email" size="md" variant="outlined"/>
                            <Input color="success" disabled={false} placeholder="Password" size="md" variant="outlined"/>
                        </form>
                        <span>Not a member yet? <button onClick={() => {handleSignUp()}}>Sign Up</button></span>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AuthPopup