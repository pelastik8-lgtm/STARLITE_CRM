"use client"

import { Bell, Search, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [currentDate, setCurrentDate] = useState<string>("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }))
      setCurrentDate(now.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-16 glass-card border-b border-[rgba(0,240,255,0.1)] flex items-center justify-between px-6">
      {/* Left Section - Page Title */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Dashboard & Log Monitor</h1>
        <p className="text-sm text-muted-foreground">Real-time system overview</p>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers, tickets, logs..." 
            className="pl-9 bg-[rgba(15,23,42,0.8)] border-[rgba(0,240,255,0.2)] text-foreground placeholder:text-muted-foreground focus-visible:ring-[#00F0FF]"
          />
        </div>
      </div>

      {/* Right Section - Time, Notifications, Profile */}
      <div className="flex items-center gap-6">
        {/* Date & Time */}
        <div className="text-right">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00F0FF]" />
            <span className="font-mono text-lg font-bold text-[#00F0FF] neon-text">
              {currentTime}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{currentDate}</p>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-[rgba(0,240,255,0.2)]" />

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-[rgba(0,240,255,0.1)]"
        >
          <Bell className="w-5 h-5" />
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-[#EF4444] text-[10px] font-bold text-foreground border-0"
          >
            3
          </Badge>
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="w-10 h-10 rounded-full bg-[rgba(0,240,255,0.1)] text-[#00F0FF] hover:bg-[rgba(0,240,255,0.2)] border border-[rgba(0,240,255,0.3)]"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
