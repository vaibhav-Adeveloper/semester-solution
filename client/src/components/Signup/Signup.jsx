import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import openeye from "../../assets/openeye.svg";
import closeeye from "../../assets/closeeye.svg";
import { signUser } from '../../features/authSlice.js';

function Signup({isSigningUp, setIsSigningUp}) {

  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    branch: "CSE"
  })

  const [showPassword, setShowPassword] = useState(false);


  function inputFromUser(e){
    setFormData(prev => ({
     ...prev,
    [e.target.name]: e.target.value
  }));

    if(e.target.name === "password"){
      passwordManager(e);
    }
  }

  function passwordManager(e) {
  const password = e.target.value;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length >= 8 &&
    hasLower &&
    hasUpper &&
    hasNumber &&
    hasSpecial
  ) {
    setPasswordStrength("Strong");
  } 
  else if (
    password.length >= 6 &&
    (hasLower || hasUpper) &&
    hasNumber
  ) {
    setPasswordStrength("Medium");
  } 
  else {
    setPasswordStrength("Weak");
  }

  setShowPasswordStrength(true);
  if(password === "") setShowPasswordStrength(false);
}

  function emailManager(e){
    const email = e.target.value;
    const hasValidTail = /@gmail.com/.test(email);
    
  }

  async function handleSignUp(e){
    e.preventDefault();
    console.log("handle SignUp function get started from the signup.jsx");
    try {
      const response = await dispatch(signUser(formData)).unwrap();
      console.log("response from the signUp.jsx is :-", response);
      if(response.success === true){
        setIsSigningUp(!isSigningUp);
      }
    } catch (error) {
      console.log("Signup error:", error);
    }
  } 

  return (
    <section className="text-gray-600 body-font h-full">
  <div className="container shadow-2xl sm:px-5 md:py-18 sm:py-3 sm:mx-auto flex flex-wrap items-center justify-center h-full">
    <form className='w-full' onSubmit={handleSignUp}>
      
      <div className="sm:bg-gray-100 bg-none rounded-lg sm:p-8 p-6 flex flex-col w-full sm:mt-2 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font sm:mb-5 mb-3 text-center">Sign Up</h2>
      <div className="relative mb-4">
        <label for="fullname" className="leading-7 text-sm text-gray-600">Full Name</label>
        <input onChange={inputFromUser} placeholder='Enter your name' type="text" id="fullname" name="fullname" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input onChange={inputFromUser} placeholder='Enter your email' type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        {
          !validEmail && 
            <p className="text-sm mt-1">
          Invalid Email, must contain @gmail.com at end
        </p>
        }
      </div>
      <div className="relative mb-4">
        <label for="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input onChange={inputFromUser} placeholder='Enter your password' type={showPassword ? 'text' : 'password'} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        <button type='button' className='absolute right-5 top-10' onClick={() => setShowPassword(!showPassword)}> 
          <img src={showPassword ? closeeye : openeye} alt="eye_image" width={20} />
        </button>

        {
          showPasswordStrength &&
            <p className={`text-sm mt-1 ${
         passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-600" : "text-green-600"
        }`}>
          Password Strength: {passwordStrength}
        </p>
        }

      </div>
      <div className="relative mb-4 flex justify-between font-medium">
        <label for="email" className="leading-7 text-sm text-black">Choose your branch</label>
        {/* <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/> */}
        <select onChange={inputFromUser} name="branch" id="branchSelection" className='text-black font-medium'>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="ELEC">ELEC</option>  
          <option value="MECH">MECH</option>
          <option value="CHEM">CHEM</option>
          <option value="META">META</option>
        </select>
      </div>
      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type='submit'>Sign Up</button>

      <div className='md:hidden block mt-4'>
        <span className="">Already have an account, <strong>Please</strong> 
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

export default Signup
