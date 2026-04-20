import React from 'react'
import { Link } from 'react-router-dom'

function SubjectResource({choosenSubjectResource}) {
    console.log("i am from subject rersource jsx: ", choosenSubjectResource);

    // const handlePreview = async(e) => {
    //   // console.log(e);
    //   console.log(e.target);
    //   try {
    //     const resObj = await fetch("http://localhost:2000/api/v1/student/showdocument/previewdocument", {
    //       method: "POST",
    //       headers: {"Content-Type":"application/json"},
    //       body: JSON.stringify({publicId: "PENDING_MESS_FEE_NOTICE.docx_j1oyym"}),
    //     })
    //     const filedata = await resObj.json();
    //     console.log(filedata);  
    //     // const fileurl = filedata.data;
    //     // console.log("FILE URL IS IN REWCT", fileurl);
    //     // window.open(fileurl, "_blank");

    //   } catch (error) {
    //     console.log("Error from handlePreview", error);
    //   }
    // }

  return (
    <div className='container w-screen flex flex-wrap justify-evenly items-center gap-2 py-8 mx-auto'> 
      { choosenSubjectResource.map((item) => (
        <div key={item._id} class="xl:w-[22.5%] lg:w-[32%] md:w-[40%] w-[80%] px-4 py-6 border border-gray-500 border-opacity-60 rounded-lg">
                <h2 class="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{item.contentType}</h2>
                <span><strong>FileName: </strong>{item.filename}</span>
                {/* <p class="leading-relaxed text-base mb-4">You will find {item.subject} Resources of {semester} in this section</p> */}
                <Link target='_blank' to={item.previewUrl} class="text-indigo-500 inline-flex items-center md:ml-0 ml-4">Preview
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path> 
                  </svg>
                </Link>
                <span className='mx-4'>
                  &#124;
                </span>
                <Link target='_blank' to={item.downloadUrl} class="text-indigo-500 inline-flex items-center">Download
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
      //   <div key={item._id} className='w-1/3 bg-blue-300 border border-gray-800 rounded-lg flex justify-between items-center
      //   py-2'>
      //   <div className='flex gap-x-4'>
      //       <span className='text-black text-2xl font-medium underline ml-5 inline-flex items-center'>
      //           {item.contentType}
      //       </span>
      //       <span className='text-black inline-flex items-center'>
      //           FileName: {item.filename}
      //       </span>
      //   </div>
      //   <div className='mr-10 flex justify-center items-center'>
      //       <Link target='_blank' to={item.previewUrl} className='text-blue-700 text-md font-medium underline'>
      //           Preview
      //       </Link>
      //       <span className='mx-4'>
      //           &#124;
      //       </span>
      //       <Link target='_blank' to={item.downloadUrl} className='text-blue-700 text-md font-medium underline'>
      //           Download
      //       </Link>
      //   </div>
      // </div>
        )) 
      }
    </div>
  )
}

export default SubjectResource