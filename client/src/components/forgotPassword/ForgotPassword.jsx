import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, color) => {
    setAlert({ message, color });
    setTimeout(() => setAlert(null), 1000);
  };

  const forgotPassword = async () => {
    const request = await fetch('https://gdscbackend.sujal.info/password/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const response = await request.json();

    if (response.success) {
      showAlert('Password reset link sent to your email', 'green');
      setTimeout(() => {
        window.location.href = 'https://gdsc.sujal.info/login';
      }, 1000);
    } else {
      showAlert('Password reset failed', 'red');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex max-w-4xl w-full shadow-lg rounded-lg overflow-hidden">
      <div  style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/1620156/screenshots/5547104/media/c738d5dea60fa01fe531798e1e9293fc.gif)' }} className="hidden lg:block lg:w-1/2 bg-gray-900 p-8 bg-cover bg-center bg-no-repeat">
        </div>
        <div className="w-full lg:w-1/2 p-8 bg-white">
        <h2 className="text-3xl font-bold text-black mb-4">Aspirion</h2>
          <h2 className="text-2xl font-bold text-gray-700">Forgot Password</h2>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Send Reset Link
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
