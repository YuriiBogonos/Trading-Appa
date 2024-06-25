import React from 'react';
import { useNavigate } from 'react-router-dom';

import './FeaturesCard.scss';

interface FeatureCardProps {
  link?: string;
  children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ link, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className='card signal-card' onClick={handleClick}>
      {children}
    </div>
  );
};

export default FeatureCard;
