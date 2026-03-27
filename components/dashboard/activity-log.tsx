"use client"
import { useEffect, useState } from "react"

// Tambahkan Interface ini agar TypeScript tidak bingung
interface LogEntry {
  timestamp: string;
  message: string;
  type: string;
}

export function ActivityLog() {
  // Berikan tipe <LogEntry[]> pada useState
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logs`)
        const data = await res.json()
        setLogs(data)
      } catch (e) { console.log("Waiting for logs...") }
    }
    const interval = setInterval(fetchLogs, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-card rounded-xl border border-[rgba(0,240,255,0.1)] overflow-hidden">
      <div className="bg-[#050A15] p-4 h-[300px] overflow-y-auto font-mono text-xs">
        {logs.map((log, i) => (
          <div key={i} className="mb-2">
            <span className="text-gray-500">[{log.timestamp}]</span>{" "}
            <span className={log.type === 'success' ? "text-green-400" : "text-cyan-400"}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
