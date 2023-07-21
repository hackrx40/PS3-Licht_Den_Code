import React from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {useEffect,useState,useRef} from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Navbar from '../components/Navbar'
import ReCAPTCHA from 'react-google-recaptcha';
import Webcam from "react-webcam";
import axios from 'axios'
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const videoConstraints = {
  width: 100,
  height: 100,
  facingMode: "user",
  mirrored:'False'
};
const Login = () => {

  const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  let flag=false

  const [file, setFile] = useState('');
  const webcamRef = React.useRef(null);

  const handleFileChange = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Create a blob from the base64-encoded data
    const blob = await (await fetch(imageSrc)).blob();
    // Create a File object from the blob
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    setFile(file);
  };
    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(password)
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('https://2c37-103-149-94-242.ngrok-free.app/auth/login',formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
          email: email,
          password: password,
        }
      });
      
      console.log(res);
     
      if (res.status === 200) {
        flag=true
        localStorage.setItem('flag', flag);
        console.log(flag);
        navigate('/dashboard');
      }
      
      else{
        console.log('wrong pass')
      }
    };






//THE CAPTCHA PART
const key="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
const [captchaIsDone,setCaptchaDone]=useState(false);
function onChange()
{
    console.log('changed')
    setCaptchaDone(true)
}

  return (
    <div className='p-20 bg-gray-900'>
        <div className="flex flex-col items-center mx-auto justify-center h-screen bg-gray-900 text-black overflow-y-auto">
        <Navbar/>
        <div className='absolute '>
        <div className="text-3xl font-bold mb-4 mt-6 text-white flex justify-center items-center">
          <Typewriter
            words={['Login']}
            cursor
            cursorStyle='_'
            loop ={0}
          />
        </div>
        <form onSubmit={handleSubmit} className="w-96">
          <div className="mb-4">
            <label htmlFor="email" className="flex mb-2 font-bold text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-400 p-2 w-full rounded-lg bg-blue-200 placeholder-black text-black"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="flex  mb-2 font-bold text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-400 p-2 w-full rounded-lg bg-blue-200 placeholder-black text-black "
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <Home/> */}
          <div className="home-container flex items-center mx-auto col-md-6">
             <div className="container flex items-center justify-center ">
                 <div className="text-white items-center flex flex-col justify-center">
                     <h1 className='mb-3 text-lg'>Please take an image of your face</h1>
                     <form className="form">

                  <div className="webcam-container">
             <div className="webcam-img flex justify-center">

                 {file === '' ? <Webcam
                     audio={false}
                     height={200}
                     ref={webcamRef}
                     screenshotFormat="image/jpeg"
                     width={220}
                     mirrored='true'
                     videoConstraints={videoConstraints}
                 /> : <img src={file} />}
             </div>
             <div className='justify-center flex items-center'>
                 {file !== '' ?
                     <button onClick={(e) => {
                         e.preventDefault();
                         setFile('')
                     }}
                         className="webcam-btn btn m-3 text-white hover:bg-blue-800 bg-blue-600 border-blue-600 p-2 rounded-md">
                         Retake Image</button> :
                     <button onClick={async (e) => {
                      e.preventDefault();
                      handleFileChange();
                    }}
                         className="webcam-btn btn m-3  text-white hover:bg-blue-800 bg-blue-600 border-blue-600 p-2 rounded-md">Capture</button>
                 }
             </div>
         </div>
                         {/* <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                         <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /> */}
                         <div className='flex justify-center items-center mx-auto col-md-6'>
                         <ReCAPTCHA
                            sitekey={key}
                            onChange={onChange}
                        />
                                                
                         </div>
        
                     </form>
                 </div>
             </div>
         </div>
         <div className='flex justify-center items-center mt-4'>
          
         {captchaIsDone && 
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 " onClick={handleSubmit}>
            Login
          </button>}
          </div>
        </form>
        <div className='flex justify-center items-center'>
        <p className="mt-4 text-white">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500">
            SignUp
          </Link>
        </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login