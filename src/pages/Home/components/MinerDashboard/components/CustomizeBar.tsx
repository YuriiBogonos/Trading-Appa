import './CustomizeBar.scss';

export const CustomizedBar = (props: any) => {
  const { x, y, width, height } = props;
  const borderWidth = 3.7;
  return (
    <g className='customize-bar'>
      <defs>
        <linearGradient id='colorTao' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='rgba(234, 73, 39, 0.2)' />
          <stop offset='23.22%' stopColor='rgba(234, 73, 39, 0.05)' />
          <stop offset='42.5%' stopColor='rgba(234, 73, 39, 0.05)' />
          <stop offset='63.12%' stopColor='rgba(243, 53, 27, 0)' />
        </linearGradient>
      </defs>
      <rect
        x={x - borderWidth}
        y={y - borderWidth}
        width={width + 2 * borderWidth}
        height={borderWidth}
        fill='#802815'
      />
      <rect
        x={x - borderWidth}
        y={y - borderWidth}
        width={borderWidth}
        height={height + borderWidth}
        fill='#802815'
      />
      <rect
        x={x + width}
        y={y - borderWidth}
        width={borderWidth}
        height={height + borderWidth}
        fill='#802815'
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill='url(#colorTao)'
        className='customize-bar-rect'
      />
    </g>
  );
};
