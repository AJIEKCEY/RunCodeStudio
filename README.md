### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

### DEV && PROD окружение в докере

Перед первым запуском выполните `node init.js`

1. Не забудьте создать .env файл ( для теста можно копипастнуть параметры из `.env.example`)
2. для запуска dev сборки `docker-compose up server-dev client-dev postgres pgadmin` первый запуск будет долгий, будут качаться и создаваться образы, для запуска в фоне добавляем флаг -d
3. для запуска продакшен сборки `docker-compose up server client postgres pgadmin` первый запуск будет долгий, будут качаться и создаваться образы, для запуска в фоне добавляем флаг -d
4. для остановки всех контейнеров `docker-compose stop`
5. чтобы пересобрать какой то образ перед запуском `docker-compose --build {service_name}`
6. pgadmin доступен по адресу `http://localhost:8080` с логином и паролем из .env файла, после входа добавляем сервер бд с параметрами из того же файла, при обращении внутри контейнеров к другим контейнерам используем в качестве домена имя контейнера
7. для хот-релоада контейнера при изменении файлов, их необходимо подключить через volumes в docker-compose.yml
8. Можно в докере запустить только базу например во время разработки или любые удобные вам комбинации `docker-compose -d postgres`. Обрати внимание, что хост БД будет не postgres, а localhost


### DEV разработка

1. Запустите клиента `yarn dev:client`
2. Запустите сервер `yarn dev:server`
3. Запустите БД `docker-compose -d postgres`

### Схема БД
https://drawsql.app/teams/runccodegame/diagrams/runccodedb

