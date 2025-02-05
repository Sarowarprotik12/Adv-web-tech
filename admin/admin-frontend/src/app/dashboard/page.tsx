'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { Sidebar } from 'flowbite-react';
import { FiHome, FiMonitor, FiFileText, FiLogOut, FiSettings, FiPlusCircle } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [token, setToken] = useState<string | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken'); 
    if (!storedToken) {
      router.push('/login'); 
    } else {
      setToken(storedToken); 
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    router.push('/login'); 
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar aria-label="Sidebar with logo branding example" collapsed={!isSidebarOpen} className="bg-blue-800 text-white w-64 shadow-xl transition-all">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="../user" icon={FiSettings} className="hover:bg-blue-700 hover:scale-105 transition-all">
              Manage Usages
            </Sidebar.Item>
            <Sidebar.Item href="../prescription" icon={FiMonitor} className="hover:bg-blue-700 hover:scale-105 transition-all">
              Track Prescription
            </Sidebar.Item>
            <Sidebar.Item href="../monitor" icon={FiMonitor} className="hover:bg-blue-700 hover:scale-105 transition-all">
              Monitor System Usages
            </Sidebar.Item>
            <Sidebar.Item href="../handle-dispute" icon={FiFileText} className="hover:bg-blue-700 hover:scale-105 transition-all">
              Dispute Management
            </Sidebar.Item>
            <Sidebar.Item href="../report" icon={FiFileText} className="hover:bg-blue-700 hover:scale-105 transition-all">
              Reports
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-16 bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Welcome to the eHealth Dashboard.     Admin Portal</h1>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? 'Hide' : 'Show'} Sidebar
          </button>
        </div>

        <div className="mt-4">
          <p className="text-xl text-blue-900 font-semibold">Manage your healthcare system efficiently with the following options:</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-2xl rounded-lg p-8 text-center hover:shadow-3xl transition-all">
            <h2 className="text-2xl font-semibold text-blue-800">Manage Usages</h2>
            <p className="text-gray-700 mt-2">View and manage system usages for optimal performance.</p>
            <a href="../user" className="mt-4 inline-block text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-all">
              Go to Manage Usages
            </a>
          </div>
          
          <div className="bg-white shadow-2xl rounded-lg p-8 text-center hover:shadow-3xl transition-all">
            <h2 className="text-2xl font-semibold text-blue-800">Track Prescription</h2>
            <p className="text-gray-700 mt-2">Easily track prescriptions and medication schedules.</p>
            <a href="../prescription" className="mt-4 inline-block text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-all">
              Go to Track Prescription
            </a>
          </div>
          
          <div className="bg-white shadow-2xl rounded-lg p-8 text-center hover:shadow-3xl transition-all">
            <h2 className="text-2xl font-semibold text-blue-800">Monitor System Usages</h2>
            <p className="text-gray-700 mt-2">Monitor system performance and health metrics.</p>
            <a href="../monitor" className="mt-4 inline-block text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-all">
              Go to Monitor System Usages
            </a>
          </div>
         
          <div className="bg-white shadow-2xl rounded-lg p-8 text-center hover:shadow-3xl transition-all">
            <h2 className="text-2xl font-semibold text-blue-800">Dispute Management</h2>
            <p className="text-gray-700 mt-2">Resolve disputes effectively with detailed tracking.</p>
            <a href="../handle-dispute" className="mt-4 inline-block text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-all">
              Go to Dispute Management
            </a>
          </div>
          
          <div className="bg-white shadow-2xl rounded-lg p-8 text-center hover:shadow-3xl transition-all">
            <h2 className="text-2xl font-semibold text-blue-800">Reports</h2>
            <p className="text-gray-700 mt-2">Generate and view various system reports.</p>
            <a href="../report" className="mt-4 inline-block text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-all">
              Go to Reports
            </a>
          </div>
        </div>
      </div>

      {/* Fixed Logout Button at the Bottom-Right */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
