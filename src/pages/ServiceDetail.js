import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceDetailSVG from '../components/ServiceDetailSVG';
import ProcessStepSVG from '../components/ProcessStepSVG';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ServiceDetailContainer = styled.div`
  padding-top: 0;
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 5%;
  background: ${({ theme }) => theme.gradient};
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.type === 'dark' ? 
      'radial-gradient(circle at 20% 30%, rgba(49, 106, 140, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 153, 102, 0.3) 0%, transparent 40%)' : 
      'radial-gradient(circle at 20% 30%, rgba(49, 106, 140, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 153, 102, 0.15) 0%, transparent 40%)'};
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.type === 'dark' ? 
      'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, transparent 100%)' : 
      'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)'};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 80px 5% 60px;
  }
`;

const HeroContent = styled.div`
  width: 50%;
  text-align: left;
  direction: ltr;
  margin-right: auto;
  padding-left: 5%;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  color: white;
  text-shadow: none;
  background: linear-gradient(135deg, #ff9966, #ff5e62);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: left;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  text-align: left;
  direction: ltr;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  padding: 80px 5%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
  
  &:nth-child(odd) {
    background: ${({ theme }) => theme.type === 'dark' ? 
      'linear-gradient(to right, rgba(49, 106, 140, 0.05) 0%, rgba(49, 106, 140, 0.02) 100%)' : 
      'linear-gradient(to right, rgba(49, 106, 140, 0.03) 0%, rgba(49, 106, 140, 0.01) 100%)'};
  }
  
  &:nth-child(even) {
    background: ${({ theme }) => theme.type === 'dark' ? 
      'linear-gradient(to left, rgba(255, 153, 102, 0.05) 0%, rgba(255, 153, 102, 0.02) 100%)' : 
      'linear-gradient(to left, rgba(255, 153, 102, 0.03) 0%, rgba(255, 153, 102, 0.01) 100%)'};
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.type === 'dark' ? 
      'radial-gradient(circle at 10% 10%, rgba(49, 106, 140, 0.1) 0%, transparent 30%), radial-gradient(circle at 90% 90%, rgba(255, 153, 102, 0.1) 0%, transparent 30%)' : 
      'radial-gradient(circle at 10% 10%, rgba(49, 106, 140, 0.05) 0%, transparent 30%), radial-gradient(circle at 90% 90%, rgba(255, 153, 102, 0.05) 0%, transparent 30%)'};
    z-index: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  position: relative;
  margin-bottom: 60px;
  text-align: center;
  color: white;
  text-shadow: ${({ theme }) => theme.shadowDarker};
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #ff9966 0%, #ff7733 100%);
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const SectionIntro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  font-size: 1.2rem;
  line-height: 1.9;
  color: ${({ theme }) => theme.text};
  text-shadow: none;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #ff9966 0%, #ff7733 100%);
    opacity: 0.1;
    border-radius: 50%;
    z-index: 0;
    animation: ${pulse} 10s ease-in-out infinite;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -70px;
    left: -70px;
    width: 250px;
    height: 250px;
    background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
    opacity: 0.1;
    border-radius: 50%;
    z-index: 0;
    animation: ${pulse} 12s ease-in-out infinite;
  }
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  border-top: 4px solid #316a8c;
  padding: 30px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
    background: rgba(49, 106, 140, 0.05);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #316a8c;
  font-size: 2rem;
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    background: #316a8c;
    color: white;
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: white;
  text-shadow: ${({ theme }) => theme.shadowDarker};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.text};
  text-shadow: none;
  line-height: 1.8;
`;

const ProcessStep = styled.div`
  display: flex;
  margin-bottom: 80px;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
    text-align: center;
    padding-left: 50px;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    .process-number {
      transform: scale(1.1);
      background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
    }
    
    .process-image {
      transform: scale(1.02);
    }
  }
`;

const ProcessSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const ProcessNumberBase = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -40px;
  z-index: 2;
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
    opacity: 0.4;
    filter: blur(10px);
    z-index: -1;
    animation: ${pulse} 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    left: 0;
    transform: none;
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
`;

const ProcessImageBase = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 300px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProcessImage = styled(ProcessImageBase)`
  &.process-image {
    flex: 1;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 300px;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      height: 200px;
    }
  }
