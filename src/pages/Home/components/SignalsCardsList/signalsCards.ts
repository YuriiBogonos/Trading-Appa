import React from 'react';

import Telegram from '@/components/icons/Telegram.tsx';
import CopyTraiding from '@/images/featuresCards/CopyTraiding.svg';
import DefiVault from '@/images/featuresCards/DefiVault.svg';
import Fund from '@/images/featuresCards/Fund.svg';
import ManageAccount from '@/images/featuresCards/ManageAccount.svg';
import SignalV2 from '@/images/featuresCards/SignalV2.svg';

interface SignalCard {
  title: string;
  content: string;
  linkText: string;
  link: string;
  icon: string;
  buttonIcon?: React.ComponentType<any> | string;
}
export const signalsCards: SignalCard[] = [
  {
    title: 'Signal V2',
    content:
      "Individual trade weights will be augmented by Delta's proprietary Time Series Forecasting models, adding sentiment data for risk downside volatility.",
    linkText: 'SUBSCRIBE',
    link: '/subscribe',
    icon: SignalV2,
    buttonIcon: Telegram,
  },
  {
    title: 'Separately Managed Account',
    content: 'Access a dedicated fund managed by Delta using our signals. Clients deposit fiat.',
    linkText: 'REQUEST INFO',
    link: '/request-info',
    icon: ManageAccount,
  },
  {
    title: 'Fund the De-Fi Vault',
    content: 'Connect your wallet and fund the vault via smart contract.',
    linkText: 'FUND NOW',
    link: '/fund-now',
    icon: DefiVault,
    buttonIcon: Fund,
  },
  {
    title: 'Copy Trading',
    content: 'Connect to our copy trading profile and let Delta manage your account.',
    linkText: 'COMING SOON',
    link: '#',
    icon: CopyTraiding,
    buttonIcon: CopyTraiding,
  },
];
