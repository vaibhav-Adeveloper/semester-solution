import React, { useState, useEffect } from 'react'
import { Signup, Login } from '../components/index.js'
import bg from "../assets/Login (1).svg";
import bg2 from "../assets/bg_2.svg";
import bg3 from "../assets/bg_3.svg";
import mobile_bg from "../assets/mobile_bg.svg";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { resetStatus } from '../features/authSlice.js';

function AuthPage() {
  const dispatch = useDispatch();

  const {status, message} = useSelector(state => state.auth);
  console.log("Status and message from authPage.jsx is: ", status, "  ", message);

  const [isSigningUp, setIsSigningUp] = useState(true);

  useEffect(() => {
    if(status === "signup_success"){
      toast.success(message);
      dispatch(resetStatus());
    };
    if(status === "error"){
      toast.error(message);
      dispatch(resetStatus());
    };
  }, [status]);

  return (
    <>
    <ToastContainer position="top-center" autoClose={1800}/>
    <section>
      {/* Desktop version */}
        <div className='w-screen h-screen overflow-hidden flex justify-between relative'>
           <div className={`rounded-xl shadow-2xl sm:rounded-none z-30 sm:z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-0 sm:static lg:w-1/3 sm:w-[45%] w-[80%] sm:mx-0 sm:my-0 sm:bg-gray-100 bg-gray-200/40 backdrop-blur-2xl ${isSigningUp ? 'opacity-100 transition-opacity duration-800 ease-in-out' : "opacity-0"}`}>
              <Signup isSigningUp={isSigningUp} setIsSigningUp={setIsSigningUp}/>
           </div>
           <div className={`rounded-xl shadow-2xl sm:rounded-none z-30 sm:z-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:translate-0  sm:static lg:w-1/3 sm:w-[45%] w-[80%] sm:mx-0 sm:my-0 sm:bg-gray-100 bg-gray-200/40 backdrop-blur-2xl ${isSigningUp ? 'opacity-0' : "opacity-100 transition-opacity duration-800 ease-in-out"}`}>
              <Login isSigningUp={isSigningUp} setIsSigningUp={setIsSigningUp}/>
           </div>
           <div className={`z-10 sm:z-0 lg:w-2/3 sm:w-[55%] w-full h-full sm:absolute overflow-hidden sm:block hidden ${isSigningUp ? 'right-0' : 'left-0'}`}>  
              <Link to="/">
                <button className="px-4 py-2 bg-gray-100 text-black font-semibold rounded-lg absolute top-7 left-16 inline-flex items-center justify-center gap-2">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"          
                       stroke-width="2" className="w-4 h-4 rotate-180" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  Home 
                </button>
              </Link>
              <p className='bg-gray-100 text-black absolute bottom-10 left-16 px-4 py-1.5 rounded-lg font-semibold hidden md:block'>
                {isSigningUp ? ( <span className="">Already have an account, <strong>Please</strong> </span>) : (<span>New to this Platform, <strong>Register</strong> </span>)}
                <button className='bg-indigo-500 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2'
                onClick={()=>setIsSigningUp(!isSigningUp)}>
                  {isSigningUp ? 'Login' : 'Sign-Up'}
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"          
                       stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </p>
              {/* For md and above */}
              <img src={bg} alt="background_image" className='hidden md:block w-full h-full object-cover lg:object-center sm:object-top-right'/>
              {/* For small screens sm to md range */}
              <img src={bg2} alt="background_image" className='hidden sm:block w-full h-full object-cover sm:object-top-right'/>
              {/* for small screen less than sm */}
              <img src={bg3} alt="background_image" className='block sm:hidden w-full h-full object-cover object-center'/>
           </div>

            {/* background image for mobile view */}
      <div className='block sm:hidden absolute inset-0'>
          <img src={mobile_bg} alt="backgound_image" className='w-full h-full object-cover object-center'/>
      </div>
        </div>
        {/* <button className='text-black' onClick={() => toast.success("Manual test")}>
  Test Toast
</button> */}

      {/* Mobile Version - covered above along with desktop view */}
          
    </section>
    </>
  )
}

export default AuthPage
// https://www.figma.com/design/0dAgqgjCIqjMgVUV7srASh/Student-Portal-Login--Community-?node-id=1-3&t=GdQuZ8MMXSHkxRLO-0
// <img src={bg} alt="" className='h-screen w-screen aspect-square object-contain ml-auto '/>