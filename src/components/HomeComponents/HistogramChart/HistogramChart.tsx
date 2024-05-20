import React, { useMemo } from 'react';

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { CustomTooltip } from '@/components/HomeComponents/HistogramChart/components/CustomTooltip/CustomTooltip.tsx';
import { Root } from '@/types/types.ts';

import './HistogramChartStyles.scss';

interface HistogramProps {
  minerHotkey: string;
  checkpointData: Root | undefined;
}

const HistogramChart: React.FC<HistogramProps> = ({ minerHotkey, checkpointData }) => {
  const data = useMemo(() => {
    if (!checkpointData || !checkpointData.weights) {
      return [];
    }
    return Object.entries(checkpointData.weights).map(([key, value]) => ({
      minerHotkey: key,
      value,
    }));
  }, [checkpointData]);

  if (!checkpointData) {
    return <div>No data available</div>;
  }

  return (
    <>
      <h1 className='histogram'>Competition</h1>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey='minerHotkey'
            label={{ value: 'Miners', position: 'insideBottom', offset: -5 }}
            tick={false}
          />
          <YAxis label={{ value: 'Weights', angle: -90, position: 'insideLeft', offset: 0 }} />
          <Tooltip content={<CustomTooltip checkpointData={checkpointData} />} />
          <Bar dataKey='value' fill='#8884d8' barSize={30}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.minerHotkey === minerHotkey ? '#E35F25' : '#F2A369'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default HistogramChart;
