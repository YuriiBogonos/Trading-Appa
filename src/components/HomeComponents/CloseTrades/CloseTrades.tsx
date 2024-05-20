import React, { useState } from 'react';

import { Position, Root } from '@/types/types.ts';
import { CellContext, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import './CloseTradesStyles.scss';

interface ICloseTrades {
  minerHotkey: string;
  checkpointData: Root | undefined;
}
interface FilteredData {
  trade_pair: string;
  average_entry_price: number;
  initial_entry_price: number;
  net_leverage: number;
  position_type: string;
  open_ms: number;
  close_ms: number;
  return_at_close: number;
}
const formatDate = (timestamp: unknown): string => {
  const date = new Date(timestamp as number);
  return date.toISOString().replace('T', ' ').slice(0, -5);
};

const CloseTrades: React.FC<ICloseTrades> = ({ minerHotkey, checkpointData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = React.useMemo<FilteredData[]>(() => {
    if (!checkpointData) return [];

    const minerPositions: Position[] = checkpointData.positions[minerHotkey]?.positions || [];

    return minerPositions
      .filter((item) => item.is_closed_position)
      .map((position) => ({
        trade_pair: position.trade_pair[1],
        average_entry_price: position.average_entry_price,
        initial_entry_price: position.initial_entry_price,
        net_leverage: position.net_leverage,
        position_type: position.position_type,
        open_ms: position.open_ms,
        close_ms: position.close_ms,
        return_at_close: position.return_at_close,
      }));
  }, [checkpointData, minerHotkey]);

  const toggleTable = () => {
    setIsOpen(!isOpen);
  };

  const data = React.useMemo<FilteredData[]>(() => filteredData, [filteredData]);

  const columns = React.useMemo(
    () => [
      {
        header: 'Trade Pair',
        accessorKey: 'trade_pair',
      },
      {
        header: 'Avg. Entry Price',
        accessorKey: 'average_entry_price',
        cell: (info: CellContext<FilteredData, number>) => info.getValue().toFixed(5),
      },
      {
        header: 'Initial Entry Price',
        accessorKey: 'initial_entry_price',
        cell: (info: CellContext<FilteredData, number>) => info.getValue().toFixed(5),
      },
      {
        header: 'Net Leverage',
        accessorKey: 'net_leverage',
      },
      {
        header: 'Position Type',
        accessorKey: 'position_type',
      },
      {
        header: 'Open',
        accessorKey: 'open_ms',
        cell: (info: CellContext<FilteredData, unknown>) => formatDate(info.getValue()),
      },
      {
        header: 'Close',
        accessorKey: 'close_ms',
        cell: (info: CellContext<FilteredData, unknown>) => formatDate(info.getValue()),
      },
      {
        header: 'Return',
        accessorKey: 'return_at_close',
        cell: (info: CellContext<FilteredData, number>) => info.getValue().toFixed(10),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className='close-trades'>
        <h1>Closed Trades</h1>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className={index === 0 || isOpen ? 'visible' : 'hidden'}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={toggleTable} className={`toggle-button ${isOpen ? 'open' : ''}`}></button>
      </div>
    </>
  );
};

export default CloseTrades;
