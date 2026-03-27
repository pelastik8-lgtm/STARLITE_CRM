"use client"

import { Bell, Clock, Send, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("")

  // FUNGSI UTAMA: START BLAST
  const handleStartBlast = async () => {
    if (!confirm("Konfirmasi: Jalankan Auto-Blast ke semua antrean hari ini?")) return
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const res = await fetch(`${apiUrl}/api/command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "START_BLAST" }),
      })
      
      if (res.ok) {
        alert("🚀 Perintah Blast Diterima! Cek Activity Log untuk memantau proses.")
      }
    } catch (err) {
      alert("⚠️ Gagal terhubung ke Laptop. Pastikan Ngrok & Python sudah ON!")
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-16 glass-card border-b border-[rgba(0,240,255,0.1)] flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Command Center</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-tighter">Real-time System Overview</p>
      </div>

      <div className="flex items-center gap-4">
        {/* TOMBOL START BLAST STRATEGIS */}
        <Button 
          onClick={handleStartBlast}
          className="bg-[#10B981] hover:bg-[#059669] text-black font-bold flex gap-2 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        >
          <Play className="w-4 h-4 fill-black" />
          RUN AUTO-BLAST
        </Button>

        <div className="h-8 w-px bg-[rgba(0,240,255,0.2)] mx-2" />
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00F0FF]" />
            <span className="font-mono text-lg font-bold text-[#00F0FF]">{currentTime}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
