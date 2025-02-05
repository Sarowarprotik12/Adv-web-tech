"use client"; // Mark as a Client Component

import Link from "next/link";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation

export default function Contact() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">

      {/* Contact Section */}
      <section className="py-20 bg-teal-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-6">Have questions or need an appointment? Reach out to us today.</p>
        <div className="flex justify-center space-x-6">
          <Link href="mailto:pr1@gmail.com">
            <button className="px-8 py-3 text-lg rounded-lg shadow-lg bg-white text-teal-700">Email Us</button>
          </Link>
        </div>
      </section>

      {/* Back Button */}
      <div className="fixed bottom-6 left-6">
        <button
          onClick={() => router.back()} // Navigate back when clicked
          className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-500"
        >
          Back
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 Online HealthCare. All rights reserved.</p>
      </footer>
    </div>
  );
}
