import React, { useEffect, useMemo, useState } from 'react';

import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';

import { Root } from '@/types/types.ts';
import { TradeRequest } from '@/types/types.ts';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CellContext, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { useAllFieldsFilled } from '../../../hooks/useAllFieldsFilled.tsx';
import { useAppDispatch } from '../../../hooks/useAppDispatch.ts';
import {
  tradeApi,
  useCloseTradeMutation,
  useOpenTradeMutation,
} from '../../../store/features/trades/tradesSlice.ts';
import './OpenTradesStyles.scss';

interface IOpenTrades {
  minerHotkey: string;
  checkpointData: Root | undefined;
}
interface TradePairOption {
  value: string;
  label: string;
}
const TableCellInput = ({
  formik,
  fieldKey,
}: {
  formik: FormikProps<TradeRequest>;
  fieldKey: keyof TradeRequest;
}) => {
  const [localValue, setLocalValue] = useState(String(formik.values[fieldKey]));

  const handleLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalValue(value);
  };

  const handleBlur = () => {
    let parsedValue = parseFloat(localValue);
    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }
    formik.setFieldValue(fieldKey, parsedValue);
    setLocalValue(String(parsedValue));
    formik.handleBlur(fieldKey);
  };

  let min, max;
  switch (fieldKey) {
    case 'take_profit':
      min = 0;
      max = 50;
      break;
    case 'stop_loss':
      min = 0;
      max = 9;
      break;
    case 'leverage':
      min = 0.001;
      max = 200;
      break;
    default:
      min = 0;
      max = Number.POSITIVE_INFINITY;
  }

  return (
    <input
      type='number'
      name={String(fieldKey)}
      value={localValue}
      onChange={handleLocalChange}
      onBlur={handleBlur}
      min={min}
      max={max}
      className={`generated-input ${formik.errors[fieldKey] && formik.touched[fieldKey] ? 'error' : ''}`}
    />
  );
};

