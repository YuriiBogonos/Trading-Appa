import React from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import './HistogramChartStyles.scss';

const data = [
  {
    minerHotkey: 'R',
    value: 250,
    omega: 1.5,
    returnPercent: 10,
    sharpeRatio: 0.2,
    ORS: '40% omega, 40% return, 20% sharpe',
  },
  {
    minerHotkey: 'A',
    value: 200,
    omega: 1.2,
    returnPercent: 12,
    sharpeRatio: 0.25,
    ORS: '30% omega, 50% return, 20% sharpe',
  },
  {
    minerHotkey: 'B',
    value: 150,
    omega: 1.1,
    returnPercent: 8,
    sharpeRatio: 0.1,
    ORS: '50% omega, 30% return, 20% sharpe',
  },
  {
    minerHotkey: 'C',
    value: 180,
    omega: 1.3,
    returnPercent: 7,
    sharpeRatio: 0.15,
    ORS: '60% omega, 20% return, 20% sharpe',
  },
  {
    minerHotkey: 'D',
    value: 220,
    omega: 1.4,
    returnPercent: 9,
    sharpeRatio: 0.18,
    ORS: '40% omega, 30% return, 30% sharpe',
  },
  {
    minerHotkey: 'E',
    value: 230,
    omega: 1.6,
    returnPercent: 15,
    sharpeRatio: 0.22,
    ORS: '30% omega, 40% return, 30% sharpe',
  },
  {
    minerHotkey: 'F',
    value: 190,
    omega: 1.3,
    returnPercent: 6,
    sharpeRatio: 0.12,
    ORS: '50% omega, 20% return, 30% sharpe',
  },
  {
    minerHotkey: 'G',
    value: 210,
    omega: 1.7,
    returnPercent: 11,
    sharpeRatio: 0.2,
    ORS: '30% omega, 50% return, 20% sharpe',
  },
  {
    minerHotkey: 'H',
    value: 160,
    omega: 1.0,
    returnPercent: 5,
    sharpeRatio: 0.08,
    ORS: '60% omega, 10% return, 30% sharpe',
  },
  {
    minerHotkey: 'I',
    value: 240,
    omega: 1.8,
    returnPercent: 14,
    sharpeRatio: 0.21,
    ORS: '40% omega, 40% return, 20% sharpe',
  },
];
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { minerHotkey, value, omega, returnPercent, sharpeRatio, ORS } = payload[0].payload;
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`Miner: ${minerHotkey}`}</p>
        <p className='value'>Value: {value}</p>
        <p className='omega'>Omega: {omega}</p>
        <p className='return-percent'>Return %: {returnPercent}</p>
        <p className='sharpe-ratio'>Sharpe Ratio: {sharpeRatio}</p>
        <p className='ors'>ORS: {ORS}</p>
      </div>
    );
  }

  return null;
};

const HistogramChart: React.FC = () => {
  const myHotkey = 'R';
  return (
    <>
      <h1 className='histogram'>Competition</h1>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
          <XAxis dataKey='minerHotkey' stroke='#8884d8' tick={{ fill: '#2e4355', fontSize: 14 }} />
          <YAxis tick={{ fill: '#2e4355', fontSize: 14 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey='value' fill='#8884d8' barSize={30}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.minerHotkey === myHotkey ? '#82ca9d' : '#8884d8'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default HistogramChart;
