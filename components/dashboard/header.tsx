const handleStartBlast = async () => {
  if(!confirm("Mulai kirim tagihan ke semua antrean?")) return;
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "START_BLAST" }),
    });
    alert("Perintah Blast terkirim ke Laptop!");
  } catch (e) { alert("Laptop tidak terjangkau!"); }
}
