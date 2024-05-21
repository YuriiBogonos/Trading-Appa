import React from 'react';

import './MinerMetricsStyles.scss';

interface MinerMetricsProps {
  thirtyDayReturns?: number;
  omega?: number;
  omegaCps?: number;
  augmentedReturn?: number;
  sharpeRatio?: number;
  probabilisticSharpeRatio?: number;
  returnCps?: number;
  invertedSortinoCps?: number;
}

const formatToExponential = (value: number) => {
  return value.toExponential();
};

const MinerMetrics: React.FC<MinerMetricsProps> = ({
  thirtyDayReturns,
  omega,
  omegaCps,
  augmentedReturn,
  sharpeRatio,
  probabilisticSharpeRatio,
  returnCps,
  invertedSortinoCps,
}) => {
  return (
    <div className='miner-metrics'>
      <h1>Miner Metrics</h1>
      {thirtyDayReturns !== undefined && (
        <p>
          30-day Returns: <span className='metric-info'>{thirtyDayReturns}</span>
        </p>
      )}
      {omega !== undefined && (
        <p>
          Omega: <span className='metric-info'>{formatToExponential(omega)}</span>
        </p>
      )}
      {omegaCps !== undefined && (
        <p>
          Omega CPS: <span className='metric-info'>{omegaCps}</span>
        </p>
      )}
      {augmentedReturn !== undefined && (
        <p>
          Augmented Return: <span className='metric-info'>{augmentedReturn.toFixed(2)}</span>
        </p>
      )}
      {sharpeRatio !== undefined && (
        <p>
          Sharpe Ratio: <span className='metric-info'>{sharpeRatio.toFixed(2)}</span>
        </p>
      )}
      {probabilisticSharpeRatio !== undefined && (
        <p>
          Probabilistic Sharpe Ratio:{' '}
          <span className='metric-info'>{probabilisticSharpeRatio.toFixed(2)}</span>
        </p>
      )}
      {returnCps !== undefined && (
        <p>
          Return CPS: <span className='metric-info'>{returnCps.toFixed(2)}</span>
        </p>
      )}
      {invertedSortinoCps !== undefined && (
        <p>
          Inverted Sortino CPS:
          <span className='metric-info'>{formatToExponential(invertedSortinoCps)}</span>
        </p>
      )}
    </div>
  );
};

export default MinerMetrics;
