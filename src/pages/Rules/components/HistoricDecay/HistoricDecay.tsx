import './HistoricDecay.scss';

const HistoricDecay = () => {
  return (
    <div className='historic-decay'>
      <p className='custom-paragraph'>
        <p>
          In order to incentivize more recent activity, historical gains and losses are dampened
          after the miner passes teh challenge period. The historical decay function used can be
          found here. Returns are dampened at a more aggressive pace than the risk adjusted metrics,
          meaning that more recent returns will exert a greater influence on the current score. By
          dampening the risk adjusted metrics at a lower rate, we are permitting miners with
          historically better risk adjusted metrics to take larger risks and benefit. The potency of
          raw return will decrease by about 50% in 18 hours, while the potency of gains and losses
          used to calculate the risk metrics will decay by 50% in around 22 days.
        </p>
        <p>
          We then rank the miners based on historically augmented return checkpoints, and distribute
          emissions based on an exponential decay function, giving significant priority to the top
          miners. The best way to get emissions is to have a consistently great trading strategy,
          which makes multiple transactions each week (the more the better). Capturing upside
          through timing and proper leverage utilization will yield the highest score in our system.
        </p>
      </p>
    </div>
  );
};

export default HistoricDecay;
