import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServicesHeroSVG from '../components/ServicesHeroSVG';
import { FaWhatsapp, FaInfoCircle } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ServiceModal from '../components/ServiceModal';

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ServicesContainer = styled.div`
  padding-top: 0; /* تغيير من 80px إلى 0 لإزالة الفراغ */
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 80vh; /* ليست 100vh كما في صفحة About */
  display: flex;
  align-items: flex-start; /* بداية من الأعلى بدلاً من المنتصف */
  justify-content: flex-start; /* محاذاة للجانب بدلاً من المنتصف */
  padding: 120px 5% 0; /* هامش علوي أكبر */
  background: transparent;
  overflow: hidden;
  
  &:before {
    content: none;
  }

  @media (max-width: 768px) {
    padding: 100px 5% 0;
    text-align: center;
    min-height: 70vh;
    align-items: center;
    justify-content: center;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  width: 50%;
  position: relative;
  z-index: 2;
  text-align: left;
  animation: ${fadeInUp} 1s ease-out;
  background: transparent;
  padding: 40px;
  border-radius: 20px 0 0 20px;
  box-shadow: none;
  margin-left: 0;
  border-right: none;
  border-left: none;
  
  @media (max-width: 768px) {
    width: 90%;
    text-align: center;
    margin: 0 auto;
    border-radius: 0;
    border-right: none;
    border-top: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
`;

const Section = styled.section`
  padding: 100px 5%;
  background-color: ${props => props.background || props.theme.background};
  position: relative;
  margin-top: 50px;
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  position: relative;
  margin-bottom: 60px;
  text-align: center;
  color: ${({ theme }) => theme.heading};
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
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
  line-height: 1.8;
  color: ${({ theme }) => theme.text};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme, variant }) => 
    variant === 'rounded' ? '20px' : 
    variant === 'sharp' ? '0px' : 
    theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: ${({ theme, variant }) => 
    variant === 'bordered' ? `2px solid ${theme.border}` : 
    variant === 'accent' ? `2px solid ${theme.primary}` : 
    'none'};
  
  ${({ variant, theme }) => variant === 'accent' && `
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: ${theme.gradient};
    }
  `}
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const ServiceImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.gradient};
    opacity: 0.3;
    z-index: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  &:hover:before {
    opacity: 0.1;
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ServiceCard}:hover & img {
    transform: scale(1.1) rotate(2deg);
  }
`;

const ServiceContent = styled.div`
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.heading};
  position: relative;
  padding-bottom: 15px;
  transition: transform 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
    bottom: 0;
    left: 0;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  ${ServiceCard}:hover &:after {
    width: 75px;
  }
  
  ${ServiceCard}:hover & {
    transform: translateX(5px);
  }
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.8;
  margin-bottom: 20px;
  flex: 1;
`;

const ServiceButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  width: 100%;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ServiceButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 10px 15px;
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  gap: 5px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 10px 15px;
  background: #25D366;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  gap: 5px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    color: white;
    background: #128C7E;
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ProcessSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 50px;
  
  &:before {
    content: '';
    position: absolute;
    top: 50px;
    left: 15%;
    right: 15%;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    &:before {
      display: none;
    }
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StepNumber = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 20px;
  box-shadow: ${({ theme }) => theme.shadowDarker};
  position: relative;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const StepTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.heading};
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const PricingSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PricingCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: ${({ theme }) => theme.transition};
  text-align: center;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
  
  ${props => props.featured && `
    border: 2px solid ${props.theme.primary};
    transform: scale(1.05);
    z-index: 2;
    
    &:hover {
      transform: scale(1.05) translateY(-10px);
    }
    
    @media (max-width: 768px) {
      transform: scale(1);
      
      &:hover {
        transform: translateY(-10px);
      }
    }
  `}
`;

const PricingHeader = styled.div`
  padding: 30px;
  background: ${props => props.featured ? props.theme.gradient : 'transparent'};
  color: ${props => props.featured ? 'white' : props.theme.heading};
`;

const PricingTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const PricingPrice = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 20px 0;
  
  span {
    font-size: 1rem;
    font-weight: normal;
    opacity: 0.8;
  }
`;

const PricingBody = styled.div`
  padding: 30px;
`;

const PricingFeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 30px 0;
  text-align: left;
`;

const PricingFeature = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: '✓';
    color: ${({ theme }) => theme.primary};
    margin-right: 10px;
    font-weight: bold;
  }
  
  ${props => props.excluded && `
    opacity: 0.5;
    text-decoration: line-through;
    
    &:before {
      content: '✕';
      color: #ff6b6b;
    }
  `}
`;

const PricingButton = styled(Link)`
  display: inline-block;
  background: ${props => props.featured ? 'white' : props.theme.gradient};
  color: ${props => props.featured ? props.theme.primary : 'white'};
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const FeaturedLabel = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${({ theme }) => theme.secondary};
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 3;
`;

