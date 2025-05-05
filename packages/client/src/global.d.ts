// Global type definitions

// Расширяем объект Window для поддержки переменных окружения
interface Window {
  __ENV__?: {
    [key: string]: string | undefined;
  };
} 