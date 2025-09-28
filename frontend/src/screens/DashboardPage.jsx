import React, { useEffect, useState } from 'react';
import config from '../constants.js';
import { UserCircleIcon, ArrowRightOnRectangleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, restaurants, menuItems, onLogout, onLoadRestaurants, onCreateRestaurant, onLoadMenuItems, onCreateMenuItem }) => {
  const [newRestaurantName, setNewRestaurantName] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: 0, category: '' });

  useEffect(() => {
    onLoadRestaurants();
  }, []);

  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurant) {
      const firstRestaurant = restaurants[0];
      setSelectedRestaurant(firstRestaurant);
      onLoadMenuItems(firstRestaurant.id);
    }
  }, [restaurants, selectedRestaurant, onLoadMenuItems]);

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    if (!newRestaurantName.trim()) return;
    await onCreateRestaurant({ name: newRestaurantName });
    setNewRestaurantName('');
  };

  const handleCreateMenuItem = async (e) => {
    e.preventDefault();
    if (!newMenuItem.name.trim() || !selectedRestaurant) return;
    await onCreateMenuItem({ ...newMenuItem, restaurant: selectedRestaurant.id, owner: user.id });
    setNewMenuItem({ name: '', description: '', price: 0, category: '' });
  };
  
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    if (!menuItems[restaurant.id]) {
        onLoadMenuItems(restaurant.id);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Chef's Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <UserCircleIcon className="h-10 w-10 text-gray-400" />
             <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <span className="sr-only">Admin Panel</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
            </a>
            <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">My Restaurants</h2>
              <form onSubmit={handleCreateRestaurant} className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  placeholder="New restaurant name..."
                  value={newRestaurantName}
                  onChange={(e) => setNewRestaurantName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <PlusCircleIcon className="h-6 w-6" />
                </button>
              </form>
              <ul className="space-y-2">
                {restaurants.map(resto => (
                  <li key={resto.id}>
                    <button onClick={() => handleSelectRestaurant(resto)} className={`w-full text-left p-3 rounded-md transition-colors ${selectedRestaurant?.id === resto.id ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-100'}`}>
                      {resto.name}
                    </button>
                  </li>
                ))}
                 {restaurants.length === 0 && <p className="text-gray-500 text-sm">No restaurants yet. Add one above!</p>}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
             {selectedRestaurant ? (
                <>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu for {selectedRestaurant.name}</h2>
                    <form onSubmit={handleCreateMenuItem} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg mb-6 bg-gray-50">
                        <input type="text" placeholder="Item Name" value={newMenuItem.name} onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})} className="w-full p-2 border rounded-md" required />
                        <input type="text" placeholder="Category (e.g., Appetizer)" value={newMenuItem.category} onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})} className="w-full p-2 border rounded-md" />
                        <textarea placeholder="Description" value={newMenuItem.description} onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})} className="w-full p-2 border rounded-md md:col-span-2" rows="2" />
                        <input type="number" placeholder="Price" value={newMenuItem.price} onChange={(e) => setNewMenuItem({...newMenuItem, price: parseFloat(e.target.value) || 0})} className="w-full p-2 border rounded-md" step="0.01" min="0" required />
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 md:col-span-2">Add Menu Item</button>
                    </form>

                    <div className="space-y-4">
                    {(menuItems[selectedRestaurant.id] || []).map(item => (
                        <div key={item.id} className="border rounded-lg p-4 flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded-full mt-2">{item.category}</p>
                            </div>
                            <p className="text-green-600 font-bold text-lg">${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                     {(!menuItems[selectedRestaurant.id] || menuItems[selectedRestaurant.id].length === 0) && <p className="text-center text-gray-500 py-4">No menu items found. Add one above.</p>}
                    </div>
                </div>
                </>
             ) : (
                <div className="bg-white p-10 rounded-lg shadow text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.name}!</h2>
                    <p className="text-gray-600 mt-2">Select a restaurant on the left, or create a new one to get started.</p>
                </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
