import CardIcon from '../../../images/CardIcon/CardIcon.svg';
import BlockchainIcon from '../../../images/featuresCards/BlockchainIcon.svg';
import MultipleRegister from '../../../images/featuresCards/MultipleRegister.svg';
import PerformingIcon from '../../../images/featuresCards/PerfomingIcon.svg';
import RegisterIcon from '../../../images/featuresCards/RegisterIcon.svg';
import TraderEarningIcon from '../../../images/featuresCards/TradeEarningIcon.svg';

export const keyFeatures = [
  {
    title: 'Register',
    content: 'Register and become a ranking trader to receive payouts daily.',
    link: '/signup',
    icon: RegisterIcon,
  },
  {
    title: 'Blockchain Incentivized',
    content: 'Traders earn TAO or USD daily from the Bittensor blockchain.',
    icon: BlockchainIcon,
  },
  {
    title: 'Keep up your ranking',
    content: 'No need to trade daily to receive payout, just keep up your ranking.',
    icon: CardIcon,
  },
  {
    title: '256 Traders at one time',
    content: 'The worst performing trader is knocked out to make room for a new entrant.',
    icon: PerformingIcon,
  },
  {
    title: 'Multiple Registrations',
    content:
      'While plagiarism is not allowed, there is no limit to the number of registrations per participant.',
    icon: MultipleRegister,
  },
  {
    title: 'Traders’ Earnings',
    content: 'Traders take home up to 90% of earnings.',
    icon: TraderEarningIcon,
  },
];
