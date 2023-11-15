export async function GET() {
  const latitude = 40.7143;
  const longitude = -74.006;
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=fahrenheit&hourly=temperature_2m,dew_point_2m,apparent_temperature&timezone=auto`)
    const data = await res.json()
   
    return Response.json({ data })
  }