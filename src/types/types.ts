import { ComponentType } from 'react';

export interface IRoute {
  key: string;
  title: string;
  path: string;
  component: ComponentType;
}
interface MetricValues {
  [key: string]: number;
}

interface Metrics {
  augmented_return: MetricValues;
  omega: MetricValues;
  probabilistic_sharpe_ratio: MetricValues;
  sharpe_ratio: MetricValues;
}

export interface MetricsData {
  metrics: Metrics;
}