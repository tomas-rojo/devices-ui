'use client';

import { Device } from '@/types/device';
import { DeviceCard } from './DeviceCard';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';

interface DeviceListProps {
  devices: Device[];
}

export function DeviceList({ devices }: DeviceListProps) {
  const onlineDevices = devices.filter(device => device.status === 'online').length;
  const offlineDevices = devices.filter(device => device.status === 'offline').length;

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Network className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Network Devices</h1>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {onlineDevices} Online
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {offlineDevices} Offline
          </Badge>
        </div>
      </div>

      {/* Device grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <DeviceCard key={device.mac_address} device={device} />
        ))}
      </div>

      {devices.length === 0 && (
        <div className="text-center py-12">
          <Network className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">No devices found</h3>
          <p className="text-muted-foreground">Check your network connection and try again.</p>
        </div>
      )}
    </div>
  );
}