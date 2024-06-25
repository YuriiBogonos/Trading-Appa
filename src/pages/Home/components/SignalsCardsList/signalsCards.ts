import CopyTradingIcon from 'path/to/CopyTradingIcon.svg';
import DeFiVaultIcon from 'path/to/DeFiVaultIcon.svg';
import ManagedAccountIcon from 'path/to/ManagedAccountIcon.svg';
import SignalV2Icon from 'path/to/SignalV2Icon.svg';

export const signalsCards = [
  {
    title: 'Signal V2',
    content:
      "Individual trade weights will be augmented by Delta's proprietary Time Series Forecasting models, adding sentiment data for risk downside volatility.",
    linkText: 'SUBSCRIBE',
    link: '/subscribe',
    icon: SignalV2Icon,
  },
  {
    title: 'Separately Managed Account',
    content: 'Access a dedicated fund managed by Delta using our signals. Clients deposit fiat.',
    linkText: 'REQUEST INFO',
    link: '/request-info',
    icon: ManagedAccountIcon,
  },
  {
    title: 'Fund the De-Fi Vault',
    content: 'Connect your wallet and fund the vault via smart contract.',
    linkText: 'FUND NOW',
    link: '/fund-now',
    icon: DeFiVaultIcon,
  },
  {
    title: 'Copy Trading',
    content: 'Connect to our copy trading profile and let Delta manage your account.',
    linkText: 'COMING SOON',
    link: '#',
    icon: CopyTradingIcon,
  },
];
