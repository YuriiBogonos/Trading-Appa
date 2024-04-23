import React, { useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CellContext, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { positions } from '../../../mock/positions.ts';
import './OpenTradesStyles.scss';

interface NewTableData {
  pair: string;
  longShort: string;
  takeProfitPercent: number;
  stopLossPercent: number;
  leverage: number;
  returnPercent: number;
}

interface IOpenTrades {
  minerHotkey: string;
}

const OpenTrades: React.FC<IOpenTrades> = ({ minerHotkey }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const filteredData = useMemo(() => {
    const minerPositions = positions.find((p) => p[minerHotkey])?.[minerHotkey].positions || [];
    return minerPositions
      .filter((item) => !item.is_closed_position)
      .map((position) => ({
        pair: position.trade_pair[1],
        longShort: position.position_type,
        takeProfitPercent: Math.random() * 10,
        stopLossPercent: Math.random() * 5,
        leverage: position.net_leverage,
        returnPercent: position.return_at_close,
      }));
  }, [minerHotkey]);
  const [data, setData] = useState<NewTableData[]>([...filteredData]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNewTrade = () => {
    const newData = {
      pair: '',
      longShort: '',
      takeProfitPercent: 0,
      stopLossPercent: 0,
      leverage: 0,
      returnPercent: 0,
    };
    setData([...data, newData]);
    handleClose();
  };

  const handleCellChange = (rowIndex: number, columnId: string, value: any) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [columnId]: value };
    setData(newData);
  };

  const isNewRow = (row: NewTableData) => {
    return (
      row.pair === '' &&
      row.longShort === '' &&
      row.takeProfitPercent === 0 &&
      row.stopLossPercent === 0 &&
      row.leverage === 0 &&
      row.returnPercent === 0
    );
  };

  const columns = useMemo(
    () => [
      {
        header: 'Pair',
        accessorKey: 'pair',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <input
              value={info.getValue()}
              className='generated-input'
              onChange={(e) => handleCellChange(info.row.index, 'pair', e.target.value)}
            />
          ) : (
            info.getValue()
          ),
      },
      {
        header: 'Long/Short',
        accessorKey: 'longShort',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <input
              value={info.getValue()}
              className='generated-input'
              onChange={(e) => handleCellChange(info.row.index, 'longShort', e.target.value)}
            />
          ) : (
            info.getValue()
          ),
      },
      {
        header: 'Take Profit (%)',
        accessorKey: 'takeProfitPercent',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <input
              type='number'
              className='generated-input'
              value={info.getValue()}
              onChange={(e) =>
                handleCellChange(info.row.index, 'takeProfitPercent', parseFloat(e.target.value))
              }
            />
          ) : (
            info.getValue()
          ),
      },
      {
        header: 'Stop Loss (%)',
        accessorKey: 'stopLossPercent',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <input
              type='number'
              className='generated-input'
              value={info.getValue()}
              onChange={(e) =>
                handleCellChange(info.row.index, 'stopLossPercent', parseFloat(e.target.value))
              }
            />
          ) : (
            info.getValue()
          ),
      },
      {
        header: 'Leverage',
        accessorKey: 'leverage',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <input
              type='number'
              className='generated-input'
              value={info.getValue()}
              onChange={(e) =>
                handleCellChange(info.row.index, 'leverage', parseFloat(e.target.value))
              }
            />
          ) : (
            info.getValue()
          ),
      },
      {
        header: 'Return (%)',
        accessorKey: 'returnPercent',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <input
              type='number'
              className='generated-input'
              value={info.getValue()}
              onChange={(e) =>
                handleCellChange(info.row.index, 'returnPercent', parseFloat(e.target.value))
              }
            />
          ) : (
            info.getValue()
          ),
      },
      {
        id: 'exitPosition',
        header: () => (
          <button className='exit' onClick={handleExitPosition}>
            Exit Position
          </button>
        ),
        accessorKey: '',
      },
    ],
    [data, handleCellChange]
  );
  const handleExitPosition = () => {
    console.log('Test');
  };
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className='open-trades'>
        <h1>Open Trades</h1>
        <IconButton
          onClick={handleClick}
          color='primary'
          aria-label='add new element'
          size='large'
          sx={{ width: '5%', display: 'flex', alignSelf: 'self-end' }}
        >
          <AddIcon />
        </IconButton>
        <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          {
            <MenuItem key='newTrade' onClick={handleOpenNewTrade}>
              Open New Trade
            </MenuItem>
          }
        </Menu>
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OpenTrades;
