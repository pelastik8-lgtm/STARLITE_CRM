"use client"

import { Target, Send, Ticket } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  chart: React.ReactNode
  accentColor: string
}

function MetricCard({ title, value, subtitle, icon, chart, accentColor }: MetricCardProps) {
  return (
    <div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-[rgba(0,240,255,0.3)] transition-all duration-300">
      {/* Background Glow Effect */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
        style={{ background: accentColor }}
      />
      
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div 
              className="p-2 rounded-lg"
              style={{ background: `${accentColor}20` }}
            >
              {icon}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </span>
          </div>
          
          <div>
            <p className="text-3xl font-bold font-mono text-foreground tracking-tight">
              {value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          </div>
        </div>
        
        <div className="w-20 h-20">
          {chart}
        </div>
      </div>
    </div>
  )
}

// Donut chart for Total Target
const targetData = [
  { name: "Completed", value: 847 },
  { name: "Remaining", value: 403 },
]

// Sparkline data for Messages Sent
const messageData = [
  { value: 120 },
  { value: 180 },
  { value: 150 },
  { value: 220 },
  { value: 190 },
  { value: 280 },
  { value: 342 },
]

// Donut chart for Pending Tickets
const ticketData = [
  { name: "Resolved", value: 45 },
  { name: "Pending", value: 23 },
]

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Target */}
      <MetricCard
        title="Total Target"
        value="1,250"
        subtitle="Customers this cycle"
        icon={<Target className="w-5 h-5 text-[#00F0FF]" />}
        accentColor="#00F0FF"
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={targetData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill="#00F0FF" />
                <Cell fill="rgba(0,240,255,0.2)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        }
      />

      {/* Messages Sent */}
      <MetricCard
        title="Messages Sent"
        value="2,847"
        subtitle="+342 today"
        icon={<Send className="w-5 h-5 text-[#10B981]" />}
        accentColor="#10B981"
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={messageData}>
              <defs>
                <linearGradient id="messageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#messageGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        }
      />

      {/* Pending Tickets */}
      <MetricCard
        title="Pending Tickets"
        value="23"
        subtitle="45 resolved today"
        icon={<Ticket className="w-5 h-5 text-[#F59E0B]" />}
        accentColor="#F59E0B"
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ticketData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        }
      />
    </div>
  )
}
