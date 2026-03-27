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
  Bot,
  ChevronRight,
  LogOut,
} from "lucide-react"

const navItems = [
  { icon: Home, label: "Dashboard", href: "#", active: true },
  { icon: Users, label: "Customer Monitor", href: "#" },
  { icon: AlertTriangle, label: "Trouble Tickets", href: "#" },
  { icon: Send, label: "Manual Blast", href: "#" },
  { icon: Settings, label: "AI Settings", href: "#" },
]

export function Sidebar() {
  const [aiActive, setAiActive] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("jebres")

  // FUNGSI PERINTAH KE LAPTOP
  const handleToggleAI = async (checked: boolean) => {
    setAiActive(checked)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "TOGGLE_AI" }),
      })
      
      if (!response.ok) throw new Error("Server tidak merespon")
      console.log("Sinyal AI Toggle terkirim!")
    } catch (err) {
      alert("Gagal konek ke Laptop. Pastikan Python v8.9.5 dan Ngrok sudah jalan!")
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 glass-card border-r border-[rgba(0,240,255,0.1)] flex flex-col">
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            <span className="text-[#0B1120] font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground uppercase">Starlite</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                  item.active 
                    ? "bg-[rgba(0,240,255,0.1)] text-[#00F0FF] border border-[rgba(0,240,255,0.2)]" 
                    : "text-muted-foreground hover:bg-[rgba(255,255,255,0.03)] hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", item.active ? "text-[#00F0FF]" : "text-muted-foreground")} />
                <span className="text-sm font-medium">{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4 ml-auto text-[#00F0FF]" />}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Region & AI Switch Control */}
      <div className="p-4 space-y-4 border-t border-[rgba(0,240,255,0.1)]">
        {/* Region Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select Region</label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full bg-[#050A15] border-[rgba(0,240,255,0.2)] text-xs h-9">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-[#0B1120] border-[rgba(0,240,255,0.2)]">
              <SelectItem value="jebres">Solo Jebres</SelectItem>
              <SelectItem value="pucangsawit">Pucang Sawit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Control Card */}
        <div className="p-3 bg-[rgba(0,240,255,0.05)] rounded-xl border border-[rgba(0,240,255,0.1)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className={cn("w-5 h-5", aiActive ? "text-[#00F0FF]" : "text-muted-foreground")} />
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            <Switch 
              checked={aiActive} 
              onCheckedChange={handleToggleAI}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">
            Status: {aiActive ? "Listening..." : "Standby"}
          </p>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          <span>Disconnect Server</span>
        </button>
      </div>
    </aside>
  )
}
