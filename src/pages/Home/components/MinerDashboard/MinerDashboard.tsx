import React from 'react';

import { Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import data from '@/pages/Home/components/MinerDashboard/mockDashboardMiners';

import './MinerDashboard.scss';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p>{`Miner: ${payload[0].payload.miner}`}</p>
        <p>{`Tao day: ${payload[0].payload.tao}`}</p>
        <p>{`USD day: $${payload[0].payload.usd.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};
const CustomCursor = (props: any) => {
  const { x, y, width, height, payload } = props;
  const taoValue = payload && payload.length ? payload[0].value : 0;
  const barHeight = height - height * taoValue - 11;
  return (
    <svg>
      <line
        x1={x + width / 2}
        y1={0}
        x2={x + width / 2}
        y2={height}
        stroke='#FFFFFF'
        strokeWidth={2}
        strokeDasharray='5 5'
      />
      <circle
        cx={x + width / 2}
        cy={y + barHeight}
        r={5}
        fill='#EA4927'
        stroke='#FFFFFF'
        strokeWidth={2}
      />
    </svg>
  );
};

const CustomizedBar = (props: any) => {
  const { x, y, width, height } = props;
  const borderWidth = 3.7;
  return (
    <g>
      <defs>
        <linearGradient id='colorTao' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='rgba(234, 73, 39, 0.2)' />
          <stop offset='23.22%' stopColor='rgba(234, 73, 39, 0.05)' />
          <stop offset='42.5%' stopColor='rgba(234, 73, 39, 0.05)' />
          <stop offset='63.12%' stopColor='rgba(243, 53, 27, 0)' />
        </linearGradient>
      </defs>
      <rect
        x={x - borderWidth}
        y={y - borderWidth}
        width={width + 2 * borderWidth}
        height={borderWidth}
        fill='#802815'
      />
      <rect
        x={x - borderWidth}
        y={y - borderWidth}
        width={borderWidth}
        height={height + borderWidth}
        fill='#802815'
      />
      <rect
        x={x + width}
        y={y - borderWidth}
        width={borderWidth}
        height={height + borderWidth}
        fill='#802815'
      />
      <rect x={x} y={y} width={width} height={height} fill='url(#colorTao)' />
    </g>
  );
};

const MinerDashboard: React.FC = () => {
  const totalBars = data.length;
  const referenceLinePositions = Array.from({ length: 5 }, (_, i) =>
    Math.floor(((i + 1) * totalBars) / 6)
  );
  return (
    <div className='dashboard'>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data} barSize={15} barCategoryGap={16}>
          {referenceLinePositions.map((position, index) => (
            <ReferenceLine key={index} x={data[position]?.miner} stroke='#FFFFFF0F' />
          ))}
          <XAxis
            dataKey='miner'
            label={{ value: 'Miners', position: 'insideBottom', offset: -5, fill: '#fff' }}
            tick={false}
          />
          <YAxis
            label={{
              value: 'Tao',
              angle: -90,
              position: 'insideLeft',
              offset: 1,
              fill: '#fff',
            }}
          />

          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Bar dataKey='tao' shape={<CustomizedBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MinerDashboard;
