import { useState } from 'react';

import CloseTrades from '@/components/HomeComponents/CloseTrades/CloseTrades';
import Footer from '@/components/HomeComponents/Footer/Footer';
import HistogramChart from '@/components/HomeComponents/HistogramChart/HistogramChart';
import MinerMetrics from '@/components/HomeComponents/MinerMetrics/MinerMetrics';
import OpenTrades from '@/components/HomeComponents/OpenTrades/OpenTrades';
import ValidationMetricField from '@/components/HomeComponents/ValidationMetricField/ValidationMetricField';
import LogoutButton from '@/components/Logout/LogoutButton.tsx';
import { CircularProgress } from '@mui/material';

import { useFetchLinkQuery } from '../../store/features/taoshiApi/taoshiApi.ts';
import './Dashboard.scss';

function Dashboard() {
  const [isValidHotkey, setIsValidHotkey] = useState<boolean>(false);
  const [thirtyDayReturns, setThirtyDayReturns] = useState<number | undefined>(undefined);
  const [minerHotkey, setMinerHotkey] = useState<string>('');

  const { data, error, isLoading } = useFetchLinkQuery();
  console.log(data);
  const handleValidHotkeyChange = (
    isValid: boolean,
    thirtyDayReturns?: number,
    hotkey?: string
  ) => {
    setIsValidHotkey(isValid);
    setThirtyDayReturns(thirtyDayReturns);
    setMinerHotkey(hotkey || '');
  };
  if (isLoading)
    return (
      <div
        style={{
          height: '100dvh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'gray',
        }}
      >
        <CircularProgress color='inherit' />
      </div>
    );
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <LogoutButton />
      <ValidationMetricField checkpointData={data} onValidHotkeyChange={handleValidHotkeyChange} />
      {isValidHotkey ? (
        <>
          <MinerMetrics
            thirtyDayReturns={thirtyDayReturns}
            omega={data?.metrics?.omega?.[minerHotkey]}
            omegaCps={data?.metrics?.omega_cps?.[minerHotkey]}
            augmentedReturn={data?.metrics?.augmented_return?.[minerHotkey]}
            sharpeRatio={data?.metrics?.sharpe_ratio?.[minerHotkey]}
            probabilisticSharpeRatio={data?.metrics?.probabilistic_sharpe_ratio?.[minerHotkey]}
            returnCps={data?.metrics?.return_cps?.[minerHotkey]}
            invertedSortinoCps={data?.metrics?.inverted_sortino_cps?.[minerHotkey]}
          />
          <OpenTrades checkpointData={data} minerHotkey={minerHotkey} />
          <CloseTrades checkpointData={data} minerHotkey={minerHotkey} />
          <div className='histogram-container'>
            <HistogramChart checkpointData={data} minerHotkey={minerHotkey} />
          </div>
          <Footer />
        </>
      ) : (
        <div className='enter-hotkey'>
          <p>Enter Miner Hotkey</p>
        </div>
      )}
    </>
  );
}

export default Dashboard;
