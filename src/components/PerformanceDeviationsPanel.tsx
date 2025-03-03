import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PerformanceData } from '../types';

interface PerformanceDeviationsPanelProps {
  performanceData: PerformanceData[];
}

const PerformanceDeviationsPanel: React.FC<PerformanceDeviationsPanelProps> = ({ performanceData }) => {
  const getDeviationColor = (deviation: 'normal' | 'warning' | 'critical') => {
    switch (deviation) {
      case 'normal': return '#10b981'; // green
      case 'warning': return '#f59e0b'; // amber
      case 'critical': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-400" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-400" />;
      default: return null;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 rounded-md shadow-lg border border-gray-700">
          <p className="text-sm text-white font-medium">{data.name}</p>
          <p className="text-xs text-gray-400">Value: {data.value}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs mr-1">Trend:</span>
            {getTrendIcon(data.trend)}
          </div>
        </div>
      );
    }
    return null;
  };

  const getUnitLabel = (name: string) => {
    switch (name) {
      case 'I/O Rate': return 'IOPS';
      case 'Data Rate': return 'MB/s';
      case 'Response Time': return 'ms';
      case 'Transfer Size': return 'KB';
      default: return '';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Performance Deviations</h2>
        <div className="text-sm text-gray-400">Last 14 days</div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={performanceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis 
              dataKey="name" 
              type="category" 
              stroke="#9ca3af" 
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              background={{ fill: '#374151' }}
              radius={[0, 4, 4, 0]}
            >
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getDeviationColor(entry.deviation)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {performanceData.map((item) => (
          <div key={item.name} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium">{item.name}</h3>
              <div className={`
                flex items-center justify-center rounded-full w-6 h-6
                ${item.deviation === 'normal' ? 'bg-green-500/20' : 
                  item.deviation === 'warning' ? 'bg-amber-500/20' : 'bg-red-500/20'}
              `}>
                <AlertCircle className={`h-4 w-4 
                  ${item.deviation === 'normal' ? 'text-green-500' : 
                    item.deviation === 'warning' ? 'text-amber-500' : 'text-red-500'}
                `} />
              </div>
            </div>
            <div className="flex items-end">
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="text-sm text-gray-400 ml-1 mb-0.5">{getUnitLabel(item.name)}</p>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-400 mr-1">Trend:</span>
              {getTrendIcon(item.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceDeviationsPanel;