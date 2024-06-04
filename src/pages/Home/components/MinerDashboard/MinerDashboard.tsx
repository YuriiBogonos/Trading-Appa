import React from 'react';

import { Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { CustomCursor } from '@/pages/Home/components/MinerDashboard/components/CustomCursor.tsx';
import { CustomTooltip } from '@/pages/Home/components/MinerDashboard/components/CustomTooltip.tsx';
import { CustomizedBar } from '@/pages/Home/components/MinerDashboard/components/CustomizeBar.tsx';
import data from '@/pages/Home/components/MinerDashboard/mockDashboardMiners';

import './MinerDashboard.scss';

const MinerDashboard: React.FC = () => {
  const totalBars = data.length;
  const referenceLinePositions = Array.from({ length: 5 }, (_, i) =>
    Math.floor(((i + 1) * totalBars) / 6)
  );
  return (
    <div className='dashboard'>
      <div className='tao'>Tao</div>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data} barSize={15} barCategoryGap={100} barGap={8}>
          {referenceLinePositions.map((position, index) => (
            <ReferenceLine key={index} x={data[position]?.miner} stroke='#FFFFFF0F' />
          ))}
          <XAxis
            dataKey='miner'
            label={{
              value: 'Traders',
              position: 'insideBottom',
              offset: -5,
              fill: '#fff',
              className: 'axisx',
            }}
            tick={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={15} />

          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Bar dataKey='tao' shape={<CustomizedBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MinerDashboard;
