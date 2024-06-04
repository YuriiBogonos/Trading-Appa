import './CustomCursor.scss';

export const CustomCursor = (props: any) => {
  const { x, y, width, height, payload } = props;
  const taoValue = payload && payload.length ? payload[0].value : 0;
  const barHeight = height - height * taoValue - 11;
  return (
    <svg className='custom-cursor'>
      <line
        className='custom-cursor-line'
        x1={x + width / 2}
        y1={0}
        x2={x + width / 2}
        y2={height}
        stroke='#FFFFFF'
        strokeWidth={2}
        strokeDasharray='5 5'
      />
      <circle
        cx={x + width / 2}
        cy={y + barHeight}
        r={5}
        fill='#EA4927'
        stroke='#FFFFFF'
        strokeWidth={2}
      />
    </svg>
  );
};
