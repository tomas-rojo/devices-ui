'use client';

import { useEffect, useState } from 'react';
import { DeviceList } from '@/components/DeviceList';
import { Device } from '@/types/device';

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch("https://get-devices-439516416022.europe-west1.run.app", {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data: Device[] = await res.json();
        setDevices(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch devices");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading devices...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DeviceList devices={devices} />
      </div>
    </div>
  );
}
