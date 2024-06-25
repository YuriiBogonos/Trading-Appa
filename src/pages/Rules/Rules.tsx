import React, { useRef } from 'react';

import AuthLayout from '@/components/AuthLayout/AuthLayout.tsx';
import RulesList from '@/pages/Rules/components/RulesList/RulesList.tsx';
import Sidebar from '@/pages/Rules/components/Sidebar/Sidebar.tsx';

import './Rules.scss';

type Section =
  | 'serviceAgreement'
  | 'competitionRules'
  | 'scoringDetails'
  | 'scoringMetrics'
  | 'scoringPenalties'
  | 'challengePeriodDetails'
  | 'historicDecay';

type SectionRefs = {
  [key in Section]: React.RefObject<HTMLDivElement>;
};

function Rules() {
  const customStyles = {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '70rem',
    margin: '0 auto',
    zIndex: 1,
  };

  const sectionRefs: SectionRefs = {
    serviceAgreement: useRef<HTMLDivElement>(null),
    competitionRules: useRef<HTMLDivElement>(null),
    scoringDetails: useRef<HTMLDivElement>(null),
    scoringMetrics: useRef<HTMLDivElement>(null),
    scoringPenalties: useRef<HTMLDivElement>(null),
    challengePeriodDetails: useRef<HTMLDivElement>(null),
    historicDecay: useRef<HTMLDivElement>(null),
  };

  return (
    <AuthLayout showBubbles={false} customStyles={customStyles}>
      <div className='rules-title'>
        <h1>Competition Rules and FAQ</h1>
        <span>Last modified August 19, 2019</span>
      </div>
      <div className='rules-content'>
        <Sidebar sectionRefs={sectionRefs} />
        <RulesList sectionRefs={sectionRefs} />
      </div>
    </AuthLayout>
  );
}

export default Rules;
