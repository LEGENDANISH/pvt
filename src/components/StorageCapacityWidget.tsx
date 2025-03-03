import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HardDrive, TrendingUp, Database } from 'lucide-react';

interface StorageCapacityWidgetProps {
  totalCapacity: number;
  usedCapacity: number;
  availableCapacity: number;
  dataReduction: number;
  provisionedStorage: number;
  efficiencyRate: number;
}

const StorageCapacityWidget: React.FC<StorageCapacityWidgetProps> = ({
  totalCapacity,
  usedCapacity,
  availableCapacity,
  dataReduction,
  provisionedStorage,
  efficiencyRate
}) => {
  const data = [
    { name: 'Used', value: usedCapacity, color: '#3b82f6' },
    { name: 'Available', value: availableCapacity, color: '#10b981' }
  ];

  const usedPercentage = Math.round((usedCapacity / totalCapacity) * 100);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-md shadow-lg border border-gray-700">
          <p className="text-sm text-white font-medium">{`${payload[0].name}: ${payload[0].value} TiB`}</p>
          <p className="text-xs text-gray-400">{`${Math.round((payload[0].value / totalCapacity) * 100)}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Storage Capacity</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="relative h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-white">{usedPercentage}%</p>
              <p className="text-sm text-gray-400">Used</p>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-300">Used ({usedCapacity} TiB)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-300">Available ({availableCapacity} TiB)</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <HardDrive className="h-5 w-5 text-blue-400 mr-2" />
              <h3 className="text-white font-medium">Total Capacity</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{totalCapacity} <span className="text-sm text-gray-400">TiB</span></p>
            <p className="text-xs text-gray-400 mt-1">Raw storage across all systems</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
              <h3 className="text-white font-medium">Data Reduction</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{dataReduction}:1</p>
            <p className="text-xs text-gray-400 mt-1">Compression & deduplication ratio</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Database className="h-5 w-5 text-purple-400 mr-2" />
              <h3 className="text-white font-medium">Provisioned</h3>
            </div>
            <p className="text-2xl font-semibold text-white">{provisionedStorage} <span className="text-sm text-gray-400">TiB</span></p>
            <p className="text-xs text-gray-400 mt-1">Total allocated storage</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 md:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Storage Efficiency</h3>
                <p className="text-xs text-gray-400">Overall system efficiency rate</p>
              </div>
              <p className="text-xl font-semibold text-white">{efficiencyRate}%</p>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ width: `${efficiencyRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageCapacityWidget;