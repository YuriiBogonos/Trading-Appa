import React from 'react';

import CustomTable from '@/pages/Rules/components/Tables/CustomTable/CustomTable.tsx';

import './WeightTable.scss';

const columns = [
  {
    header: 'Omega weight',
    accessorKey: 'omega',
  },
  {
    header: 'Short return weight',
    accessorKey: 'shortReturn',
  },
  {
    header: 'Long return weight',
    accessorKey: 'longReturn',
  },
  {
    header: 'Daily Max Drawdown',
    accessorKey: 'dailyMaxDrawdown',
  },
];

const data = [{ omega: '0.15', shortReturn: '0.95', longReturn: '0.5', dailyMaxDrawdown: '0.95' }];

const WeightTable: React.FC = () => {
  return (
    <div className='weight-table'>
      <CustomTable columns={columns} data={data} />
    </div>
  );
};

export default WeightTable;
