import React from 'react';

import CustomTable from '@/pages/Rules/components/Tables/CustomTable/CustomTable.tsx';

const columns = [
  {
    header: 'MDD',
    accessorKey: 'mdd',
  },
  {
    header: '0%',
    accessorKey: '0%',
  },
  {
    header: '1%',
    accessorKey: '1%',
  },
  {
    header: '2%',
    accessorKey: '2%',
  },
  {
    header: '3%',
    accessorKey: '3%',
  },
  {
    header: '4%',
    accessorKey: '4%',
  },
  {
    header: '5%',
    accessorKey: '5%',
  },
];

const data = [
  { mdd: 'Penalty', '0%': '0%', '1%': '0%', '2%': '0%', '3%': '5%', '4%': '25%', '5%': '100%' },
];

const PenaltyTable: React.FC = () => {
  return <CustomTable columns={columns} data={data} />;
};

export default PenaltyTable;
