export interface NetworkNode {
  id: string;
  name: string;
  type: 'workstation' | 'server' | 'database' | 'firewall' | 'router';
  status: 'safe' | 'under-attack' | 'compromised';
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  type: 'trust' | 'network' | 'database';
  compromised?: boolean;
}

export interface AttackEvent {
  id: string;
  timestamp: string;
  step: string;
  target: string;
  technique: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}