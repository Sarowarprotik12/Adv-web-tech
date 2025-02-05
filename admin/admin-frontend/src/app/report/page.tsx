"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import axios from "axios";
import Link from "next/link";

interface Report {
  disputeId: number;
  reportType: string;
  paymentcheck: string;  
  generatedOn: string;
  actions: string;  
}

const ReportGenerator = () => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Report[]>([]);
  const username = "sarowar";

  useEffect(() => {
    axios
      .get('http://localhost:3001/record')
      .then((response) => {
        setData(response.data.data); 
      })
      .catch((error) => {
        console.error("There was an error fetching the records!", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
  };

  const filteredReports = data.filter((report) =>
    report.disputeId.toString().includes(searchTerm)
  );

  const handleSearch = () => {};

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: 'Arial, sans-serif' }}>
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
          Generate Report
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
              placeholder="Search by Dispute ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-1 text-sm rounded-md text-black w-36"
            />
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2">Dispute ID</th>
                <th className="border p-2">Report Type</th>
                <th className="border p-2">Payment Check</th>  
                <th className="border p-2">Generated On</th>
                <th className="border p-2">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.disputeId} className="text-center text-black">
                  <td className="border p-2">{report.disputeId}</td>
                  <td className="border p-2 italic font-bold">{report.reportType}</td>
                  <td className="border p-2">{report.paymentcheck}</td>  
                  <td className="border p-2">{report.generatedOn}</td>
                  <td className="border p-2">{report.actions}</td>  
                  <td className="border p-2">
                  <Link href={`/view/${report.disputeId}`} passHref>
                    <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded mr-2 hover:bg-blue-600">
                      View
                    </button>
                  </Link>
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

export default ReportGenerator;
