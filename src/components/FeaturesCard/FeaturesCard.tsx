import React from 'react';
import { useNavigate } from 'react-router-dom';

import CardIcon from '../../images/CardIcon/CardIcon.svg';
import './FeaturesCard.scss';

interface FeatureCardProps {
  title: string;
  content: string | string[];
  metrics?: string[];
  link?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, content, metrics, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };
  const renderContent = () => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    } else {
      return content.map((line, index) => <p key={index}>{line}</p>);
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
      <div className='card-content'> {renderContent()}</div>
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

export default FeatureCard;
