import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MarketingTechSVG from '../components/MarketingTechSVG';
import AboutSVG from '../components/AboutSVG';

// تحسين أداء AOS
AOS.defaults = {
  duration: 1000,
  once: true,
  mirror: false,
  offset: 50,
  easing: 'ease-in-out'
};

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  50% { border-color: transparent }
`;

const HomeContainer = styled.div`
  position: relative;
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 120px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const HeroContent = styled.div`
  max-width: 750px;
  background: transparent;
  border-radius: 20px;
  padding: 50px;
  position: relative;
  animation: ${fadeInUp} 1s ease-out;
  
  @media (max-width: 768px) {
    padding: 40px 25px;
  }
`;

const HeroTag = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 30px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  font-size: 3.8rem;
  line-height: 1.2;
  margin-bottom: 20px;
  font-weight: 800;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.isDarkMode || theme.body === '#121212' ? 'white' : 'black'};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &::after {
    content: '';
    display: inline-block;
    background: ${({ theme }) => theme.primary};
    width: 100px;
    height: 4px;
    margin-top: 20px;
    border-radius: 2px;
  }
`;

const HeroText = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 700px;
  color: ${({ theme }) => theme.isDarkMode || theme.body === '#121212' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-25deg);
    transition: all 0.75s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
    
    &:before {
      width: 100%;
      left: 100%;
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: ${({ theme }) => theme.background === '#000000' ? 'white' : theme.primary};
  border: 2px solid ${({ theme }) => theme.background === '#000000' ? 'white' : theme.primary};
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Section = styled.section`
  padding: 100px 0;
  position: relative;
  background: ${({ theme }) => theme.background};
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  position: relative;
  margin-bottom: 60px;
  text-align: center;
  color: ${({ theme }) => theme.heading};
  font-weight: 700;
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const SectionIntro = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  color: ${({ theme }) => theme.text};
  line-height: 1.8;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    transition: ${({ theme }) => theme.transition};
  }
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
  
  &:hover:before {
    height: 100%;
    opacity: 0.05;
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  transition: ${({ theme }) => theme.transition};
  
  ${ServiceCard}:hover & {
    transform: scale(1.2) rotate(5deg);
    color: ${({ theme }) => theme.secondary};
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.heading};
  transition: ${({ theme }) => theme.transition};
  
  ${ServiceCard}:hover & {
    color: ${({ theme }) => theme.primary};
  }
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ServiceButton = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  position: relative;
  transition: ${({ theme }) => theme.transition};
  text-decoration: none;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.secondary};
    transition: ${({ theme }) => theme.transition};
  }
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
    
    &:after {
      width: 100%;
    }
  }
`;

const ClientsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ClientsHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h2 {
    font-size: 2.2rem;
    margin-bottom: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.heading};
  }
  
  p {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    line-height: 1.7;
  }
`;

const ClientLogo = styled.div`
  background: ${({ theme }) => theme.isDarkMode || theme.body === '#121212' 
    ? `linear-gradient(135deg, rgba(49, 106, 140, 0.2), rgba(248, 105, 66, 0.1))`
    : `linear-gradient(135deg, rgba(49, 106, 140, 0.15), rgba(248, 105, 66, 0.08))`};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.isDarkMode || theme.body === '#121212'
    ? '0 8px 32px rgba(0, 0, 0, 0.2)'
    : '0 8px 32px rgba(49, 106, 140, 0.1), 0 4px 16px rgba(248, 105, 66, 0.05)'};
  border: 1px solid ${({ theme }) => theme.isDarkMode || theme.body === '#121212'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.7)'};
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 120px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.isDarkMode || theme.body === '#121212'
      ? 'linear-gradient(135deg, rgba(49, 106, 140, 0.25), rgba(248, 105, 66, 0.15))'
      : 'linear-gradient(135deg, rgba(49, 106, 140, 0.25), rgba(248, 105, 66, 0.2))'};
    z-index: 1;
    opacity: ${({ theme }) => theme.isDarkMode || theme.body === '#121212' ? '0.4' : '0.7'};
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 40%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.05) 60%,
      rgba(255, 255, 255, 0.1) 100%
    );
    transform: rotate(30deg);
    pointer-events: none;
    z-index: 2;
  }
  
  img {
    width: 140px; /* عرض ثابت لجميع الصور */
    height: 80px; /* ارتفاع ثابت لجميع الصور */
    object-fit: contain; /* للحفاظ على نسبة العرض إلى الارتفاع */
    position: relative;
    z-index: 3;
    filter: ${({ theme }) => theme.isDarkMode || theme.body === '#121212' ? 'brightness(1.2) contrast(1.1)' : 'none'};
    transition: all 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.isDarkMode || theme.body === '#121212'
      ? '0 15px 30px rgba(0, 0, 0, 0.3)'
      : '0 15px 30px rgba(49, 106, 140, 0.2), 0 8px 20px rgba(248, 105, 66, 0.1)'};
    border-color: ${({ theme }) => theme.isDarkMode || theme.body === '#121212'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.9)'};
    
    &::before {
      opacity: ${({ theme }) => theme.isDarkMode || theme.body === '#121212' ? '0.6' : '0.8'};
    }
    
    img {
      transform: scale(1.05);
      filter: ${({ theme }) => theme.isDarkMode || theme.body === '#121212' ? 'brightness(1.3) contrast(1.2)' : 'brightness(1.05)'};
    }
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: ${({ theme }) => theme.transition};
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  
  &:before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 5rem;
    color: ${({ theme }) => theme.primary};
    opacity: 0.1;
    font-family: serif;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const TestimonialText = styled.blockquote`
  margin: 0 0 30px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  
  strong {
    color: ${({ theme }) => theme.primary};
    opacity: 1;
  }
