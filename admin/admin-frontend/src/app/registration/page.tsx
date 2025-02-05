"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    nidNumber: "",
    address: "",
    dateOfBirth: "",
    gender: ""
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phoneNumber, password, nidNumber, address, dateOfBirth, gender } = formData;
  
    if (!name || !email || !password || !nidNumber || !address || !dateOfBirth || !gender) {
      setError("Please fill in all required fields.");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }
  
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Password must be at least 8 characters long and include a number and an uppercase letter.");
      return;
    }
  
    setError(""); 
    try {
      const response = await fetch("http://localhost:3001/login/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Registration failed.");
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token
      alert("Registration successful! Please log in.");
      window.location.href = "/login"; // Redirect to login
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Create an Account</h2>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <TextInput id="name" name="name" required onChange={handleChange} className="text-black" placeholder="Enter your full name" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <TextInput id="email" name="email" type="email" required onChange={handleChange} className="text-black" placeholder="Enter your email" />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
            <TextInput id="phoneNumber" name="phoneNumber" type="tel" onChange={handleChange} className="text-black" placeholder="Enter your phone number" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <TextInput id="password" name="password" type="password" required onChange={handleChange} className="text-black" placeholder="Create a strong password" />
          </div>

          <div>
            <Label htmlFor="nidNumber">NID Number</Label>
            <TextInput id="nidNumber" name="nidNumber" required onChange={handleChange} className="text-black" placeholder="Enter your NID number" />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <TextInput id="address" name="address" required onChange={handleChange} className="text-black" placeholder="Enter your address" />
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <TextInput id="dateOfBirth" name="dateOfBirth" type="date" required onChange={handleChange} className="text-black" />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select id="gender" name="gender" required onChange={handleChange} className="text-black">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-600 transition-colors duration-300">Register</Button>
        </form>

        <div className="mt-4 text-black text-center">
          <p>
            Already have an account? <Link href="/login" className="text-sky-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
