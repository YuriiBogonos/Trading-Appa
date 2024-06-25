import React, { useContext, useEffect, useRef, useState } from 'react';

import ArrowIcon from '@/components/icons/ArrowIcon.tsx';
import { StarIcon } from '@/pages/Rules/components/StarIcon/StarIcon.tsx';

import { ThemeContext } from '../../../../providers/ThemeProvider.tsx';
import './Sidebar.scss';

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

const Sidebar = ({ sectionRefs }: { sectionRefs: SectionRefs }) => {
  const [openSection, setOpenSection] = useState<Section | null>(null);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const footerRef = document.getElementById('footer');
  const { isNight } = useContext(ThemeContext);
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef && sidebarRef.current) {
        const footerTop = footerRef.getBoundingClientRect().top;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        const windowBottom = window.innerHeight;

        if (footerTop < windowBottom + sidebarHeight) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [footerRef]);

  const toggleSection = (section: Section, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSection(openSection === section ? null : section);
  };

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    if (section === 'scoringMetrics' || section === 'scoringPenalties') {
      setOpenSection('scoringDetails');
    }
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (section: Section) => {
    if (section === 'scoringDetails') {
      return (
        activeSection === 'scoringDetails' ||
        activeSection === 'scoringMetrics' ||
        activeSection === 'scoringPenalties'
      );
    }
    return activeSection === section;
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isSticky ? 'sticky-sidebar' : 'sticky-sidebar-bottom'}`}
    >
      <ul>
        <li
          className={`menu-item ${isActive('serviceAgreement') ? 'active' : ''}`}
          onClick={() => scrollToSection('serviceAgreement')}
        >
          <StarIcon isActive={isActive('serviceAgreement')} />
          <span>Service Agreement</span>
        </li>
        <li
          className={`menu-item ${isActive('competitionRules') ? 'active' : ''}`}
          onClick={() => scrollToSection('competitionRules')}
        >
          <StarIcon isActive={isActive('competitionRules')} />
          <span>Competition Rules and Scoring Mechanism</span>
        </li>
        <li className={`menu-item toggle-section ${isActive('scoringDetails') ? 'active' : ''}`}>
          <div className='menu-title'>
            <StarIcon isActive={isActive('scoringDetails')} />
            <span onClick={() => scrollToSection('scoringDetails')}>Scoring Details</span>
            <div className='toggle-icon' onClick={(e) => toggleSection('scoringDetails', e)}>
              <ArrowIcon isOpen={openSection === 'scoringDetails'} isNight={isNight} />
            </div>
          </div>
          {openSection === 'scoringDetails' && (
            <ul className='submenu'>
              <li
                className={`submenu-item ${activeSection === 'scoringMetrics' ? 'active' : ''}`}
                onClick={() => scrollToSection('scoringMetrics')}
              >
                Scoring Metrics
              </li>
              <li
                className={`submenu-item ${activeSection === 'scoringPenalties' ? 'active' : ''}`}
                onClick={() => scrollToSection('scoringPenalties')}
              >
                Scoring Penalties
              </li>
            </ul>
          )}
        </li>
        <li
          className={`menu-item ${isActive('challengePeriodDetails') ? 'active' : ''}`}
          onClick={() => scrollToSection('challengePeriodDetails')}
        >
          <StarIcon isActive={isActive('challengePeriodDetails')} />
          <span>Challenge Period Details</span>
        </li>
        <li
          className={`menu-item ${isActive('historicDecay') ? 'active' : ''}`}
          onClick={() => scrollToSection('historicDecay')}
        >
          <StarIcon isActive={isActive('historicDecay')} />
          <span>Historic Decay</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
