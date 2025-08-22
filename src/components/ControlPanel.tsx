import React from 'react';
import { Play, Pause, RotateCcw, Shield, AlertTriangle, Zap } from 'lucide-react';
import { NetworkNode } from '../types';

interface ControlPanelProps {
  isSimulationRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  nodes: NetworkNode[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isSimulationRunning,
  onStart,
  onStop,
  onReset,
  nodes
}) => {
  const safeNodes = nodes.filter(n => n.status === 'safe').length;
  const underAttackNodes = nodes.filter(n => n.status === 'under-attack').length;
  const compromisedNodes = nodes.filter(n => n.status === 'compromised').length;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-400" />
        Attack Simulation Control
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{safeNodes}</div>
          <div className="text-sm text-green-300">Safe Systems</div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{underAttackNodes}</div>
          <div className="text-sm text-amber-300">Under Attack</div>
        </div>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{compromisedNodes}</div>
          <div className="text-sm text-red-300">Compromised</div>
        </div>
      </div>

      <div className="flex gap-3">
        {!isSimulationRunning ? (
          <button
            onClick={onStart}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Simulation
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <Pause className="w-5 h-5" />
            Stop Simulation
          </button>
        )}
        
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-white">Simulation Status</span>
        </div>
        <div className="text-sm text-gray-300">
          {isSimulationRunning ? (
            <span className="text-green-400">● Active - Monitoring network for threats</span>
          ) : (
            <span className="text-gray-400">○ Stopped - Click start to begin simulation</span>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-3 h-3" />
          Simulated attack events are generated every 2-5 seconds
        </div>
        <div>This is a demonstration tool using synthetic data</div>
      </div>
    </div>
  );
};

export default ControlPanel;