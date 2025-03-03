import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Shield, HardDrive } from 'lucide-react';
import { WorkloadProtection } from '../types';

interface WorkloadProtectionPanelProps {
  workloadProtection: WorkloadProtection;
}

const WorkloadProtectionPanel: React.FC<WorkloadProtectionPanelProps> = ({ workloadProtection }) => {
  const { volumes, ha, dr, safeguarded } = workloadProtection;
  
  const data = [
    { name: 'High Availability', value: ha, color: '#3b82f6' }, // blue
    { name: 'Disaster Recovery', value: dr, color: '#10b981' }, // green
    { name: 'Safeguarded', value: safeguarded, color: '#8b5cf6' }, // purple
    { name: 'Unprotected', value: 100 - Math.max(ha, dr, safeguarded), color: '#6b7280' } // gray
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-md shadow-lg border border-gray-700">
          <p className="text-sm text-white font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
          <p className="text-xs text-gray-400">{`${Math.round(volumes * payload[0].value / 100)} volumes`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Workload Protection</h2>
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-blue-400 mr-2" />
          <span className="text-sm text-gray-400">{volumes} Total Volumes</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-700 rounded-lg p-4 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-white font-medium mb-2">Protection Summary</h3>
              <p className="text-sm text-gray-400 mb-4">Percentage of volumes with protection</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">High Availability</span>
                  <span className="text-sm text-gray-300">{ha}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${ha}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">Disaster Recovery</span>
                  <span className="text-sm text-gray-300">{dr}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${dr}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">Safeguarded</span>
                  <span className="text-sm text-gray-300">{safeguarded}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${safeguarded}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  formatter={(value) => <span className="text-sm text-gray-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 mt-4">
            <div className="flex items-center mb-2">
              <HardDrive className="h-5 w-5 text-blue-400 mr-2" />
              <h3 className="text-white font-medium">Protection Status</h3>
            </div>
            <p className="text-sm text-gray-400">
              {Math.round(volumes * Math.max(ha, dr, safeguarded) / 100)} of {volumes} volumes have some form of protection.
              {100 - Math.max(ha, dr, safeguarded) > 20 && 
                " Consider increasing protection coverage for critical workloads."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadProtectionPanel;