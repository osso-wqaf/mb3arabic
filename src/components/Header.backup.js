import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { FaSun, FaMoon, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
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
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
  height: 100%;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 5;
  position: relative;
  overflow: hidden;
  order: ${({ isRTL }) => isRTL ? '2' : '0'};
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
const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  transition: all 0.3s ease;
  order: 1;
  
  @media (max-width: 768px) {
    display: none;
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
}));

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

  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.1rem;
    min-width: 1.5rem;
    transition: all 0.2s ease;
  }
`;

const ServicesDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 240px;
  background: ${({ theme }) => theme.isDarkMode ? theme.background : '#ffffff'};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.isDarkMode 
    ? '0 10px 30px -10px rgba(0, 0, 0, 0.6)' 
    : '0 10px 30px -10px rgba(0, 0, 0, 0.15)'};
  padding: 8px;
  margin-top: 12px;
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)'};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &.open {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.isDarkMode ? theme.background : '#ffffff'};
    z-index: 1001;
  }

  &::after {
    content: '';
    position: absolute;
    top: -11px;
    left: 19px;
    width: 0;
    height: 0;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 11px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)'};
    z-index: 1000;
  }
`;

const ServiceItem = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  position: relative;
  width: 100%;
  font-size: 0.9rem;
  border-radius: 8px;
  margin: 2px 0;
  font-weight: 400;
  color: ${({ theme }) => theme.isDarkMode ? '#ffffff' : theme.text};

  &:hover {
    background: ${({ theme }) => theme.isDarkMode 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.03)'};
    color: ${({ theme }) => theme.primary};
    transform: translateX(3px);
  }

  i {
    color: ${({ theme }) => theme.primary};
    font-size: 1rem;
    min-width: 1.5rem;
    transition: all 0.2s ease;
  }
