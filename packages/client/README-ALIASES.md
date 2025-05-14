# Использование алиасов в проекте

В проекте настроены алиасы путей для упрощения импортов. Это позволяет импортировать модули, используя короткие и понятные пути вместо относительных путей.

## Доступные алиасы

| Алиас         | Путь              | Пример использования                                   |
| ------------- | ----------------- | ------------------------------------------------------ |
| `@`           | `src/`            | `import App from '@/App'`                              |
| `@components` | `src/components/` | `import { Button } from '@components/Button'`          |
| `@hooks`      | `src/hooks/`      | `import { useAuth } from '@hooks/useAuth'`             |
| `@pages`      | `src/pages/`      | `import { Home } from '@pages/Home'`                   |
| `@utils`      | `src/utils/`      | `import { formatDate } from '@utils/formatDate'`       |
| `@assets`     | `src/assets/`     | `import logo from '@assets/logo.svg'`                  |
| `@config`     | `src/config/`     | `import { API_URLS } from '@config/api'`               |
| `@styles`     | `src/styles/`     | `import '@styles/global.css'`                          |
| `@services`   | `src/services/`   | `import { authService } from '@services/auth'`         |
| `@types`      | `src/types/`      | `import { User } from '@types/models'`                 |
| `@context`    | `src/context/`    | `import { ThemeContext } from '@context/ThemeContext'` |

## Преимущества использования алиасов

1. **Повышенная читаемость кода** - Алиасы делают импорты более читаемыми и понятными.
2. **Избавление от "библии" относительных путей** - Нет необходимости писать `../../../components/Button`.
3. **Упрощение рефакторинга** - При перемещении файлов не нужно обновлять относительные пути во всех импортах.
4. **Повышение производительности разработки** - Проще найти и импортировать нужные модули.

## Пример использования

До использования алиасов:

```typescript
import { API_URLS } from '../../../config/api'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
```

После использования алиасов:

```typescript
import { API_URLS } from '@config/api'
import { Button } from '@components/Button'
import { useAuth } from '@hooks/useAuth'
```
