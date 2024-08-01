"use client"
import React, { useState } from 'react'
import logo from '@/assets/gymbuddy-logo.png'
import { FaUser } from "react-icons/fa";
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from 'swiper/modules';
import AuthPopup from '../AuthPopup/AuthPopup';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [loginPopup, setLoginPopup] = useState<boolean>(false)

  return (
    <nav>
        <Image src={logo} alt="App logo" />
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/profile'><FaUser/></Link>
        {
          loggedIn ? 
          <button>Sign Out</button>
          :
          <button onClick={() => setLoginPopup(true)}>Sign Up</button>
        }

        {
          loginPopup && <AuthPopup setLoginPopup={setLoginPopup}/>
        }
    </nav>
  )
}

export default Navbar