`;

// Create a wrapper component to ensure theme is properly passed
const ThemedHeader = ({ children, theme }) => {
  return (
    <ThemeProvider theme={{
      ...theme,
      isDarkMode: theme.type === 'dark'
    }}>
      {children}
    </ThemeProvider>
  );
};

const Header = memo(() => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme, theme: themeContext } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const isRTL = i18n.dir() === 'rtl';
  
  // Create theme object with isDarkMode for styled-components
  const theme = {
    ...themeContext,
    isDarkMode
  };

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
      name: t('services.service1.short'), 
      path: '/services#web-development', 
      icon: 'fas fa-laptop-code',
      description: t('services.service1.description')
    },
    { 
      name: t('services.service2.short'), 
      path: '/services#design', 
      icon: 'fas fa-bullhorn',
      description: t('services.service2.description')
    },
    { 
      name: t('services.service3.short'), 
      path: '/services#seo', 
      icon: 'fas fa-search',
      description: t('services.service3.description')
    },
    { 
      name: t('services.service4.short'), 
      path: '/services#ux-design', 
      icon: 'fas fa-paint-brush',
      description: t('services.service4.description')
    },
    { 
      name: t('services.service5.short'), 
      path: '/services#consulting', 
      icon: 'fas fa-chart-line',
      description: t('services.service5.description')
    },
    { 
      name: t('services.service6.short'), 
      path: '/services#analytics', 
      icon: 'fas fa-chart-pie',
      description: t('services.service6.description')
    },
    { 
      name: t('services.service7.short'), 
      path: '/services#content-creation', 
      icon: 'fas fa-feather-alt',
      description: t('services.service7.description')
    },
    { 
      name: t('services.service8.short'), 
      path: '/services#social-media', 
      icon: 'fas fa-share-alt',
      description: t('services.service8.description')
    }
  ];

  const navItems = [
    { name: t('header.home'), path: '/' },
    { name: t('header.services'), path: '/services' },
    { name: t('header.portfolio'), path: '/portfolio' },
    { name: t('header.about'), path: '/about' },
    { name: t('header.blog'), path: '/blog' },
    { name: t('header.contact'), path: '/contact' },
  ];

  return (
    <ThemedHeader theme={theme}>
      <HeaderContainer>
      <HeaderContent>
        <LogoContainer isRTL={isRTL}>
          <Link to="/">
            <LogoImage src={logo} alt="Marketing Arabi Logo" />
          </Link>
        </LogoContainer>

        <LanguageSwitcherContainer>
          <LanguageSwitcher />
        </LanguageSwitcherContainer>

        <DesktopNav>
          <NavItems isRTL={isRTL}>
            {navItems.map((item, index) => (
              <NavItem key={index}>
                {item.name === t('header.services') ? (
                  <ServicesNavItem key={index}>
                    <NavLink to={item.path} active={location.pathname === item.path ? 1 : 0}>
                      {item.name}
                    </NavLink>
                    <ServicesDropdown
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
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

        <MobileMenu isOpen={mobileMenuOpen} ref={menuRef}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 25px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <MobileLogo>
              <img src={logo} alt="Marketing Arabi Logo" />
            </MobileLogo>
            <button
              onClick={toggleMobileMenu}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: 'white',
                fontSize: '24px',
                transition: 'transform 0.2s ease'
              }}
            >
              <FaTimes />
            </button>
          </div>
          <MobileMenuItems>
            <MobileMenuItem active={location.pathname === '/' ? 1 : 0}>
              <Link to="/" onClick={(e) => handleLinkClick(e, '/')}>{t('header.home')}</Link>
            </MobileMenuItem>
            <MobileMenuItem>
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
              <div style={{
                maxHeight: servicesDropdownOpen ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.15s ease',
                background: 'rgba(0, 0, 0, 0.1)'
              }}>
                {serviceItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={(e) => {
                      handleLinkClick(e, item.path);
                      setServicesDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 15px',
                      textDecoration: 'none',
                      color: 'white',
                      transition: 'background-color 0.2s ease',
                      fontSize: '15px'
                    }}
                  >
                    <i className={item.icon} style={{ marginRight: '10px', fontSize: '16px' }} />
                    <span style={{ opacity: 0.9 }}>{item.name}</span>
                  </Link>
                ))}
              </div>
            </MobileMenuItem>
            <MobileMenuItem active={location.pathname === '/portfolio' ? 1 : 0}>
              <Link to="/portfolio" onClick={(e) => handleLinkClick(e, '/portfolio')} style={{
                padding: '12px 15px',
                fontSize: '16px',
                fontWeight: 500
              }}>{t('header.portfolio')}</Link>
            </MobileMenuItem>
            <MobileMenuItem active={location.pathname === '/about' ? 1 : 0}>
              <Link to="/about" onClick={(e) => handleLinkClick(e, '/about')} style={{
                padding: '12px 15px',
                fontSize: '16px',
                fontWeight: 500
              }}>{t('header.about')}</Link>
            </MobileMenuItem>
            <MobileMenuItem active={location.pathname === '/blog' ? 1 : 0}>
              <Link to="/blog" onClick={(e) => handleLinkClick(e, '/blog')} style={{
                padding: '12px 15px',
                fontSize: '16px',
                fontWeight: 500
              }}>{t('header.blog')}</Link>
            </MobileMenuItem>
            <MobileMenuItem active={location.pathname === '/contact' ? 1 : 0}>
              <Link to="/contact" onClick={(e) => handleLinkClick(e, '/contact')} style={{
                padding: '12px 15px',
                fontSize: '16px',
                fontWeight: 500
              }}>{t('header.contact')}</Link>
            </MobileMenuItem>
            <MobileMenuItem>
              <Link to="#" onClick={(e) => { e.preventDefault(); toggleTheme(); }}>
                {isDarkMode ? t('theme.light') : t('theme.dark')}
              </Link>
            </MobileMenuItem>
            <MobileMenuItem>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                <LanguageSwitcher />
              </div>
            </MobileMenuItem>
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
              <SocialIcon href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </SocialIcon>
            </SocialMediaIcons>
          </MobileMenuItems>
        </MobileMenu>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 5 }}>
          <ThemeToggle onClick={toggleTheme} aria-label={isDarkMode ? t('theme.toggleLight') : t('theme.toggleDark')}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
          <MobileMenuButton onClick={toggleMobileMenu} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </div>
      </HeaderContent>
      </HeaderContainer>
    </ThemedHeader>
  );
});

export default Header;
