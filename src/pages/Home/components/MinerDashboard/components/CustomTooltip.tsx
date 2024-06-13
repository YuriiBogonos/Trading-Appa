export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const miner = payload[0].payload.miner;
    const truncatedMiner = miner.length > 20 ? `${miner.substring(0, 20)}...` : miner;
    return (
      <div className='custom-tooltip'>
        <p className='tooltip tooltip-miner'>
          Miner: <span className='miner-value'>{truncatedMiner}</span>
        </p>
        <p className='tooltip tooltip-usd'>
          USD day: <span className='usd-value'>${payload[0].payload.usd.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