`;

const CTASection = styled.section`
  padding: 100px 0;
  background: ${({ theme }) => theme.gradient};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  * {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const CTATitle = styled.h2`
  font-size: 3.2rem;
  margin-bottom: 30px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 3s infinite;
  font-weight: 700;
`;

const CTAText = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.7;
  color: white;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${({ theme }) => theme.primary};
  padding: 18px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.9);
  }
`;

const AboutContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 60px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutSVGWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 400px;
  background: transparent;
  
  @media (max-width: 768px) {
    height: 350px;
    margin-bottom: 20px;
  }
`;

const AboutText = styled.div`
  flex: 1;
  
  h2 {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.heading};
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background: ${({ theme }) => theme.gradient};
      border-radius: 2px;
    }
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.text};
    margin-bottom: 2rem;
    position: relative;
    padding-left: 1rem;
    border-left: 3px solid ${({ theme }) => theme.background === '#000000' 
      ? 'rgba(49, 106, 140, 0.5)' 
      : 'rgba(49, 106, 140, 0.2)'};
  }
`;

const AboutButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 14px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};
  box-shadow: ${({ theme }) => theme.shadow};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const Home = () => {
  const { t } = useTranslation();

  
  // قائمة الخدمات
  const services = [
    {
      id: 'digital-marketing',
      title: t('services.service1.title', 'Digital Marketing'),
      description: t('services.service1.description', 'Managing advertising campaigns, social media marketing, email marketing, and content writing.'),
      image: {
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        alt: 'Digital Marketing',
        width: 800,
        height: 533
      },
      icon: 'fas fa-laptop-code',
      variant: 'default'
    },
    {
      id: 'design',
      title: t('services.service2.title', 'Design & Visual Identity'),
      description: t('services.service2.description', 'Logo design, visual identity, and design of marketing materials.'),
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-bullhorn',
      variant: 'accent'
    },
    {
      id: 'seo',
      title: t('services.service3.title', 'Website & App Development'),
      description: t('services.service3.description', 'Website development, mobile applications.'),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-search',
      variant: 'rounded'
    },
    {
      id: 'ux-design',
      title: t('services.service4.title', 'Marketing Consultations & Studies'),
      description: t('services.service4.description', 'Preparing marketing studies and strategic planning.'),
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-paint-brush',
      variant: 'bordered'
    },
    {
      id: 'consulting',
      title: t('services.service5.title', 'Sales Management'),
      description: t('services.service5.description', 'Improving sales processes and distribution points, sales planning, sales team training.'),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-chart-line',
      variant: 'sharp'
    },
    {
      id: 'analytics',
      title: t('services.service6.title', 'Visual Production'),
      description: t('services.service6.description', 'Photography, video production and editing.'),
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-chart-pie',
      variant: 'default'
    },
    {
      id: 'content-creation',
      title: 'إنشاء المحتوى',
      description: 'إنشاء محتوى جذاب وقيم يتواصل مع جمهورك ويعزز مكانة علامتك التجارية.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-feather-alt',
      variant: 'accent'
    },
    {
      id: 'social-media',
      title: t('home.services.service8.title'),
      description: t('home.services.service8.description'),
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      icon: 'fas fa-share-alt',
      variant: 'rounded'
    }
  ];
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  return (
    <HomeContainer>
      {/* Hero Section with SVG Background */}
      <HeroSection>
        <MarketingTechSVG opacity="1" />
        <ContentWrapper>
          <HeroContent>
            <HeroTag>{t('home.hero.tag', 'Marketing & Technology')}</HeroTag>
            <HeroTitle>
              {t('home.hero.title')}
            </HeroTitle>
            <HeroText>
              {t('home.hero.description')}
            </HeroText>
            <ButtonGroup>
              <PrimaryButton to="/contact">{t('home.hero.startBtn')}</PrimaryButton>
              <SecondaryButton to="/services">{t('home.hero.exploreBtn')}</SecondaryButton>
            </ButtonGroup>
          </HeroContent>
        </ContentWrapper>
      </HeroSection>
      
      {/* About Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('home.about.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up">
          {t('home.about.intro')}
        </SectionIntro>
        <AboutContent>
          <AboutSVGWrapper data-aos="fade-right">
            <AboutSVG />
          </AboutSVGWrapper>
          <AboutText data-aos="fade-left">
            <h2>{t('home.about.title')}</h2>
            <p>{t('home.about.text')}</p>
            <AboutButton to="/about">{t('home.about.button')}</AboutButton>
          </AboutText>
        </AboutContent>
      </Section>

      {/* Services Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('home.services.title')}</SectionTitle>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              data-aos="fade-up" 
              data-aos-delay={100 + (index * 50)} 
              data-aos-duration="1200"
            >
              <ServiceIcon>
                <i className={service.icon}></i>
              </ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceButton as={Link} to={`/services/${service.id}`}>
                {t('home.services.learnMore', 'Learn More')}
              </ServiceButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

      {/* Clients Section */}
      <Section id="clients" style={{ background: 'rgba(49, 106, 140, 0.03)' }}>
        <ClientsHeader data-aos="fade-up">
          <h2>{t('home.clients.title')}</h2>
          <p>{t('home.clients.description')}</p>
        </ClientsHeader>
        <ClientsSection>
          <ClientLogo data-aos="zoom-in" data-aos-delay="150" data-aos-duration="1200">
            <img src="/Copany/White logo.png" alt="Company Logo" />
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1200">
            <img src="/Copany/Asset 3.png" alt="Company Logo" />
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="250" data-aos-duration="1200">
            <img src="/Copany/FB_IMG_1746479551907.png" alt="Company Logo" />
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="300" data-aos-duration="1200">
            <img src="/Copany/Screenshot_٢٠٢٥-٠٥-٠٦-٠٠-١٢-٥١-٢٣٦_com.whatsapp.w4b[1].png" alt="Company Logo" />
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="350" data-aos-duration="1200">
            <img src="/Copany/Screenshot_٢٠٢٥-٠٥-٠٦-٠٠-١٤-٥٨-٢٧٤_com.whatsapp.w4b.png" alt="Company Logo" />
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1200">
            <img src="/Copany/1746480054701.png" alt="Company Logo" />
          </ClientLogo>
          <ClientLogo data-aos="zoom-in" data-aos-delay="450" data-aos-duration="1200">
            <img src="/Copany/1746480131712.png" alt="Company Logo" />
          </ClientLogo>
        </ClientsSection>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('home.testimonials.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up">
          {t('home.testimonials.description')}
        </SectionIntro>
        <TestimonialGrid>
          <TestimonialCard data-aos="fade-up" data-aos-delay="100">
            <TestimonialText>"{t('home.testimonials.testimonial1.text')}"</TestimonialText>
            <TestimonialAuthor>
              <strong>{t('home.testimonials.testimonial1.author')}</strong> - {t('home.testimonials.testimonial1.position')}
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard data-aos="fade-up" data-aos-delay="200">
            <TestimonialText>"{t('home.testimonials.testimonial2.text')}"</TestimonialText>
            <TestimonialAuthor>
              <strong>{t('home.testimonials.testimonial2.author')}</strong> - {t('home.testimonials.testimonial2.position')}
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard data-aos="fade-up" data-aos-delay="300">
            <TestimonialText>"{t('home.testimonials.testimonial3.text')}"</TestimonialText>
            <TestimonialAuthor>
              <strong>{t('home.testimonials.testimonial3.author')}</strong> - {t('home.testimonials.testimonial3.position')}
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </Section>

      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in">
          <CTATitle>{t('home.cta.title')}</CTATitle>
          <CTAText>{t('home.cta.description')}</CTAText>
          <CTAButton to="/contact">{t('home.cta.button')}</CTAButton>
        </div>
      </CTASection>

    </HomeContainer>
  );
};

export default Home;
