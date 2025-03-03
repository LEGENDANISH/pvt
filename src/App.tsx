import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OverviewPanel from './components/OverviewPanel';
import StorageCapacityWidget from './components/StorageCapacityWidget';
import PerformanceDeviationsPanel from './components/PerformanceDeviationsPanel';
import WorkloadProtectionPanel from './components/WorkloadProtectionPanel';
import { storageSystems, overviewData, performanceData, workloadProtection } from './data/mockData';
import { StorageSystem } from './types';

function App() {
  const [selectedSystem, setSelectedSystem] = useState<StorageSystem | null>(null);

  const handleSelectSystem = (system: StorageSystem) => {
    setSelectedSystem(system);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar 
        storageSystems={storageSystems} 
        onSelectSystem={handleSelectSystem} 
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <OverviewPanel 
            totalSystems={overviewData.totalSystems}
            totalAlerts={overviewData.totalAlerts}
            totalHosts={overviewData.totalHosts}
          />
          
          <StorageCapacityWidget 
            totalCapacity={overviewData.totalCapacity}
            usedCapacity={overviewData.usedCapacity}
            availableCapacity={overviewData.availableCapacity}
            dataReduction={overviewData.dataReduction}
            provisionedStorage={overviewData.provisionedStorage}
            efficiencyRate={overviewData.efficiencyRate}
          />
          
          <PerformanceDeviationsPanel 
            performanceData={performanceData}
          />
          
          <WorkloadProtectionPanel 
            workloadProtection={workloadProtection}
          />
        </div>
      </div>
    </div>
  );
}

export default App;