export async function GET() {
  const res = await fetch(process.env.API_URL!, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return new Response("Failed to fetch devices", { status: res.status });
  }

  return res;
}
