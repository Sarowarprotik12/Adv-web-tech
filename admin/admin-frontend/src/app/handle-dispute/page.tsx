"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

const DisputeTracker: React.FC = () => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState<string>("Guest");
  const [disputes, setDisputes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await fetch("http://localhost:3001/disputes"); 
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setDisputes(data);
        } else {
          throw new Error("Expected JSON, but got something else.");
        }
      } catch (error) {
        console.error("Error fetching disputes:", error);
        setError("Failed to fetch disputes. Please try again later.");
      }
    };

    fetchDisputes();
  }, []);

  const filteredDisputes = disputes.filter((dispute) =>
    dispute.involvedParties.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.disputeId.toString().includes(searchTerm)
  );

  const handleViewDispute = (disputeId: number) => {
    router.push(`/[disputeId]${disputeId}/view`);
  };

  const handleResolveDispute = (disputeId: number) => {
    router.push(`/[disputeId]/${disputeId}/edit`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6 bg-white">
        <div className="bg-white p-6 rounded-lg shadow-md h-full border border-gray-200">
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search Disputes by ID or Parties"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-1 text-sm rounded-md text-black w-36 border border-gray-300"
            />
          </div>

        
          {error && <div className="text-red-600 mb-4">{error}</div>}

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="border p-2">Dispute ID</th>
                <th className="border p-2">Involved Parties</th>
                <th className="border p-2">Dispute Type</th>
                <th className="border p-2">Resolution Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisputes.length > 0 ? (
                filteredDisputes.map((dispute) => (
                  <tr key={dispute.id} className="text-center text-black">
                    <td className="border p-2">{dispute.id}</td>
                    <td className="border p-2 italic font-bold">{dispute.involvedParties}</td>
                    <td className="border p-2">{dispute.disputeType}</td>
                    <td className={`border p-2 ${dispute.resolutionStatus === "Resolved" ? "text-green-600" : "text-red-600"}`}>
                      {dispute.resolutionStatus}
                    </td>
                    <td className="border p-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded mr-2 hover:bg-blue-600"
                        onClick={() => handleViewDispute(dispute.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 text-sm rounded hover:bg-yellow-600"
                        onClick={() => handleResolveDispute(dispute.id)}
                      >
                        Resolve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">No disputes found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DisputeTracker;
