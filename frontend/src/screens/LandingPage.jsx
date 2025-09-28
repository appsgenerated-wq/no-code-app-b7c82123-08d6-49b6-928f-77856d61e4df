import React from 'react';
import config from '../constants.js';
import { GlobeAltIcon, ShieldCheckIcon, ServerIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const handleDemoLogin = () => {
    // Use admin credentials for demo, as signup is public but user creation is admin-only
    onLogin('admin@manifest.build', 'admin');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="absolute top-0 left-0 right-0 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <h1 className="text-2xl font-bold text-gray-900">FoodApp</h1>
           <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Admin Panel</a>
        </div>
      </header>
      <main className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Manage Your Restaurant, Your Way
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            A complete platform for chefs and restaurant owners, built on the secure and scalable Manifest backend.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={handleDemoLogin}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Login as Demo Chef
            </button>
          </div>
        </div>
      </main>
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <ServerIcon className="h-12 w-12 text-blue-600 mb-4"/>
              <h3 className="text-xl font-semibold text-gray-900">Powered by Manifest</h3>
              <p className="text-gray-600 mt-2">Leverages a powerful, auto-generated backend for reliability and speed.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheckIcon className="h-12 w-12 text-blue-600 mb-4"/>
              <h3 className="text-xl font-semibold text-gray-900">Secure by Design</h3>
              <p className="text-gray-600 mt-2">Built-in authentication and fine-grained access policies protect your data.</p>
            </div>
            <div className="flex flex-col items-center">
              <GlobeAltIcon className="h-12 w-12 text-blue-600 mb-4"/>
              <h3 className="text-xl font-semibold text-gray-900">Accessible Everywhere</h3>
              <p className="text-gray-600 mt-2">Manage your restaurant from anywhere with our fully responsive web interface.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
