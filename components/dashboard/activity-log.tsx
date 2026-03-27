"use client"

import { useEffect, useState } from "react"
import { Terminal, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// 1. Interface tunggal yang bersih
interface LogEntry {
  timestamp: string
  message: string
  type: "success" | "warning" | "error" | "info"
}

export function ActivityLog() {
  // 2. State untuk menampung log dari Python
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/logs`)
        if (!res.ok) return;
        
        const data = await res.json()
        setLogs(data)
      } catch (e) {
        console.log("Menunggu koneksi log dari Python...")
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 3000) // Update log tiap 3 detik
    return () => clearInterval(interval)
  }, [])

  // Helper untuk warna label log
  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "text-[#10B981]"
      case "warning": return "text-[#F59E0B]"
      case "error": return "text-[#EF4444]"
      case "info": return "text-[#00F0FF]"
      default: return "text-muted-foreground"
    }
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden border border-[rgba(0,240,255,0.1)] transition-all hover:border-[rgba(0,240,255,0.2)]">
      {/* Header Log */}
      <div className="px-6 py-4 border-b border-[rgba(0,240,255,0.1)] flex items-center justify-between bg-[rgba(15,23,42,0.5)]">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#00F0FF]" />
          <h2 className="text-lg font-semibold text-foreground tracking-tight">System Activity Log</h2>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 fill-[#10B981] text-[#10B981] animate-pulse" />
          <span className="text-[10px] font-bold font-mono text-[#10B981] tracking-widest uppercase">Live Engine</span>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="bg-[#050A15] p-4 h-[280px] overflow-y-auto terminal-scroll font-mono text-xs sm:text-sm">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground italic opacity-50">
            Menunggu data aktivitas dari laptop...
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 py-1.5 border-b border-[rgba(255,255,255,0.03)] last:border-0 hover:bg-white/5 px-2 rounded-sm transition-colors">
              <span className="text-muted-foreground shrink-0 text-[10px] sm:text-xs">[{log.timestamp}]</span>
              <span className={cn("shrink-0 font-bold uppercase text-[10px]", getTypeColor(log.type))}>
                [{log.type}]
              </span>
              <span className="text-foreground/90 leading-tight">{log.message}</span>
            </div>
          ))
        )}
      </div>
      
      {/* Footer Log */}
      <div className="px-6 py-2 border-t border-[rgba(0,240,255,0.05)] bg-[rgba(15,23,42,0.2)]">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em]">Auto-refreshing every 3 seconds</p>
      </div>
    </div>
  )
}
