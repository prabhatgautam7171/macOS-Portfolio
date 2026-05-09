"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, SearchIcon, User2, Wifi, WifiLow, WifiOff } from "lucide-react"
import { AppleIcon } from "@/components/icons"
import { Avatar } from "./ui/avatar"
import Image from "next/image"

interface MenubarProps {
  time: Date
  onLogout: () => void
  onSleep: () => void
  onShutdown: () => void
  onRestart: () => void
  onSpotlightClick: () => void
  onControlCenterClick: () => void
  isDarkMode: boolean
  activeWindow: { id: string; title: string } | null
}

export default function Menubar({
  time,
  onLogout,
  onSleep,
  onShutdown,
  onRestart,
  onSpotlightClick,
  onControlCenterClick,
  isDarkMode,
  activeWindow,
}: MenubarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [isCharging, setIsCharging] = useState(false)
  const [showWifiToggle, setShowWifiToggle] = useState(false)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const wifiRef = useRef<HTMLDivElement>(null)

  const weekday = time.toLocaleDateString("en-US", { weekday: "short" });
  const day = time.getDate();
  const month = time.toLocaleDateString("en-US", { month: "short" });

  const timePart = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedTime = `${weekday} ${day} ${month}  ${timePart}`;




  useEffect(() => {
    // Try to get battery information if available
    if ("getBattery" in navigator) {
      // @ts-ignore - getBattery is not in the standard navigator type
      navigator
        .getBattery()
        .then((battery: any) => {
          updateBatteryStatus(battery)

          // Listen for battery status changes
          battery.addEventListener("levelchange", () => updateBatteryStatus(battery))
          battery.addEventListener("chargingchange", () => updateBatteryStatus(battery))
        })
        .catch(() => {
          // If there's an error, default to 100%
          setBatteryLevel(100)
          setIsCharging(false)
        })
    }

    // Load WiFi state from localStorage
    const savedWifi = localStorage.getItem("wifiEnabled")
    if (savedWifi !== null) {
      setWifiEnabled(savedWifi === "true")
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }

      if (
        wifiRef.current &&
        !wifiRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".wifi-icon")
      ) {
        setShowWifiToggle(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const updateBatteryStatus = (battery: any) => {
    setBatteryLevel(Math.round(battery.level * 100))
    setIsCharging(battery.charging)
  }

  const toggleMenu = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu(null)
    } else {
      setActiveMenu(menuName)
    }
  }

  const toggleWifi = () => {
    const newState = !wifiEnabled
    setWifiEnabled(newState)
    localStorage.setItem("wifiEnabled", newState.toString())
  }

  const toggleWifiPopup = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowWifiToggle(!showWifiToggle)
  }

  const menuBgClass =  "bg-white/50 backdrop-blur-3xl";



  const dropdownBgClass = isDarkMode ? "bg-white-800/80 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-40" : "bg-white-800/80 backdrop-blur-md border-white/20"
  const textClass = isDarkMode ? "text-white" : "text-gray-800"
  const hoverClass = isDarkMode ? "hover:bg-blue-600" : "hover:bg-blue-400"

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 h-8 ${menuBgClass} z-50 flex items-center px-4 ${textClass} text-sm`}
    >
      <div className="flex-1 flex items-center">
        <button
          className="flex items-center  hover:bg-white/10 px-2 py-0.5 rounded"
          onClick={() => toggleMenu("apple")}
        >
          <AppleIcon className="w-4 h-4 text-black" />
        </button>

        {activeMenu === "apple" && (
          <div className={`absolute mt-3 top-6 left-2 ${dropdownBgClass} rounded-lg shadow-xl ${textClass} py-1 w-56`}>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`}>About This Mac</button>
            <div className="border-t border-gray-700 my-1"></div>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`}>System Settings...</button>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`}>App Store...</button>
            <div className="border-t border-gray-700 my-1"></div>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onSleep}>
              Sleep
            </button>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onRestart}>
              Restart...
            </button>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onShutdown}>
              Shut Down...
            </button>
            <div className="border-t border-gray-700 my-1"></div>
            <button className={`w-full text-left px-4 py-1 ${hoverClass}`} onClick={onLogout}>
              Log Out Prabhat Gautam
            </button>
          </div>
        )}

        {activeWindow ? (
          <button
            className={` font-bold text-black hover:bg-white/10 px-2 py-0.5 rounded ${activeMenu === "app" ? "bg-white/10" : ""}`}
            onClick={() => toggleMenu("app")}
          >
            {activeWindow.title}
          </button>
        ) : (
          <button
            className={` font-bold text-black hover:bg-white/10 px-2 py-0.5 rounded`}

          >
            Home
          </button>
        )}

        <button
          className={` hover:bg-white/10 text-black px-2 py-0.5 rounded`}

        >
          Contact
        </button>

        <button
          className={`mr-4 hover:bg-white/10 text-black px-2 py-0.5 rounded`}

        >
          Help
        </button>


      </div>

      <div className="flex items-center space-x-5">
        <span className="text-black font-semibold text-sm">{batteryLevel}%</span>
        <div className="relative">
          <div className="w-6 h-3 border text-gray-600 border-current rounded-sm relative">
            <div className="absolute text-yellow-300 top-0 left-0 bottom-0 bg-current" style={{ width: `${batteryLevel}%` }}></div>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-2 bg-current rounded-r-md"></div>
            {isCharging && <div className="absolute inset-0 flex items-center justify-center text-xs">⚡</div>}
          </div>
        </div>

        <div className="relative">
          <button className="wifi-icon" onClick={toggleWifiPopup}>
            {
              wifiEnabled ? (
                <Image alt="wifi" src={'/wifi.svg'} width={15} height={15} />
              ) : (
                <Image alt="wifioff" src={'/wifioff.svg'} width={18} height={18} className="font-bold" />
              )
            }


          </button>

          {showWifiToggle && (
            <div
              ref={wifiRef}
              className={`absolute mt-3 top-6 right-0 ${dropdownBgClass} rounded-lg shadow-xl ${textClass} py-3 px-4 w-64`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">Wi-Fi</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={wifiEnabled} onChange={toggleWifi} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          )}
        </div>

        <button onClick={onSpotlightClick}>


          <Image alt="search" src={'/search.svg'} width={15} height={15} />

        </button>

        <button onClick={onControlCenterClick} className="flex items-center justify-center">
        <Image alt="search" src={'/mode.svg'} width={15} height={15} />

        </button>



        <span className="text-sm text-black  tracking-wide"
        >{formattedTime}</span>
      </div>
    </div>
  )
}
