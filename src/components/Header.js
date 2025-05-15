import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  FaSun, FaMoon, FaBars, FaTimes, FaChevronDown,
  FaCode, FaPalette, FaShoppingCart, FaSearch,
  FaChartLine, FaChartPie, FaFeatherAlt, FaShareAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../logo.png'; 

// Keyframes animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const HeaderContainer = styled.header`
  background: ${({ theme }) => `${theme.headerBackground || theme.cardBackground}dd`};
  padding: 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => `${theme.primary}20`};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  height: 80px;
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 30px ${({ theme }) => `${theme.primary}20`};
  }
  
  @media (max-width: 768px) {
    height: 70px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  direction: ${({ isRTL }) => isRTL ? 'rtl' : 'ltr'};
  align-items: center;
  padding: 0 5%;
  height: 100%;
`;

const LogoContainer = styled.div`
  margin-left: auto;
`;

const LogoImage = styled.img`
  height: 50px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    height: 40px;
  }
`;

// Language switcher container on left side
const LanguageSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 5;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Desktop Navigation
const NavContainer = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const DesktopNav = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  flex: 1;
  z-index: 5;
  padding: 0 20px;
  order: 1;
  margin: 0 auto;
  max-width: 800px;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavItems = memo(styled.ul`
  display: flex;
  flex-direction: ${({ isRTL }) => isRTL ? 'row-reverse' : 'row'};
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`);

const NavItem = memo(styled.li`
  margin: 0 1.2rem;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:last-child {
    margin-right: 0;
  }
  
  &:first-child {
    margin-left: 0;
  }
`);

const activeNavLinkStyles = css`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  
  &:after {
    width: 100%;
    opacity: 1;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  
  ${props => props.active && activeNavLinkStyles}
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(45deg, ${({ theme }) => theme.primary}, ${({ theme }) => `${theme.primary}80`});
    transition: width 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    border-radius: 4px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    
    &:after {
      width: 100%;
      opacity: 1;
    }
  }
`;

const ServicesDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateX(0);
  min-width: 220px;
  background: ${({ theme }) => theme.isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(1, 1, 1, 0.95)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 8px;
  box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.2);
  padding: 8px;
  margin-top: 8px;
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 12px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid rgba(255, 255, 255, 0.95);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: transparent;
    pointer-events: none;
  }
`;

const ServiceItem = styled.div`
  padding: 0.25rem 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  width: 100%;
  font-size: 0.75rem;

  &:hover {
    background: linear-gradient(135deg, rgba(51, 102, 153, 0.1) 0%, rgba(51, 102, 153, 0.2) 100%);
    transform: translateX(2px);
    box-shadow: 0 3px 15px rgba(51, 102, 153, 0.3);
    position: relative;
    z-index: 1;
  }

  i {
    font-size: 0.75rem;
    color: #336699;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    right: 6px;
    width: 0.6px;
    height: 100%;
    background: linear-gradient(135deg, rgba(51, 102, 153, 0.2) 0%, rgba(51, 102, 153, 0.4) 100%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0.3px;
  }

  &:hover::after {
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: transparent;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover i {
    transform: scale(1.15);
    box-shadow: 0 0 8px rgba(51, 102, 153, 0.5);
  }
`;

const ServicesNavItem = styled(NavItem)`
  position: relative;
  display: flex;
  align-items: center;

  &:hover ${ServicesDropdown} {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-align: right;
  white-space: nowrap;
  border-right: 3px solid transparent;
  
  ${props => props.active && `
    color: ${props.theme.primary};
    background: ${props.theme.backgroundSecondary};
    border-right-color: ${props.theme.primary};
  `}
  
  &:hover {
    background: ${({ theme }) => theme.backgroundSecondary};
    color: ${({ theme }) => theme.primary};
    padding-right: 2rem;
    border-right-color: ${({ theme }) => theme.primary};
  }
`;

const ServiceIcon = styled.i`
  margin-left: 8px;
  margin-right: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const DropdownArrow = styled.span`
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 0.8rem;
`;

// Controls Section
const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  order: 2;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ThemeToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.backgroundSecondary}80`};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px ${({ theme }) => `${theme.primary}20`};
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: rotate(360deg);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 5;
  margin-right: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Mobile Navigation
const MobileMenuButton = styled.button`
  padding: 12px;
  min-width: 48px;
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  padding: 80px 20px 20px;
  gap: 1.5rem;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: ${({ theme }) => `${theme.cardBackground}f8`};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  overflow-y: auto;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.15s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
`;

const MobileNavItem = styled(NavItem)`
  font-size: 1.1rem;
  padding: 12px;
  text-align: ${({ isRTL }) => isRTL ? 'right' : 'left'};
`;

const MobileMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MobileLogo = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => `${theme.primary}15`};
  
  img {
    height: 40px;
  }
