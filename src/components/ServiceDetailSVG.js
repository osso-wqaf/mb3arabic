import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const SVGContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 50vh;
    margin-top: 2rem;
  }
`;

const FloatingElement = styled.g`
  animation: ${float} 6s ease-in-out infinite;
`;

const RotatingElement = styled.g`
  animation: ${rotate} 12s linear infinite;
  transform-origin: center;
`;

const PulsingElement = styled.g`
  animation: ${pulse} 4s ease-in-out infinite;
`;

const ServiceDetailSVG = ({ serviceId, isDarkMode }) => {
  // SVG elements based on service type
  const renderServiceSVG = () => {
    switch (serviceId) {
      case 'digital-marketing':
        return (
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="200" y="150" width="400" height="300" rx="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <rect x="230" y="190" width="340" height="40" rx="10" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="230" y="250" width="150" height="150" rx="10" fill="#FF9966" opacity="0.8" />
              <rect x="400" y="250" width="170" height="70" rx="10" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="400" y="330" width="170" height="70" rx="10" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <PulsingElement>
                <circle cx="305" cy="325" r="50" fill="#FF7733" opacity="0.6" />
                <path d="M305 295V355M275 325H335" stroke="white" strokeWidth="8" strokeLinecap="round" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="600" cy="150" r="40" fill="#316A8C" opacity="0.7" />
              <circle cx="600" cy="150" r="30" fill="#488FB0" opacity="0.7" />
              <circle cx="600" cy="150" r="20" fill="#FF9966" opacity="0.7" />
            </RotatingElement>
            <PulsingElement>
              <circle cx="200" cy="450" r="30" fill="#FF9966" opacity="0.7" />
              <circle cx="200" cy="450" r="20" fill="#FF7733" opacity="0.7" />
            </PulsingElement>
          </svg>
        );
      
      case 'design':
        return (
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="250" y="150" width="300" height="300" rx="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <circle cx="400" cy="300" r="120" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <PulsingElement>
                <path d="M400 200L430 260L500 270L450 320L460 390L400 360L340 390L350 320L300 270L370 260L400 200Z" fill="#FF9966" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="200" cy="200" r="30" fill="#316A8C" opacity="0.7" />
              <rect x="180" y="180" width="40" height="40" rx="5" fill="#488FB0" opacity="0.7" />
              <polygon points="200,160 220,200 180,200" fill="#FF9966" opacity="0.7" />
            </RotatingElement>
            <PulsingElement>
              <rect x="550" y="350" width="100" height="20" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="550" y="380" width="80" height="20" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="550" y="410" width="60" height="20" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
            </PulsingElement>
          </svg>
        );
      
      case 'web-development':
        return (
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="200" y="150" width="400" height="300" rx="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <rect x="200" y="150" width="400" height="40" rx="20" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <circle cx="230" cy="170" r="10" fill="#FF5F57" />
              <circle cx="260" cy="170" r="10" fill="#FEBC2E" />
              <circle cx="290" cy="170" r="10" fill="#28C840" />
              <rect x="220" y="210" width="360" height="220" rx="5" fill={isDarkMode ? "#1A1A1A" : "#FFFFFF"} />
              <PulsingElement>
                <rect x="240" y="230" width="150" height="20" rx="5" fill="#316A8C" opacity="0.7" />
                <rect x="240" y="260" width="320" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
                <rect x="240" y="280" width="280" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
                <rect x="240" y="300" width="300" height="10" rx="5" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
                <rect x="240" y="330" width="180" height="40" rx="5" fill="#FF9966" opacity="0.8" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="600" cy="150" r="30" fill="#316A8C" opacity="0.7" />
              <path d="M585 150L615 150M600 135L600 165" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </RotatingElement>
            <PulsingElement>
              <circle cx="150" cy="350" r="40" fill="#FF9966" opacity="0.5" />
              <path d="M135 350L165 350M150 335L150 365" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </PulsingElement>
          </svg>
        );
      
      case 'consulting':
        return (
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="250" y="150" width="300" height="300" rx="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <PulsingElement>
                <path d="M400 200C433.137 200 460 226.863 460 260C460 293.137 433.137 320 400 320C366.863 320 340 293.137 340 260C340 226.863 366.863 200 400 200Z" fill="#316A8C" opacity="0.7" />
                <path d="M400 340C433.137 340 460 366.863 460 400C460 433.137 433.137 460 400 460C366.863 460 340 433.137 340 400C340 366.863 366.863 340 400 340Z" fill="#FF9966" opacity="0.7" />
                <rect x="395" y="320" width="10" height="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
                <path d="M340 260H460M400 200V320" stroke="white" strokeWidth="4" strokeDasharray="10 5" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="550" cy="200" r="30" fill="#488FB0" opacity="0.7" />
              <path d="M535 200L565 200M550 185L550 215" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </RotatingElement>
            <PulsingElement>
              <rect x="200" y="400" width="80" height="80" rx="10" fill="#FF9966" opacity="0.5" />
              <path d="M220 440L260 440M240 420L240 460" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </PulsingElement>
          </svg>
        );
      
      case 'sales':
        return (
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="200" y="150" width="400" height="300" rx="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <PulsingElement>
                <path d="M250 350L350 250L450 300L550 200" stroke="#FF9966" strokeWidth="8" strokeLinecap="round" />
                <circle cx="250" cy="350" r="15" fill="#316A8C" />
                <circle cx="350" cy="250" r="15" fill="#316A8C" />
                <circle cx="450" cy="300" r="15" fill="#316A8C" />
                <circle cx="550" cy="200" r="15" fill="#316A8C" />
              </PulsingElement>
              <rect x="200" y="400" width="400" height="2" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="200" y="150" width="2" height="250" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
            </FloatingElement>
            <RotatingElement>
              <circle cx="650" cy="300" r="40" fill="#FF9966" opacity="0.5" />
              <path d="M630 300L670 300M650 280L650 320" stroke="white" strokeWidth="6" strokeLinecap="round" />
            </RotatingElement>
            <PulsingElement>
              <rect x="150" y="250" width="60" height="60" rx="30" fill="#316A8C" opacity="0.7" />
              <path d="M165 250L195 250M180 235L180 265" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </PulsingElement>
          </svg>
        );
      
      case 'visual-production':
        return (
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="250" y="150" width="300" height="200" rx="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <rect x="270" y="170" width="260" height="160" rx="10" fill={isDarkMode ? "#1A1A1A" : "#FFFFFF"} />
              <PulsingElement>
                <circle cx="400" cy="250" r="50" fill="#FF9966" opacity="0.7" />
                <path d="M385 250L425 250" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <path d="M400 235L400 265" stroke="white" strokeWidth="6" strokeLinecap="round" />
              </PulsingElement>
              <rect x="300" y="370" width="200" height="80" rx="10" fill={isDarkMode ? "#3A3A3A" : "#E0E0E0"} />
              <rect x="320" y="390" width="30" height="40" rx="5" fill="#316A8C" opacity="0.7" />
              <rect x="360" y="390" width="30" height="40" rx="5" fill="#488FB0" opacity="0.7" />
              <rect x="400" y="390" width="30" height="40" rx="5" fill="#FF9966" opacity="0.7" />
              <rect x="440" y="390" width="30" height="40" rx="5" fill="#FF7733" opacity="0.7" />
            </FloatingElement>
            <RotatingElement>
              <circle cx="550" cy="200" r="30" fill="#316A8C" opacity="0.7" />
              <path d="M535 200L565 200M550 185L550 215" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </RotatingElement>
            <PulsingElement>
              <circle cx="200" cy="300" r="40" fill="#FF9966" opacity="0.5" />
              <path d="M180 300L220 300M200 280L200 320" stroke="white" strokeWidth="6" strokeLinecap="round" />
            </PulsingElement>
          </svg>
        );
      
      default:
        return (
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <FloatingElement>
              <rect x="250" y="150" width="300" height="300" rx="20" fill={isDarkMode ? "#2A2A2A" : "#F5F5F5"} />
              <PulsingElement>
                <circle cx="400" cy="300" r="100" fill="#FF9966" opacity="0.6" />
                <path d="M350 300L450 300M400 250L400 350" stroke="white" strokeWidth="8" strokeLinecap="round" />
              </PulsingElement>
            </FloatingElement>
            <RotatingElement>
              <circle cx="600" cy="200" r="40" fill="#316A8C" opacity="0.7" />
              <circle cx="600" cy="200" r="20" fill="#488FB0" opacity="0.7" />
            </RotatingElement>
            <PulsingElement>
              <circle cx="200" cy="400" r="30" fill="#FF9966" opacity="0.7" />
              <circle cx="200" cy="400" r="15" fill="#FF7733" opacity="0.7" />
            </PulsingElement>
          </svg>
        );
    }
  };

  return (
    <SVGContainer>
      {renderServiceSVG()}
    </SVGContainer>
  );
};

export default ServiceDetailSVG;
