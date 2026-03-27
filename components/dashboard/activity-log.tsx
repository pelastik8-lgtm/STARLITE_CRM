"use client"

import { useEffect, useState } from "react"
import { Terminal, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// 1. Definisikan Interface agar TypeScript tidak bingung (Fix error 'never')
interface LogEntry {
  timestamp: string
  message: string
  type: "success" | "warning" | "error" | "info"
}

export function ActivityLog() {
  // 2. Berikan tipe <LogEntry[]> pada state
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
    const interval = setInterval(fetchLogs, 3000) // Update tiap 3 detik
    return () => clearInterval(interval)
  }, [])

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
    <div className="glass-card rounded-xl overflow-hidden border border-[rgba(0,240,255,0.1)]">
      <div className="px-6 py-4 border-b border-[rgba(0,240,255,0.1)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#00F0FF]" />
          <h2 className="text-lg font-semibold text-foreground">Live Activity Log</h2>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 fill-[#10B981] text-[#10B981] pulse-dot" />
          <span className="text-xs font-mono text-[#10B981]">LIVE FROM ENGINE</span>
        </div>
      </div>

      <div className="bg-[#050A15] p-4 h-[280px] overflow-y-auto terminal-scroll font-mono text-sm">
        {logs.length === 0 ? (
          <div className="text-muted-foreground italic">Menunggu log dari laptop...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 py-1.5 border-b border-[rgba(255,255,255,0.03)] last:border-0">
              <span className="text-muted-foreground shrink-0">[{log.timestamp}]</span>
              <span className={cn("shrink-0", getTypeColor(log.type))}>
                [{log.type.toUpperCase()}]
              </span>
              <span className="text-foreground/90">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
