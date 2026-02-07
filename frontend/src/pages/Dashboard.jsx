import React, { useState } from 'react';
import { Menu, X, Home, BarChart2, Settings, Users, FileText, Bell } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('home');
``
  const pages = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'receipt', name: 'My Receipts', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Sample content for different pages
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#6F8F72' }}>
              Welcome to Your Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="p-6 rounded-lg shadow-md"
                  style={{ backgroundColor: '#E8E2D8' }}
                >
                  <h3 className="text-xl font-semibold mb-2">Card {item}</h3>
                  <p className="text-gray-600 mb-4">
                    This is a sample card with your custom beige background.
                  </p>
                  <button
                    className="px-4 py-2 rounded text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#6F8F72' }}
                  >
                    Action
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#6F8F72' }}>
              Analytics
            </h1>
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#E8E2D8' }}>
              <p className="text-gray-700">Your analytics content goes here.</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#6F8F72' }}>
              Users
            </h1>
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#E8E2D8' }}>
              <p className="text-gray-700">User management content goes here.</p>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#6F8F72' }}>
              {pages.find(p => p.id === activePage)?.name}
            </h1>
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#E8E2D8' }}>
              <p className="text-gray-700">Content for {activePage} page.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 shadow-lg flex flex-col`}
        style={{ backgroundColor: '#6F8F72' }}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          <h2
            className={`text-white font-bold text-xl ${
              !sidebarOpen && 'hidden'
            }`}
          >
            Dashboard
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-black hover:bg-white hover:bg-opacity-20 p-2 rounded transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all cursor-pointer ${
                  activePage === page.id
                    ? 'bg-gray-600 bg-opacity-40 text-white'
                    : 'text-white hover:opacity-90'
                }`}
              >
                <Icon size={20} />
                <span
                  className={`ml-3 ${!sidebarOpen && 'hidden'}`}
                >
                  {page.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white border-opacity-20">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white font-semibold ">
              U
            </div>
            {sidebarOpen && (
              <div className="ml-3 text-white">
                <p className="font-medium">User Name</p>
                <p className="text-sm opacity-75">user@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div
          className="shadow-sm p-4 flex items-center justify-between"
          style={{ backgroundColor: '#E8E2D8' }}
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {pages.find(p => p.id === activePage)?.name}
          </h2>
          <button
            className="px-4 py-2 rounded text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#6F8F72' }}
          >
            Enter New Receipt
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;