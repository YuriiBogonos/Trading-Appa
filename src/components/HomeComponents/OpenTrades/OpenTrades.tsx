import React, { useMemo, useState } from 'react';

import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';

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
const TableCellInput = ({
  formik,
  fieldKey,
}: {
  formik: FormikProps<NewTableData>;
  fieldKey: keyof NewTableData;
}) => {
  const [localValue, setLocalValue] = useState(formik.values[fieldKey]);

  const handleLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
  };

  const handleBlur = () => {
    const value = typeof localValue === 'string' ? parseFloat(localValue) : localValue;
    if (isNaN(value as number)) {
      formik.setFieldValue(fieldKey, '');
    } else {
      formik.setFieldValue(fieldKey, value.toString());
    }
    formik.handleBlur(fieldKey);
  };

  return (
    <input
      type='number'
      name={fieldKey}
      value={localValue}
      onChange={handleLocalChange}
      onBlur={handleBlur}
      className={`generated-input ${formik.errors[fieldKey] && formik.touched[fieldKey] ? 'error' : ''}`}
    />
  );
};
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
  const validationSchema = yup.object({
    pair: yup.string().required('Pair is required'),
    longShort: yup.string().required('Position type is required'),
    takeProfitPercent: yup
      .number()
      .min(0, 'Take profit must be at least 0%')
      .max(50, 'Take profit cannot exceed 50%')
      .required('Take profit is required'),
    stopLossPercent: yup
      .number()
      .min(0, 'Stop loss must be at least 0%')
      .max(9, 'Stop loss cannot exceed 9%')
      .required('Stop loss is required'),
    leverage: yup
      .number()
      .min(0.001, 'Leverage must be at least 0.001')
      .max(200, 'Leverage cannot exceed 200')
      .required('Leverage is required'),
    returnPercent: yup.number().required('Return percent is required'),
  });
  const formik = useFormik<NewTableData>({
    initialValues: {
      pair: '',
      longShort: '',
      takeProfitPercent: 0,
      stopLossPercent: 0,
      leverage: 0,
      returnPercent: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      setData((prevData) => {
        const filteredData = prevData.filter((data) => !isNewRow(data));
        return [...filteredData, { ...values }];
      });
      formik.resetForm();
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNewTrade = () => {
    if (!data.some(isNewRow)) {
      setData((prevData) => [...prevData, { ...formik.initialValues }]);
    }
    setAnchorEl(null);
  };

  const allFieldsFilled = () => {
    const requiredFields = [
      'pair',
      'longShort',
      'takeProfitPercent',
      'stopLossPercent',
      'leverage',
      'returnPercent',
    ];
    return requiredFields.every((field) => Boolean((formik.values as any)[field]));
  };
  const isNewRow = (row: NewTableData) =>
    row.pair === '' &&
    row.longShort === '' &&
    row.takeProfitPercent === 0 &&
    row.stopLossPercent === 0 &&
    row.leverage === 0 &&
    row.returnPercent === 0;

  const columns = useMemo(
    () => [
      {
        header: 'Pair',
        accessorKey: 'pair',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <select
              value={formik.values.pair}
              onChange={(e) => formik.setFieldValue('pair', e.target.value)}
              onBlur={formik.handleBlur}
              className={`generated-input ${formik.errors.pair && formik.touched.pair ? 'error' : ''}`}
            >
              <option value=''>Select a pair</option>
              <option value='BTC/USD'>BTC/USD</option>
              <option value='ETH/USD'>ETH/USD</option>
            </select>
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Long/Short',
        accessorKey: 'longShort',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <select
              value={formik.values.longShort}
              onChange={(e) => formik.setFieldValue('longShort', e.target.value)}
              onBlur={formik.handleBlur}
              className={`generated-input ${formik.errors.longShort && formik.touched.longShort ? 'error' : ''}`}
            >
              <option value=''>Select position</option>
              <option value='Long'>LONG</option>
              <option value='Short'>SHORT</option>
            </select>
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Take Profit (%)',
        accessorKey: 'takeProfitPercent',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'takeProfitPercent'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Stop Loss (%)',
        accessorKey: 'stopLossPercent',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'stopLossPercent'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Leverage',
        accessorKey: 'leverage',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'leverage'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Return (%)',
        accessorKey: 'returnPercent',
        cell: (info: CellContext<NewTableData, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'returnPercent'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        id: 'actions',
        accessorKey: '',
        cell: (info: CellContext<NewTableData, any>) => (
          <div data-column='Actions'>
            {isNewRow(info.row.original) ? (
              <>
                {allFieldsFilled() && (
                  <button
                    className='exit'
                    type='submit'
                    onClick={() => formik.handleSubmit()}
                    disabled={!formik.isValid}
                  >
                    Accept
                  </button>
                )}
                {!allFieldsFilled() && (
                  <button
                    className='exit'
                    onClick={() => setData(data.filter((_, idx) => idx !== info.row.index))}
                  >
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <button
                className='exit'
                onClick={() => console.log('Exiting position:', info.row.original)}
              >
                Exit Position
              </button>
            )}
          </div>
        ),
      },
    ],
    [data, formik]
  );

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
          <MenuItem key='newTrade' onClick={handleOpenNewTrade}>
            Open New Trade
          </MenuItem>
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
