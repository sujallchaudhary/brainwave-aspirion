import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmPassword = () => {
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const link = window.location.href;
    const secret = link.split('=')[1];
    setToken(secret);
  }, []);

  const showAlert = (message, color) => {
    setAlert({ message, color });
    setTimeout(() => setAlert(null), 1000);
  };

  const confirmPassword = async () => {
    if (password !== cPassword) {
      showAlert('Passwords do not match', 'red');
      return;
    }

    const request = await fetch('https://gdscbackend.sujal.info/password/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        password: password,
      }),
    });

    const response = await request.json();

    if (response.success) {
      showAlert('Password reset successful', 'green');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      showAlert('Password reset failed', 'red');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmPassword();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
      <div  style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/1620156/screenshots/5547104/media/c738d5dea60fa01fe531798e1e9293fc.gif)' }} className="hidden lg:block lg:w-1/2 bg-gray-900 p-8 bg-cover bg-center bg-no-repeat">
          <div className="text-white text-3xl font-bold mb-4">Reset Password</div>
          <p className="text-gray-300">Enter your new password to reset your account.</p>
        </div>
        <div className="w-full lg:w-1/2 p-8 bg-white">
        <h2 className="text-3xl font-bold text-black mb-4">Aspirion</h2>
          <h2 className="text-2xl font-bold text-gray-700">Confirm Password</h2>
          {alert && (
            <div
              className={`fixed top-5 right-5 text-white px-4 py-3 rounded-lg shadow-lg z-50`}
              style={{ backgroundColor: alert.color }}
            >
              {alert.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                placeholder="Confirm your password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Reset Password
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Remember your password?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
