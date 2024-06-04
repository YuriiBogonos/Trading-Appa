import { aboutUsData } from '@/components/AboutUs/AboutUsData.ts';
import FeatureCard from '@/components/FeaturesCard/FeaturesCard.tsx';

import './AboutUs.scss';

function AboutUs() {
  return (
    <div className='about-content'>
      {aboutUsData.map((feature, index) => (
        <FeatureCard key={index} title={feature.title} content={feature.content} />
      ))}
    </div>
  );
}

export default AboutUs;
