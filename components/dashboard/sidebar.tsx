"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Home,
  Users,
  AlertTriangle,
  Send,
  Settings,
  Wifi,
  Bot,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { icon: Home, label: "Dashboard", href: "#", active: true },
  { icon: Users, label: "Customer Monitor", href: "#" },
  { icon: AlertTriangle, label: "Trouble Tickets", href: "#" },
  { icon: Send, label: "Manual Blast", href: "#" },
  { icon: Settings, label: "AI Settings", href: "#" },
]

const regions = [
  { value: "jakarta", label: "Jakarta Region" },
  { value: "surabaya", label: "Surabaya Region" },
  { value: "bandung", label: "Bandung Region" },
  { value: "medan", label: "Medan Region" },
]

export function Sidebar() {
  const [aiActive, setAiActive] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState("jakarta")

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 glass-card border-r border-[rgba(0,240,255,0.1)] flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-[rgba(0,240,255,0.1)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-[#00F0FF] pulse-dot" />
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00F0FF] opacity-50 blur-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground neon-text">
            STARLITE CRM
          </span>
        </div>
      </div>

      {/* System Status Card */}
      <div className="p-4">
        <div className="glass-card rounded-lg p-4 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            System Status
          </h3>
          
          {/* WA Server Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm text-foreground">WA Server</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981] pulse-dot" />
              <span className="text-xs font-mono text-[#10B981]">CONNECTED</span>
            </div>
          </div>

          {/* AI Assistant Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#00F0FF]" />
              <span className="text-sm text-foreground">AI Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-xs font-mono transition-colors",
                aiActive ? "text-[#10B981]" : "text-muted-foreground"
              )}>
                {aiActive ? "ACTIVE" : "INACTIVE"}
              </span>
              <Switch
                checked={aiActive}
                onCheckedChange={setAiActive}
                className="data-[state=checked]:bg-[#00F0FF]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                  item.active
                    ? "bg-[rgba(0,240,255,0.1)] text-[#00F0FF] neon-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-[rgba(0,240,255,0.05)]"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  item.active ? "text-[#00F0FF]" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span>{item.label}</span>
                {item.active && (
                  <ChevronRight className="w-4 h-4 ml-auto text-[#00F0FF]" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Region Selection */}
      <div className="p-4 border-t border-[rgba(0,240,255,0.1)]">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
          Region Selection
        </label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full bg-[rgba(15,23,42,0.8)] border-[rgba(0,240,255,0.2)] text-foreground focus:ring-[#00F0FF] focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0F172A] border-[rgba(0,240,255,0.2)]">
            {regions.map((region) => (
              <SelectItem
                key={region.value}
                value={region.value}
                className="text-foreground focus:bg-[rgba(0,240,255,0.1)] focus:text-[#00F0FF]"
              >
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  )
}
