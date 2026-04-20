import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import user from "../../assets/user.svg";
import arrow from "../../assets/downArrow.svg";
import { logoutUser } from '../../features/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { setIsHamburgerOpen } from '../../features/hamburgerMenuSlice.js';

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isHamburgerOpen = useSelector(state => state.hamburgerMenu.isHamburgerOpen);
  const [homeHamburgerOpen, setHomeHamburgerOpen] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  console.log("User is loged in or not ?", isAuthenticated);
  console.log("User data is availaible or not ?", userData);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    console.log("handleLogout started running from frontend :-");
    try {
      const response = await dispatch(logoutUser()).unwrap();
      if(response.statusCode === 201){
        navigate("/");
      }
    } catch (error) {
      console.log("Error from logout function of Frontend :-", error);
    }
  }

  return (
    <>
    <header className="text-gray-600 body-font sticky top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)]">
  <div className={`md:mx-auto flex flex-wrap p-3 md:p-5 md:flex-row items-center ${isAuthenticated && "md:justify-between"}`}>
    <Link to="/" className="flex title-font font-medium items-center text-gray-900 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <div className='md:inline-flex flex-col md:flex-row ml-2 hover:text-indigo-700 hover:scale-110'>
        <span className="text-xl">Semester-</span>
        <span className="text-xl">Solution</span>
      </div>
    </Link>
    {
    !isAuthenticated && 
    // Desktop view
    <>
    <nav className="md:ml-auto md:mr-auto md:flex flex-wrap items-center text-base justify-center hidden">
      <NavLink to="/" className={({isActive}) => `mr-5 text-xl font-medium hover:text-gray-900 hover:scale-110 ${isActive ? "text-indigo-600" : "text-gray-700"}`}>Home</NavLink>
      <NavLink to="/about" className={({isActive}) => `mr-5 text-xl font-medium hover:text-black hover:scale-110 ${isActive ? "text-indigo-600" : "text-gray-700"}`}>About</NavLink>
      <NavLink to="/contact" className={({isActive}) => `mr-5 text-xl font-medium hover:text-black hover:scale-110 ${isActive ? "text-indigo-600" : "text-gray-700"}`}>Contact</NavLink>
    </nav>

    {/* // Mobile View */}
     <button
      onClick={() => setHomeHamburgerOpen(true)}
      className="md:hidden ml-auto mr-4 text-indigo-600 text-3xl focus:outline-none"
    >
      ☰
    </button>
    </>
    }
    {
      !isAuthenticated ? 
      (<Link to="/student/auth">
        <button className="md:inline-flex items-center bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 hover:scale-110 rounded-lg text-base text-white mt-4 md:mt-0 font-medium hidden">Start Accessing Resources
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </Link>) 
    : 
    (<div className='inline-flex items-center ml-auto right-6 md:right-10'>
      <div className='inline-flex relative gap-2 justify-around'
      onClick={() => setIsProfileOpen(!isProfileOpen)}>
      <img src={user} alt="student" width={45}/>
      <img src={arrow} alt="arrow" width={35} className={`${isProfileOpen ? "rotate-180" : "rotate-0"}`}/>
      {/* // Custom Dropdown */}
      {
        isProfileOpen && 
        <div className='inline-flex flex-col absolute top-12 -left-1/2 bg-gray-200 border-2 space-y-2 px-4 py-4 rounded-lg'>
        <button onClick={() => dispatch(setIsHamburgerOpen(!isHamburgerOpen))} className='text-white font-medium text-lg bg-indigo-500 px-3 py-2 rounded-lg'>
          Dashboard
        </button>
        <button onClick={handleLogout} className='text-red-500 font-medium text-lg bg-indigo-300 px-3 py-2 rounded-lg'>
          Logout
        </button>
      </div>
      }
    </div>
    </div>)
    }
  </div>
</header>

{/* Mobile View */}

{/* Overlay */}
<div
  className={`fixed inset-0 w-full h-screen bg-black/40 backdrop-blur-xs z-40 transition-opacity duration-300 ${
  homeHamburgerOpen ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
  onClick={() => setHomeHamburgerOpen(false)}
/>

{/* Sliding Drawer */}
<div
  className={`fixed top-0 right-0 h-screen w-65 lg:w-75 bg-white shadow-2xl z-50 transform-gpu transition-all duration-300 ease-in-out delay-100 ${
    homeHamburgerOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col h-full p-6">
    
    {/* Close Button */}
    <button
      onClick={() => setHomeHamburgerOpen(false)}
      className="self-end text-2xl text-gray-800 font-bold mb-8"
    >
      ✕
    </button>

    {/* Navigation Links */}
    <nav className="flex flex-col gap-6 justify-center items-center text-lg font-medium text-gray-700">
      <NavLink
        to="/"
        onClick={() => setHomeHamburgerOpen(false)}
        className={({ isActive }) =>
          `transition-all duration-200 ${
            isActive ? "text-indigo-600" : "hover:text-indigo-600 text-black"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        onClick={() => setHomeHamburgerOpen(false)}
        className={({ isActive }) =>
          `transition-all duration-200 ${
            isActive ? "text-indigo-600" : "hover:text-indigo-600"
          }`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        onClick={() => setHomeHamburgerOpen(false)}
        className={({ isActive }) =>
          `transition-all duration-200 ${
            isActive ? "text-indigo-600" : "hover:text-indigo-600"
          }`
        }
      >
        Contact
      </NavLink>

      {/* Spacer */}
    {/* <div className="grow" /> */}

    {/* CTA Button */}
    <Link to="/student/auth" onClick={() => setHomeHamburgerOpen(false)}>
      <button className="bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-200 font-semibold shadow-md">
        Access Resources
      </button>
    </Link>

    </nav>

    
  </div>
</div>
  </>
  )
}

export default Header
