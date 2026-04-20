import React from 'react'
import { Link } from 'react-router-dom'
import { SubjectResource } from '../components/index.js'
import { useSelector } from 'react-redux';
import { useGetBranchResourcesQuery } from '../services/getResourcesApi.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {LoadingScreen} from "../components/index.js";

function SubjectPage() {
  const {semester, subject} = useParams();
  const navigate = useNavigate();

  const userData = useSelector(state => state.auth.userData);
  const branch = userData.branch
  // Testing :- 
  // console.log("userData from the Redux store is :- ", userData);
  // console.log("Branch of the user is :- ", branch);

  const {data, isLoading, error} = useGetBranchResourcesQuery({
    branch: branch,
    semester: semester.split('-')[1]
  })

  // console.log("resources data is --> > ", data);
  // console.log("i am from subject Page jsx");
  // console.log("data from RTK Query is :", data);
  // console.log("Loading state of RTK Query is: ", isLoading);
  // console.log("error from RTK Query is :", error);

  // filtering data locally on the basis of subject choosen by the student
  const choosenSubjectResource = data?.data?.filter((item) => item.subject === subject);

  return (
    <section className='overflow-x-hidden'>
        {/* // Header */}
        <header className="text-gray-600 body-font sticky top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)]">
  <div className="container mx-auto flex flex-wrap p-5 flex-row items-center">
    <Link>
        <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center gap-2 bg-gray-300 border-2 py-2 px-3 focus:outline-none hover:bg-gray-400 rounded-lg text-base text-black mt-4 md:mt-0 border-black">
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1 rotate-180" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
      Go Back
        </button>
    </Link>
    <h1 className='text-black text-3xl ml-12 underline hover:text-indigo-500 md:mt-0 mt-4'>{subject}</h1>
  </div>
</header>

{/* subject resource section */}
  { isLoading && 
    <LoadingScreen message="Loading Resources..."/>
   }

    { (!isLoading && !error) && 
      <div className='pt-14 bg-gray-50'>
        <SubjectResource choosenSubjectResource={choosenSubjectResource} />
      </div>
    }
    </section>
  )
}

export default SubjectPage