const OpenTrades: React.FC<IOpenTrades> = ({ checkpointData, minerHotkey }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openTrade, { isSuccess }] = useOpenTradeMutation();
  const [closeTrade] = useCloseTradeMutation();
  const dispatch = useAppDispatch();
  const tradePairOptions: TradePairOption[] = useMemo(() => {
    const tradePairs = new Set<string>();

    if (checkpointData) {
      Object.values(checkpointData.positions).forEach((positionData) => {
        positionData.positions.forEach((position) => {
          const formattedPair = `${position.trade_pair[1].replace(/USD$/, 'USD')}`;
          tradePairs.add(formattedPair);
        });
      });
    }

    return Array.from(tradePairs).map((pair) => ({ value: pair, label: pair }));
  }, [checkpointData]);
  const filteredData = React.useMemo(() => {
    if (!checkpointData) return [];

    const minerPositions = checkpointData.positions[minerHotkey]?.positions || [];
    return minerPositions
      .filter((item) => !item.is_closed_position)
      .map((position) => ({
        trade_pair: position.trade_pair[1],
        leverage: position.net_leverage,
        order_type: position.position_type,
        returnPercent: position.return_at_close,
        take_profit: Math.random() * 10,
        stop_loss: Math.random() * 5,
      }));
  }, [checkpointData, minerHotkey]);

  const [data, setData] = useState<any[]>([...filteredData]);

  useEffect(() => {
    dispatch(tradeApi.endpoints.getAllPositionsByTradePair.initiate(4060))
      .unwrap()
      .then((tradeStatusResult) => {
        setData((prev) => [
          ...filteredData,
          ...tradeStatusResult.map((position) => ({
            trader_id: position.trader_id,
            asset_type: position.asset_type,
            trade_pair: position.trade_pair,
            leverage: position.cumulative_leverage,
            order_type: position.cumulative_order_type,
            returnPercent: '-',
            take_profit: position.cumulative_take_profit,
            stop_loss: position.cumulative_stop_loss,
          })),
          ...(prev.some(isNewRow) ? [{ ...formik.values }] : []),
        ]);
      })
      .catch((error) => {
        console.error('Error fetching trade status:', error);
      });
  }, [filteredData, isSuccess]);
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const tradeStatusResult = await dispatch(
  //       tradeApi.endpoints.getAllPositionsByTradePair.initiate(4060)
  //     ).unwrap();
  //     setData((prev) => [
  //       ...filteredData,
  //       ...tradeStatusResult.map((position) => ({
  //         trader_id: position.trader_id,
  //         asset_type: position.asset_type,
  //         trade_pair: position.trade_pair,
  //         leverage: position.cumulative_leverage,
  //         order_type: position.cumulative_order_type,
  //         returnPercent: '-',
  //         take_profit: position.cumulative_take_profit,
  //         stop_loss: position.cumulative_stop_loss,
  //       })),
  //       ...(prev.some(isNewRow) ? [{ ...formik.values }] : []),
  //     ]);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [filteredData]);

  const validationSchema = yup.object({
    trade_pair: yup.string().required('Pair is required'),
    order_type: yup.string().required('Position type is required'),
    take_profit: yup
      .number()
      .min(0, 'Take profit must be at least 0%')
      .max(50, 'Take profit cannot exceed 50%')
      .required('Take profit is required'),
    stop_loss: yup
      .number()
      .min(0, 'Stop loss must be at least 0%')
      .max(9, 'Stop loss cannot exceed 9%')
      .required('Stop loss is required'),
    leverage: yup
      .number()
      .min(0.001, 'Leverage must be at least 0.001')
      .max(200, 'Leverage cannot exceed 200')
      .required('Leverage is required'),
  });
  const formik = useFormik<TradeRequest>({
    initialValues: {
      trader_id: 4068,
      trade_pair: '',
      order_type: '',
      leverage: 0,
      asset_type: 'crypto',
      stop_loss: 0,
      take_profit: 0,
      test_mode: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('Submitting trade:', values);
      try {
        // const tradeResponse = await openTrade(values).unwrap();
        // console.log('Trade Details:', tradeResponse);
        // alert('Trade opened: ' + tradeResponse.session_id);

        // if (tradeResponse.session_id) {
        //   setInterval(async () => {
        //     const tradeStatusResult = await dispatch(
        //       tradeApi.endpoints.fetchTradeStatus.initiate(tradeResponse.session_id)
        //     ).unwrap();
        //     console.log('Trade Details:', tradeStatusResult);
        //   }, 5000);

        //   // setData((prevData) => [...prevData, { ...values, ...tradeStatusResult }]);
        //   resetForm();
        //   handleClose();
        // } else {
        //   console.error('Session ID was not returned');
        // }

        await openTrade(values).unwrap();

        //  setData((prevData) => [...prevData, { ...values, ...tradeStatusResult }]);
        resetForm();
        handleClose();
      } catch (error) {
        console.error('Error during the trade process:', error);
      }
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
  type NewTableDataKeys = keyof TradeRequest;
  const requiredFields: NewTableDataKeys[] = [
    'trade_pair',
    'order_type',
    'leverage',
    'take_profit',
    'stop_loss',
  ];

  const allFieldsFilled = useAllFieldsFilled(
    formik.values,
    formik.touched,
    formik.initialValues,
    requiredFields
  );
  const isNewRow = (row: TradeRequest) =>
    row.trade_pair === '' &&
    row.take_profit === 0 &&
    row.stop_loss === 0 &&
    row.leverage === 0 &&
    row.order_type === '';

  const columns = useMemo(
    () => [
      {
        header: 'Pair',
        accessorKey: 'trade_pair',
        cell: (info: CellContext<TradeRequest, any>) =>
          isNewRow(info.row.original) ? (
            <select
              value={formik.values.trade_pair}
              onChange={(e) => formik.setFieldValue('trade_pair', e.target.value)}
              onBlur={formik.handleBlur}
              className={`generated-input-select ${formik.errors.trade_pair && formik.touched.trade_pair ? 'error' : ''}`}
            >
              <option value=''>Select a pair</option>
              {tradePairOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Long/Short',
        accessorKey: 'order_type',
        cell: (info: CellContext<TradeRequest, any>) =>
          isNewRow(info.row.original) ? (
            <select
              value={formik.values.order_type}
              onChange={(e) => formik.setFieldValue('order_type', e.target.value)}
              onBlur={formik.handleBlur}
              className={`generated-input-select ${formik.errors.order_type && formik.touched.order_type ? 'error' : ''}`}
            >
              <option value=''>Select position</option>
              <option value='LONG'>LONG</option>
              <option value='SHORT'>SHORT</option>
            </select>
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Take Profit (%)',
        accessorKey: 'take_profit',
        cell: (info: CellContext<TradeRequest, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'take_profit'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Stop Loss (%)',
        accessorKey: 'stop_loss',
        cell: (info: CellContext<TradeRequest, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'stop_loss'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Leverage',
        accessorKey: 'leverage',
        cell: (info: CellContext<TradeRequest, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'leverage'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        header: 'Return (%)',
        accessorKey: 'returnPercent',
        cell: (info: CellContext<TradeRequest, any>) =>
          isNewRow(info.row.original) ? (
            <TableCellInput formik={formik} fieldKey={'returnPercent'} />
          ) : (
            <span>{info.getValue()}</span>
          ),
      },
      {
        id: 'actions',
        accessorKey: '',
        cell: (info: CellContext<TradeRequest, any>) => (
          <div data-column='Actions'>
            {isNewRow(info.row.original) ? (
              <>
                {allFieldsFilled && formik.isValid ? (
                  <button className='exit' type='submit' onClick={() => formik.handleSubmit()}>
                    Accept
                  </button>
                ) : (
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
                onClick={() => {
                  console.log('Exiting position:', info.row.original, data[info.row.index]);
                  closeTrade({
                    trader_id: data[info.row.index].trader_id,
                    trade_pair: data[info.row.index].trade_pair,
                    asset_type: data[info.row.index].asset_type,
                  });
                }}
              >
                Close Trade
              </button>
            )}
          </div>
        ),
      },
    ],
    [data, formik, allFieldsFilled]
  );

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className='open-trades'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Open Trades</h1>
          <IconButton
            onClick={handleClick}
            color='primary'
            aria-label='add new element'
            size='large'
            sx={{
              width: 'auto',
              display: 'flex',
              alignSelf: 'self-end',
              backgroundColor: '#7a7053',
              color: 'white',
            }}
            disableRipple
          >
            <AddIcon />
          </IconButton>
        </div>
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
