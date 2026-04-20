import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setIsHamburgerOpen } from '../../features/hamburgerMenuSlice.js';

function HamburgerMenu() {
  // const fullname = useSelector(state => state.userData.fullname);
  // console.log("Fullname of the User is :- ", fullname);
  const fullname = useSelector(state => state.auth.userData.fullname);
  console.log("UserData from the Hamburger Menu is :- ", fullname);

  const isHamburgerOpen = useSelector(state => state.hamburgerMenu.isHamburgerOpen);
  const dispatch = useDispatch();

  return (
    // Desktop View
    <div className='h-full bg-indigo-500 p-5'>
      <button onClick={() => dispatch(setIsHamburgerOpen(!isHamburgerOpen))} className='bg-gray-400 rounded-xl inline-flex p-2 mb-5 cursor-pointer'>
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-6 rotate-180" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
      </button>
      <div className="text-white font-semibold text-3xl mt-3">{fullname}</div>
      <nav className="mt-15">
          <ul className="space-y-5 text-white font-mono font-semibold text-lg cursor-pointer flex flex-col">
            <Link to='/student_profile' className='shadow-[5px_5px_30px_rgb(0,0,0,0.2)] px-3 py-1 border border-indigo-700'>Profile</Link>
            <Link className='shadow-[5px_5px_30px_rgb(0,0,0,0.2)] px-3 py-1 border border-indigo-700'>Tasks</Link>
            <Link to='/about_developer' className='shadow-[5px_5px_30px_rgb(0,0,0,0.2)] px-3 py-1 border border-indigo-700'>About Developer</Link>
            <Link to='/contact_developer' className='shadow-[5px_5px_30px_rgb(0,0,0,0.2)] px-3 py-1 border border-indigo-700'>Contact Developer</Link>
            <Link to='/feedback_page' className='shadow-[5px_5px_30px_rgb(0,0,0,0.2)] px-3 py-1 border border-indigo-700'>Give us Feedback</Link>
          </ul>
      </nav>
    </div>
  )
}

export default HamburgerMenu
// rgb(67, 45, 215)