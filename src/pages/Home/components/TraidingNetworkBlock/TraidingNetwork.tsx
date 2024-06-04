import React from 'react';

import { tradingNetworkData } from '@/pages/Home/components/TraidingNetworkBlock/traidingNetwork.ts';

import FiveBuble from '../../../../images/BackgroundFigures/Five.svg';
import CardIcon from '../../../../images/CardIcon/CardIcon.svg';
import './TraidingNetwork.scss';

const TradingNetworkDisplay: React.FC = () => {
  return (
    <div className='trading-network'>
      <img src={FiveBuble} alt='icon' style={{ position: 'absolute', right: '65%', top: '40%' }} />
      <div className='intro'>{tradingNetworkData.intro}</div>
      <div className='trading-content'>
        <img src={CardIcon} alt='icon' />
        <div className='trading-info'>
          <div className='title'>
            <p>{tradingNetworkData.title}</p>
          </div>
          <div className='details'>
            {tradingNetworkData.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingNetworkDisplay;
