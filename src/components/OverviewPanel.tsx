import React from 'react';
import { AlertTriangle, Server, Database } from 'lucide-react';

interface OverviewPanelProps {
  totalSystems: number;
  totalAlerts: number;
  totalHosts: number;
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ totalSystems, totalAlerts, totalHosts }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Block Storage Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 rounded-lg p-4 flex items-center">
          <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
            <Database className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Storage Systems</p>
            <p className="text-white text-2xl font-semibold">{totalSystems}</p>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 flex items-center">
          <div className="bg-amber-500/20 p-3 rounded-lg mr-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Active Alerts</p>
            <p className="text-white text-2xl font-semibold">{totalAlerts}</p>
          </div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 flex items-center">
          <div className="bg-green-500/20 p-3 rounded-lg mr-4">
            <Server className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Connected Hosts</p>
            <p className="text-white text-2xl font-semibold">{totalHosts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;