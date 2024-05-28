import React from 'react';
import { useNavigate } from 'react-router-dom';

import CardIcon from '../../../../images/CardIcon/CardIcon.svg';
import './keyFeatures.scss';

interface KeyFeatureCardProps {
  title: string;
  content: string;
  metrics?: string[];
  link?: string;
}

const KeyFeatureCard: React.FC<KeyFeatureCardProps> = ({ title, content, metrics, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className='card'>
      <div className='card-icon'>
        <img src={CardIcon} alt='icon' />
      </div>
      <h2 className='card-title' onClick={handleClick}>
        {title}
      </h2>
      <p className='card-content'>{content}</p>
      {metrics && (
        <ul>
          {metrics.map((metric, index) => (
            <li key={index}>{metric}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KeyFeatureCard;
