'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }

      const data = await response.json();
      localStorage.setItem("userToken", data.token); 
      localStorage.setItem("username", data.username); 
      alert("Login successful!");
      router.push("/dashboard"); 
    } catch (err) {
     setError(err instanceof Error ? err.message : "Something went wrong.");

    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">Login to Your Account</h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email"
              className="mt-2"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-600 transition-colors duration-300">
            Login
          </Button>
        </form>

        <div className="mt-4 text-black text-center">
          <p>
            Don't have an account?{" "}
            <Link href="/registration" className="text-sky-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
