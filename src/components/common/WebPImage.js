import React from 'react';
import styled from 'styled-components';

// Styled picture element
const StyledPicture = styled.picture`
  display: block;
  width: 100%;
  height: 100%;
`;

// Styled img with lazy loading support
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  transition: opacity 0.3s ease;
  opacity: ${props => props.loaded ? 1 : 0};
  
  &.lazy-image {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &.lazy-image.loaded {
    opacity: 1;
  }
`;

/**
 * WebP Image компонент с автоматическим fallback
 * @param {string} src - Путь к оригинальному изображению (без расширения)
 * @param {string} alt - Alt текст
 * @param {string} className - CSS класс
 * @param {boolean} lazy - Включить lazy loading
 * @param {string} objectFit - CSS object-fit свойство
 * @param {object} ...props - Остальные пропсы
 */
const WebPImage = ({ 
  src, 
  alt, 
  className = '', 
  lazy = false, 
  objectFit = 'cover',
  loading = 'lazy',
  ...props 
}) => {
  const [loaded, setLoaded] = React.useState(!lazy);
  
  // Определяем пути для WebP и fallback
  const getImagePaths = (originalSrc) => {
    // Если src уже содержит /images/, используем как есть
    if (originalSrc.includes('/images/')) {
      const basePath = originalSrc.replace(/\.[^/.]+$/, ''); // убираем расширение
      
      return {
        webp: `${basePath}.webp`,
        fallback: originalSrc // оставляем оригинальный путь как fallback
      };
    }
    
    // Для старых путей /images/ конвертируем в /images/
    const basePath = originalSrc
      .replace('/images/', '/images/')
      .replace(/\.[^/.]+$/, ''); // убираем расширение
    
    const extension = originalSrc.match(/\.[^/.]+$/)?.[0] || '.jpg';
    
    return {
      webp: `${basePath}.webp`,
      fallback: `${basePath}${extension}` // используем оптимизированный fallback
    };
  };
  
  const { webp, fallback } = getImagePaths(src);
  
  // Определяем MIME тип fallback изображения
  const getFallbackMimeType = (path) => {
    if (path.includes('.png')) return 'image/png';
    if (path.includes('.jpg') || path.includes('.jpeg')) return 'image/jpeg';
    return 'image/jpeg'; // по умолчанию
  };
  
  const fallbackMimeType = getFallbackMimeType(fallback);
  
  const handleLoad = () => {
    setLoaded(true);
  };
  
  const imgProps = {
    alt,
    onLoad: handleLoad,
    loading: lazy ? 'lazy' : loading,
    className: `${className} ${lazy ? 'lazy-image' : ''} ${loaded ? 'loaded' : ''}`.trim(),
    objectFit,
    loaded,
    ...props
  };
  
  if (lazy) {
    // Для lazy loading используем data-src
    return (
      <StyledPicture>
        <source data-srcset={webp} type="image/webp" />
        <source data-srcset={fallback} type={fallbackMimeType} />
        <StyledImg 
          {...imgProps}
          data-src={fallback}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"
        />
      </StyledPicture>
    );
  }
  
  // Обычная загрузка
  return (
    <StyledPicture>
      <source srcSet={webp} type="image/webp" />
      <source srcSet={fallback} type={fallbackMimeType} />
      <StyledImg {...imgProps} src={fallback} />
    </StyledPicture>
  );
};

export default WebPImage;