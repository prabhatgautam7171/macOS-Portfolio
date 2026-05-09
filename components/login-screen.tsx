"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface LoginScreenProps {
  onLogin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function LoginScreen({
  onLogin,
  isDarkMode,
  onToggleDarkMode,
}: LoginScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length >= 0) {
      onLogin();
    } else {
      setError(true);
    }
  };

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });


  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });


  // Choose wallpaper based on dark/light mode
  const wallpaper = isDarkMode ? "/monterey.jpg" : "/wallpaper-day.jpg";

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-between p-10"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      <div className="flex flex-col items-center mb-8 select-none">
        <div
          className="
      text-white/80
      text-2xl
      font-medium
      tracking-wide

      font-apple
    "
        >
          {formattedDate}
        </div>
        <div
          className="
    text-white
    text-[120px]
    font-bold
    tracking-[-4px]
    leading-none
    font-apple
  "
        >
          {formattedTime}
        </div>




      </div>




      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mb-4">
          <span className="text-white text-5xl font-bold">PG</span>
        </div>

        <h2 className="text-white text-2xl font-semibold mb-6">Prabhat Gautam</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={`w-64 bg-white/20 backdrop-blur-md border-0 rounded-3xl text-center text-white placeholder:text-white/70 mb-2 ${error ? "ring-2 ring-red-500" : ""
              }`}
          />

          {error && (
            <p className="text-red-500 text-sm mb-2">Please enter a password</p>
          )}
          <Button
            type="submit"
            variant="outline"
            className="mt-2 bg-white/20 backdrop-blur-md border-0 text-white hover:bg-white/30 hidden"
          >
            Login
          </Button>
        </form>
      </div>


    </div>
  );
}
