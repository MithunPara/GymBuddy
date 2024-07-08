import React from 'react'
import logo from '@/assets/gymbuddy-logo.png'
import { FaUser } from "react-icons/fa";
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from 'swiper/modules';

const Navbar = () => {
  return (
    <nav>
        <Image src={logo} alt="App logo" />
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/profile'><FaUser/></Link>
        <button>Sign Out</button>
    </nav>
  )
}

export default Navbar