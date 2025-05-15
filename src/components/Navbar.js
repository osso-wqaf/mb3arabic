import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logoImage from '../logo.png';

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

const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-90deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
`;

// Header Wrapper
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.cardBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 60px;
    height: 100vh !important;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

// Nav
const Nav = styled.nav`
  background: ${({ theme }) => `linear-gradient(to right, ${theme.cardBackground}F0, ${theme.cardBackground})`};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => `${theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'}`};
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  z-index: 9998;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.cardBackground};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 0;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &.active {
      transform: translateX(0);
    }
  }
`;

// Nav Container
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
`;

// Logo Container
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  order: 2;

  &:hover img {
    transform: scale(1.05);
  }
`;

// Logo Image
const LogoImage = styled.img`
  height: 50px;
  transition: all 0.3s ease;
`;

// Menu Items
const MenuItems = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 1002;
  width: 100%;
  height: 100%;
  margin-right: auto;
  order: 1;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 2rem 0;
    margin-top: 2rem;
    height: 100%;
    max-height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

// Menu Item
const MenuItem = styled.li`
  margin: 0 1rem;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 1rem;
    flex: 1;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '700' : '500'};
  padding: 0.8rem 0;
  position: relative;
  font-family: 'Rubik', 'Poppins', sans-serif;
  letter-spacing: 0.5px;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 3px;
    bottom: 0;
    right: 0;
    background: ${({ theme }) => `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`};
    border-radius: 8px;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    
    &:after {
      width: 100%;
    }
  }
`;

// Dropdown Styles
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
  min-width: 220px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
  opacity: 0;
  visibility: hidden;
  transform-origin: top center;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 100;
  margin-top: 15px;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};

  &:before {
    content: '';
    position: absolute;
    top: -8px;
    right: 50%;
    transform: translateX(50%) rotate(45deg);
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.cardBackground};
    border-top: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};;
    border-right: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
    z-index: -1;
  }

  ${MenuItem}:hover & {
    opacity: 1;
    visibility: visible;
    animation: ${fadeIn} 0.3s forwards;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.85rem 1.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  text-align: right;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
    transform: translateX(-5px);
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
  transition: transform 0.3s ease;
  
  ${MenuItem}:hover & {
    transform: rotate(180deg);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  background: ${({ theme }) => `linear-gradient(to right, ${theme.primary}15, ${theme.secondary}15)`};
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001;
  
  &:hover {
    background: ${({ theme }) => `linear-gradient(to right, ${theme.primary}25, ${theme.secondary}25)`};
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  border-right: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  @media (min-width: 769px) {
    display: none;
  }
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
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  
  img {
    height: 45px;
  }
`;

const MobileMenuItem = styled.li`
  width: 100%;
  
  a {
    display: block;
    padding: 15px;
    text-decoration: none;
    color: ${({ active, theme }) => active ? theme.primary : theme.text};
    font-weight: ${({ active }) => active ? '600' : '500'};
    font-size: 1.1rem;
    font-family: 'Rubik', 'Poppins', sans-serif;
    text-align: right;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-bottom: 5px;
    
    &:hover {
      background: ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
      transform: translateX(-5px);
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const MobileDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  color: ${({ active, theme }) => active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '600' : '500'};
  font-size: 1.1rem;
  font-family: 'Rubik', 'Poppins', sans-serif;
  text-align: right;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-bottom: 5px;
  
  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
    color: ${({ theme }) => theme.primary};
  }
  
  i {
    transition: transform 0.3s ease;
    color: ${({ theme }) => theme.primary};
    font-size: 0.8rem;
  }
`;

const MobileDropdownContent = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease;
  background: ${({ theme }) => theme.isDarkMode ? 'rgba(49, 106, 140, 0.08)' : 'rgba(49, 106, 140, 0.03)'};
  border-radius: 8px;
  margin: 0 8px 10px 8px;
