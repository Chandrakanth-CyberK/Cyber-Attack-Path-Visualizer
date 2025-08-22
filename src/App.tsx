import React from 'react';
import NetworkGraph from './components/NetworkGraph';
import AttackLogs from './components/AttackLogs';
import ControlPanel from './components/ControlPanel';
import { useAttackSimulation } from './hooks/useAttackSimulation';
import { Shield, Activity } from 'lucide-react';

function App() {
  const {
    nodes,
    edges,
    attackEvents,
    isSimulationRunning,
    startSimulation,
    stopSimulation,
    resetSimulation
  } = useAttackSimulation();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold">Cybersecurity Attack Path Visualizer</h1>
            <p className="text-gray-400 text-sm">Real-time network security monitoring and attack simulation</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Activity className={`w-5 h-5 ${isSimulationRunning ? 'text-green-400 animate-pulse' : 'text-gray-500'}`} />
            <span className="text-sm">
              {isSimulationRunning ? 'Monitoring Active' : 'Monitoring Stopped'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="xl:col-span-1">
            <ControlPanel
              isSimulationRunning={isSimulationRunning}
              onStart={startSimulation}
              onStop={stopSimulation}
              onReset={resetSimulation}
              nodes={nodes}
            />
          </div>

          {/* Network Graph */}
          <div className="xl:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">Network Topology</h2>
              <p className="text-gray-400 text-sm">Interactive visualization of network infrastructure and attack paths</p>
            </div>
            <NetworkGraph 
              nodes={nodes} 
              edges={edges} 
              width={800} 
              height={600} 
            />
            <div className="mt-4 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-gray-300">Under Attack</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Compromised</span>
              </div>
            </div>
          </div>

          {/* Attack Logs */}
          <div className="xl:col-span-1">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">Attack Timeline</h2>
              <p className="text-gray-400 text-sm">MITRE ATT&CK style event logging</p>
            </div>
            <AttackLogs events={attackEvents} />
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-2">Attack Simulation</h4>
              <p className="text-gray-400">
                This tool simulates cyberattack scenarios based on the MITRE ATT&CK framework, 
                showing how threats move through network infrastructure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Interactive Visualization</h4>
              <p className="text-gray-400">
                Drag nodes to reposition them, zoom in/out for details, and watch real-time 
                status changes as attacks progress through the network.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Real-time Updates</h4>
              <p className="text-gray-400">
                Events are generated dynamically and update the visualization instantly, 
                providing insights into attack patterns and system vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;