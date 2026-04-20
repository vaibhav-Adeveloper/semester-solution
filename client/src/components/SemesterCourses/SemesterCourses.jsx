import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SemesterCourses({semester, data}) {
  const userData = useSelector(state => state.auth.userData);
  const branch = userData.branch;

  // console.log("data is:", data);
  // fetching subject of semester, local fetching
  const subjects = data?.data?.filter((item) => item.semester === semester.split('-')[1])[0]?.subjects;
  // console.log("data.data is: ", subjects, subjects.length);
  return (
    <section class="text-gray-600 body-font">
  <div class="container mx-auto mb-3">
    <div class="flex flex-col text-center w-full mb-10">
      <h2 class="text-xl text-indigo-500 tracking-widest font-medium title-font mb-1">{semester} Resources</h2>
    </div>
    <div class="flex flex-wrap justify-between px-4 md:px-8 w-full gap-y-3">
      {/* <div class="xl:w-[22.5%] lg:w-1/2 md:w-full px-4 py-6 border border-gray-500 border-opacity-60 rounded-lg">
        <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
        <p class="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        <a class="text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div> */}

      {
        subjects?.map((item) => (
         <div key={item._id} class="xl:w-[22.5%] lg:w-[46%] md:w-full px-4 py-6 border border-gray-500 border-opacity-60 rounded-lg shadow-lg">
        <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{item.subject}</h2>
        <span><strong>Course Code : </strong>{item.code}</span>
        <p class="leading-relaxed text-base mb-4">You will find {item.subject} Resources of {semester} in this section</p>
        <Link to={`/student/${branch}/${semester}/${item.subject}`} class="text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
        ))
      }
    </div>
    {/* <button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button> */}
  </div>
</section>
  )
}

export default SemesterCourses
