export interface PerformanceData {
  name: string;
  completed: number;
  cancelled: number;
  rating: number;
}

export interface PieData {
  name: string;
  value: number;
  color: string;
}

export interface ServiceProviderStats {
  totalProviders: number;
  averageRating: number;
  completionRate: number;
  growth: string;
} 