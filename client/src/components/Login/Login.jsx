import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import openeye from "../../assets/openeye.svg";
import closeeye from "../../assets/closeeye.svg";
import { loginUser } from '../../features/authSlice.js';

function Login({isSigningUp, setIsSigningUp}) {

  const [loginFormData, setLoginFormData] = useState({
    email:"",
    password:""
  });

  function inputFromUser(e){
    setLoginFormData({
      ...loginFormData,
      [e.target.name] : e.target.value
    })
  }

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form handler started to execute");

    try {
      const user = await dispatch(loginUser(loginFormData)).unwrap();
      console.log(user);
      if(user.success === true){
        return <Navigate to={`/student/${user.data.branch}/1`} />
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="text-gray-600 body-font h-full">
  <div className="container shadow-2xl sm:px-5 md:py-18 sm:py-3 sm:mx-auto flex flex-wrap items-center justify-center h-full">
    <form className='w-full' onSubmit={handleSubmit}>
      <div className="sm:bg-gray-100 bg-none rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5 text-center">Login</h2>
      <div className="relative mb-4">
        <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input onChange={inputFromUser} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label for="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input onChange={inputFromUser} type={showPassword ? "text" : "password"} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        <button type='button' className='absolute right-5 top-10' onClick={() => setShowPassword(!showPassword)}> 
          <img src={showPassword ? closeeye : openeye} alt="eye_image" width={20} />
        </button>
      </div>
      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>

      <div className='md:hidden block mt-6'>
        <span>New to this Platform, <strong>Register</strong> 
        <button className='ml-2 text-black border border-black px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2'
                onClick={()=>setIsSigningUp(!isSigningUp)}>
                  {isSigningUp ? 'Login' : 'Sign-Up'}
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"          
                       stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
        </span>
      </div>
    </div>
    </form>
  </div>
</section>
  )
}

export default Login
