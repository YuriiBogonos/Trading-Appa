const ArrowIcon = ({ isOpen, isNight }: any) => {
  const strokeColor = isNight ? 'white' : 'black';

  return (
    <svg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2 7L7 2L12 7'
        stroke={strokeColor}
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        transform={isOpen ? 'rotate(180 7 4.5)' : 'none'}
      />
    </svg>
  );
};

export default ArrowIcon;
