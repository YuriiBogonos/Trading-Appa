import PenaltyTable from '@/pages/Rules/components/Tables/PenaltyTable.tsx';

import './ScoringPenalties.scss';

const ScoringPenalties = () => {
  return (
    <div className='scoring-penalties'>
      <p className='custom-paragraph'>
        There are two primary penalties in place for each miner: Consistency and Drawdown. The
        consistency penalty is meant to discourage miners who cannot deliver consistent performance
        over each 30 day period. To fully mitigate penalties associated with consistency, your miner
        should achieve the following metrics:
      </p>
      <ul className='custom-unordered-list'>
        <li>Minimum of 18 days of open positions, of any volume.</li>
        <li>
          Max returns in a checkpoint period should not exceed 90x the median behavior of other
          checkpoints.
        </li>
      </ul>
      <p className='custom-paragraph'>
        The drawdown penalty is meant to disengage the influence of miners in drawdown, to both
        discourage risk that a miner may be eliminated due to MDD and to hedge risks associated with
        this miner for the system. We will look at the max drawdown seen over the past two weeks to
        determine your penalty, and drawdown below 2.5% will not count negatively towards your
        score. The drawdown penalty becomes exponentially greater closer to the MDD limit, with the
        following targets:
      </p>
      <PenaltyTable />
    </div>
  );
};

export default ScoringPenalties;
