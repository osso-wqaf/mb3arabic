import React from 'react';

// تحسين أداء الصور
export const optimizeImage = (image) => {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    loading: 'lazy',
    style: {
      maxWidth: '100%',
      height: 'auto'
    }
  };
};

// تحسين أداء التنقل
export const smoothScroll = (target = 0) => {
  window.scrollTo({
    top: target,
    behavior: 'smooth'
  });
};

// تحسين أداء التحميل
export const preloadImages = (images) => {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// تحسين أداء المكونات
export const memoizedComponent = (Component) => {
  return React.memo(Component, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  });
};
