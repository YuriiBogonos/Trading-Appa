import './ScoringMetrics.scss';

const ScoringMetrics = () => {
  return (
    <div className='scoring-metrics'>
      <p className='custom-paragraph'>
        We will use three scoring metrics to evaluate miners based on their mid trade scores:
        Returns, Omega, Time Adjusted Sortino.
      </p>
      <p className='custom-paragraph'>
        Returns measure the pure value change that the miner experienced through the course of their
        positions. This will be similar to the prior position based system, although open positions
        will now also be evaluated. A higher return value will result from:
      </p>
      <ul className='custom-unordered-list'>
        <li>Higher magnitude gains.</li>
      </ul>
      <p className='custom-paragraph'>
        Omega will evaluate the magnitude of the positive asset changes over the magnitude of
        negative asset changes. Any score above 1 will indicate that the miner experienced a net
        gain through the course of their position. A higher omega value will result from:
      </p>
      <ul className='custom-unordered-list'>
        <li>Higher magnitude positive value change</li>
        <li>Pure positive value change</li>
      </ul>
      <p className='custom-paragraph'>
        Sortino measures the pure volume of losses, and will be divided by the total time duration
        of investments. That is, how much loss is the miner likely exposing per unit of time. A
        lower sortino value indicates a more effective risk mitigation strategy. This will result
        from:
      </p>
      <ul className='custom-unordered-list'>
        <li>Less leverage utilization</li>
        <li>Pure positive value change</li>
      </ul>
      <p className='custom-paragraph'>
        The total score will result from the product of the Return, Omega, and Sortino, so the top
        miners in our system must perform well in both metrics to receive substantial incentive. The
        relative weight of each term in the product sum is Returns: 0.95, Omega: 0.35, Sortino: 0.2.
        The terms used to calculate the product are defined by ranking each metric against the other
        miners. As a simple example, if a miner is first place in returns and last place in Omega,
        their total score would start at 1, multiply by 1 due to first place in returns. It would
        then multiply by (1 - 0.35) as they are the last place in Omega, so their final score would
        be 0.65.
      </p>
    </div>
  );
};

export default ScoringMetrics;
