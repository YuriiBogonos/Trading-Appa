import './ScoringDetails.scss';

const ScoringDetails = () => {
  return (
    <div className='scoring-details'>
      <p className='custom-paragraph'>
        The open positions held by miners will be continuously evaluated based on their value
        changes. Any measured positive movement on the asset while tracked in a position will count
        as a gain for the miner. Any negative movements will be tracked as losses. Risk is defined
        as the sum volume of millisecond negative value change overseen during a position. Given
        that the price of assets fluctuates so quickly and has some level of noise, it is virtually
        impossible for an investment strategy to have zero risk. This is normal. An asset with zero
        return through the course of the day will still carry risk, although the gains and losses
        result in a product of 1.0. A higher leverage trade will increase the intensity of losses
        and of gains, but in this scenario the product sum will still be 1.0 as a return. With this
        increased leverage, there will be a higher volume of losses, and thus risk. You may augment
        the risk for a position by placing an order on the position, which might increase or
        decrease the leverage utilization. Please note that there is a 10 second cooldown period
        between orders. Additionally, we are requiring miners to hold positions for a minimum of 15
        minutes on each 6 hour interval to qualify for scoring in that round.
      </p>
      <p className='custom-paragraph'>
        In order to capture information at such a high resolution, we utilize checkpoints which
        track a miner's behavior over time. Each checkpoint has a target duration of 6 hours, after
        which the checkpoint is closed and a new checkpoint is opened. The checkpoint contains the
        aggregate of all gains and losses, as well as information on the duration of open positions
        held in the checkpoint and number of updates seen. Each miner is compared to a baseline, the
        annual return rate of American Treasury Bills. This will consistently add a small amount of
        loss for the miner every millisecond. If the miner's Omega is less than 1 and log return
        less than 0, they were unable to beat the growth rate of treasury bills.
      </p>
    </div>
  );
};

export default ScoringDetails;
