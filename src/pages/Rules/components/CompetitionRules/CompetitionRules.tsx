import WeightTable from '@/pages/Rules/components/Tables/WeightTable.tsx';

import './CompetitionRules.scss';

const CompetitionRules = () => {
  return (
    <div className='competition-rules'>
      <p className='custom-paragraph'>
        Traders (or "miners" within Bittensor) compete against one another in a "knock out" style
        24/7 trading competition. The worst performing trader can be eliminated anytime a new trader
        pays to enter the competition.
      </p>
      <p className='custom-paragraph'>
        While a trader is active, they earn rewards (priced in Bittensor's native currency $TAO)
        based on their ranking amongst the other traders. The total prize pool varies daily based on
        a number of market factors, but can be monitored on the taostats.io website, along with each
        trader's Miner ID or hotkey. A trader's rank is determined by their scoring amongst the
        following categories.
      </p>
      <p className='custom-paragraph'>
        Daily Drawdown: Daily max drawdown is a trader's loss or "drawdown" vs their previous
        highest return. For example, if a trader's portfolio of both open and closed trades, reaches
        a 3% gain for the last 30 days. But then a trade (open or closed) comes down by 1%, the
        drawdown is 1%. Each high water mark for a trader represents a new base level off of which
        drawdown is calculated. See below for more detail. Drawdown acts as a penalty, discounting
        the score that is achieved combining the other three statistical markers, Long Return, Short
        Return Weight and Omega.
      </p>
      <WeightTable />
      <p className='custom-paragraph'>
        The numbers indicate the amount your score might drop if you are not competitive in a
        category. For example, let's say you are the top ranked miner for long returns and omega,
        but 50th percentile for short returns. Your score starts at 1, and would drop 42.5% for this
        ranking. If you were last place in short returns, your total score would drop by 95%. To do
        well, you will need to score well in all three categories (long, short, omega).
      </p>
    </div>
  );
};

export default CompetitionRules;
