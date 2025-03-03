export interface StorageSystem {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  capacity: {
    total: number;
    used: number;
    available: number;
  };
  hosts: number;
  alerts: number;
  lastUpdated: string;
}

export interface PerformanceData {
  name: string;
  value: number;
  deviation: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface WorkloadProtection {
  volumes: number;
  ha: number;
  dr: number;
  safeguarded: number;
}

export interface SystemProtection {
  ransomwareDetection: {
    protected: number;
    atRisk: number;
    vulnerable: number;
  };
  securityNotifications: number;
}

export interface EnvironmentalData {
  day: string;
  powerConsumption: number;
  co2Emissions: number;
  temperature: number;
}