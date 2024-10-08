import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(null)
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = 'http://localhost:9000/auth/login';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
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
                    <h2 className='text-2xl font-medium'>Welcome To Login</h2>
                </div>
                <form className='my-2' onSubmit={handleLogin}>
                    <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                        <input type="email" name="email" autoFocus className='w-11/12 bg-transparent outline-none' placeholder='Enter Your Email'  value={loginInfo.email} onChange={handleChange}
                        />
                        <div className='w-1/12 flex items-center justify-center'>
                            <MdEmail className='text-xl' />
                        </div>
                    </div>
                    <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
                        <input type={`${isShowPassword === true ? 'text' : 'password'}`} name="password" className='w-11/12 bg-transparent outline-none' placeholder='Enter Your Password'  value={loginInfo.password} onChange={handleChange}
                        />
                        <div className='w-1/12 flex items-center justify-center' onClick={() => setIsShowPassword(!isShowPassword)}>
                            {
                                isShowPassword === true ? <IoMdEye className='text-xl' /> : <IoIosEyeOff className='text-xl' />
                            }
                        </div>
                    </div>
                    <div className="mx-5 my-7 py-2">
                        <button type='submit' className='w-full bg-teal-500 text-white h-[35px] rounded-sm'>Login</button>
                    </div>
                    <Link to='/signup' className="mx-5 my-5 py-2 flex items-center justify-center cursor-pointer">
                        <p className='text-sm'>Don't have an account ? Signup</p>
                    </Link>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
