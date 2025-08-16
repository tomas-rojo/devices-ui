'use client';

import { Device } from '@/types/device';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Network, Router, Wifi } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DeviceCardProps {
  device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const getStatusColor = (status: string) => {
    return status === 'online' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getDeviceIcon = (name: string) => {
    if (name.toLowerCase().includes('router')) return <Router className="h-5 w-5" />;
    if (name.toLowerCase().includes('switch')) return <Network className="h-5 w-5" />;
    if (name.toLowerCase().includes('access point')) return <Wifi className="h-5 w-5" />;
    return <Network className="h-5 w-5" />;
  };

  const formatLastSeen = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            {getDeviceIcon(device.name)}
            {device.name}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${getStatusColor(device.status)} font-medium`}
          >
            {device.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">IP Address</span>
            <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
              {device.ip_address}
            </code>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">MAC Address</span>
            <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
              {device.mac_address}
            </code>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Firmware</span>
            <span className="text-sm font-semibold">v{device.firmware_version}</span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-border/50">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Last Seen
            </span>
            <span className="text-sm">{formatLastSeen(device.last_seen)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}