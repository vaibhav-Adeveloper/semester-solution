import React, {useEffect, useState} from 'react'
import {Header} from "../components/index.js"
import { SemesterCourses } from '../components/index.js'
import { HamburgerMenu } from '../components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBranchCoursesQuery } from '../services/getCoursesApi.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {LoadingScreen} from "../components/index.js";
import { resetStatus } from '../features/authSlice.js';

function BranchPage() {
  const dispatch = useDispatch();

  const isHamburgerOpen = useSelector(state => state.hamburgerMenu.isHamburgerOpen);
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const {status, message} = useSelector(state => state.auth);
  
  const [semester, setSemester] = useState("Semester-1");
  // console.log("semester is :", semester);

  const userData = useSelector(state => state.auth.userData);
  // console.log("user data is :", userData);
  // console.log("user semester is :", semester.split('-')[1]);

  // RTK QUERY
  const { data, isLoading, error } = useGetBranchCoursesQuery({
    branch: userData.branch,
  })

  console.log("data from RTK Query is :", data);
  console.log("Loading state of RTK Query is: ", isLoading);
  console.log("error from RTK Query is :", error);

  useEffect(() => {
    if(status === "login_success") toast.success(message);
    dispatch(resetStatus());
  }, [status]);

  return (
    <>
    <ToastContainer position="top-center" autoClose={1500}/>
    <section className='h-screen overflow-hidden'>
      <div className='flex h-full'>

      {/* Desktop View */}

        {/* left side */}
        <div className={`fixed top-0 left-0 h-full sm:w-64 w-45 ${isHamburgerOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}  transition-all duration-500 delay-50 ease-in-out`}>
          <HamburgerMenu/>
        </div>
        

        {/* right side */}
        <div className={`${isHamburgerOpen ? 'sm:pl-64 pl-45' : 'pl-0'} h-full w-full overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out delay-50`}>  
          {/* // Branch Header */}
      <Header/>
      {/* // select semester bar */}
      <section class="text-gray-600 body-font">
        <div class="container px-3 py-12 md:px-5 md:py-14 mx-auto">
          <div class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto bg-gray-200 py-2 px-4 
          rounded-lg shadow-lg">
            <h1 class="grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Select Your Semester :-</h1>
            <select name="semester" id="semester101" className='shrink-0 text-white bg-indigo-500 border-0 py-2 
            px-5 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg mt-10 sm:mt-0'
            onChange={(e) => setSemester(e.target.value)}>
              <option value="Semester-1" className='bg-indigo-500'>Semester-1</option>
              <option value="Semester-2" className='bg-indigo-500'>Semester-2</option>
              <option value="Semester-3" className='bg-indigo-500'>Semester-3</option>
              <option value="Semester-4" className='bg-indigo-500'>Semester-4</option>
              <option value="Semester-5" className='bg-indigo-500'>Semester-5</option>
              <option value="Semester-6" className='bg-indigo-500'>Semester-6</option>
              <option value="Semester-7" className='bg-indigo-500'>Semester-7</option>
              <option value="Semester-8" className='bg-indigo-500'>Semester-8</option>
            </select>
          </div>
        </div>
      </section>
      {/* // Semester Courses */}
      { isLoading && 
        (<LoadingScreen message="Loading Courses..."/>)
      }
      { error && 
        (<h2>Error Fetching courses</h2>)  
      }
      { (!isLoading && !error) && 
        (<SemesterCourses semester={semester} data={data}/>)
      }
        </div>
      </div>
    </section>
     </>
  )
}

export default BranchPage
