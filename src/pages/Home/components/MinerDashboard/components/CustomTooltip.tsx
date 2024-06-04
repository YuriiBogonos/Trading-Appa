export const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p>{`Miner: ${payload[0].payload.miner}`}</p>
        <p>{`Tao day: ${payload[0].payload.tao}`}</p>
        <p>{`USD day: $${payload[0].payload.usd.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};
