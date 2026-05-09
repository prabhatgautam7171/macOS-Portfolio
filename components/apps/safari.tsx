"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Star, Plus, Search, Wifi, Share2, Lock, ChevronDown, Bookmark, Globe, MoreHorizontal } from "lucide-react"

interface SafariProps {
  isDarkMode?: boolean
}

export default function Safari({ isDarkMode = true }: SafariProps) {
  const [url, setUrl] = useState("https://prabhatgautamn.dev")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [wifiEnabled, setWifiEnabled] = useState(true)

  // Get WiFi status from localStorage or default to true
  useEffect(() => {
    const checkWifiStatus = () => {
      const status = localStorage.getItem("wifiEnabled")
      setWifiEnabled(status === null ? true : status === "true")
    }

    checkWifiStatus()

    // Check every second in case it changes
    const interval = setInterval(checkWifiStatus, 1000)

    return () => clearInterval(interval)
  }, [])

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const toolbarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const inputBg = isDarkMode ? "bg-gray-700" : "bg-gray-200"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const hoverBg = isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Updated bookmarks with social links
  const socialLinks = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/prabhat-53a679195/",
      icon: "/linkedin.png",
    },
    {
      title: "GitHub",
      url: "https://github.com/prabhatgautam7171",
      icon: "/github.png",
    },

    {
      title: "Email",
      url: "mailto:mail@prabhat",
      icon: "/mail.png",
    },
  ]

  const frequentlyVisited = [
    {
      title: "GitHub",
      url: "https://github.com/prabhatgautam7171",
      icon: "/github.png",
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com",
      icon: "/linkedin.png",
    },

    {
      title: "Reddit",
      url: "https://reddit.com",
      icon: "/reddit.png",
    },
    {
      title: "ChatGPT",
      url: "https://chatgpt.com",
      icon: "/chatgpt.png",
    },
    {
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      icon: "/stackoverflow.png",
    },
  ]

  // Add a no internet connection view
  const NoInternetView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <Wifi className={`w-12 h-12 ${isDarkMode ? "text-gray-600" : "text-gray-500"}`} />
      </div>
      <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>You Are Not Connected to the Internet</h2>
      <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
        This page can't be displayed because your computer is currently offline.
      </p>
      <button
        className={`px-4 py-2 rounded ${
          isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        onClick={handleRefresh}
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor} font-safari`}>


    {/* Modern Toolbar */}
    <div className={`${toolbarBg} px-2 py-2 flex items-center space-x-2 border-b ${borderColor}`}>
      {/* Navigation buttons with macOS style */}
      <div className="flex items-center space-x-1">
        <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}
          onClick={handleRefresh}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Sidebar and Share buttons */}
      <div className="flex items-center space-x-1">
        <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}>
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-4 h-3 border-2 border-current rounded-sm"></div>
          </div>
        </button>
        <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}>
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* URL Bar - macOS style with security indicator */}
      <div className={`flex-1 flex items-center ${inputBg} rounded-lg px-3 py-1.5 border ${borderColor} shadow-sm`}>
        <div className="flex items-center text-xs font-medium mr-2">
          <Lock className="w-3 h-3 text-green-600 mr-1" />
          <span className="text-green-600">prabhat-portfolio.com</span>
          <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={`flex-1 bg-transparent focus:outline-none text-sm ${textColor} px-1`}
          spellCheck="false"
        />
        <div className="flex items-center space-x-1">
          <button className={`p-1 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center space-x-1">
        <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}>
          <Globe className="w-4 h-4" />
        </button>
        <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors`}>
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Favorites Bar */}
    <div className={`${toolbarBg} px-4 py-1 flex items-center space-x-4 text-xs border-b ${borderColor}`}>
      <span className="font-medium opacity-70">Favorites:</span>
      <button className="flex items-center space-x-1 opacity-80 hover:opacity-100">
        <Globe className="w-3 h-3" />
        <span>Apple</span>
      </button>
      <button className="flex items-center space-x-1 opacity-80 hover:opacity-100">
        <Search className="w-3 h-3" />
        <span>Google</span>
      </button>
      <button className="flex items-center space-x-1 opacity-80 hover:opacity-100">
        <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
        <span>Portfolio</span>
      </button>
      <button className="flex items-center space-x-1 opacity-80 hover:opacity-100">
        <span className="w-3 h-3 bg-purple-500 rounded-sm"></span>
        <span>Projects</span>
      </button>
    </div>

    {/* Tab bar - modern macOS style */}
    <div className={`${toolbarBg} px-2 flex items-center space-x-1 border-b ${borderColor}`}>
      <div className="flex-1 flex items-center space-x-1 overflow-x-auto scrollbar-hide py-1">
        {/* Active Tab */}
        <div
          className={`flex items-center px-4 py-1.5 text-sm rounded-t-lg min-w-[140px] max-w-[200px] ${
            activeTab === "home"
              ? isDarkMode
                ? "bg-gray-900 shadow-sm"
                : "bg-white shadow-sm border-t border-l border-r border-gray-200"
              : ""
          }`}
        >
          <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-2 flex-shrink-0"></div>
          <span className="truncate flex-1">Home · Prabhat</span>
          <button className="ml-2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-500/20 flex-shrink-0">
            <span className="text-sm">×</span>
          </button>
        </div>

        {/* Other Tabs */}
        <div
          className={`flex items-center px-4 py-1.5 text-sm rounded-t-lg min-w-[140px] max-w-[200px] opacity-70 ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mr-2 flex-shrink-0"></div>
          <span className="truncate flex-1">Projects</span>
          <button className="ml-2 w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-500/20 flex-shrink-0">
            <span className="text-sm">×</span>
          </button>
        </div>

        <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Tab overview button */}
      <button className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} ml-auto`}>
        <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-3 h-3 border border-current transform rotate-45"></div>
        </div>
      </button>
    </div>

    {/* Content - with macOS style shadows and spacing */}
    <div className="flex-1 overflow-auto bg-gradient-to-b from-transparent to-black/5">
      {!wifiEnabled ? (
        <NoInternetView />
      ) : (
        activeTab === "home" && (
          <div className="p-8 max-w-6xl mx-auto">
            {/* Apple-style header */}
            <div className="mb-8">
              <h1 className="text-4xl font-medium mb-2">Welcome back, Prabhat</h1>
              <p className="text-sm opacity-60">Your personal Safari start page · 5 tabs · 2.4 GB memory</p>
            </div>

            <h2 className="text-lg font-medium mb-4 opacity-80">Favorites</h2>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-6 mb-12">
              {socialLinks.map((link, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-3 rounded-xl ${hoverBg} cursor-pointer transition-all hover:scale-105 active:scale-95`}
                  onClick={() => setUrl(link.url)}
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm overflow-hidden">
                    <img src={link.icon || "/placeholder.svg"} alt={link.title} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-xs text-center truncate w-full">{link.title}</span>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-medium mb-4 opacity-80">Frequently Visited</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-12">
              {frequentlyVisited.map((site, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-3 rounded-xl ${hoverBg} cursor-pointer transition-all hover:scale-105 active:scale-95`}
                  onClick={() => setUrl(site.url)}
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm overflow-hidden">
                    <img src={site.icon || "/placeholder.svg"} alt={site.title} className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-xs text-center truncate w-full">{site.title}</span>
                </div>
              ))}
            </div>

            {/* Privacy Report */}
            <div className="mt-8 mb-6">
              <div className={`p-4 rounded-xl ${cardBg} border ${borderColor} flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Privacy Report</h4>
                    <p className="text-xs opacity-60">24 trackers blocked from profiling you</p>
                  </div>
                </div>
                <button className="text-xs text-blue-500 hover:text-blue-600">Details →</button>
              </div>
            </div>

            {/* Portfolio Card - macOS style */}
            <div className="mt-8">
              <div className={`p-8 rounded-2xl ${cardBg} border ${borderColor} shadow-lg`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-medium mb-2">Prabhat's Portfolio</h3>
                    <p className="text-sm opacity-60">Frontend Developer · React · Next.js</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    P
                  </div>
                </div>

                <p className="mb-4 text-lg leading-relaxed">
                  Welcome to my portfolio website! I'm a frontend developer specializing in creating beautiful,
                  responsive, and user-friendly web applications.
                </p>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full">React</span>
                  <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full">TypeScript</span>
                  <span className="text-xs px-3 py-1 bg-green-500/10 text-green-500 rounded-full">Next.js</span>
                </div>

                <div className="flex justify-end">
                  <button
                    className={`px-6 py-2.5 rounded-lg ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-medium transition-all hover:shadow-lg active:scale-95`}
                  >
                    View Projects →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  </div>
  )
}
