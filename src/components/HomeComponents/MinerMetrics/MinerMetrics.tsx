import React from 'react';

import './MinerMetricsStyles.scss';

interface MinerMetricsProps {
  thirtyDayReturns?: number;
}

const MinerMetrics: React.FC<MinerMetricsProps> = ({ thirtyDayReturns }) => {
  return (
    <div className='miner-metrics'>
      <h1>Miner Metrics</h1>
      {thirtyDayReturns !== undefined && (
        <p>
          30-day Returns: <span className='thirtyDayReturns'>{thirtyDayReturns}</span>
        </p>
      )}
    </div>
  );
};

export default MinerMetrics;