`;

const ProcessContent = styled.div`
  flex: 1;
  padding: 40px 30px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  text-align: center;
  direction: ltr;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowDarker};
    transform: translateY(-5px);
    background: linear-gradient(135deg, rgba(49, 106, 140, 0.05) 0%, rgba(49, 106, 140, 0.02) 100%);
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ProcessNumber = styled(ProcessNumberBase)`
  &.process-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -40px;
    z-index: 2;
  }
`;

const ProcessTitle = styled.h4`
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
  text-shadow: ${({ theme }) => theme.shadowDarker};
  position: relative;
  display: inline-block;
  text-align: center;
  direction: ltr;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    bottom: -10px;
    left: 0;
    background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${ProcessContent}:hover & {
    &:after {
      opacity: 1;
    }
  }
`;

const ProcessDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.text};
  text-shadow: none;
  margin-bottom: 20px;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  text-align: center;
  direction: ltr;
  
  ${ProcessContent}:hover & {
    opacity: 1;
  }
`;

const CTASection = styled.section`
  padding: 100px 5% 80px;
  background: linear-gradient(135deg, #ff9966 0%, #ff7733 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: ${pulse} 8s ease-in-out infinite;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: ${pulse} 10s ease-in-out infinite;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: white;
  color: #ff7733;
  padding: 15px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.4s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    &:before {
      width: 100%;
    }
  }
