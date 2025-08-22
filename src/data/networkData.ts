import { NetworkData } from '../types';

export const initialNetworkData: NetworkData = {
  nodes: [
    { id: 'workstation-01', name: 'WS-01 (HR Dept)', type: 'workstation', status: 'safe' },
    { id: 'workstation-02', name: 'WS-02 (Finance)', type: 'workstation', status: 'safe' },
    { id: 'workstation-03', name: 'WS-03 (IT Admin)', type: 'workstation', status: 'safe' },
    { id: 'server-01', name: 'Web Server', type: 'server', status: 'safe' },
    { id: 'server-02', name: 'File Server', type: 'server', status: 'safe' },
    { id: 'database-01', name: 'Customer DB', type: 'database', status: 'safe' },
    { id: 'database-02', name: 'Finance DB', type: 'database', status: 'safe' },
    { id: 'firewall-01', name: 'Perimeter FW', type: 'firewall', status: 'safe' },
    { id: 'router-01', name: 'Core Router', type: 'router', status: 'safe' }
  ],
  edges: [
    { source: 'firewall-01', target: 'router-01', type: 'network' },
    { source: 'router-01', target: 'server-01', type: 'network' },
    { source: 'router-01', target: 'workstation-01', type: 'network' },
    { source: 'router-01', target: 'workstation-02', type: 'network' },
    { source: 'router-01', target: 'workstation-03', type: 'network' },
    { source: 'server-01', target: 'database-01', type: 'database' },
    { source: 'server-02', target: 'database-02', type: 'database' },
    { source: 'workstation-03', target: 'server-02', type: 'trust' },
    { source: 'router-01', target: 'server-02', type: 'network' }
  ]
};