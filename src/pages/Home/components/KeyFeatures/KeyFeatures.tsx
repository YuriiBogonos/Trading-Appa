import React from 'react';

import CardIcon from '../../../../images/CardIcon/CardIcon.svg';
import './keyFeatures.scss';

interface KeyFeatureCardProps {
  title: string;
  content: string;
  description?: string;
  metrics?: string[];
}

const KeyFeatureCard: React.FC<KeyFeatureCardProps> = ({
  title,
  content,
  description,
  metrics,
}) => {
  return (
    <div className='card'>
      <div className='card-icon'>
        <img src={CardIcon} alt='icon' />
      </div>
      <h2 className='card-title'>{title}</h2>
      <p className='card-content'>{content}</p>
      {description && <p className='card-description'>{description}</p>}
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
