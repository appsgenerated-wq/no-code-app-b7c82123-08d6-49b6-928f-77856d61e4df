import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState({});
  const [currentScreen, setCurrentScreen] = useState(null); // Start with null to show loading
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('No active session found.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
        setCurrentScreen('landing'); // Show landing page even if backend fails
      }
    };

    initializeApp();
  }, []);

  const login = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setRestaurants([]);
    setMenuItems({});
    setCurrentScreen('landing');
  };

  const loadRestaurants = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('Restaurant').find({
        filter: { owner: user.id },
        include: ['owner'],
        sort: { createdAt: 'desc' }
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  const createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = await manifest.from('Restaurant').create(restaurantData);
      setRestaurants([newRestaurant, ...restaurants]);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
    }
  };

  const loadMenuItemsForRestaurant = async (restaurantId) => {
    try {
      const response = await manifest.from('MenuItem').find({
        filter: { restaurant: restaurantId },
        sort: { createdAt: 'desc' }
      });
      setMenuItems(prev => ({ ...prev, [restaurantId]: response.data }));
    } catch (error) {
      console.error(`Failed to load menu items for restaurant ${restaurantId}:`, error);
    }
  };
  
  const createMenuItem = async (menuItemData) => {
    try {
      const newMenuItem = await manifest.from('MenuItem').create(menuItemData);
      setMenuItems(prev => ({
        ...prev,
        [menuItemData.restaurant]: [newMenuItem, ...(prev[menuItemData.restaurant] || [])]
      }));
    } catch (error) {
      console.error('Failed to create menu item:', error);
    }
  };

  const renderContent = () => {
    if (currentScreen === null) {
      return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
    }

    if (currentScreen === 'dashboard' && user) {
      return (
        <DashboardPage
          user={user}
          restaurants={restaurants}
          menuItems={menuItems}
          onLogout={logout}
          onLoadRestaurants={loadRestaurants}
          onCreateRestaurant={createRestaurant}
          onLoadMenuItems={loadMenuItemsForRestaurant}
          onCreateMenuItem={createMenuItem}
        />
      );
    }

    return <LandingPage onLogin={login} />; 
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">{backendConnected ? 'API Connected' : 'API Disconnected'}</span>
      </div>
      {renderContent()}
    </div>
  );
}

export default App;
