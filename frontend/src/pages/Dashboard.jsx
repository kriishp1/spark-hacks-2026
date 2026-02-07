import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, BarChart2, Settings, Users, FileText, Bell, LogOut } from 'lucide-react';
import { supabase } from '../supaBaseClient';
import { useNavigate } from 'react-router-dom';
import ReceiptCard from '../componets/ReceiptCard';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('receipt');
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        // Try to get username from user_metadata or fallback to email prefix
        setUserName(user.user_metadata?.username || user.email?.split("@")[0] || "User");

        // Load user settings
        await loadUserSettings(user.id);
        getReceipts();
      }
    }
    fetchUser();
  }, []);

  const pages = [
    { id: 'receipt', name: 'My Receipts', icon: FileText },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const calculateExpiryDate = (purchaseDate, returnPolicy) => {
    if (!returnPolicy || !purchaseDate) return null;

    // Try to extract days from return policy
    const match = returnPolicy.match(/(\d+)\s*day/i);
    if (!match) return null;

    const days = parseInt(match[1]);
    const date = new Date(purchaseDate);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const getReceipts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user logged in');
        return;
      }
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('user_id', user.id)
        .order('receipt_data', { ascending: false });

      if (error) { // MOVED: Check error before using data
        console.error('Error fetching receipts:', error);
        return;
      }

      const formatted = data.map(receipt => ({
        id: receipt.id,
        purchaseDate: receipt.receipt_data,
        storeName: receipt.store_name,
        items: receipt.items?.map(item => ({
          name: item.quantity > 1 ? `${item.item} x${item.quantity}` : item.item,
          cost: item.price * item.quantity
        })) || [],
        totalPrice: receipt.total_amount,
        returnPolicy: receipt.return_policy,
        expiryDate: receipt.expires || calculateExpiryDate(receipt.receipt_data, receipt.return_policy),
      }));

      setReceipts(formatted);

    } catch (error) {
      console.error('Error in getReceipts:', error);
    }
  }

  const handleDeleteReceipt = async (id) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user logged in');
        return;
      }

      const { error } = await supabase
        .from('receipts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting receipt:', error);
        return;
      }

      // Update local state after successful deletion
      setReceipts((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const loadUserSettings = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('phone_number, notification_frequency')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        setPhoneNumber(data.phone_number || "");
        setNotificationFrequency(data.notification_frequency || "weekly");
      }
    } catch (error) {
      console.log('No user settings found, using defaults');
    }
  };

  const saveUserSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user logged in');
        return;
      }

      const { error } = await supabase
        .from('user_settings')
        .upsert(
          {
            user_id: user.id,
            phone_number: phoneNumber,
            notification_frequency: notificationFrequency,
          },
          { onConflict: 'user_id' }
        );

      if (error) {
        console.error('Error saving settings:', error);
        return;
      }

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
    }
  };





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
                  className="p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
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
      
      case 'receipt':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6" style={{ color: '#6F8F72' }}>
              My Receipts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto p-2">
              {/* Example usage of ReceiptCard for each receipt */}
              {receipts.length > 0 ? (
                receipts.map((receipt) => (
                  <ReceiptCard
                    key={receipt.id}
                    receipt={receipt}
                    onDelete={() => handleDeleteReceipt(receipt.id)}
                  />
                ))
              ) : (
                <p className="text-gray-700">No receipts to show.</p>
              )}
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
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex ${sidebarOpen ? 'w-64' : 'w-20'
          } transition-all duration-300 shadow-lg flex-col`}
        style={{ backgroundColor: '#6F8F72' }}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          <h2
            className={`text-white font-bold text-xl ${!sidebarOpen && 'hidden'
              }`}
          >
            Dashboard
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded transition-colors"
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
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all cursor-pointer ${activePage === page.id
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
            {sidebarOpen && (
              <div className="text-white">
                <p className="text-sm opacity-75">{userEmail || 'user@example.com'}</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-2 mt-3 rounded-lg transition-all cursor-pointer text-white hover:bg-red-500 hover:bg-opacity-20 ${!sidebarOpen && 'justify-center'
              }`}
          >
            <LogOut size={20} />
            <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile & Desktop Top Bar */}
        <div
          className="shadow-md p-4 flex items-center justify-between"
          style={{ backgroundColor: '#E8E2D8' }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded transition-colors -translate-y-0"
              style={{ color: '#6F8F72' }}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 translate-y-[2px]">
              {pages.find(p => p.id === activePage)?.name}
            </h2>
          </div>
          <Link to="/addreceipt">
            <button
              className="px-4 py-2 rounded text-white hover:opacity-90 transition-opacity text-sm md:text-base translate-y-[2px]"
              style={{ backgroundColor: '#6F8F72' }}
            >
              Enter New Receipt
            </button>
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        {sidebarOpen && (
          <div
            className="md:hidden shadow-lg flex flex-col"
            style={{ backgroundColor: '#6F8F72' }}
          >
            <nav className="px-2 py-4">
              {pages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => {
                      setActivePage(page.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all cursor-pointer ${activePage === page.id
                      ? 'bg-gray-600 bg-opacity-40 text-white'
                      : 'text-white hover:opacity-90'
                      }`}
                  >
                    <Icon size={20} />
                    <span className="ml-3">{page.name}</span>
                  </button>
                );
              })}
            </nav>
            <div className="p-4 border-t border-white border-opacity-20">
              <div className="flex items-center">
                <div className="text-white">
                  <p className="text-sm opacity-75">{userEmail || 'user@example.com'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-4 md:p-6 flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;