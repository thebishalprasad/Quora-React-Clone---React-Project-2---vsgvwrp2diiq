import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signUpBg from '../../assets/SignUpBg.jpg';
import googleLogo from '../../assets/google.jpeg';
import facebookLogo from '../../assets/facebook.jpeg';
import { APP_TYPE, LOGIN_API, PROJECT_ID } from '../Utils/Constant';
import SignUp from './SignUp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [getData, setData] = useState({
        email: '',
        password: '',
        appType: APP_TYPE,
    });

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!getData.email) {
            toast.error('Email is mandatory');
            return;
        } else if (!validateEmail(getData.email)) {
            toast.error('Invalid email format');
            return;
        } else if (!getData.password) {
            toast.error('Password cannot be empty');
            return;
        } else if (getData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        try {
            const response = await axios.post(LOGIN_API, getData, {
                headers: {
                    projectID: PROJECT_ID,
                    'Content-Type': 'application/json',
                },
            });

            const { data } = response;
            if (data.status === 'success') {
                localStorage.setItem('userInfo', JSON.stringify(data.data.user));
                localStorage.setItem('token', data.token);
                localStorage.setItem('status', 'success');
                toast.success('Login Successful');
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                localStorage.setItem('status', 'failure');
                toast.error('Login failed');
            }
        } catch (error) {
            toast.error('Email or Password is incorrect');
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(${signUpBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '100vh',
                }}
                className='flex items-center justify-center'>
                <div className='bg-white h-11/12 w-11/12 md:w-8/12 lg:w-7/12 rounded-sm p-4 md:p-8'>
                    <h1 className='text-red-700 text-4xl md:text-6xl font-bold font-serif text-center'>Quora</h1>
                    <h1 className='text-center font-bold text-gray-500 mt-3'>
                        A place to share knowledge and better understand the world
                    </h1>
                    <div className='flex flex-col lg:flex-row'>
                        <div className='flex flex-col items-center lg:items-start'>
                            <h1 className='text-zinc-400 text-xs md:text-sm lg:w-72 text-center lg:text-left'>
                                By continuing you indicate that you agree to Quora’s
                                <span className='text-cyan-700'> Terms of Service</span> and{' '}
                                <span className='text-cyan-700'> Privacy Policy.</span>
                            </h1>
                            <div className='flex p-4 border border-spacing-1 items-center w-full md:w-80 rounded-sm mt-5 cursor-pointer'>
                                <img src={googleLogo} className='w-5 h-5 ml-2' alt='Google Logo' />
                                <h1 className='ml-7'>Continue with Google</h1>
                            </div>
                            <div className='flex p-4 border border-spacing-1 items-center w-full md:w-80 rounded-sm mt-5 cursor-pointer'>
                                <img src={facebookLogo} className='w-6 h-5 ml-2 rounded-full' alt='Facebook Logo' />
                                <h1 className='ml-7'>Continue with Facebook</h1>
                            </div>
                            <h1 className='text-center text-sm font-semibold text-zinc-600 mt-3 cursor-pointer'>
                                <SignUp />
                            </h1>
                        </div>
                        <div className='mt-8 lg:mt-0 lg:ml-16'>
                            <h1 className='text-lg text-center font-bold'>Login</h1>
                            <hr className='w-full lg:w-72 mt-3' />
                            <h1 className='mt-4 font-bold text-sm'>Email</h1>
                            <input
                                name='email'
                                value={getData.email}
                                onChange={onChangeHandler}
                                placeholder='Your Email'
                                className='border border-spacing-1 p-2 w-full lg:w-72 mt-2'
                                type='email'
                            />
                            <h1 className='mt-4 font-bold text-sm'>Password</h1>
                            <input
                                name='password'
                                type='password'
                                value={getData.password}
                                onChange={onChangeHandler}
                                placeholder='Your Password'
                                className='border border-spacing-1 p-2 w-full lg:w-72 mt-2'
                            />
                            <div className='flex justify-center lg:justify-start mt-4'>
                                <button
                                    className='bg-blue-500 text-white py-2 px-3 rounded-full'
                                    onClick={onSubmitHandler}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className='mt-3' />
                    <h1 className='text-xs md:text-sm text-center mt-3 text-zinc-600'>
                        About . Careers . Privacy . Terms . Contact . Languages . Your Ad Choices . Press © Quora, Inc. 2024
                    </h1>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
