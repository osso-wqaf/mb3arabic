import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutHeroSVG from '../components/AboutHeroSVG';
import CompanyStorySVG from '../components/CompanyStorySVG';
import { useTheme } from '../contexts/ThemeContext';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AboutContainer = styled.div`
  padding-top: 0; /* تغيير من 80px إلى 0 لإزالة الفراغ */
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh; /* زيادة الارتفاع من 70vh إلى 100vh */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5% 0;
  background: transparent;
  color: white;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0 5% 0;
    text-align: center;
    min-height: 80vh; /* زيادة الارتفاع من 50vh إلى 80vh للشاشات الصغيرة */
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 2;
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  margin-top: 80px; /* إضافة هامش علوي ليتناسب مع ارتفاع شريط التنقل */
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff9966 0%, #ff7733 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.heroText || 'white'};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

const Section = styled.section`
  padding: 100px 5% 60px;
  background-color: ${props => props.background || props.theme.background};
  position: relative;
  overflow: hidden;
  margin-top: 50px; /* إضافة هامش علوي للأقسام */
  
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
    background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
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

const StoryContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StoryImage = styled.div`
  flex: 1;
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowDarker};
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

const StoryText = styled.div`
  flex: 1;
  
  p {
    margin-bottom: 20px;
    line-height: 1.8;
    color: ${({ theme }) => theme.text};
    transition: color 0.3s ease;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamMember = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.borderColor || 'rgba(255, 255, 255, 0.1)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const MemberImage = styled.div`
  height: 280px;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%);
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s ease;
  }
  
  ${TeamMember}:hover &:before {
    opacity: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${TeamMember}:hover & img {
    transform: scale(1.05);
  }
`;

const MemberSocial = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  
  ${TeamMember}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const MemberInfo = styled.div`
  padding: 25px;
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.heading};
`;

const MemberPosition = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 15px;
`;

const MemberBio = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const StatisticsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
`;

const StatTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 10px;
`;

const StatDescription = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ValueCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  border-top: 4px solid #ff9966;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
    background: rgba(255, 153, 102, 0.05);
  }
`;

const ValueIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #ff9966;
  font-size: 2rem;
  transition: all 0.3s ease;
  
  ${ValueCard}:hover & {
    background: #ff9966;
    color: white;
    transform: scale(1.1);
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.heading};
`;

const ValueDescription = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const ClientsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ClientLogo = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 30px;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  img {
    max-width: 100%;
    max-height: 80%;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
    
    img {
      transform: scale(1.05);
    }
  }
