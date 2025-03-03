import { StorageSystem, PerformanceData, WorkloadProtection, SystemProtection, EnvironmentalData } from '../types';

export const storageSystems: StorageSystem[] = [
  {
    id: '1',
    name: 'Storage Array Alpha',
    status: 'healthy',
    capacity: {
      total: 256,
      used: 128,
      available: 128
    },
    hosts: 24,
    alerts: 0,
    lastUpdated: '2025-06-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Storage Array Beta',
    status: 'warning',
    capacity: {
      total: 512,
      used: 384,
      available: 128
    },
    hosts: 36,
    alerts: 2,
    lastUpdated: '2025-06-15T10:25:00Z'
  },
  {
    id: '3',
    name: 'Storage Array Gamma',
    status: 'critical',
    capacity: {
      total: 1024,
      used: 972,
      available: 52
    },
    hosts: 48,
    alerts: 5,
    lastUpdated: '2025-06-15T10:15:00Z'
  },
  {
    id: '4',
    name: 'Storage Array Delta',
    status: 'healthy',
    capacity: {
      total: 768,
      used: 256,
      available: 512
    },
    hosts: 32,
    alerts: 0,
    lastUpdated: '2025-06-15T10:35:00Z'
  },
  {
    id: '5',
    name: 'Storage Array Epsilon',
    status: 'healthy',
    capacity: {
      total: 384,
      used: 192,
      available: 192
    },
    hosts: 18,
    alerts: 1,
    lastUpdated: '2025-06-15T10:20:00Z'
  },
  {
    id: '6',
    name: 'Storage Array Zeta',
    status: 'warning',
    capacity: {
      total: 640,
      used: 576,
      available: 64
    },
    hosts: 42,
    alerts: 3,
    lastUpdated: '2025-06-15T10:10:00Z'
  }
];

export const performanceData: PerformanceData[] = [
  { name: 'I/O Rate', value: 12500, deviation: 'normal', trend: 'stable' },
  { name: 'Data Rate', value: 850, deviation: 'warning', trend: 'up' },
  { name: 'Response Time', value: 3.2, deviation: 'critical', trend: 'up' },
  { name: 'Transfer Size', value: 64, deviation: 'normal', trend: 'down' }
];

export const workloadProtection: WorkloadProtection = {
  volumes: 256,
  ha: 85,
  dr: 72,
  safeguarded: 64
};

export const systemProtection: SystemProtection = {
  ransomwareDetection: {
    protected: 68,
    atRisk: 24,
    vulnerable: 8
  },
  securityNotifications: 3
};

export const environmentalData: EnvironmentalData[] = [
  { day: 'Mon', powerConsumption: 42, co2Emissions: 28, temperature: 22 },
  { day: 'Tue', powerConsumption: 38, co2Emissions: 25, temperature: 21 },
  { day: 'Wed', powerConsumption: 45, co2Emissions: 30, temperature: 23 },
  { day: 'Thu', powerConsumption: 40, co2Emissions: 27, temperature: 22 },
  { day: 'Fri', powerConsumption: 43, co2Emissions: 29, temperature: 22 },
  { day: 'Sat', powerConsumption: 36, co2Emissions: 24, temperature: 21 },
  { day: 'Sun', powerConsumption: 32, co2Emissions: 21, temperature: 20 }
];

// Calculate totals for overview
export const overviewData = {
  totalSystems: storageSystems.length,
  totalAlerts: storageSystems.reduce((acc, system) => acc + system.alerts, 0),
  totalHosts: storageSystems.reduce((acc, system) => acc + system.hosts, 0),
  totalCapacity: storageSystems.reduce((acc, system) => acc + system.capacity.total, 0),
  usedCapacity: storageSystems.reduce((acc, system) => acc + system.capacity.used, 0),
  availableCapacity: storageSystems.reduce((acc, system) => acc + system.capacity.available, 0),
  dataReduction: 3.2, // Data reduction ratio
  provisionedStorage: 4096, // TiB
  efficiencyRate: 78 // Percentage
};