`;

const ServiceDetail = () => {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  const { theme } = useTheme();
  
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
      offset: 100,
      easing: 'ease-in-out-cubic'
    });
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Service data mapping
  const services = {
    'digital-marketing': {
      id: 1,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      fullDescription: t('services.service1.fullDescription'),
      icon: 'fas fa-chart-line',
      image: '/images/services/digital-marketing.jpg',
      features: [
        {
          icon: 'fas fa-ad',
          title: t('services.service1.features.feature1.title'),
          description: t('services.service1.features.feature1.description')
        },
        {
          icon: 'fas fa-share-alt',
          title: t('services.service1.features.feature2.title'),
          description: t('services.service1.features.feature2.description')
        },
        {
          icon: 'fas fa-envelope',
          title: t('services.service1.features.feature3.title'),
          description: t('services.service1.features.feature3.description')
        },
        {
          icon: 'fas fa-pen',
          title: t('services.service1.features.feature4.title'),
          description: t('services.service1.features.feature4.description')
        }
      ],
      process: [
        {
          number: '01',
          title: t('services.service1.process.step1.title'),
          description: t('services.service1.process.step1.description'),
          image: '/images/services/process/analysis.jpg'
        },
        {
          number: '02',
          title: t('services.service1.process.step2.title'),
          description: t('services.service1.process.step2.description'),
          image: '/images/services/process/strategy.jpg'
        },
        {
          number: '03',
          title: t('services.service1.process.step3.title'),
          description: t('services.service1.process.step3.description'),
          image: '/images/services/process/implementation.jpg'
        }
      ]
    },
    'design': {
      id: 2,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      fullDescription: t('services.service2.fullDescription'),
      icon: 'fas fa-palette',
      image: '/images/services/design.jpg',
      features: [
        {
          icon: 'fas fa-paint-brush',
          title: t('services.service2.features.feature1.title'),
          description: t('services.service2.features.feature1.description')
        },
        {
          icon: 'fas fa-id-card',
          title: t('services.service2.features.feature2.title'),
          description: t('services.service2.features.feature2.description')
        },
        {
          icon: 'fas fa-file-image',
          title: t('services.service2.features.feature3.title'),
          description: t('services.service2.features.feature3.description')
        },
        {
          icon: 'fas fa-object-group',
          title: t('services.service2.features.feature4.title'),
          description: t('services.service2.features.feature4.description')
        }
      ],
      process: [
        {
          number: '01',
          title: t('services.service2.process.step1.title'),
          description: t('services.service2.process.step1.description'),
          image: '/images/services/process/briefing.jpg'
        },
        {
          number: '02',
          title: t('services.service2.process.step2.title'),
          description: t('services.service2.process.step2.description'),
          image: '/images/services/process/concept.jpg'
        },
        {
          number: '03',
          title: t('services.service2.process.step3.title'),
          description: t('services.service2.process.step3.description'),
          image: '/images/services/process/refinement.jpg'
        }
      ]
    },
    'web-development': {
      id: 3,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      fullDescription: t('services.service3.fullDescription'),
      icon: 'fas fa-laptop-code',
      image: '/images/services/web-dev.jpg',
      features: [
        {
          icon: 'fas fa-desktop',
          title: t('services.service3.features.feature1.title'),
          description: t('services.service3.features.feature1.description')
        },
        {
          icon: 'fas fa-mobile-alt',
          title: t('services.service3.features.feature2.title'),
          description: t('services.service3.features.feature2.description')
        },
        {
          icon: 'fas fa-shopping-cart',
          title: t('services.service3.features.feature3.title'),
          description: t('services.service3.features.feature3.description')
        },
        {
          icon: 'fas fa-server',
          title: t('services.service3.features.feature4.title'),
          description: t('services.service3.features.feature4.description')
        }
      ],
      process: [
        {
          number: '01',
          title: t('services.service3.process.step1.title'),
          description: t('services.service3.process.step1.description'),
          image: '/images/services/process/planning.jpg'
        },
        {
          number: '02',
          title: t('services.service3.process.step2.title'),
          description: t('services.service3.process.step2.description'),
          image: '/images/services/process/design.jpg'
        },
        {
          number: '03',
          title: t('services.service3.process.step3.title'),
          description: t('services.service3.process.step3.description'),
          image: '/images/services/process/development.jpg'
        },
        {
          number: '04',
          title: t('services.service3.process.step4.title'),
          description: t('services.service3.process.step4.description'),
          image: '/images/services/process/testing.jpg'
        }
      ]
    },
    'consulting': {
      id: 4,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      fullDescription: t('services.service4.fullDescription'),
      icon: 'fas fa-search',
      image: '/images/services/consulting.jpg',
      features: [
        {
          icon: 'fas fa-chart-pie',
          title: t('services.service4.features.feature1.title'),
          description: t('services.service4.features.feature1.description')
        },
        {
          icon: 'fas fa-bullseye',
          title: t('services.service4.features.feature2.title'),
          description: t('services.service4.features.feature2.description')
        },
        {
          icon: 'fas fa-users',
          title: t('services.service4.features.feature3.title'),
          description: t('services.service4.features.feature3.description')
        },
        {
          icon: 'fas fa-lightbulb',
          title: t('services.service4.features.feature4.title'),
          description: t('services.service4.features.feature4.description')
        }
      ],
      process: [
        {
          number: '01',
          title: t('services.service4.process.step1.title'),
          description: t('services.service4.process.step1.description'),
          image: '/images/services/process/research.jpg'
        },
        {
          number: '02',
          title: t('services.service4.process.step2.title'),
          description: t('services.service4.process.step2.description'),
          image: '/images/services/process/analysis.jpg'
        },
        {
          number: '03',
          title: t('services.service4.process.step3.title'),
          description: t('services.service4.process.step3.description'),
          image: '/images/services/process/recommendation.jpg'
        }
      ]
    },
    'sales': {
      id: 5,
      title: t('services.service5.title'),
      description: t('services.service5.description'),
      fullDescription: t('services.service5.fullDescription'),
      icon: 'fas fa-handshake',
      image: '/images/services/sales.jpg',
      features: [
        {
          icon: 'fas fa-funnel-dollar',
          title: t('services.service5.features.feature1.title'),
          description: t('services.service5.features.feature1.description')
        },
        {
          icon: 'fas fa-chalkboard-teacher',
          title: t('services.service5.features.feature2.title'),
          description: t('services.service5.features.feature2.description')
        },
        {
          icon: 'fas fa-tasks',
          title: t('services.service5.features.feature3.title'),
          description: t('services.service5.features.feature3.description')
        },
        {
          icon: 'fas fa-comments-dollar',
          title: t('services.service5.features.feature4.title'),
          description: t('services.service5.features.feature4.description')
        }
      ],
      process: [
        {
          number: '01',
          title: t('services.service5.process.step1.title'),
          description: t('services.service5.process.step1.description'),
          image: '/images/services/process/assessment.jpg'
        },
        {
          number: '02',
          title: t('services.service5.process.step2.title'),
          description: t('services.service5.process.step2.description'),
          image: '/images/services/process/training.jpg'
        },
        {
          number: '03',
          title: t('services.service5.process.step3.title'),
          description: t('services.service5.process.step3.description'),
          image: '/images/services/process/implementation.jpg'
        }
      ]
    },
    'visual-production': {
      id: 6,
      title: t('services.service6.title'),
      description: t('services.service6.description'),
      fullDescription: t('services.service6.fullDescription'),
      icon: 'fas fa-video',
      image: '/images/services/visual-production.jpg',
      features: [
        {
          icon: 'fas fa-camera',
          title: t('services.service6.features.feature1.title'),
          description: t('services.service6.features.feature1.description')
        },
        {
          icon: 'fas fa-film',
          title: t('services.service6.features.feature2.title'),
          description: t('services.service6.features.feature2.description')
        },
        {
          icon: 'fas fa-photo-video',
          title: t('services.service6.features.feature3.title'),
          description: t('services.service6.features.feature3.description')
        },
        {
          icon: 'fas fa-cube',
          title: t('services.service6.features.feature4.title'),
          description: t('services.service6.features.feature4.description')
        }
      ],
      process: [
        {
          number: '01',
          title: t('services.service6.process.step1.title'),
          description: t('services.service6.process.step1.description'),
          image: '/images/services/process/concept.jpg'
        },
        {
          number: '02',
          title: t('services.service6.process.step2.title'),
          description: t('services.service6.process.step2.description'),
          image: '/images/services/process/production.jpg'
        },
        {
          number: '03',
          title: t('services.service6.process.step3.title'),
          description: t('services.service6.process.step3.description'),
          image: '/images/services/process/post-production.jpg'
        }
      ]
    }
  };
  
  const service = services[serviceId];
  
  if (!service) {
    return (
      <div style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h1>Service not found</h1>
        <p>The service you are looking for does not exist.</p>
        <Link to="/services">Back to Services</Link>
      </div>
    );
  }
  
  return (
    <ServiceDetailContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>{service.title}</HeroTitle>
          <HeroText>{service.description}</HeroText>
        </HeroContent>
        <ServiceDetailSVG serviceId={serviceId} isDarkMode={theme.type === 'dark'} />
      </HeroSection>
      
      {/* Overview Section */}
      <Section>
        <SectionTitle data-aos="fade-up" data-aos-duration="1200">{t('serviceDetail.overview')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="150" data-aos-duration="1200">
          {service.fullDescription || service.description}
        </SectionIntro>
        
        <FeatureGrid>
          {service.features.map((feature, index) => (
            <FeatureCard 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
            >
              <FeatureIcon>
                <i className={feature.icon}></i>
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Section>
      
      {/* Process Section */}
      <Section>
        <SectionTitle data-aos="fade-up" data-aos-duration="1200">{t('serviceDetail.process')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="150" data-aos-duration="1200">
          {t('serviceDetail.processIntro')}
        </SectionIntro>
        
        <ProcessSection>
          {service.process.map((step, index) => (
            <ProcessStep 
              key={index} 
              reverse={index % 2 !== 0}
              data-aos="fade-up" 
              data-aos-delay={150 + (index * 100)}
              data-aos-duration="1200"
            >
              <ProcessNumber className="process-number">{step.number}</ProcessNumber>
              {index % 2 === 0 ? (
                <>
                  <ProcessContent>
                    <ProcessTitle>{step.title}</ProcessTitle>
                    <ProcessDescription>{step.description}</ProcessDescription>
                  </ProcessContent>
                  <ProcessImage className="process-image">
                    <ProcessStepSVG stepNumber={step.number} isDarkMode={theme.type === 'dark'} />
                  </ProcessImage>
                </>
              ) : (
                <>
                  <ProcessImage className="process-image">
                    <ProcessStepSVG stepNumber={step.number} isDarkMode={theme.type === 'dark'} />
                  </ProcessImage>
                  <ProcessContent>
                    <ProcessTitle>{step.title}</ProcessTitle>
                    <ProcessDescription>{step.description}</ProcessDescription>
                  </ProcessContent>
                </>
              )}
            </ProcessStep>
          ))}
        </ProcessSection>
      </Section>
      
      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in" data-aos-duration="1200">
          <CTATitle>{t('serviceDetail.cta.title')}</CTATitle>
          <CTAText>{t('serviceDetail.cta.description')}</CTAText>
          <CTAButton to="/contact">{t('serviceDetail.cta.button')}</CTAButton>
        </div>
      </CTASection>
    </ServiceDetailContainer>
  );
};

export default ServiceDetail;
