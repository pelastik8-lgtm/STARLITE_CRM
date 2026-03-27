"use client"
import { useEffect, useState } from "react"

// Tambahkan Interface Customer sesuai data dari Python
interface Customer {
  id: string;
  name: string;
  phone: string;
  status: string;
  area: string;
}

export function CustomerTable() {
  // Berikan tipe <Customer[]> pada useState
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchCust = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`)
        const data = await res.json()
        setCustomers(data)
      } catch (e) { console.log("Waiting for data...") }
    }
    fetchCust()
  }, [])

  return (
    <div className="rounded-xl border border-[rgba(0,240,255,0.1)] bg-[#151C2C]/50 overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#0B1120] text-gray-400">
          <tr>
            <th className="p-4">ID PELANGGAN</th>
            <th className="p-4">NAMA</th>
            <th className="p-4">STATUS</th>
            <th className="p-4">AKSI</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t border-[rgba(0,240,255,0.05)]">
              <td className="p-4 font-mono text-[#00F0FF]">{c.id}</td>
              <td className="p-4">{c.name}</td>
              <td className="p-4">
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                  {c.status}
                </span>
              </td>
              <td className="p-4">
                <button className="text-xs bg-[#00F0FF] text-black px-3 py-1 rounded font-bold">
                  RE-BLAST
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
