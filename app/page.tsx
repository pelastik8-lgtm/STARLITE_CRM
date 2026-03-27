import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { CustomerTable } from "@/components/dashboard/customer-table"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B1120] grid-bg">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Top Row - Metric Cards */}
          <MetricCards />
          
          {/* Middle Section - Activity Log */}
          <ActivityLog />
          
          {/* Bottom Section - Customer Table */}
          <CustomerTable />
        </div>
        
        {/* Footer */}
        <footer className="px-6 py-4 border-t border-[rgba(0,240,255,0.1)] glass-card">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>STARLITE CRM v2.4.1</span>
              <span className="text-[rgba(0,240,255,0.3)]">|</span>
              <span>NOC Command Center</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] pulse-dot" />
                All Systems Operational
              </span>
              <span className="text-[rgba(0,240,255,0.3)]">|</span>
              <span className="font-mono">Uptime: 99.97%</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
