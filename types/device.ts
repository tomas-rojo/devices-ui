export interface Device {
  name: string;
  mac_address: string;
  firmware_version: string;
  ip_address: string;
  status: 'online' | 'offline';
  last_seen: string;
}