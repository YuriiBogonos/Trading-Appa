import React from 'react';

import KeyFeatureCard from '@/components/FeaturesCard/FeaturesCard.tsx';
import { signalsCards } from '@/pages/Home/components/SignalsCardsList/signalsCards.ts';

import { isSVGIcon } from '../../../../utils/isSVGIcon.tsx';
import { SVGIconProps } from '../../../../utils/isSVGIcon.tsx';

interface SignalsCardsListProps {
  fill: string;
}

const renderButtonIcon = (buttonIcon: string | React.ComponentType<SVGIconProps>, fill: string) => {
  if (typeof buttonIcon === 'string') {
    return <img src={buttonIcon} alt='button icon' />;
  } else if (React.isValidElement(buttonIcon)) {
    if (isSVGIcon(buttonIcon)) {
      return React.cloneElement(buttonIcon, { fill } as React.Attributes);
    }
    return buttonIcon;
  } else if (typeof buttonIcon === 'function') {
    const IconComponent = buttonIcon;
    return <IconComponent fill={fill} />;
  }
  return null;
};

function SignalsCardsList({ fill }: SignalsCardsListProps) {
  return (
    <div className='signalscard-list'>
      {signalsCards.map((feature, index) => (
        <KeyFeatureCard key={index} link={feature.link}>
          <div className='card-icon signal-icon'>
            <img src={feature.icon} alt='icon' />
          </div>
          <h2 className='card-title'>{feature.title}</h2>
          <div className='card-content signal-content'>
            <p>{feature.content}</p>
          </div>
          {feature.linkText !== 'COMING SOON' ? (
            <div className='card-button'>
              <button>
                {feature.buttonIcon && renderButtonIcon(feature.buttonIcon, fill)}
                {feature.linkText}
              </button>
            </div>
          ) : (
            <div className='card-button-soon'>
              <button>{feature.linkText}</button>
            </div>
          )}
        </KeyFeatureCard>
      ))}
    </div>
  );
}

export default SignalsCardsList;
