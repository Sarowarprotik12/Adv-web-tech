"use client";
import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

interface User {
  userId: number;
  username: string;
  login: number;
  appointments: number;
  prescriptions: number;
  lastActivity: string;
}

const MonitorSystemUsage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [username, setUsername] = useState("sarowar"); 
  const [users, setUsers] = useState<User[]>([]); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    
    const storedData = localStorage.getItem("userData");
    const userData = storedData ? JSON.parse(storedData) : null;
    if (userData && userData.username) {
      setUsername(userData.username);
    }

    fetch("http://localhost:3001/monitor")
 
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); 
      })
      .then((data: User[]) => setUsers(data)) 
      .catch((error) => {
        console.error("Error fetching users:", error);
        if (error.message.includes("404")) {
          setError("Users API not found. Please check the endpoint.");
        } else {
          setError("Failed to load user data."); 
        }
      });
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <main className="flex-1 p-6 bg-white">
        <header className="bg-black text-white p-4 text-xl font-bold text-center relative">
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="relative ml-2">
              <button
                className="bg-gray-200 px-2 py-1 rounded-full cursor-pointer flex items-center space-x-1 hover:bg-gray-300"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="text-gray-700 text-sm font-semibold">{username}</span>
                <span className="w-6 h-6 bg-blue-500 text-white flex items-center justify-center rounded-full text-xs">
                  {username.charAt(0).toUpperCase()}
                </span>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2 border border-gray-200">
                  <button
                    className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          Monitor System Usage
        </header>

        {error && (
          <div className="bg-red-200 text-red-700 p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-1 text-sm rounded-md text-black w-36"
          />
          <Button className="bg-blue-600 text-white text-xs px-1 py-1 rounded-md ml-2">Search</Button>
        </div>

        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md h-full border border-gray-200">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2">User ID</th>
                <th className="border p-2">Username</th>
                <th className="border p-2">Login</th>
                <th className="border p-2">Appointments Created</th>
                <th className="border p-2">Prescriptions Created</th>
                <th className="border p-2">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.userId} className="text-center text-black">
                    <td className="border p-2">{user.userId}</td>
                    <td className="border p-2 italic font-bold">{user.username}</td>
                    <td className="border p-2">{user.login}</td>
                    <td className="border p-2">{user.appointments}</td>
                    <td className="border p-2">{user.prescriptions}</td>
                    <td className="border p-2 text-blue-600">{user.lastActivity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="bg-gray-600 text-white text-sm px-4 py-1 rounded-md" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </main>
    </div>
  );
};

export default MonitorSystemUsage;
