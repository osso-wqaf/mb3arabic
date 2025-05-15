import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactContainer = styled.div`
  text-align: left;
  direction: ltr;
  padding-top: 80px; /* To account for fixed navbar */
`;

const HeroSection = styled.section`
  background-image: url(${props => props.background || 'https://via.placeholder.com/1920x1080'});
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ContactSection = styled.section`
  padding: 5rem 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;
  color: ${({ theme }) => theme.heading};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.heading};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
  }
`;

const ContactInfo = styled.div`
  padding: 2rem;
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;
  color: ${({ theme }) => theme.heading};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
  }
`;

const InfoText = styled.p`
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const InfoItem = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 10px;
  
  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const InfoIcon = styled.div`
  margin-right: 1rem;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  ${InfoItem}:hover & {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h4`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.heading};
`;

const MapSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.backgroundSecondary};
`;

const MapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
`;

const MapTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -15px;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${({ theme }) => theme.gradient};
  }
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 450px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  
  useEffect(() => {
    // تحسين أداء التنقل
    const handleScroll = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    handleScroll();

    // تحسين أداء AOS
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      offset: 50,
      easing: 'ease-in-out'
    });

    return () => {
      // تنظيف عند فك التحميل
      window.scrollTo(0, 0);
    };
  }, []);
  
  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate form fields
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'الاسم مطلوب';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'البريد الإلكتروني مطلوب';
        } else if (!isValidEmail(value)) {
          error = 'يرجى إدخال بريد إلكتروني صحيح';
        }
        break;
      case 'subject':
        if (!value.trim()) {
          error = 'الموضوع مطلوب';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'الرسالة مطلوبة';
        }
        break;
      default:
        break;
    }
    
    return error;
  };
  
  // Validate all fields
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      errors[key] = error;
      if (error) {
        isValid = false;
      }
    });
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Mark field as touched
    if (!formTouched[name]) {
      setFormTouched({
        ...formTouched,
        [name]: true
      });
    }
    
    // Validate field if touched
    if (formTouched[name]) {
      setFormErrors({
        ...formErrors,
        [name]: validateField(name, value)
      });
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setFormTouched({
      ...formTouched,
      [name]: true
    });
    
    // Validate field
    setFormErrors({
      ...formErrors,
      [name]: validateField(name, value)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formTouched).forEach(key => {
      allTouched[key] = true;
    });
    setFormTouched(allTouched);
    
    // Validate all fields
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setFormSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset touched state
      setFormTouched({
        name: false,
        email: false,
        subject: false,
        message: false
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } else {
      console.log('Form has errors');
    }
  };
  
  return (
    <ContactContainer>
      <HeroSection background="/images/contact-bg.jpg">
        <HeroContent data-aos="fade-up">
          <HeroTitle>تواصل معنا</HeroTitle>
          <HeroDescription>
            نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق أهدافك التسويقية. تواصل معنا اليوم لبدء رحلة نجاحك.
          </HeroDescription>
        </HeroContent>
      </HeroSection>
      
      <ContactSection>
        <ContactGrid>
          <ContactForm onSubmit={handleSubmit} data-aos="fade-up">
            <FormTitle>أرسل لنا رسالة</FormTitle>
            
            {formSubmitted && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '1rem',
                borderRadius: '5px',
                marginBottom: '1.5rem'
              }}>
                تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.
              </div>
            )}
            
            <FormGroup>
              <FormLabel>الاسم</FormLabel>
              <FormInput 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
                placeholder="أدخل اسمك الكامل"
                style={formErrors.name && formTouched.name ? { borderColor: 'red' } : {}}
              />
              {formErrors.name && formTouched.name && (
                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{formErrors.name}</div>
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormInput 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
                placeholder="example@domain.com"
                style={formErrors.email && formTouched.email ? { borderColor: 'red' } : {}}
              />
              {formErrors.email && formTouched.email && (
                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{formErrors.email}</div>
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>الموضوع</FormLabel>
              <FormInput 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
                placeholder="موضوع رسالتك"
                style={formErrors.subject && formTouched.subject ? { borderColor: 'red' } : {}}
              />
              {formErrors.subject && formTouched.subject && (
                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{formErrors.subject}</div>
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>الرسالة</FormLabel>
              <FormTextarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                onBlur={handleBlur}
                required 
                placeholder="اكتب رسالتك هنا..."
                style={formErrors.message && formTouched.message ? { borderColor: 'red' } : {}}
              />
              {formErrors.message && formTouched.message && (
                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{formErrors.message}</div>
              )}
            </FormGroup>
            
            <SubmitButton type="submit">إرسال الرسالة</SubmitButton>
          </ContactForm>
          
          <ContactInfo data-aos="fade-up" data-aos-delay="200">
            <InfoTitle>معلومات التواصل</InfoTitle>
            <InfoText>
              لا تتردد في التواصل معنا. نحن دائمًا جاهزون للمساعدة في أي استفسارات أو مشاريع.
            </InfoText>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-map-marker-alt"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>موقعنا</InfoLabel>
                <p>دمشق، سوريا</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-phone-alt"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>اتصل بنا</InfoLabel>
                <p>+963 912 345 678</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-envelope"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>راسلنا</InfoLabel>
                <p>info@mb3arbia.com</p>
              </InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoIcon>
                <i className="fas fa-clock"></i>
              </InfoIcon>
              <InfoContent>
                <InfoLabel>ساعات العمل</InfoLabel>
                <p>الأحد - الخميس: 9:00 صباحًا - 5:00 مساءً</p>
              </InfoContent>
            </InfoItem>
          </ContactInfo>
        </ContactGrid>
      </ContactSection>
      
      <MapSection>
        <MapContainer>
          <MapTitle data-aos="fade-up">موقعنا على الخريطة</MapTitle>
          <MapFrame 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106456.53429844167!2d36.23063889726563!3d33.50210499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6dc413cc6a7%3A0x6b9f66ebd1e394f2!2sDamascus%2C%20Syria!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            data-aos="zoom-in"
          />
        </MapContainer>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;
