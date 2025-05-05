import React from 'react';
import { Image } from 'antd/lib';

interface UrlImageDisplayProps {
  text: string;
}

// Регулярное выражение для поиска URL изображений
const URL_PATTERN = /(https?:\/\/\S+\.(jpg|jpeg|png|gif))/gi;

const UrlImageDisplay: React.FC<UrlImageDisplayProps> = ({ text }) => {
  // Найти все URL изображений в тексте
  const imageUrls = text.match(URL_PATTERN) || [];
  
  // Если нет изображений, просто возвращаем текст
  if (imageUrls.length === 0) {
    return <p>{text}</p>;
  }

  // Разбиваем текст на части, чтобы вставить изображения
  let parts: (string | JSX.Element)[] = [text];
  
  // Заменяем URL изображений на компоненты Image
  imageUrls.forEach((url, index) => {
    const newParts: (string | JSX.Element)[] = [];
    
    parts.forEach(part => {
      if (typeof part !== 'string') {
        newParts.push(part);
        return;
      }
      
      const splitParts = part.split(url);
      
      if (splitParts.length === 1) {
        newParts.push(part);
        return;
      }
      
      for (let i = 0; i < splitParts.length; i++) {
        if (splitParts[i]) {
          newParts.push(splitParts[i]);
        }
        
        if (i < splitParts.length - 1) {
          newParts.push(
            <Image 
              key={`image-${index}-${i}`}
              src={url}
              alt={`картинка взятая с адреса: ${url}`}
              style={{ maxWidth: '100%', height: 'auto', margin: '10px 0' }}
              width={300}
            />
          );
        }
      }
    });
    
    parts = newParts;
  });
  
  return (
    <div>
      {parts.map((part, index) => 
        typeof part === 'string' ? <span key={`text-${index}`}>{part}</span> : part
      )}
    </div>
  );
};

export default UrlImageDisplay; 