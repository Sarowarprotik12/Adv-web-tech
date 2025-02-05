"use client";

import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Navbar */}
      <nav className="bg-teal-600 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold">Online HealthCare</h1>
          <div className="space-x-6">
            <Link href="./services" className="hover:text-gray-200">Services</Link>
            <Link href="./login" className="hover:text-gray-200">Login Admin</Link>
            <Link href="./contact" className="hover:text-gray-200">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-teal-700 text-white py-24 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-6">Your Health, Our Priority</h2>
          <p className="text-xl mb-8">Access expert healthcare services from anywhere, anytime.</p>
          <Button color="light" className="px-8 py-3 text-lg rounded-lg shadow-lg bg-white text-teal-700">Get Started</Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100 text-center">
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-teal-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-6">Have questions or need an appointment? Reach out to us today.</p>
        <Button href="mailto:contact@onlinehealthcare.com" color="light" className="px-8 py-3 text-lg rounded-lg shadow-lg bg-white text-teal-700">Email Us</Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 Online HealthCare. All rights reserved.</p>
      </footer>
    </div>
  );
}
