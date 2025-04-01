import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext'; // Import ShopContext

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token'); // Lấy token từ URL
    //
    const { backendUrl } = useContext(ShopContext); // Lấy backendUrl từ ShopContext
    //
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
                token,
                newPassword
            });

            if (response.data.success) {
                setMessage('Password updated successfully!');
                setTimeout(() => {
                    navigate('/login'); // Chuyển hướng về trang đăng nhập
                }, 2000);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center p-24">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Reset Password</h2>
                <form onSubmit={onSubmitHandler} className="space-y-4">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Reset Password
                    </button>
                </form>

                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
