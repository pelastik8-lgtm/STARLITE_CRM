"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Search, MoreHorizontal, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// 1. Interface yang bersih (hanya satu definisi)
interface Customer {
  id: string
  name: string
  phone: string
  status: string
  area: string
}

export function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)

  // 2. Fungsi fetch yang sudah diperbaiki
  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/api/customers`)
      if (!res.ok) throw new Error("Gagal mengambil data")
      const data = await res.json()
      setCustomers(data)
    } catch (e) {
      console.log("Gagal mengambil data pelanggan atau server offline.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div className="glass-card rounded-xl overflow-hidden border border-[rgba(0,240,255,0.1)]">
      {/* Header Tabel */}
      <div className="px-6 py-4 border-b border-[rgba(0,240,255,0.1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[rgba(239,68,68,0.1)]">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Real Customer Data</h2>
              <p className="text-sm text-muted-foreground">Monitoring antrean tagihan di laptop</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={fetchCustomers}
              className={cn("border-[rgba(0,240,255,0.2)]", loading && "animate-spin")}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 w-48 bg-[#050A15] border-[rgba(0,240,255,0.2)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Area Tabel */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[rgba(0,240,255,0.1)]">
              <TableHead className="text-muted-foreground">ID PELANGGAN</TableHead>
              <TableHead className="text-muted-foreground">NAMA</TableHead>
              <TableHead className="text-muted-foreground">WILAYAH</TableHead>
              <TableHead className="text-muted-foreground">STATUS</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground italic">
                  {loading ? "Sedang menyambungkan ke laptop..." : "Tidak ada data pelanggan yang ditemukan."}
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.id} className="border-b border-[rgba(0,240,255,0.05)] hover:bg-[rgba(0,240,255,0.03)]">
                  <TableCell className="font-mono text-[#00F0FF]">{customer.id}</TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-muted-foreground text-xs uppercase">{customer.area}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "border-0 px-2 py-0.5", 
                      customer.status === "SUSPEND" ? "bg-red-500/20 text-red-400" : "bg-orange-500/20 text-orange-400"
                    )}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#0B1120] border-[rgba(0,240,255,0.2)]">
                        <DropdownMenuItem className="cursor-pointer">Re-Blast WA</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Detail Info</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
