import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

const Signup = () => {
    const [isShowPassword, setIsShowPassword] = useState(null)
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = 'http://localhost:9000/auth/signup';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center tracking-wider'>
            <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm  glass">
                <div className="w-full text-center my-3">
                    <h2 className='text-2xl font-medium'>Welcome To SignUp</h2>
                </div>
                <form className='my-2' onSubmit={handleSignup}>
                    <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                        <input onChange={handleChange} type="text" name='name' autoFocus className='w-11/12 bg-transparent outline-none' placeholder='Enter Your Name' />
                        <div className='w-1/12 flex items-center justify-center'>
                            <FaUserAlt className='text-l' />
                        </div>
                    </div>
                    <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                        <input type="email" name="email" value={signupInfo.email} onChange={handleChange} className='w-11/12 bg-transparent outline-none' placeholder='Enter Your Email' />
                        <div className='w-1/12 flex items-center justify-center'>
                            <MdEmail className='text-xl' />
                        </div>
                    </div>
                    <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                        <input type={`${isShowPassword === true ? 'text' : 'password'}`} name="password" onChange={handleChange} value={signupInfo.password} className='w-11/12 bg-transparent outline-none' placeholder='Create Strong Password' />
                        <div className='w-1/12 flex items-center justify-center' onClick={() => setIsShowPassword(!isShowPassword)}>
                            {
                                isShowPassword === true ? <IoMdEye className='text-xl' /> : <IoIosEyeOff className='text-xl' />
                            }
                        </div>
                    </div>
                    <div className="mx-5 my-7 py-2">
                        <button type='submit' className='w-full bg-teal-500 text-white h-[35px] rounded-sm'>Signup</button>
                    </div>
                    <Link to='/login' className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
                        <p className='text-sm'>Already have an account ? Login</p>
                    </Link>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup
