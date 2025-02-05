import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Dispute {
  disputeId: number;
  involvedParties: string;
  disputeType: string;
  resolutionStatus: string;
}

const EditDispute = () => {
  const router = useRouter();
  const { disputeId } = router.query;
  const [dispute, setDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDispute = async () => {
      if (!disputeId) return;
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/handle-dispute/${disputeId}`);
        if (!response.ok) throw new Error("Failed to fetch dispute");
        const data = await response.json();
        setDispute(data);
      } catch (error) {
        console.error("Error fetching dispute data:", error);
        setError("Failed to load dispute details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDispute();
  }, [disputeId]);

  const handleResolve = async () => {
    if (!disputeId || !dispute) return;

    const updatedDispute = { ...dispute, resolutionStatus: "Resolved" };

    try {
      await fetch(`/api/handle-dispute/${disputeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDispute),
      });

      
      router.push(`/handle-dispute/${disputeId}/view`);
    } catch (error) {
      console.error("Error resolving dispute:", error);
      setError("Failed to resolve dispute. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!dispute) return <div>No dispute found.</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Resolve Dispute</h1>
      <div className="space-y-4">
        <div>
          <strong>Dispute ID:</strong> {dispute.disputeId}
        </div>
        <div>
          <strong>Involved Parties:</strong> {dispute.involvedParties}
        </div>
        <div>
          <strong>Dispute Type:</strong> {dispute.disputeType}
        </div>
        <div>
          <strong>Current Resolution Status:</strong> {dispute.resolutionStatus}
        </div>
      </div>

      <div className="mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleResolve}
        >
          Mark as Resolved
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EditDispute;
