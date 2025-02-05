"use client"; 

import { useRouter } from "next/navigation"; 

export default function Services() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">

    
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Virtual Consultations</h3>
            <p>Connect with certified doctors remotely for consultations on various health concerns.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Mental Health Support</h3>
            <p>Get counseling and therapy sessions from licensed professionals to support mental well-being.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Health Monitoring</h3>
            <p>Track your vital health stats and receive personalized recommendations from experts.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Pharmacy Services</h3>
            <p>Order prescriptions and over-the-counter medications delivered directly to your door.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Health Education</h3>
            <p>Access online health courses and resources to stay informed and empowered about your well-being.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Emergency Services</h3>
            <p>Get immediate assistance for emergency health concerns through our dedicated helpline.</p>
          </div>
        </div>
      </section>

  
      <div className="fixed bottom-6 left-6">
        <button
          onClick={() => router.back()} 
          className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500"
        >
          Back
        </button>
      </div>


      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 Online HealthCare. All rights reserved.</p>
      </footer>
    </div>
  );
}