`;

const MobileMenuItem = styled.li`
  width: 100%;
  margin-bottom: 5px;
  
  &:last-child {
    margin-top: 20px;
  }
  
  a {
    display: block;
    padding: 1rem 1.5rem;
    text-decoration: none;
    color: ${({ active, theme }) => active ? theme.primary : theme.text};
    font-weight: ${({ active }) => active ? '600' : '500'};
    border-right: ${({ active, theme }) => active ? `3px solid ${theme.primary}` : '3px solid transparent'};
    transition: all 0.3s ease;
    text-align: ${({ isRTL }) => isRTL ? 'right' : 'left'};
    
    &:hover {
      background: ${({ theme }) => `${theme.backgroundSecondary}50`};
      padding-right: 2rem;
      border-right-color: ${({ theme }) => theme.primary};
    }
  }
`;

const MobileDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '600' : '500'};
  border-right: ${({ active, theme }) => active ? `3px solid ${theme.primary}` : '3px solid transparent'};
  transition: all 0.3s ease;
  text-align: ${({ isRTL }) => isRTL ? 'right' : 'left'};
  
  &:hover {
    background: ${({ theme }) => `${theme.backgroundSecondary}50`};
    padding-right: 2rem;
    border-right-color: ${({ theme }) => theme.primary};
  }
`;

const MobileDropdownContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: ${({ theme }) => `${theme.backgroundSecondary}30`};
  direction: ${({ isRTL }) => isRTL ? 'rtl' : 'ltr'};
  padding-right: ${({ isRTL }) => isRTL ? '20px' : '0'};
  padding-left: ${({ isRTL }) => isRTL ? '0' : '20px'};
`;

const MobileDropdownItem = styled(Link)`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-align: ${({ isRTL }) => isRTL ? 'right' : 'left'};
  
  &:hover {
    background: ${({ theme }) => `${theme.backgroundSecondary}50`};
    padding-right: 3rem;
    color: ${({ theme }) => theme.primary};
  }
