import { ComponentType } from 'react';

export interface IRoute {
  key: string;
  title: string;
  path: string;
  component: ComponentType;
}
export interface PasswordHintsProps {
  passwordErrors: {
    uppercase: string | null;
    lowercase: string | null;
    number: string | null;
    specialChar: string | null;
    length: string | null;
  };
}

export interface Root {
  challengeperiod_miners: string[];
  consistency_penalties: ConsistencyPenalties;
  constants: Constants;
  created_date: string;
  created_timestamp_ms: number;
  eliminations: Elimination[];
  metrics: Metrics;
  oldest_order_processed_ms: number;
  perf_ledgers: PerfLedgers;
  plagiarism: Plagiarism;
  positions: Positions;
  version: string;
  weights: Weights;
  youngest_order_processed_ms: number;
}
export type Positions = Record<string, PositionData>;
export type ConsistencyPenalties = Record<string, number>;
export type PerfLedgers = Record<string, PerfLedgersValue>;

export interface PerfLedgersValue {
  cps: Cp[];
  target_cp_duration_ms: number;
  target_ledger_window_ms: number;
}
export interface Cp {
  accum_ms: number;
  gain: number;
  last_update_ms: number;
  loss: number;
  n_updates: number;
  open_ms: number;
  prev_portfolio_ret: number;
}
export interface Constants {
  annual_risk_free_rate: number;
  lookback_range_days_risk_free_rate: number;
  max_daily_drawdown: number;
  max_total_drawdown: number;
  omega_minimum_denominator: number;
  omega_ratio_threshold: number;
  probabilistic_sharpe_ratio_threshold: number;
  set_weight_lookback_range_days: number;
  set_weight_minimum_position_duration_ms: number;
  set_weight_minimum_positions: number;
}
export interface Elimination {
  dd: number;
  elimination_initiated_time_ms: number;
  hotkey: string;
  reason: string;
}

export type AugmentedReturn = Record<string, number>;
export type InvertedSortinoCps = Record<string, number>;
export type Omega = Record<string, number>;
export type OmegaCps = Record<string, number>;
export type ProbabilisticSharpeRatio = Record<string, number>;
export type ReturnCps = Record<string, number>;
export type SharpeRatio = Record<string, number>;
export type Plagiarism = Record<string, number>;
export type Weights = Record<string, number>;

export interface Metrics {
  augmented_return: AugmentedReturn;
  inverted_sortino_cps: InvertedSortinoCps;
  omega: Omega;
  omega_cps: OmegaCps;
  probabilistic_sharpe_ratio: ProbabilisticSharpeRatio;
  return_cps: ReturnCps;
  sharpe_ratio: SharpeRatio;
}
export interface PositionData {
  positions: Position[];
  thirty_day_returns: number;
  thirty_day_returns_augmented: number[];
}

export interface Position {
  average_entry_price: number;
  close_ms: number;
  current_return: number;
  initial_entry_price: number;
  is_closed_position: boolean;
  miner_hotkey: string;
  net_leverage: number;
  open_ms: number;
  orders: Order[];
  position_type: string;
  position_uuid: string;
  return_at_close: number;
  trade_pair: [string, string, number, number, number];
}
export interface Order {
  leverage: number;
  order_type: string;
  order_uuid: string;
  price: number;
  price_sources: PriceSource[];
  processed_ms: number;
}
export interface PriceSource {
  close: number;
  high: number;
  lag_ms: number;
  low: number;
  open: number;
  source: string;
  start_ms: number;
  timespan_ms: number;
  volume?: number;
  vwap?: number;
  websocket: boolean;
}

export interface TradeResponse {
  // session_id: string;
  message: string;
}
export interface TradeRequest {
  trader_id: number;
  trade_pair: string;
  order_type: string;
  leverage: number;
  asset_type: string;
  stop_loss: number;
  take_profit: number;
  test_mode?: boolean;
  returnPercent?: number;
}
export interface TradeCloseRequest {
  trader_id: number;
  trade_pair: string;
  asset_type: string;
}

// export interface TradeStatus {
//   tradeOpenTime: string;
//   tradePair: string;
//   assetType: string;
//   orderType: string;
//   leverage: string;
//   entryPrice: number;
//   currentPrice: number;
//   profitLoss: string;
//   feeDeducted: number;
//   takeProfit: string;
//   stopLoss: string;
// }

export interface NewPosition {
  trader_id: number;
  trade_pair: string;
  leverage: number;
  asset_type: string;
  stop_loss: number;
  take_profit: number;
  order_type: string;
  order_id: number;
  open_time: string;
  entry_price: number;
  operation_type: string;
  cumulative_leverage: number;
  cumulative_stop_loss: number;
  cumulative_take_profit: number;
  cumulative_order_type: string;
  status: string;
  close_time: string;
  close_price: number;
  profit_loss: number;
  position_id: number;
  trade_order: number;
}
