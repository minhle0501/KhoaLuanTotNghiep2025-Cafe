import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState('Dang Ky');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (currentState === 'Dang Ky') {
                const response = await axios.post(
                    backendUrl + '/api/user/Dang Ky',
                    { name, email, password }
                );
                if (response.data.success) {
                    alert("Đăng ký thành công!");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                const response = await axios.post(
                    backendUrl + '/api/user/Dang Nhap',
                    { email, password }
                );
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    };

    useEffect(() => {
        if(token) {
            navigate('/')
        }
    },[token])
    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
        >
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            {currentState === 'Dang Nhap' ? (
                ''
            ) : (
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type='text'
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Ten'
                    required
                />
            )}
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Email'
                required
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                className='w-full px-3 py-2 border border-gray-800'
                placeholder='Mat khau'
                required
            />
            <div className='w-full flex justify-between text-sm mt-[8px]'>
                <p className='cursor-pointer'>Quen mat khau?</p>
                {currentState === 'Dang Nhap' ? (
                    <p
                        onClick={() => setCurrentState('Dang Ky')}
                        className='cursor-pointer'
                    >
                        Tao tai khoan 
                    </p>
                ) : (
                    <p
                        onClick={() => setCurrentState('Dang Nhap')}
                        className='cursor-pointer'
                    >
                        Dang nhap tai day
                    </p>
                )}
            </div>
            <button className='bg-black text-white font-light px-8 py-2 mt-4 w-full h-[50px]'>
                {currentState === 'Dang Nhap' ? 'Dang Ky' : 'Xac Nhan'}
            </button>
        </form>
    );
};

export default Login ;
