import './ChanllengePeriodDetais.scss';

const ChallengePeriodDetails = () => {
  return (
    <div className='challenge-period'>
      <p className='custom-paragraph'>
        <p>
          There are four primary requirements for a miner to pass the challenge period: Returns,
          Omega, Sortino, and Volume Minimum Checkpoints. All of these metrics were set to be
          reasonably competitive with our currently successful miners' median values, such that by
          passing the challenge period the miner will be in a decently competitive stance. The
          checkpoint files used for the challenge period will also be used to score the miner
          against other successful miners after passing. The first three metrics are described above
          in the scoring details section.{' '}
        </p>
        <p>
          The volume minimum checkpoint is defined as a checkpoint which meets a certain threshold
          of raw gains and losses. The threshold value for inclusion of the checkpoint as valid is
          0.1. This means that a checkpoint with a gain of 0.05 and a loss of -0.05 would have an
          absolute sum of 0.1 and qualify. We are requiring 12 of these valid checkpoints to have
          been observed in order for the miner to pass the checkpoint qualifications.
        </p>
      </p>
    </div>
  );
};

export default ChallengePeriodDetails;
