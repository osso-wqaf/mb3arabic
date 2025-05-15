import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '../contexts/ThemeContext';
import { FaSearch, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import PortfolioHeroSVG from '../components/PortfolioHeroSVG';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding-top: 0;
  text-align: left;
  direction: ltr;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 120px 5% 0;
  overflow: hidden;
  
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
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: 60px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 40px 20px 60px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.heading};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.gradient};
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionIntro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 30px auto 50px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
`;

// Search and Filter Components
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 24px 16px 50px;
  border-radius: 50px;
  border: 2px solid ${({ theme }) => theme.backgroundSecondary};
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SearchIconContainer = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
`;

const ClearButton = styled.button`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease;
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const FilterTab = styled.button`
  padding: 8px 20px;
  border-radius: 30px;
  border: 2px solid ${({ theme, active }) => active ? theme.primary : 'transparent'};
  background-color: ${({ theme, active }) => active ? 'rgba(66, 153, 225, 0.1)' : theme.backgroundSecondary};
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme, active }) => active ? 'rgba(66, 153, 225, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

// Portfolio Grid
const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 30px;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const ProjectCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    img {
      transform: scale(1.05);
    }
  }
`;

const ProjectImageContainer = styled.div`
  height: 250px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const ProjectCategory = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ProjectContent = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.heading};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSecondary};
  flex: 1;
`;

const ProjectFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechBadge = styled.span`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ViewProjectButton = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-decoration: none;
  gap: 5px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(3px);
  }
`;

const EmptyResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.textSecondary};
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.heading};
  }
  
  p {
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const CTASection = styled.section`
  padding: 60px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.heading};
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.textSecondary};
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 12px 30px;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.primary};
  }
`;

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Categories
  const categories = [
    { id: 'all', name: t('portfolio.filter.all') },
    { id: 'web', name: t('portfolio.filter.web') },
    { id: 'mobile', name: t('portfolio.filter.mobile') },
    { id: 'design', name: t('portfolio.filter.design') },
    { id: 'marketing', name: t('portfolio.filter.marketing') }
  ];
  
  // Sample portfolio projects data
  const projects = [
    {
      id: 1,
      title: 'موقع شركة تقنية',
      description: 'تصميم وتطوير موقع إلكتروني متكامل لشركة تقنية مع لوحة تحكم',
      image: 'https://via.placeholder.com/600x400?text=Web+Project',
      category: 'web',
      techStack: ['React', 'Node.js', 'MongoDB'],
      projectUrl: '#'
    },
    {
      id: 2,
      title: 'تطبيق متجر إلكتروني',
      description: 'تطوير تطبيق للهواتف الذكية لمتجر إلكتروني مع نظام دفع متكامل',
      image: 'https://via.placeholder.com/600x400?text=Mobile+App',
      category: 'mobile',
      techStack: ['React Native', 'Firebase', 'Stripe'],
      projectUrl: '#'
    },
    {
      id: 3,
      title: 'هوية بصرية لمطعم',
      description: 'تصميم هوية بصرية متكاملة لمطعم تشمل الشعار والألوان والخطوط',
      image: 'https://via.placeholder.com/600x400?text=Brand+Identity',
      category: 'design',
      techStack: ['Adobe Illustrator', 'Photoshop'],
      projectUrl: '#'
    },
    {
      id: 4,
      title: 'حملة تسويقية لمنتج جديد',
      description: 'إدارة حملة تسويقية متكاملة لإطلاق منتج جديد في السوق',
      image: 'https://via.placeholder.com/600x400?text=Marketing+Campaign',
      category: 'marketing',
      techStack: ['Google Ads', 'Facebook Ads', 'Instagram'],
      projectUrl: '#'
    },
    {
      id: 5,
      title: 'منصة تعليمية',
      description: 'تطوير منصة تعليمية متكاملة مع نظام إدارة محتوى',
      image: 'https://via.placeholder.com/600x400?text=E-Learning+Platform',
      category: 'web',
      techStack: ['Vue.js', 'Laravel', 'MySQL'],
      projectUrl: '#'
    },
    {
      id: 6,
      title: 'تطبيق توصيل طلبات',
      description: 'تطوير تطبيق لتوصيل الطلبات مع نظام تتبع مباشر',
      image: 'https://via.placeholder.com/600x400?text=Delivery+App',
      category: 'mobile',
      techStack: ['Flutter', 'Firebase', 'Google Maps API'],
      projectUrl: '#'
    }
  ];
  
  // Filter projects based on search term and category
  useEffect(() => {
    const results = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProjects(results);
  }, [searchTerm, activeCategory]);
  
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
  };
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <PortfolioContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>{t('portfolio.hero.title')}</HeroTitle>
          <HeroText>{t('portfolio.hero.description')}</HeroText>
        </HeroContent>
        <PortfolioHeroSVG isDarkMode={isDarkMode} />
      </HeroSection>
      
      <Section>
        <SectionTitle>{t('portfolio.projects.title')}</SectionTitle>
        <SectionIntro>{t('portfolio.projects.description')}</SectionIntro>
        
        <SearchContainer>
          <SearchBox>
            <SearchIconContainer>
              <FaSearch />
            </SearchIconContainer>
            <SearchInput 
              type="text" 
              placeholder={i18n.language === 'ar' ? "ابحث عن المشاريع..." : "Search projects..."} 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <ClearButton 
              visible={searchTerm.length > 0} 
              onClick={clearSearch}
            >
              <FaTimes />
            </ClearButton>
          </SearchBox>
          
          <FilterTabs>
            {categories.map((category) => (
              <FilterTab
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </FilterTab>
            ))}
          </FilterTabs>
        </SearchContainer>
        
        {filteredProjects.length > 0 ? (
          <PortfolioGrid>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                data-aos="fade-up" 
                data-aos-delay={(project.id % 3) * 100}
              >
                <ProjectImageContainer>
                  <img src={project.image} alt={project.title} />
                  <ProjectCategory>
                    {categories.find(cat => cat.id === project.category)?.name}
                  </ProjectCategory>
                </ProjectImageContainer>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectFooter>
                    <TechStack>
                      {project.techStack.map((tech, index) => (
                        <TechBadge key={index}>{tech}</TechBadge>
                      ))}
                    </TechStack>
                    <ViewProjectButton href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                      {i18n.language === 'ar' ? "عرض" : "View"} <FaExternalLinkAlt size={14} />
                    </ViewProjectButton>
                  </ProjectFooter>
                </ProjectContent>
              </ProjectCard>
            ))}
          </PortfolioGrid>
        ) : (
          <EmptyResults>
            <h3>{i18n.language === 'ar' ? "لم يتم العثور على مشاريع" : "No projects found"}</h3>
            <p>{i18n.language === 'ar' ? "حاول تعديل معايير البحث أو التصفية للعثور على ما تبحث عنه." : "Try adjusting your search or filter criteria to find what you're looking for."}</p>
          </EmptyResults>
        )}
      </Section>
      
      {/* CTA Section */}
      <CTASection>
        <div data-aos="zoom-in">
          <CTATitle>{t('portfolio.cta.title')}</CTATitle>
          <CTAText>{t('portfolio.cta.description')}</CTAText>
          <CTAButton to="/contact">{t('portfolio.cta.button')}</CTAButton>
        </div>
      </CTASection>
    </PortfolioContainer>
  );
};

export default Portfolio;
