const rules = [
  {
    id: 'serviceAgreement',
    title: 'Service Agreement',
    content: `
      <ol>
        <li>By registering as a Trader in the PTN you acknowledge that the registration fee is non-refundable. If one is not competitive, they will be knocked out of the competition and lose the registration fee.</li>
        <li>Upon registering, TaoTrader will configure a miner virtual machine and submit for and pay Tao to the Subnet on your behalf. This registration comes with a Hotkey which will be delivered to the TaoTrader user in order to track earnings.</li>
        <li>All compute fees, miner updates, and developer requirements will be handled by TaoTrader. Users will receive support for their Dashboards and trades and can reach TaoTrader via Telegram.</li>
        <li>TaoTrader users will receive access to our Telegram Signal Bot to assist in taking trades and overall to be successful in the competition. Users can upgrade to premium Signals and other features to improve their performance.</li>
        <li>Tao is emitted daily and will be paid to the user/traders preferred payment method (TAO, USD, or USDT) on a daily basis, Monday through Friday except for banking holidays.</li>
        <li>Fees, Profit Share:
        <li>Traders will split their profits with TaoTrader in accordance with the following schedule:</li>
          <ul>
            <li>80/20 for the first 60 days - For each trader registration, profit split is 80% to Trader, and 20% to TaoTrader</li>
            <li>90/10 thereafter - After 60 days, TaoTrader will keep 10%</li>
          </ul>
        </li>
      </ol>
    `,
  },
  {
    id: 'competitionRules',
    title: 'Competition Rules and Scoring Mechanism',
    content: `
      <p>Traders (or "miners" within Bittensor) compete against one another in a "knock out" style 24/7 trading competition. The worst performing trader can be eliminated anytime a new trader pays to enter the competition.</p>
      <p>While a trader is active, they earn rewards (priced in Bittensor's native currency $TAO) based on their ranking amongst the other traders. The total prize pool varies daily based on a number of market factors, but can be monitored on the taostats.io website, along with each trader's Miner ID or hotkey. A trader's rank is determined by their scoring amongst the following categories.</p>
      <p>Daily Drawdown: Daily max drawdown is a trader's loss or "drawdown" vs their previous highest return. For example, if a trader's portfolio of both open and closed trades, reaches a 3% gain for the last 30 days. But then a trade (open or closed) comes down by 1%, the drawdown is 1%. Each high water mark for a trader represents a new base level off of which drawdown is calculated. See below for more detail. Drawdown acts as a penalty, discounting the score that is achieved combining the other three statistical markers, Long Return, Short Return Weight and Omega.</p>
      <p>The numbers indicate the amount your score might drop if you are not competitive in a category. For example, let's say you are the top ranked miner for long returns and omega, but 50th percentile for short returns. Your score starts at 1, and would drop 42.5% for this ranking. If you were last place in short returns, your total score would drop by 95%. To do well, you will need to score well in all three categories (long, short, omega).</p>
    `,
  },
  {
    id: 'scoringDetails',
    title: 'Scoring Details',
    content:
      "<p>The open positions held by miners will be continuously evaluated based on their value changes. Any measured positive movement on the asset while tracked in a position will count as a gain for the miner. Any negative movements will be tracked as losses. Risk is defined as the sum volume of millisecond negative value change overseen during a position. Given that the price of assets fluctuates so quickly and has some level of noise, it is virtually impossible for an investment strategy to have zero risk. This is normal. An asset with zero return through the course of the day will still carry risk, although the gains and losses result in a product of 1.0. A higher leverage trade will increase the intensity of losses and of gains, but in this scenario the product sum will still be 1.0 as a return. With this increased leverage, there will be a higher volume of losses, and thus risk. You may augment the risk for a position by placing an order on the position, which might increase or decrease the leverage utilization. Please note that there is a 10 second cooldown period between orders. Additionally, we are requiring miners to hold positions for a minimum of 15 minutes on each 6 hour interval to qualify for scoring in that round.</p><p>In order to capture information at such a high resolution, we utilize checkpoints which track a miner's behavior over time. Each checkpoint has a target duration of 6 hours, after which the checkpoint is closed and a new checkpoint is opened. The checkpoint contains the aggregate of all gains and losses, as well as information on the duration of open positions held in the checkpoint and number of updates seen. Each miner is compared to a baseline, the annual return rate of American Treasury Bills. This will consistently add a small amount of loss for the miner every millisecond. If the miner's Omega is less than 1 and log return less than 0, they were unable to beat the growth rate of treasury bills.</p>",
  },
  {
    id: 'scoringMetrics',
    title: 'Scoring Metrics',
    content:
      '<p>We will use three scoring metrics to evaluate miners based on their mid trade scores: Returns, Omega, Time Adjusted Sortino.</p><p>Returns measure the pure value change that the miner experienced through the course of their positions. This will be similar to the prior position based system, although open positions will now also be evaluated. A higher return value will result from:</p><ul><li>Higher magnitude gains.</li></ul><p>Omega will evaluate the magnitude of the positive asset changes over the magnitude of negative asset changes. Any score above 1 will indicate that the miner experienced a net gain through the course of their position. A higher omega value will result from:</p><ul><li>Higher magnitude positive value change</li><li>Pure positive value change</li></ul><p>Sortino measures the pure volume of losses, and will be divided by the total time duration of investments. That is, how much loss is the miner likely exposing per unit of time. A lower sortino value indicates a more effective risk mitigation strategy. This will result from:</p><ul><li>Less leverage utilization</li><li>Pure positive value change</li></ul><p>The total score will result from the product of the Return, Omega, and Sortino, so the top miners in our system must perform well in both metrics to receive substantial incentive. The relative weight of each term in the product sum is Returns: 0.95, Omega: 0.35, Sortino: 0.2. The terms used to calculate the product are defined by ranking each metric against the other miners. As a simple example, if a miner is first place in returns and last place in Omega, their total score would start at 1, multiply by 1 due to first place in returns. It would then multiply by (1 - 0.35) as they are the last place in Omega, so their final score would be 0.65.</p>',
  },
  {
    id: 'scoringPenalties',
    title: 'Scoring Penalties',
    content:
      '<p>There are two primary penalties in place for each miner: Consistency and Drawdown. The consistency penalty is meant to discourage miners who cannot deliver consistent performance over each 30 day period. To fully mitigate penalties associated with consistency, your miner should achieve the following metrics:</p><ul><li>Minimum of 18 days of open positions, of any volume.</li><li>Max returns in a checkpoint period should not exceed 90x the median behavior of other checkpoints.</li></ul><p>The drawdown penalty is meant to disengage the influence of miners in drawdown, to both discourage risk that a miner may be eliminated due to MDD and to hedge risks associated with this miner for the system. We will look at the max drawdown seen over the past two weeks to determine your penalty, and drawdown below 2.5% will not count negatively towards your score. The drawdown penalty becomes exponentially greater closer to the MDD limit, with the following targets:</p>',
  },
  {
    id: 'challengePeriodDetails',
    title: 'Challenge Period Details',
    content:
      "<p>There are four primary requirements for a miner to pass the challenge period: Returns, Omega, Sortino, and Volume Minimum Checkpoints. All of these metrics were set to be reasonably competitive with our currently successful miners' median values, such that by passing the challenge period the miner will be in a decently competitive stance. The checkpoint files used for the challenge period will also be used to score the miner against other successful miners after passing. The first three metrics are described above in the scoring details section.\n" +
      'The volume minimum checkpoint is defined as a checkpoint which meets a certain threshold of raw gains and losses. The threshold value for inclusion of the checkpoint as valid is 0.1. This means that a checkpoint with a gain of 0.05 and a loss of -0.05 would have an absolute sum of 0.1 and qualify. We are requiring 12 of these valid checkpoints to have been observed in order for the miner to pass the checkpoint qualifications.</p>',
  },
  {
    id: 'historicDecay',
    title: 'Historic Decay',
    content:
      '<p>In order to incentivize more recent activity, historical gains and losses are dampened after the miner passes the challenge period. The historical decay function used can be found here. Returns are dampened at a more aggressive pace than the risk adjusted metrics, meaning that more recent returns will exert a greater influence on the current score. By dampening the risk adjusted metrics at a lower rate, we are permitting miners with historically better risk adjusted metrics to take larger risks and benefit. The potency of raw return will decrease by about 50% in 18 hours, while the potency of gains and losses used to calculate the risk metrics will decay by 50% in around 22 days. We then rank the miners based on historically augmented return checkpoints, and distribute emissions based on an exponential decay function, giving significant priority to the top miners. The best way to get emissions is to have a consistently great trading strategy, which makes multiple transactions each week (the more the better). Capturing upside through timing and proper leverage utilization will yield the highest score in our system.</p>',
  },
];

export default rules;