`;

// Social Media Icons in Mobile
const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => `${theme.primary}15`};
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.backgroundSecondary}80`};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const Header = memo(() => {
    const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const isRTL = i18n.dir() === 'rtl';

  // قائمة الخدمات
  const services = [
    {
      name: t('home.services.service1.title'),
      icon: 'fas fa-bullhorn',
      path: '/services#digital-marketing',
      description: t('home.services.service1.description')
    },
    {
      name: t('home.services.service2.title'),
      icon: 'fas fa-paint-brush',
      path: '/services#design',
      description: t('home.services.service2.description')
    },
    {
      name: t('home.services.service3.title'),
      icon: 'fas fa-code',
      path: '/services#development',
      description: t('home.services.service3.description')
    },
    {
      name: t('home.services.service4.title'),
      icon: 'fas fa-chart-line',
      path: '/services#consulting',
      description: t('home.services.service4.description')
    },
    {
      name: t('home.services.service5.title'),
      icon: 'fas fa-search',
      path: '/services#seo',
      description: t('home.services.service5.description')
    },
    {
      name: t('home.services.service6.title'),
      icon: 'fas fa-feather-alt',
      path: '/services#content',
      description: t('home.services.service6.description')
    },
    {
      name: t('home.services.service7.title'),
      icon: 'fas fa-chart-pie',
      path: '/services#analytics',
      description: t('home.services.service7.description')
    },
    {
      name: t('home.services.service8.title'),
      icon: 'fas fa-share-alt',
      path: '/services#social-media',
      description: t('home.services.service8.description')
    }
  ];

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prevState => !prevState);
  }, []);

  const handleLinkClick = useCallback((e, path) => {
    e.preventDefault();
    navigate(path, { replace: true });
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMobileMenuOpen(false);
    }
  }, []);

  const ensureHeaderFixed = useCallback(() => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 10) {
        header.style.height = '70px';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.height = '80px';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', ensureHeaderFixed);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', ensureHeaderFixed);
    };
  }, [handleClickOutside, ensureHeaderFixed]);

  const serviceItems = [
    { 
      name: t('webDevelopment'),
      path: '/services/web-development',
      icon: <FaCode />,
    },
    { 
      name: t('graphicDesign'),
      path: '/services/graphic-design',
      icon: <FaPalette />,
    },
    { 
      name: t('eCommerce'),
      path: '/services/e-commerce',
      icon: <FaShoppingCart />,
    },
    { 
      name: t('seo'),
      path: '/services/seo',
      icon: <FaSearch />,
    },
    { 
      name: t('analytics'),
      path: '/services/analytics',
      icon: <FaChartLine />,
    },
    { 
      name: t('reporting'),
      path: '/services/reporting',
      icon: <FaChartPie />,
    },
    { 
      name: t('content'),
      path: '/services/content',
      icon: <FaFeatherAlt />,
    },
    { 
      name: t('social'),
      path: '/services/social',
      icon: <FaShareAlt />,
    },
  ];

  const navItems = [
    { name: t('header.home'), path: '/' },
    { name: t('header.services'), path: '/services' },
    { name: t('header.portfolio'), path: '/portfolio' },
    { name: t('header.about'), path: '/about' },
    { name: t('header.contact'), path: '/contact' },
  ];

  const toggleMobileServices = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  useEffect(() => {
    // إزالة تغيير الاتجاه واللغة
    const currentLanguage = i18n.language || 'ar';
    // document.documentElement.dir = direction;
    // document.documentElement.lang = currentLanguage;
    // document.body.classList.remove('rtl', 'ltr');
    // document.body.classList.add(direction);
  }, []); // إزالة الاعتماد على i18n.language

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Link to="/">
            <LogoImage src={logo} alt="Marketing Arabi Logo" />
          </Link>
        </LogoContainer>
        
        <NavContainer>
          <DesktopNav style={{ gridColumn: '2' }}>
            <NavItems isRTL={isRTL}>
              {navItems.map((item, index) => (
                <NavItem key={index}>
                  {item.name === t('header.services') ? (
                    <ServicesNavItem key={index}>
                      <NavLink to={item.path} active={location.pathname === item.path ? 1 : 0}>
                        {item.name}
                      </NavLink>
                      <ServicesDropdown
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'tween', duration: 0.2 }}
                      >
                        {services.map((service, idx) => (
                          <ServiceItem key={idx}>
                            <NavLink to={service.path} active={location.pathname === service.path ? 1 : 0}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                                <i className={service.icon} />
                                {service.name}
                              </div>
                            </NavLink>
                          </ServiceItem>
                        ))}
                      </ServicesDropdown>
                    </ServicesNavItem>
                  ) : (
                    <NavLink to={item.path} active={location.pathname === item.path ? 1 : 0}>
                      {item.name}
                    </NavLink>
                  )}
                </NavItem>
              ))}
            </NavItems>
          </DesktopNav>
        </NavContainer>

        <ControlsGroup>
          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
          <LanguageSwitcher />
          <MobileMenuButton onClick={toggleMobileMenu} aria-label={mobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </ControlsGroup>

        <MobileMenu isOpen={mobileMenuOpen} ref={menuRef}>
          <CloseButton onClick={toggleMobileMenu}>
            <FaTimes />
          </CloseButton>
          <MobileLogo>
            <img src={logo} alt="Marketing Arabi Logo" />
          </MobileLogo>
          <MobileMenuItems>
            <MobileNavItem active={location.pathname === '/' ? 1 : 0}>
              <Link to="/" onClick={(e) => handleLinkClick(e, '/')}>{t('header.home')}</Link>
            </MobileNavItem>
            <MobileNavItem>
              <div onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 15px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}>
                <span style={{ fontSize: '16px', fontWeight: 500 }}>{t('header.services')}</span>
                <FaChevronDown style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }} />
              </div>
              <MobileDropdownContent isRTL={isRTL} isOpen={servicesDropdownOpen}>
                {serviceItems.map((item, index) => (
                  <MobileDropdownItem 
                    key={index} 
                    to={item.path}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setServicesDropdownOpen(false);
                    }}
                  >
                    {item.icon}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</span>
                    </div>
                  </MobileDropdownItem>
                ))}
              </MobileDropdownContent>
            </MobileNavItem>
            <MobileNavItem active={location.pathname === '/portfolio' ? 1 : 0}>
              <Link to="/portfolio" onClick={(e) => handleLinkClick(e, '/portfolio')} style={{
                padding: '12px 15px',
                fontSize: '16px',
                fontWeight: 500
              }}>{t('header.portfolio')}</Link>
            </MobileNavItem>
            <MobileNavItem active={location.pathname === '/about' ? 1 : 0}>
              <Link to="/about" onClick={(e) => handleLinkClick(e, '/about')} style={{
                padding: '12px 15px',
                fontSize: '16px',
                fontWeight: 500
              }}>{t('header.about')}</Link>
            </MobileNavItem>

            <MobileNavItem active={location.pathname === '/contact' ? 1 : 0}>
              <Link to="/contact" onClick={(e) => handleLinkClick(e, '/contact')} style={{
                padding: '12px 15px',
                fontSize: '16px',
                fontWeight: 500
              }}>{t('header.contact')}</Link>
            </MobileNavItem>
            <SocialMediaIcons>
              <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </SocialIcon>
            </SocialMediaIcons>
          </MobileMenuItems>
        </MobileMenu>
      </HeaderContent>
    </HeaderContainer>
  );
});

export default Header;