const CTASection = styled.section`
  padding: 100px 5%;
  background: ${({ theme }) => theme.gradient};
  color: white;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${({ theme }) => theme.primary};
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const WorkProcessContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 50px;
    left: 15%;
    right: 15%;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    &:before {
      display: none;
    }
  }
`;

const WorkStep = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ServiceOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.gradient};
  opacity: 0.3;
  z-index: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

const ServiceIcon = styled.i`
  font-size: 2rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.primary};
`;

const PricingSubtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const PricingGoal = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Services = () => {
  const { t, i18n } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Asegurarse de que theme esté definido
  const defaultTheme = {
    primary: '#316a8c',
    text: '#333333',
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    gradient: 'linear-gradient(135deg, #316a8c 0%, #488fb0 100%)',
    cardBackground: '#ffffff',
    shadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    shadowDarker: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: '#e0e0e0',
    borderRadius: '12px'
  };
  
  // Usar un tema por defecto si theme es undefined
  const safeTheme = theme || defaultTheme;
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  useEffect(() => {
    i18n.reloadResources([i18n.language])
      .then(() => {
        setRefreshKey(prev => prev + 1);
      });
  }, [i18n.language]);
  
  // Función para abrir el modal con el servicio seleccionado
  const openServiceModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  
  // Función para cerrar el modal
  const closeServiceModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  };
  
  // Servicios principales
  const services = [
    {
      id: 1,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      icon: 'fas fa-chart-line',
      image: '/images/services/digital-marketing.jpg',
      path: '/services/digital-marketing'
    },
    {
      id: 2,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      icon: 'fas fa-palette',
      image: '/images/services/design.jpg',
      path: '/services/design'
    },
    {
      id: 3,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      icon: 'fas fa-laptop-code',
      image: '/images/services/web-dev.jpg',
      path: '/services/web-development'
    },
    {
      id: 4,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      icon: 'fas fa-search',
      image: '/images/services/consulting.jpg',
      path: '/services/consulting'
    },
    {
      id: 5,
      title: t('services.service5.title'),
      description: t('services.service5.description'),
      icon: 'fas fa-handshake',
      image: '/images/services/sales.jpg',
      path: '/services/sales'
    },
    {
      id: 6,
      title: t('services.service6.title'),
      description: t('services.service6.description'),
      icon: 'fas fa-video',
      image: '/images/services/visual-production.jpg',
      path: '/services/visual-production'
    }
  ];
  
  // Pasos del proceso de trabajo
  // Definir los pasos del proceso de trabajo directamente para cada idioma
  const workStepsData = {
    en: [
      { number: 1, title: "Analysis", description: "Understanding your goals and analyzing your business reality" },
      { number: 2, title: "Planning", description: "Developing an integrated work strategy" },
      { number: 3, title: "Implementation", description: "Working to achieve the set objectives" },
      { number: 4, title: "Measurement", description: "Analyzing results and improving performance" }
    ],
    ar: [
      { number: 1, title: "تحليل", description: "فهم أهدافك وتحليل واقع عملك" },
      { number: 2, title: "تخطيط", description: "وضع استراتيجية عمل متكاملة" },
      { number: 3, title: "تنفيذ", description: "العمل على تحقيق الأهداف المحددة" },
      { number: 4, title: "قياس", description: "تحليل النتائج وتحسين الأداء" }
    ]
  };
  
  // Usar los pasos según el idioma actual
  const workSteps = workStepsData[i18n.language] || workStepsData.ar;
  
  return (
    <ServicesContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>{t('services.hero.title')}</HeroTitle>
          <HeroText>{t('services.hero.description')}</HeroText>
        </HeroContent>
        <ServicesHeroSVG />
      </HeroSection>
      
      {/* Main Services Section */}
      <Section>
        <SectionTitle>{t('services.title')}</SectionTitle>
        <SectionIntro>{t('services.intro')}</SectionIntro>
        
        <ServicesGrid>
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              data-aos="fade-up" 
              data-aos-delay={service.id * 100}
              variant="accent"
            >
              <ServiceImageContainer>
                <ServiceImage src={service.image || 'https://via.placeholder.com/350x200'} alt={service.title} />
                <ServiceOverlay />
              </ServiceImageContainer>
              
              <ServiceContent>
                <ServiceIcon className={service.icon} />
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceButtonsContainer>
                  <ServiceButton as={Link} to={service.path}>
                    <FaInfoCircle />
                    <span>{t('home.services.learnMore')}</span>
                  </ServiceButton>
                  <ContactButton 
                    onClick={(e) => {
                      e.preventDefault();
                      const serviceName = i18n.language === 'ar' ? service.title : service.title;
                      const message = i18n.language === 'ar' 
                        ? `مرحباً،\n\nأنا مهتم بالخدمة التالية:\n${serviceName}\n\nأرجو التواصل معي للتفاصيل.\n\nشكراً`
                        : `Hello,\n\nI'm interested in the following service:\n${serviceName}\n\nPlease contact me for more details.\n\nThank you`;
                      window.open(`https://api.whatsapp.com/send?phone=963958921597&text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <FaWhatsapp />
                    <span>{t('common.directContact')}</span>
                  </ContactButton>
                </ServiceButtonsContainer>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>
      
      {/* Work Process Section */}
      <Section>
        <SectionTitle>{t('services.process.title')}</SectionTitle>
        <SectionIntro>{t('services.process.description')}</SectionIntro>
        
        <WorkProcessContainer>
          {workSteps.map((step) => (
            <WorkStep key={step.number} data-aos="fade-up" data-aos-delay={step.number * 100}>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </WorkStep>
          ))}
        </WorkProcessContainer>
      </Section>
      
      {/* Pricing Section */}
      <Section>
        <SectionTitle>{t('services.packages.title')}</SectionTitle>
        <SectionIntro>{t('services.packages.description')}</SectionIntro>
        
        <PricingSection>
          <PricingContainer>
            <PricingCard data-aos="fade-up" data-aos-delay="200">
              <PricingHeader>
                <PricingTitle>{t('services.packages.launch.title')}</PricingTitle>
                <PricingSubtitle>{t('services.packages.launch.subtitle')}</PricingSubtitle>
              </PricingHeader>
              <PricingBody>
                <PricingFeatureList>
                  <PricingFeature>{t('services.packages.launch.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.packages.launch.feature2')}</PricingFeature>
                  <PricingFeature>{t('services.packages.launch.feature3')}</PricingFeature>
                  <PricingFeature>{t('services.packages.launch.feature4')}</PricingFeature>
                  <PricingFeature>{t('services.packages.launch.feature5')}</PricingFeature>
                </PricingFeatureList>
                <PricingGoal>{t('services.packages.launch.goal')}</PricingGoal>
                <PricingButton to="/contact">{t('services.packages.launch.button')}</PricingButton>
              </PricingBody>
            </PricingCard>
            
            <PricingCard featured data-aos="fade-up" data-aos-delay="300">
              <FeaturedLabel>Popular</FeaturedLabel>
              <PricingHeader featured>
                <PricingTitle>{t('services.packages.growth.title')}</PricingTitle>
                <PricingSubtitle>{t('services.packages.growth.subtitle')}</PricingSubtitle>
              </PricingHeader>
              <PricingBody>
                <PricingFeatureList>
                  <PricingFeature>{t('services.packages.growth.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.packages.growth.feature2')}</PricingFeature>
                  <PricingFeature>{t('services.packages.growth.feature3')}</PricingFeature>
                  <PricingFeature>{t('services.packages.growth.feature4')}</PricingFeature>
                  <PricingFeature>{t('services.packages.growth.feature5')}</PricingFeature>
                  <PricingFeature>{t('services.packages.growth.feature6')}</PricingFeature>
                  <PricingFeature>{t('services.packages.growth.feature7')}</PricingFeature>
                </PricingFeatureList>
                <PricingGoal>{t('services.packages.growth.goal')}</PricingGoal>
                <PricingButton featured to="/contact">{t('services.packages.growth.button')}</PricingButton>
              </PricingBody>
            </PricingCard>
            
            <PricingCard data-aos="fade-up" data-aos-delay="400">
              <PricingHeader>
                <PricingTitle>{t('services.packages.elite.title')}</PricingTitle>
                <PricingSubtitle>{t('services.packages.elite.subtitle')}</PricingSubtitle>
              </PricingHeader>
              <PricingBody>
                <PricingFeatureList>
                  <PricingFeature>{t('services.packages.elite.feature1')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature2')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature3')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature4')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature5')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature6')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature7')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature8')}</PricingFeature>
                  <PricingFeature>{t('services.packages.elite.feature9')}</PricingFeature>
                </PricingFeatureList>
                <PricingGoal>{t('services.packages.elite.goal')}</PricingGoal>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <PricingButton to="/contact">{t('services.packages.elite.button')}</PricingButton>
                  <PricingButton to="/contact" style={{ background: 'transparent', color: safeTheme.primary, border: `2px solid ${safeTheme.primary}` }}>
                    {t('services.packages.elite.custom')}
                  </PricingButton>
                </div>
              </PricingBody>
            </PricingCard>
          </PricingContainer>
        </PricingSection>
      </Section>
      
      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in">
          <CTATitle>{t('services.cta.title')}</CTATitle>
          <CTAText>{t('services.cta.description')}</CTAText>
          <CTAButton to="/contact">{t('services.cta.button')}</CTAButton>
        </div>
      </CTASection>
      
      {/* Ventana modal para detalles del servicio */}
      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={closeServiceModal} 
        service={selectedService}
      />
    </ServicesContainer>
  );
};

export default Services;
