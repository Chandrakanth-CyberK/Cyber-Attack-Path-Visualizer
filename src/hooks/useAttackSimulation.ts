import { useState, useEffect, useRef } from 'react';
import { AttackEvent, NetworkNode, NetworkEdge } from '../types';
import { initialNetworkData } from '../data/networkData';

const attackScenarios = [
  {
    step: 'Initial Access',
    techniques: ['Phishing Email', 'Drive-by Download', 'Supply Chain Attack'],
    targets: ['workstation-01', 'workstation-02', 'workstation-03']
  },
  {
    step: 'Execution',
    techniques: ['PowerShell', 'Command Line Interface', 'Scheduled Task'],
    targets: ['workstation-01', 'workstation-02', 'workstation-03']
  },
  {
    step: 'Persistence',
    techniques: ['Registry Run Keys', 'Scheduled Task', 'Service Installation'],
    targets: ['workstation-01', 'workstation-02', 'workstation-03']
  },
  {
    step: 'Privilege Escalation',
    techniques: ['Token Impersonation', 'Process Injection', 'Exploit Vulnerabilities'],
    targets: ['workstation-03', 'server-01', 'server-02']
  },
  {
    step: 'Lateral Movement',
    techniques: ['Remote Services', 'Pass the Hash', 'Remote File Copy'],
    targets: ['server-01', 'server-02', 'database-01']
  },
  {
    step: 'Collection',
    techniques: ['Data from Local System', 'Screen Capture', 'Keylogging'],
    targets: ['database-01', 'database-02', 'server-02']
  },
  {
    step: 'Exfiltration',
    techniques: ['Exfiltration Over C2 Channel', 'Data Transfer Size Limits'],
    targets: ['database-01', 'database-02']
  }
];

export const useAttackSimulation = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNetworkData.nodes);
  const [edges, setEdges] = useState<NetworkEdge[]>(initialNetworkData.edges);
  const [attackEvents, setAttackEvents] = useState<AttackEvent[]>([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const eventCounterRef = useRef(0);

  const generateAttackEvent = (): AttackEvent => {
    const scenario = attackScenarios[Math.floor(Math.random() * attackScenarios.length)];
    const technique = scenario.techniques[Math.floor(Math.random() * scenario.techniques.length)];
    const target = scenario.targets[Math.floor(Math.random() * scenario.targets.length)];
    
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    
    eventCounterRef.current += 1;
    
    const severities: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    return {
      id: `event-${eventCounterRef.current}`,
      timestamp,
      step: scenario.step,
      target,
      technique,
      description: `${technique} detected on ${target}`,
      severity
    };
  };

  const updateNodeStatus = (targetId: string, status: NetworkNode['status']) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === targetId ? { ...node, status } : node
      )
    );
    
    // Update connected edges if node is compromised
    if (status === 'compromised') {
      setEdges(prevEdges => 
        prevEdges.map(edge => 
          (edge.source === targetId || edge.target === targetId) 
            ? { ...edge, compromised: true }
            : edge
        )
      );
    }
  };

  const startSimulation = () => {
    if (isSimulationRunning) return;
    
    setIsSimulationRunning(true);
    
    intervalRef.current = setInterval(() => {
      const event = generateAttackEvent();
      
      setAttackEvents(prev => [event, ...prev.slice(0, 49)]); // Keep last 50 events
      
      // Update node status based on attack progression
      const currentNode = nodes.find(n => n.id === event.target);
      if (currentNode) {
        if (event.step === 'Initial Access' || event.step === 'Execution') {
          updateNodeStatus(event.target, 'under-attack');
        } else if (event.step === 'Privilege Escalation' || event.step === 'Lateral Movement') {
          updateNodeStatus(event.target, 'compromised');
        }
      }
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
  };

  const stopSimulation = () => {
    setIsSimulationRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetSimulation = () => {
    stopSimulation();
    setNodes(initialNetworkData.nodes);
    setEdges(initialNetworkData.edges);
    setAttackEvents([]);
    eventCounterRef.current = 0;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    nodes,
    edges,
    attackEvents,
    isSimulationRunning,
    startSimulation,
    stopSimulation,
    resetSimulation
  };
};