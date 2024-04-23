import { useState } from 'react';

import CloseTrades from '@/components/HomeComponents/CloseTrades/CloseTrades.tsx';
import Footer from '@/components/HomeComponents/Footer/Footer.tsx';
import HistogramChart from '@/components/HomeComponents/HistogramChart/HistogramChart.tsx';
import MinerMetrics from '@/components/HomeComponents/MinerMetrics/MinerMetrics.tsx';
import OpenTrades from '@/components/HomeComponents/OpenTrades/OpenTrades.tsx';
import ValidationMetricField from '@/components/HomeComponents/ValidationMetricField/ValidationMetricField.tsx';

import './Home.scss';

function Home() {
  const [isValidHotkey, setIsValidHotkey] = useState<boolean>(false);
  const [thirtyDayReturns, setThirtyDayReturns] = useState<number | undefined>(undefined);
  const [minerHotkey, setMinerHotkey] = useState<string>('');

  const handleValidHotkeyChange = (
    isValid: boolean,
    thirtyDayReturns?: number,
    hotkey?: string
  ) => {
    setIsValidHotkey(isValid);
    setThirtyDayReturns(thirtyDayReturns);
    setMinerHotkey(hotkey || ''); // Ensure the hotkey is updated even if it's an empty string
  };

  return (
    <>
      <ValidationMetricField onValidHotkeyChange={handleValidHotkeyChange} />
      {isValidHotkey && (
        <>
          <MinerMetrics thirtyDayReturns={thirtyDayReturns} />
          <OpenTrades minerHotkey={minerHotkey} />
          <CloseTrades minerHotkey={minerHotkey} />
          <div className='histogram-container'>
            <HistogramChart />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
