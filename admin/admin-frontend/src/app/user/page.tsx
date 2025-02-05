"use client";  

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import axios from 'axios';

interface User {
  userId: number;
  username: string;
  role: string;
  accountStatus: string;
}

const ManageUsers = () => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);  
  const [username, setUsername] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);  

  useEffect(() => {
    const storedUsername = localStorage.getItem("useremail"); 
    if (storedUsername) {
      setUsername(storedUsername); 
    } else {
      console.log("useremail"); 
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          router.push("/login"); 
          return;
        }
        const response = await axios.get('http://localhost:3001/user', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUsers(response.data.data);
        setFilteredUsers(response.data.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("useremail"); 
    router.push("/login");
  };

  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (userId: number) => {  
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.delete(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setFilteredUsers(filteredUsers.filter(user => user.userId !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 bg-white">
    
        <header className="bg-black text-white p-4 text-xl font-bold text-center relative">
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="relative ml-2">
              <button
                className="bg-gray-200 px-2 py-1 rounded-full cursor-pointer flex items-center space-x-1 hover:bg-gray-300"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="text-gray-700 text-sm font-semibold">{username || "Guest"}</span> 
                <span className="w-6 h-6 bg-blue-500 text-white flex items-center justify-center rounded-full text-xs">JD</span>
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
          Manage Users
        </header>

        
        <div className="bg-white p-6 rounded-lg shadow-md h-full border border-gray-200">
          <div className="flex justify-end mb-4">
            <Button 
              className="bg-blue-600 text-white text-xs px-1 py-1 rounded-md"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search Username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-1 text-sm rounded-md text-black w-36"
            />
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2">User ID</th>
                <th className="border p-2">Username</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Account Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="text-center text-black">
                  <td className="border p-2">{user.userId}</td>
                  <td className="border p-2 italic font-bold">{user.username}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">{user.accountStatus}</td>
                  <td className="border p-2">
                    <button 
                      className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                      onClick={() => handleDelete(user.userId)}  
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="bg-gray-600 text-white text-sm px-4 py-1 rounded-md" onClick={() => router.back()}>Back</Button>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
