"use client"

import { useEffect, useState } from "react"
import { Target, Send, Ticket } from "lucide-react"

export function MetricCards() {
  const [stats, setStats] = useState({
    total_target: 0,
    messages_sent: 0,
    pending_tickets: 0
  })

  // Fungsi menyedot data dari Laptop (Python)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/stats`)
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.log("Python Server belum aktif / Ngrok mati.")
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Update otomatis tiap 5 detik
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Target Card */}
      <div className="glass-card rounded-xl p-6 border border-[rgba(0,240,255,0.1)]">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-5 h-5 text-[#00F0FF]" />
          <span className="text-xs font-semibold text-muted-foreground uppercase">Total Target</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{stats.total_target.toLocaleString()}</p>
        <p className="text-xs text-[#10B981] mt-2">Data Real-time dari Database</p>
      </div>

      {/* Sent Card */}
      <div className="glass-card rounded-xl p-6 border border-[rgba(0,240,255,0.1)]">
        <div className="flex items-center gap-3 mb-4">
          <Send className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-semibold text-muted-foreground uppercase">Messages Sent</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{stats.messages_sent.toLocaleString()}</p>
        <p className="text-xs text-[#10B981] mt-2">Total Terkirim Hari Ini</p>
      </div>

      {/* Ticket Card */}
      <div className="glass-card rounded-xl p-6 border border-[rgba(0,240,255,0.1)]">
        <div className="flex items-center gap-3 mb-4">
          <Ticket className="w-5 h-5 text-[#F59E0B]" />
          <span className="text-xs font-semibold text-muted-foreground uppercase">Pending Tickets</span>
        </div>
        <p className="text-3xl font-bold text-foreground">{stats.pending_tickets}</p>
        <p className="text-xs text-[#EF4444] mt-2">Segera tindak lanjuti</p>
      </div>
    </div>
  )
}
