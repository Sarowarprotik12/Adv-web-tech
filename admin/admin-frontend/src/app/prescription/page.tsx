"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

interface Prescription {
  prescriptionId: number;
  doctorId: number;
  fulfillmentStatus: string;
  actions?: string; 
}

const PrescriptionTracker = () => {
  const router = useRouter();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const username = "sarowar";

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const response = await fetch("http://localhost:3001/api/prescriptions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch prescriptions: ${response.statusText}`);
        }

        const data: Prescription[] = await response.json();
        setPrescriptions(data);
        setFilteredPrescriptions(data); 
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  const handleSearch = () => {
    
    const filtered = prescriptions.filter((prescription) =>
      prescription.doctorId.toString().includes(searchTerm)
    );
    setFilteredPrescriptions(filtered);
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
                <span className="text-gray-700 text-sm font-semibold">{username}</span>
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
          Track Prescription
        </header>

        <div className="bg-white p-6 rounded-lg shadow-md h-full border border-gray-200">
          <div className="flex justify-end mb-4">
            <Button
              className="bg-blue-600 text-white text-xs px-4 py-2 rounded-md"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search by Doctor ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 text-sm rounded-md text-black w-36"
            />
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2">Prescription ID</th>
                <th className="border p-2">Doctor ID</th>
                <th className="border p-2">Fulfillment Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((prescription) => (
                  <tr key={prescription.prescriptionId} className="text-center text-black">
                    <td className="border p-2">{prescription.prescriptionId}</td>
                    <td className="border p-2 italic font-bold">{prescription.doctorId}</td>
                    <td className={`border p-2 ${prescription.fulfillmentStatus === "Fulfilled" ? "text-green-600" : "text-red-600"}`}>
                      {prescription.fulfillmentStatus}
                    </td>
                    <td className="border p-2">
                      <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded mr-2 hover:bg-blue-600">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">No prescriptions found.</td>
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

export default PrescriptionTracker;