`;

const MobileDropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 14px 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  text-align: right;
  border-bottom: 1px solid ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  
  &:last-child {
    border-bottom: none;
  }
  
  i {
    margin-left: 10px;
    color: ${({ theme }) => theme.primary};
    font-size: 0.9rem;
  }
  
  &:hover {
    background: ${({ theme }) => theme.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(49, 106, 140, 0.05)'};
    color: ${({ theme }) => theme.primary};
    transform: translateX(-5px);
  }
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => `linear-gradient(to right, ${theme.primary}20, ${theme.secondary}20)`};
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.text};
  
  &:hover {
    transform: rotate(30deg);
    background: ${({ theme }) => `linear-gradient(to right, ${theme.primary}30, ${theme.secondary}30)`};
    color: ${({ theme }) => theme.primary};
  }
  
  i {
    font-size: 1.1rem;
  }
`;

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMobileMenu);
    return () => document.removeEventListener('click', closeMobileMenu);
  }, []);

  const serviceItems = [
    { name: "التسويق الرقمي", path: "/services/digital-marketing", icon: "fas fa-bullhorn" },
    { name: "تحسين محركات البحث", path: "/services/seo", icon: "fas fa-search" },
    { name: "وسائل التواصل الاجتماعي", path: "/services/social-media", icon: "fas fa-hashtag" },
    { name: "إنشاء المحتوى", path: "/services/content", icon: "fas fa-pen-fancy" },
    { name: "تطوير المواقع", path: "/services/web-development", icon: "fas fa-laptop-code" }
  ];

  return (
    <HeaderWrapper>
      <Nav>
        <NavContainer>
          <MenuItems>
            <MenuItem>
              <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
                الرئيسية
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
                من نحن
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/services" active={location.pathname.includes('/services') ? 1 : 0}>
                خدماتنا <DropdownArrow><i className="fas fa-chevron-down"></i></DropdownArrow>
              </NavLink>
              <DropdownMenu>
                {serviceItems.map((service, index) => (
                  <DropdownItem 
                    key={index} 
                    to={service.path}
                    active={location.pathname === service.path ? 1 : 0}
                  >
                    <ServiceIcon className={service.icon} /> {service.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </MenuItem>
            <MenuItem>
              <NavLink to="/blog" active={location.pathname === '/blog' ? 1 : 0}>
                المدونة
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
                تواصل معنا
              </NavLink>
            </MenuItem>
            <MenuItem>
              <ThemeToggle onClick={toggleTheme} aria-label="Toggle Dark Mode">
                <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </ThemeToggle>
            </MenuItem>
            <MenuItem>
              <Link to="#" onClick={(e) => { e.preventDefault(); toggleTheme(); }}>
                {isDarkMode ? 'الوضع الافتراضي' : 'الوضع الداكن'}
              </Link>
            </MenuItem>
            <MenuItem>
              <LanguageSwitcher />
            </MenuItem>
          </MenuItems>
          
          <LogoContainer>
            <Link to="/">
              <LogoImage src={logoImage} alt="Logo" />
            </Link>
          </LogoContainer>
          
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </MobileMenuButton>
          
          <MobileMenu isOpen={mobileMenuOpen} ref={menuRef}>
            <MobileLogo>
              <img src={logoImage} alt="Logo" />
            </MobileLogo>
            <MobileMenuItems>
              <MobileMenuItem active={location.pathname === '/' ? 1 : 0}>
                <Link to="/">الرئيسية</Link>
              </MobileMenuItem>
              
              <MobileMenuItem active={location.pathname === '/about' ? 1 : 0}>
                <Link to="/about">من نحن</Link>
              </MobileMenuItem>
              
              <li>
                <MobileDropdownHeader 
                  active={location.pathname.includes('/services') ? 1 : 0}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <span>خدماتنا</span>
                  <i className={`fas fa-chevron-${mobileServicesOpen ? 'up' : 'down'}`}>
                  </i>
                </MobileDropdownHeader>
                
                <MobileDropdownContent isOpen={mobileServicesOpen}>
                  {serviceItems.map((service, index) => (
                    <MobileDropdownItem 
                      key={index} 
                      to={service.path}
                    >
                      <i className={service.icon}></i> {service.name}
                    </MobileDropdownItem>
                  ))}
                </MobileDropdownContent>
              </li>
              
              <MobileMenuItem active={location.pathname === '/blog' ? 1 : 0}>
                <Link to="/blog">المدونة</Link>
              </MobileMenuItem>
              
              <MobileMenuItem active={location.pathname === '/contact' ? 1 : 0}>
                <Link to="/contact">تواصل معنا</Link>
              </MobileMenuItem>
              
              <MobileMenuItem>
                <Link to="#" onClick={(e) => { e.preventDefault(); toggleTheme(); }}>
                  {isDarkMode ? 'الوضع الافتراضي' : 'الوضع الداكن'}
                </Link>
              </MobileMenuItem>
              
              <MobileMenuItem>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                  <LanguageSwitcher />
                </div>
              </MobileMenuItem>
            </MobileMenuItems>
          </MobileMenu>
        </NavContainer>
      </Nav>
    </HeaderWrapper>
  );
};

// --- تعديل من هنا ---

// أضف في أعلى الملف (بعد الاستيرادات)
// const [menuOpen, setMenuOpen] = useState(false);
// ...
// <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
//   <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
// </MenuButton>
// ...
// <Nav className={menuOpen ? 'active' : ''}> ... </Nav>

// --- التطبيق العملي ---

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMobileMenu);
    return () => document.removeEventListener('click', closeMobileMenu);
  }, []);

  return (
    <HeaderWrapper>
      <Nav>
        <NavContainer>
          <MenuItems>
            <MenuItem>
              <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
                الرئيسية
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
                من نحن
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/services" active={location.pathname.includes('/services') ? 1 : 0}>
                خدماتنا <DropdownArrow><i className="fas fa-chevron-down"></i></DropdownArrow>
              </NavLink>
              <DropdownMenu>
                {serviceItems.map((service, index) => (
                  <DropdownItem 
                    key={index} 
                    to={service.path}
                    active={location.pathname === service.path ? 1 : 0}
                  >
                    <ServiceIcon className={service.icon} /> {service.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </MenuItem>
            <MenuItem>
              <NavLink to="/blog" active={location.pathname === '/blog' ? 1 : 0}>
                المدونة
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
                تواصل معنا
              </NavLink>
            </MenuItem>
            <MenuItem>
              <ThemeToggle onClick={toggleTheme} aria-label="Toggle Dark Mode">
                <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </ThemeToggle>
            </MenuItem>
            <MenuItem>
              <LanguageSwitcher />
            </MenuItem>
          </MenuItems>
          
          <LogoContainer>
            <LogoImage src={logoImage} alt="Marketing Arabi Logo" />
          </LogoContainer>
          
          <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
            <i className={mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </MobileMenuButton>
          
          <MobileMenu isOpen={mobileMenuOpen} ref={menuRef}>
            <MobileLogo>
              <img src={logoImage} alt="Marketing Arabi Logo" />
            </MobileLogo>
            <MobileMenuItems>
              <MobileMenuItem active={location.pathname === '/' ? 1 : 0}>
                <Link to="/">الرئيسية</Link>
              </MobileMenuItem>
              
              <MobileMenuItem active={location.pathname === '/about' ? 1 : 0}>
                <Link to="/about">من نحن</Link>
              </MobileMenuItem>
              
              <li>
                <MobileDropdownHeader 
                  active={location.pathname.includes('/services') ? 1 : 0}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <span>خدماتنا</span>
                  <i className={`fas fa-chevron-${mobileServicesOpen ? 'up' : 'down'}`}>
                  </i>
                </MobileDropdownHeader>
                
                <MobileDropdownContent isOpen={mobileServicesOpen}>
                  {serviceItems.map((service, index) => (
                    <MobileDropdownItem 
                      key={index} 
                      to={service.path}
                    >
                      <i className={service.icon}></i> {service.name}
                    </MobileDropdownItem>
                  ))}
                </MobileDropdownContent>
              </li>
              
              <MobileMenuItem active={location.pathname === '/blog' ? 1 : 0}>
                <Link to="/blog">المدونة</Link>
              </MobileMenuItem>
              
              <MobileMenuItem active={location.pathname === '/contact' ? 1 : 0}>
                <Link to="/contact">تواصل معنا</Link>
              </MobileMenuItem>
            </MobileMenuItems>
          </MobileMenu>
        </NavContainer>
      </Nav>
    </HeaderWrapper>
  );


export default Navbar;

