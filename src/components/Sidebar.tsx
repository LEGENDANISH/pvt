import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, HardDrive, Settings, Bell, Users, BarChart2, Shield, Zap } from 'lucide-react';
import { StorageSystem } from '../types';

interface SidebarProps {
  storageSystems: StorageSystem[];
  onSelectSystem: (system: StorageSystem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ storageSystems, onSelectSystem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSystems = storageSystems.filter(system => 
    system.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`h-screen bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          <HardDrive className="h-6 w-6 text-blue-400" />
          {!collapsed && <span className="ml-2 font-semibold text-lg">Storage Admin</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className={`p-4 ${collapsed ? 'hidden' : 'block'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search storage systems..."
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className={`px-4 py-2 text-xs font-semibold text-gray-400 uppercase ${collapsed ? 'text-center' : ''}`}>
          {!collapsed && 'Storage Systems'}
        </div>
        <ul>
          {filteredSystems.map(system => (
            <li key={system.id} className="mb-1">
              <button
                onClick={() => onSelectSystem(system)}
                className={`w-full flex items-center px-4 py-3 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(system.status)} mr-2`}></span>
                {!collapsed && (
                  <span className="truncate">{system.name}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-700">
        <ul>
          <li className="mb-2">
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <BarChart2 className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </button>
          </li>
          <li className="mb-2">
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Bell className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Alerts</span>}
            </button>
          </li>
          <li className="mb-2">
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Shield className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Security</span>}
            </button>
          </li>
          <li className="mb-2">
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Users className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Users</span>}
            </button>
          </li>
          <li>
            <button className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md transition-colors ${collapsed ? 'justify-center' : ''}`}>
              <Settings className="h-5 w-5 text-gray-400" />
              {!collapsed && <span className="ml-3">Settings</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;