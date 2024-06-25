import React from 'react';

import ChallengePeriodDetails from '@/pages/Rules/components/ChallengePeriodDetails/ChallengePeriodDetails.tsx';
import CompetitionRules from '@/pages/Rules/components/CompetitionRules/CompetitionRules.tsx';
import ForTraders from '@/pages/Rules/components/ForTraders/ForTraders.tsx';
import HistoricDecay from '@/pages/Rules/components/HistoricDecay/HistoricDecay.tsx';
import ScoringDetails from '@/pages/Rules/components/ScoringDetails/ScoringDetails.tsx';
import ScoringMetrics from '@/pages/Rules/components/ScoringMetrics/ScoringMetrics.tsx';
import ScoringPenalties from '@/pages/Rules/components/ScoringPenalties/ScoringPenalties.tsx';
import ServiceAgreement from '@/pages/Rules/components/ServiceAgreement/ServiceAgreement.tsx';

import './RulesList.scss';

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

const sectionComponents = {
  serviceAgreement: ServiceAgreement,
  competitionRules: CompetitionRules,
  scoringDetails: ScoringDetails,
  scoringMetrics: ScoringMetrics,
  scoringPenalties: ScoringPenalties,
  challengePeriodDetails: ChallengePeriodDetails,
  historicDecay: HistoricDecay,
};

function RulesList({ sectionRefs }: { sectionRefs: SectionRefs }) {
  return (
    <div className='rules-list-wrapper'>
      <div className='rules-list'>
        {Object.entries(sectionComponents).map(([key, Component]) => (
          <div key={key} ref={sectionRefs[key as Section]}>
            <h2>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</h2>
            <Component />
          </div>
        ))}
      </div>
      <ForTraders />
    </div>
  );
}

export default RulesList;
