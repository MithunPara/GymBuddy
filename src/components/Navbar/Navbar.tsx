"use client"
import React, { useState, useEffect } from 'react'
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

  const checkLogin = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if (data.ok) {
            setLoggedIn(true);
        } 
        else {
            setLoggedIn(false);
        }
    }).catch(err => console.log(err));
  }

  const handleSignOut = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/signout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        setLoggedIn(false);
        window.location.reload();
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    checkLogin();
  }, [loginPopup])

  return (
    <nav>
        <Image src={logo} alt="App logo" />
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/profile'><FaUser/></Link>
        {
          loggedIn ? 
          <button onClick={handleSignOut}>Sign Out</button>
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