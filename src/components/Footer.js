import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImage from '../logo.png';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.backgroundSecondary};
  color: ${({ theme }) => theme.text};
  padding: 80px 5% 40px;
  text-align: left;
  direction: ltr;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  unicode-bidi: isolate;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  margin-right: ${props => props.isRTL ? '0' : '15px'};
  margin-left: ${props => props.isRTL ? '15px' : '0'};
  transition: ${({ theme }) => theme.transition};
  object-fit: contain;
`;

const FooterLogo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: ${({ theme }) => theme.transition};
  display: flex;
  align-items: center;
  
  &:hover {
    transform: scale(1.05);
    
    ${LogoImage} {
      transform: rotate(10deg);
    }
  }
`;

const FooterDescription = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  text-align: ${props => props.isRTL ? 'right' : 'left'};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  transition: ${({ theme }) => theme.transition};
  border: 1px solid ${({ theme }) => theme.border};
  
  &:hover {
    background: ${({ theme }) => theme.gradient};
    color: white;
    transform: translateY(-5px);
    border: 1px solid transparent;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.heading};
  position: relative;
  padding-bottom: 15px;
  text-align: ${props => props.isRTL ? 'right' : 'left'};
  
  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
    bottom: 0;
    left: 0;
    border-radius: 2px;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 12px;
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition};
    display: flex;
    align-items: center;
    text-align: ${props => props.isRTL ? 'right' : 'left'};
    flex-direction: ${props => props.isRTL ? 'row-reverse' : 'row'};
    
    &:hover {
      color: ${({ theme }) => theme.primary};
      transform: translateX(5px);
    }
    
    i {
      margin-right: ${props => props.isRTL ? '0' : '10px'};
      margin-left: ${props => props.isRTL ? '10px' : '0'};
      color: ${({ theme }) => theme.primary};
      font-size: 0.8rem;
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-direction: ${props => props.isRTL ? 'row-reverse' : 'row'};
  
  i {
    margin-right: ${props => props.isRTL ? '0' : '15px'};
    margin-left: ${props => props.isRTL ? '15px' : '0'};
    margin-top: 5px;
    color: ${({ theme }) => theme.primary};
  }
  
  div {
    flex: 1;
    text-align: ${props => props.isRTL ? 'right' : 'left'};
  }
  
  h4 {
    margin: 0 0 5px;
    color: ${({ theme }) => theme.heading};
    font-size: 1rem;
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.text};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NewsletterInput = styled.input`
  padding: 15px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  transition: ${({ theme }) => theme.transition};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryLight};
  }
`;

const NewsletterButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadowDarker};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 30px;
  margin-top: 50px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const Copyright = styled.p`
  margin: 0;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition};
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isRTL = i18n.language === 'ar';
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <LogoContainer>
            <FooterLogo to="/">
              <LogoImage src={logoImage} alt="Marketing Arabi Logo" isRTL={isRTL} />
            </FooterLogo>
          </LogoContainer>
          <FooterDescription isRTL={isRTL}>
            {t('footer.aboutText')}
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://www.facebook.com/Mb3arabi" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="https://www.instagram.com/mb3arabi?igsh=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/mb3arabi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
            <SocialLink href="https://t.me/MB3ARABY" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <i className="fab fa-telegram-plane"></i>
            </SocialLink>
            <SocialLink href="https://chat.whatsapp.com/HPLRcMx3g1V7PGmb504Tvs" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle isRTL={isRTL}>{t('footer.quickLinks')}</FooterTitle>
          <FooterLinks>
            <FooterLink isRTL={isRTL}>
              <Link to="/">
                <i className="fas fa-chevron-right"></i> {t('header.home')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/services">
                <i className="fas fa-chevron-right"></i> {t('header.services')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/about">
                <i className="fas fa-chevron-right"></i> {t('header.about')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/portfolio">
                <i className="fas fa-chevron-right"></i> {t('header.portfolio')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/blog">
                <i className="fas fa-chevron-right"></i> {t('header.blog')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/contact">
                <i className="fas fa-chevron-right"></i> {t('header.contact')}
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle isRTL={isRTL}>{t('footer.services')}</FooterTitle>
          <FooterLinks>
            <FooterLink isRTL={isRTL}>
              <Link to="/services#digital-marketing">
                <i className="fas fa-chevron-right"></i> {t('home.services.service1.title')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/services#design">
                <i className="fas fa-chevron-right"></i> {t('home.services.service2.title')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/services#development">
                <i className="fas fa-chevron-right"></i> {t('home.services.service3.title')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/services#consulting">
                <i className="fas fa-chevron-right"></i> {t('home.services.service4.title')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/services#content">
                <i className="fas fa-chevron-right"></i> {t('home.services.service7.title')}
              </Link>
            </FooterLink>
            <FooterLink isRTL={isRTL}>
              <Link to="/services#social-media">
                <i className="fas fa-chevron-right"></i> {t('home.services.service8.title')}
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle isRTL={isRTL}>{t('footer.contact')}</FooterTitle>
          <ContactInfo>
            <ContactItem isRTL={isRTL}>
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>{t('footer.address.title')}</h4>
                <p>{t('footer.address.value')}</p>
              </div>
            </ContactItem>
            <ContactItem isRTL={isRTL}>
              <i className="fas fa-phone-alt"></i>
              <div>
                <h4>{t('footer.phone.title')}</h4>
                <p dir="ltr">{t('footer.phone.value')}</p>
              </div>
            </ContactItem>
            <ContactItem isRTL={isRTL}>
              <i className="fas fa-envelope"></i>
              <div>
                <h4>{t('footer.email.title')}</h4>
                <p>{t('footer.email.value')}</p>
              </div>
            </ContactItem>
          </ContactInfo>
          <NewsletterForm>
            <FooterTitle isRTL={isRTL}>{t('footer.newsletter.title')}</FooterTitle>
            <FooterDescription isRTL={isRTL}>{t('footer.newsletter.description')}</FooterDescription>
            <NewsletterInput type="email" placeholder={t('footer.newsletter.placeholder')} />
            <NewsletterButton type="submit">{t('footer.newsletter.button')}</NewsletterButton>
          </NewsletterForm>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          &copy;&nbsp;{currentYear}&nbsp;{t('footer.copyright')}
        </Copyright>
        <FooterBottomLinks>
          <Link to="/privacy">{t('footer.privacy')}</Link>
          <Link to="/terms">{t('footer.terms')}</Link>
          <Link to="/sitemap">{t('footer.sitemap')}</Link>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
