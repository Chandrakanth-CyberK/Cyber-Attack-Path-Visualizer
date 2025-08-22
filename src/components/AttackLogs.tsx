import React from 'react';
import { AttackEvent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AttackLogsProps {
  events: AttackEvent[];
}

const AttackLogs: React.FC<AttackLogsProps> = ({ events }) => {
  const getSeverityColor = (severity: AttackEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-red-300 bg-red-900/10';
      case 'medium': return 'text-amber-300 bg-amber-900/10';
      case 'low': return 'text-blue-300 bg-blue-900/10';
      default: return 'text-gray-300 bg-gray-900/10';
    }
  };

  const getSeverityIcon = (severity: AttackEvent['severity']) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '📊';
      case 'low': return 'ℹ️';
      default: return '📝';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          Attack Timeline
        </h3>
        <div className="text-sm text-gray-400">
          {events.length} events
        </div>
      </div>
      
      <div className="font-mono text-sm overflow-y-auto max-h-96 space-y-2">
        <AnimatePresence initial={false}>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-3 rounded border-l-4 ${getSeverityColor(event.severity)} border-l-current`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{getSeverityIcon(event.severity)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-xs">
                      [{event.timestamp}]
                    </span>
                    <span className="font-medium text-white text-xs px-2 py-1 bg-gray-800 rounded">
                      {event.step}
                    </span>
                    <span className="text-xs text-gray-300 uppercase tracking-wide">
                      {event.severity}
                    </span>
                  </div>
                  <div className="text-current font-medium mb-1">
                    {event.technique} → {event.target}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {event.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {events.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            <div className="text-4xl mb-2">🔍</div>
            <div>No attack events detected</div>
            <div className="text-sm mt-1">Start the simulation to begin monitoring</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttackLogs;