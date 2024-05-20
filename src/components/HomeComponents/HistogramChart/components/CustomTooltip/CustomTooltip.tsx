import React from 'react';

import { Root } from '@/types/types.ts';

import '../../HistogramChartStyles.scss';

interface TooltipPayload {
  minerHotkey: string;
}

interface CustomTooltipProps {
  payload?: {
    payload: TooltipPayload;
  }[];
  checkpointData: Root;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, checkpointData }) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  const { minerHotkey } = payload[0].payload;
  const omega = checkpointData.metrics.omega[minerHotkey];
  const sharpeRatio = checkpointData.metrics.sharpe_ratio[minerHotkey];
  const thirtyDays = checkpointData.positions[minerHotkey]?.thirty_day_returns;
  const positions = checkpointData.positions[minerHotkey]?.positions;
  let returnPercent =
    positions && positions.length > 0 ? positions[positions.length - 1].return_at_close : undefined;

  if (
    omega === undefined &&
    sharpeRatio === undefined &&
    thirtyDays === undefined &&
    returnPercent === undefined
  ) {
    return null;
  }

  return (
    <div className='custom-tooltip'>
      <p className='label'>{`Miner: ${minerHotkey}`}</p>
      {omega !== undefined && (
        <div className='value-item'>
          <span className='value-label'>Omega:</span>
          <span className='value'>{omega}</span>
        </div>
      )}
      {thirtyDays !== undefined && (
        <div className='value-item'>
          <span className='value-label'>30 Days:</span>
          <span className='value'>{thirtyDays}</span>
        </div>
      )}
      {returnPercent !== undefined && (
        <div className='value-item'>
          <span className='value-label'>Return:</span>
          <span className='value'>{returnPercent.toFixed(2)}%</span>
        </div>
      )}
      {sharpeRatio !== undefined && (
        <div className='value-item'>
          <span className='value-label'>Sharpe Ratio:</span>
          <span className='value'>{sharpeRatio}</span>
        </div>
      )}
    </div>
  );
};
