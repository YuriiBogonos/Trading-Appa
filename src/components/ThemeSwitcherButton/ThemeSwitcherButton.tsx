import './ThemeSwitcherButton.scss';

function ThemeSwitcherButton() {
  return (
    <button className='theme'>
      {false ? (
        <p className='night padding-night'>Night</p>
      ) : (
        <p className='day padding-day'>Day</p>
      )}
    </button>
  );
}

export default ThemeSwitcherButton;
