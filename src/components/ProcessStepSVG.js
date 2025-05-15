import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SVGContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FloatingElement = styled.g`
  animation: ${float} 6s ease-in-out infinite;
`;

const PulsingElement = styled.g`
  animation: ${pulse} 4s ease-in-out infinite;
`;

const RotatingElement = styled.g`
  animation: ${rotate} 15s linear infinite;
  transform-origin: center;
`;

const ProcessStepSVG = ({ stepNumber, isDarkMode }) => {
  // Different SVGs based on step number
  const renderStepSVG = () => {
    switch (stepNumber) {
      case '01':
        return (
          <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="50" y="50" width="200" height="150" rx="10" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <rect x="70" y="70" width="160" height="20" rx="5" fill="#FF9966" opacity="0.8" />
              <rect x="70" y="100" width="120" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="70" y="120" width="140" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="70" y="140" width="100" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="70" y="170" width="80" height="20" rx="5" fill="#316A8C" opacity="0.8" />
            </FloatingElement>
            <PulsingElement>
              <circle cx="250" cy="50" r="20" fill="#FF9966" opacity="0.6" />
              <circle cx="50" cy="200" r="15" fill="#316A8C" opacity="0.6" />
            </PulsingElement>
            <RotatingElement>
              <path d="M270 150C270 166.569 256.569 180 240 180C223.431 180 210 166.569 210 150C210 133.431 223.431 120 240 120C256.569 120 270 133.431 270 150Z" stroke="#FF9966" strokeWidth="2" strokeDasharray="5 5" />
            </RotatingElement>
          </svg>
        );
      
      case '02':
        return (
          <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <circle cx="150" cy="150" r="100" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <PulsingElement>
                <path d="M150 80L170 120L215 120L180 145L190 185L150 160L110 185L120 145L85 120L130 120L150 80Z" fill="#FF9966" opacity="0.8" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="150" cy="150" r="120" stroke="#316A8C" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" />
            </RotatingElement>
            <PulsingElement>
              <rect x="50" y="230" width="50" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="50" y="250" width="30" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="200" y="230" width="50" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="200" y="250" width="30" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
            </PulsingElement>
          </svg>
        );
      
      case '03':
        return (
          <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="75" y="75" width="150" height="150" rx="10" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <PulsingElement>
                <rect x="100" y="100" width="100" height="20" rx="5" fill="#316A8C" opacity="0.8" />
                <rect x="100" y="130" width="100" height="40" rx="5" fill="#FF9966" opacity="0.7" />
                <rect x="100" y="180" width="100" height="20" rx="5" fill="#316A8C" opacity="0.8" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="75" cy="75" r="25" fill="#FF9966" opacity="0.5" />
              <circle cx="225" cy="225" r="25" fill="#316A8C" opacity="0.5" />
              <path d="M50 150H250" stroke={isDarkMode ? "#3A3A3A" : "#E0E0E0"} strokeWidth="2" strokeDasharray="5 5" />
              <path d="M150 50V250" stroke={isDarkMode ? "#3A3A3A" : "#E0E0E0"} strokeWidth="2" strokeDasharray="5 5" />
            </RotatingElement>
          </svg>
        );
      
      case '04':
        return (
          <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="50" y="100" width="200" height="100" rx="10" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <PulsingElement>
                <path d="M75 150L125 175L175 125L225 150" stroke="#FF9966" strokeWidth="4" strokeLinecap="round" />
                <circle cx="75" cy="150" r="8" fill="#316A8C" />
                <circle cx="125" cy="175" r="8" fill="#316A8C" />
                <circle cx="175" cy="125" r="8" fill="#316A8C" />
                <circle cx="225" cy="150" r="8" fill="#316A8C" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="150" cy="50" r="20" fill="#FF9966" opacity="0.5" />
              <circle cx="150" cy="250" r="20" fill="#316A8C" opacity="0.5" />
              <path d="M150 30V70" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M130 50H170" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M150 230V270" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M130 250H170" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </RotatingElement>
          </svg>
        );
      
      default:
        return (
          <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="75" y="75" width="150" height="150" rx="10" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <PulsingElement>
                <circle cx="150" cy="150" r="50" fill="#FF9966" opacity="0.6" />
                <path d="M125 150H175" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <path d="M150 125V175" stroke="white" strokeWidth="4" strokeLinecap="round" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="150" cy="150" r="75" stroke="#316A8C" strokeWidth="2" strokeDasharray="5 5" opacity="0.6" />
            </RotatingElement>
          </svg>
        );
    }
  };

  return (
    <SVGContainer>
      {renderStepSVG()}
    </SVGContainer>
  );
};

export default ProcessStepSVG;
