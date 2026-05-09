"use client"

import { Github } from "lucide-react"
import type React from "react"

import { useState } from "react"

interface NotesProps {
  isDarkMode?: boolean
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  // Update the notes state with enhanced content
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Prabhat Gautam",
      content: `# Prabhat Gautam
  Full Stack Developer | System Thinker | Builder

  I don't just write code.
  I build systems with logic, clarity, and long-term vision.

  ---

  ## 🚀 Current Focus
  - Building a production-level IRCTC clone (MERN Stack)
  - Implementing real-time seat booking logic with Socket.IO
  - Designing scalable backend architecture
  - Integrating secure payment systems (Stripe)
  - Strengthening Data Structures & Algorithms pattern-wise

  ---

  ## 🧠 Technical Stack

  ### Frontend
  - React / Next.js
  - Tailwind CSS
  - Modern UI inspired by Apple design principles
  - Responsive & Accessible UI

  ### Backend
  - Node.js / Express
  - MongoDB (complex nested schemas)
  - REST APIs
  - Authentication & Authorization (JWT)

  ### System Skills
  - Real-time systems (Socket.IO)
  - Booking logic & seat allocation algorithms
  - Clean architecture thinking
  - Performance optimization

  ---

  ## 🎯 Long-Term Vision
  - Master system design and scalable backend engineering
  - Build impactful AI-powered tools
  - Develop high-quality indie games
  - Achieve financial and intellectual independence

  ---

  ## 🧩 Philosophy
  - Depth over shortcuts
  - Projects over certificates
  - Logic over memorization
  - Independence over dependency

  ---

  ## 📬 Contact
  Email: prabhatgautam347@gmail.com
  GitHub: ${<a href="https://github.com/prabhatgautam7171"><Github/></a>}
  `,
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      title: "Learning Roadmap",
      content: `# Learning Roadmap

  ## 📌 Phase 1 – Core Strength
  - Complete DSA topic-wise (Arrays → Trees → Graphs → DP)
  - Strengthen problem-solving patterns
  - Master JavaScript deeply (execution context, closures, async internals)

  ---

  ## 📌 Phase 2 – Backend Power
  - Advanced MongoDB indexing & aggregation
  - Caching strategies (Redis)
  - System design fundamentals
  - Microservices basics

  ---

  ## 📌 Phase 3 – Advanced Engineering
  - Learn Rust for performance-focused systems
  - Learn Go for scalable backend services
  - Study distributed systems basics
  - Understand database internals

  ---

  ## 📌 Phase 4 – AI & Creation
  - Practical AI automation
  - Build real AI tools (not just tutorials)
  - Explore game development seriously
  - Launch an independent product

  ---

  ## 📖 Learning Rule
  - Build while learning
  - No shallow tutorial hopping
  - Focused deep work daily
  - Consistency > Intensity
  `,
      date: "Yesterday, 3:15 PM",
    },
  ])


  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [editableContent, setEditableContent] = useState("")

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditableContent(note.content)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)

    // Update the note content
    setNotes(
      notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, content: e.target.value }
        }
        return note
      }),
    )
  }

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full  ${bgColor} ${textColor}`} >
      {/* Sidebar */}
      <div className="w-72 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60
                border-r border-zinc-200/40 dark:border-zinc-800/50
                flex flex-col">

        {/* Header */}
        <div className="px-5 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            Notes
          </h2>

          <button className="w-8 h-8 rounded-full
                       bg-zinc-200/60 dark:bg-zinc-700/60
                       hover:bg-zinc-300/60 dark:hover:bg-zinc-600/60
                       transition-all duration-200
                       flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-zinc-700 dark:text-zinc-200"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Notes List */}
        <div className="overflow-y-auto flex-1 px-2 pb-3 space-y-1">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteSelect(note.id)}
              className={`
          px-4 py-3 rounded-xl cursor-pointer
          transition-all duration-200
          ${selectedNoteId === note.id
                  ? "bg-white/80 dark:bg-zinc-800 shadow-sm"
                  : "hover:bg-white/50 dark:hover:bg-zinc-800/60"
                }
        `}
            >
              <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">
                {note.title}
              </h3>

              <p className="text-xs text-zinc-500 mt-1">
                {note.date}
              </p>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 truncate">
                {note.content.split("\n")[0].replace(/^#+ /, "")}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* Note content */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            <div className={`p-3 border-b ${borderColor}`}>
              <h2 className="font-medium">{selectedNote.title}</h2>
              <p className="text-xs text-gray-500">{selectedNote.date}</p>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <textarea
                className={`w-full h-full resize-none ${bgColor} ${textColor}
  focus:outline-none font-apple text-[15px] leading-7 font-light`}
                value={selectedNote.content}
                onChange={handleContentChange}
              />

            </div>
          </>
        )}
      </div>
    </div>
  )
}
