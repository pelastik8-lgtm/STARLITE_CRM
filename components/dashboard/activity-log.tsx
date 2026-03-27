"use client"

import { useEffect, useState } from "react"
import { Terminal, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogEntry {
  id: number
  timestamp: string
  type: "success" | "warning" | "error" | "info"
  message: string
}

const initialLogs: LogEntry[] = [
  { id: 1, timestamp: "14:32:05", type: "success", message: "AI Blast to 0812-xxxx-7845 - Message delivered successfully" },
  { id: 2, timestamp: "14:32:03", type: "success", message: "AI Blast to 0857-xxxx-2341 - Message delivered successfully" },
  { id: 3, timestamp: "14:32:01", type: "info", message: "Processing batch #1247 - 15 customers remaining" },
  { id: 4, timestamp: "14:31:58", type: "warning", message: "Customer ID #8892 - Phone number invalid, skipped" },
  { id: 5, timestamp: "14:31:55", type: "success", message: "AI Blast to 0878-xxxx-9012 - Message delivered successfully" },
  { id: 6, timestamp: "14:31:52", type: "success", message: "AI Blast to 0813-xxxx-5567 - Message delivered successfully" },
  { id: 7, timestamp: "14:31:50", type: "info", message: "WA Server heartbeat - Connection stable" },
  { id: 8, timestamp: "14:31:47", type: "error", message: "Rate limit reached - Cooling down for 30s" },
  { id: 9, timestamp: "14:31:45", type: "success", message: "AI Blast to 0821-xxxx-3344 - Message delivered successfully" },
  { id: 10, timestamp: "14:31:42", type: "info", message: "Batch #1246 completed - 50/50 messages sent" },
]

const newLogMessages = [
  { type: "success" as const, message: "AI Blast to 0856-xxxx-1234 - Message delivered successfully" },
  { type: "success" as const, message: "AI Blast to 0819-xxxx-5678 - Message delivered successfully" },
  { type: "info" as const, message: "System health check - All services operational" },
  { type: "warning" as const, message: "Customer ID #9001 - Duplicate entry detected" },
  { type: "success" as const, message: "AI Blast to 0877-xxxx-9999 - Message delivered successfully" },
]

export function ActivityLog() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = newLogMessages[Math.floor(Math.random() * newLogMessages.length)]
      const now = new Date()
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      
      setLogs(prevLogs => [
        { 
          id: Date.now(), 
          timestamp, 
          type: randomLog.type, 
          message: randomLog.message 
        },
        ...prevLogs.slice(0, 19)
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "text-[#10B981]"
      case "warning": return "text-[#F59E0B]"
      case "error": return "text-[#EF4444]"
      case "info": return "text-[#00F0FF]"
    }
  }

  const getTypeLabel = (type: LogEntry["type"]) => {
    switch (type) {
      case "success": return "SUCCESS"
      case "warning": return "WARNING"
      case "error": return "ERROR"
      case "info": return "INFO"
    }
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[rgba(0,240,255,0.1)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#00F0FF]" />
          <h2 className="text-lg font-semibold text-foreground">Live Activity Log</h2>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 fill-[#10B981] text-[#10B981] pulse-dot" />
          <span className="text-xs font-mono text-[#10B981]">LIVE</span>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-[#050A15] p-4 h-[280px] overflow-y-auto terminal-scroll font-mono text-sm">
        {logs.map((log, index) => (
          <div 
            key={log.id}
            className={cn(
              "flex items-start gap-3 py-1.5 border-b border-[rgba(255,255,255,0.03)] last:border-0",
              index === 0 && "animate-in fade-in slide-in-from-top-2 duration-300"
            )}
          >
            <span className="text-muted-foreground shrink-0">[{log.timestamp}]</span>
            <span className={cn("shrink-0 w-16", getTypeColor(log.type))}>
              [{getTypeLabel(log.type)}]
            </span>
            <span className="text-foreground/90">{log.message}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-[rgba(0,240,255,0.1)] bg-[rgba(5,10,21,0.5)]">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing last 20 entries</span>
          <span className="font-mono">Auto-refresh: 3s</span>
        </div>
      </div>
    </div>
  )
}
