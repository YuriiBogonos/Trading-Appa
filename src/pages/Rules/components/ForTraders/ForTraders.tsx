import { useState } from 'react';

import './ForTraders.scss';

const ForTraders = () => {
  const [selectedIndex, setSelectedIndex] = useState('Indices');
  const [isOpen, setIsOpen] = useState(false);
  const tradePairs = ['SPX', 'DJI', 'FTSE', 'GDAXI'];

  const handleSelectChange = (value: any) => {
    setSelectedIndex(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='for-traders'>
      <h2>For Traders</h2>
      <div className='trade-pairs'>
        <label htmlFor='tradePairs'>Trade Pairs available to traders</label>
        <div className='custom-dropdown'>
          <div className='selected-option' onClick={toggleDropdown}>
            {selectedIndex}
            <span className='arrow'>{isOpen ? '▲' : '▼'}</span>
          </div>
          {isOpen && (
            <div className='options'>
              <div
                className={`option ${selectedIndex === 'Indices' ? 'active default-option' : ''}`}
                onClick={() => handleSelectChange('Indices')}
              >
                Indices
              </div>
              {tradePairs.map((pair) => (
                <div
                  key={pair}
                  className={`option ${selectedIndex === pair ? 'active' : ''}`}
                  onClick={() => handleSelectChange(pair)}
                >
                  {pair}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForTraders;