`;

const CTASection = styled.section`
  padding: 80px 5% 60px;
  background: linear-gradient(135deg, #316a8c 0%, #488fb0 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius || '0px'} ${({ theme }) => theme.borderRadius || '0px'} 0 0;
  margin-top: 40px;
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

const About = () => {
  const { t, i18n } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  // Valores de la empresa
  const values = [
    {
      id: 1,
      title: t('about.values.value1.title'),
      description: t('about.values.value1.description'),
      icon: 'fas fa-users'
    },
    {
      id: 2,
      title: t('about.values.value2.title'),
      description: t('about.values.value2.description'),
      icon: 'fas fa-book-open'
    },
    {
      id: 3,
      title: t('about.values.value3.title'),
      description: t('about.values.value3.description'),
      icon: 'fas fa-chart-line'
    },
    {
      id: 4,
      title: t('about.values.value4.title'),
      description: t('about.values.value4.description'),
      icon: 'fas fa-award'
    },
    {
      id: 5,
      title: t('about.values.value5.title'),
      description: t('about.values.value5.description'),
      icon: 'fas fa-hands-helping'
    },
    {
      id: 6,
      title: t('about.values.value6.title'),
      description: t('about.values.value6.description'),
      icon: 'fas fa-heart'
    }
  ];
  
  // Estadísticas
  const stats = [
    {
      id: 1,
      number: "50+",
      title: t('about.statistics.stat1.title', 'Clients'),
      description: t('about.statistics.stat1.description', 'We have worked with more than 50 entrepreneurs and project owners to achieve their marketing goals')
    },
    {
      id: 2,
      number: "100+",
      title: t('about.statistics.stat2.title', 'Projects'),
      description: t('about.statistics.stat2.description', 'We have completed more than 100 marketing campaigns, content pages, visual identities, marketing plans, websites, and more')
    },
    {
      id: 3,
      number: "3+",
      title: t('about.statistics.stat3.title', 'Years'),
      title: t('about.statistics.stat3.title', 'Years'),
      description: t('about.statistics.stat3.description', 'Our team has direct experience of more than 3 years in marketing, content design, and digital project management')
    },
    {
      id: 4,
      number: "10+",
      title: t('about.statistics.stat4.title', 'Team Members'),
      description: t('about.statistics.stat4.description', 'We collaborate with a network of more than 10 professionals with over 10 years of experience to ensure professional and seamless execution')
    }
  ];
  
  // Timeline de la empresa
  const timeline = [
    {
      year: "2023",
      event: t('about.story.timeline.2023')
    },
    {
      year: "2024",
      event: t('about.story.timeline.2024')
    },
    {
      year: "2025",
      event: t('about.story.timeline.2025')
    }
  ];
  
  // Asegurarse de que theme esté definido
  const defaultTheme = {
    primary: '#316a8c',
    text: '#333333',
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5'
  };
  
  // Usar un tema por defecto si theme es undefined
  const safeTheme = theme || defaultTheme;
  
  return (
    <AboutContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>{t('about.hero.title')}</HeroTitle>
          <HeroText>{t('about.hero.description')}</HeroText>
        </HeroContent>
        <AboutHeroSVG isDarkMode={isDarkMode} />
      </HeroSection>
      
      {/* Our Story Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.story.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          {t('about.story.intro')}
        </SectionIntro>
        
        <StoryContent>
          <StoryText data-aos="fade-right">
            <p>{t('about.story.content')}</p>
            
            {/* Timeline */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '40px',
              position: 'relative'
            }}>
              {/* Línea de tiempo */}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '0', 
                right: '0', 
                height: '4px', 
                background: safeTheme.primary,
                opacity: 0.3,
                zIndex: 0
              }}></div>
              
              {timeline.map((item, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={200 + (index * 100)} style={{
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: safeTheme.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}>
                    {item.year}
                  </div>
                  <div style={{
                    fontWeight: 'bold',
                    color: safeTheme.text
                  }}>
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </StoryText>
          
          <StoryImage data-aos="fade-left">
            <CompanyStorySVG isDarkMode={isDarkMode} />
          </StoryImage>
        </StoryContent>
      </Section>
      
      {/* Our Values Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.values.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          {t('about.values.intro')}
        </SectionIntro>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {values.map((value, index) => (
            <ValueCard key={value.id} data-aos="fade-up" data-aos-delay={200 + (index * 50)}>
              <ValueIcon>
                <i className={value.icon} style={{ fontSize: '2rem', color: safeTheme.primary }}></i>
              </ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </div>
      </Section>
      
      {/* Statistics Section */}
      <Section>
        <SectionTitle data-aos="fade-up">{t('about.statistics.title')}</SectionTitle>
        <SectionIntro data-aos="fade-up" data-aos-delay="100">
          {t('about.statistics.intro')}
        </SectionIntro>
        
        <StatisticsSection>
          {stats.map((stat, index) => (
            <StatItem key={stat.id} data-aos="fade-up" data-aos-delay={200 + (index * 100)}>
              <StatNumber>{stat.number}</StatNumber>
              <StatTitle>{stat.title}</StatTitle>
              <StatDescription>{stat.description}</StatDescription>
            </StatItem>
          ))}
        </StatisticsSection>
      </Section>
      
      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in">
          <CTATitle>{t('about.cta.title', 'تواصل معنا اليوم')}</CTATitle>
          <CTAText>{t('about.cta.description', 'لنكون شركاء في نجاحك')}</CTAText>
          <CTAButton to="/contact">{t('about.cta.button', 'تواصل معنا')}</CTAButton>
        </div>
      </CTASection>
    </AboutContainer>
  );
};

export default About;
