"use client"

import { AlertTriangle, Search, Filter, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Customer {
  id: string
  name: string
  phone: string
  status: "SUSPEND" | "JATUH TEMPO"
  package: string
  dueDate: string
}

const customers: Customer[] = [
  { id: "CUS-001247", name: "Ahmad Wijaya", phone: "0812-3456-7890", status: "SUSPEND", package: "Premium 50Mbps", dueDate: "2024-01-15" },
  { id: "CUS-001248", name: "Siti Rahayu", phone: "0857-2341-8956", status: "JATUH TEMPO", package: "Basic 20Mbps", dueDate: "2024-01-20" },
  { id: "CUS-001249", name: "Budi Santoso", phone: "0878-9012-3456", status: "SUSPEND", package: "Business 100Mbps", dueDate: "2024-01-10" },
  { id: "CUS-001250", name: "Dewi Lestari", phone: "0813-5567-8901", status: "JATUH TEMPO", package: "Premium 50Mbps", dueDate: "2024-01-22" },
  { id: "CUS-001251", name: "Eko Prasetyo", phone: "0821-3344-5566", status: "JATUH TEMPO", package: "Basic 20Mbps", dueDate: "2024-01-25" },
  { id: "CUS-001252", name: "Fitri Handayani", phone: "0856-7788-9900", status: "SUSPEND", package: "Premium 50Mbps", dueDate: "2024-01-08" },
  { id: "CUS-001253", name: "Gunawan Setiawan", phone: "0819-1122-3344", status: "JATUH TEMPO", package: "Business 100Mbps", dueDate: "2024-01-28" },
  { id: "CUS-001254", name: "Hana Putri", phone: "0877-5566-7788", status: "SUSPEND", package: "Basic 20Mbps", dueDate: "2024-01-05" },
]

export function CustomerTable() {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[rgba(0,240,255,0.1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[rgba(239,68,68,0.1)]">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Customers at Risk</h2>
              <p className="text-sm text-muted-foreground">Suspend & Jatuh Tempo accounts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers..." 
                className="pl-9 w-64 bg-[rgba(15,23,42,0.8)] border-[rgba(0,240,255,0.2)] text-foreground placeholder:text-muted-foreground focus-visible:ring-[#00F0FF]"
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="border-[rgba(0,240,255,0.2)] bg-[rgba(15,23,42,0.8)] text-muted-foreground hover:text-foreground hover:bg-[rgba(0,240,255,0.1)] hover:border-[#00F0FF]"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[rgba(0,240,255,0.1)] hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ID</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer Name</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Package</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Due Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow 
                key={customer.id}
                className="border-b border-[rgba(0,240,255,0.05)] hover:bg-[rgba(0,240,255,0.03)] transition-colors"
              >
                <TableCell className="font-mono text-sm text-[#00F0FF]">
                  {customer.id}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {customer.name}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {customer.phone}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {customer.package}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {customer.dueDate}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "font-semibold text-xs px-3 py-1 border-0",
                      customer.status === "SUSPEND" 
                        ? "bg-[rgba(239,68,68,0.15)] text-[#EF4444]" 
                        : "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]"
                    )}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-[rgba(0,240,255,0.1)]"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end"
                      className="bg-[#0F172A] border-[rgba(0,240,255,0.2)]"
                    >
                      <DropdownMenuItem className="text-foreground focus:bg-[rgba(0,240,255,0.1)] focus:text-[#00F0FF]">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground focus:bg-[rgba(0,240,255,0.1)] focus:text-[#00F0FF]">
                        Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-foreground focus:bg-[rgba(0,240,255,0.1)] focus:text-[#00F0FF]">
                        Contact Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[rgba(0,240,255,0.1)] flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{customers.length}</span> customers at risk
        </p>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-[rgba(0,240,255,0.2)] bg-transparent text-muted-foreground hover:text-foreground hover:bg-[rgba(0,240,255,0.1)] hover:border-[#00F0FF]"
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[rgba(0,240,255,0.2)] bg-transparent text-muted-foreground hover:text-foreground hover:bg-[rgba(0,240,255,0.1)] hover:border-[#00F0FF]"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
