# Restaurant App

Простое приложение для ресторана с возможностью просмотра меню, добавления блюд в корзину и оформления заказов.

## Описание проекта

Это React-приложение с использованием TypeScript, Redux Toolkit для управления состоянием и Firebase Realtime Database для хранения данных. Приложение позволяет:

- Просматривать меню ресторана
- Добавлять блюда в корзину
- Управлять количеством блюд в корзине
- Оформлять заказы с указанием контактных данных

## Установка и запуск

### Требования

- Node.js (версия 18 или выше)
- npm или yarn

### Шаги для запуска:

1. **Клонирование репозитория**

    ```bash
    git clone <repository-url>
    cd Restaurant_app
    ```

2. **Установка зависимостей**

    ```bash
    npm install
    ```

3. **Настройка переменных окружения**

    Создайте файл `.env` в корне проекта на основе `.env.expample`:

    ```bash
    cp .env.expample .env
    ```

    Отредактируйте `.env` файл, заменив `https://your-firebase-project.firebaseio.com` на URL вашего Firebase проекта:

    ```
    VITE_FIREBASE_URL=https://your-firebase-project.firebaseio.com
    ```

4. **Запуск проекта**

    ```bash
    npm run dev
    ```

    Приложение будет доступно по адресу `http://localhost:5173`

## Настройка Firebase

### Создание Firebase проекта

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект или выберите существующий
3. В разделе "Build" выберите "Realtime Database"
4. Создайте базу данных

### Настройка правил доступа

Для разработки установите правила в режиме чтения/записи:

```json
{
    "rules": {
        ".read": true,
        ".write": true
    }
}
```

### Получение URL базы данных

1. В Firebase Console откройте ваш проект
2. Перейдите в раздел "Realtime Database"
3. Скопируйте URL базы данных (обычно имеет формат `https://your-project-id.firebaseio.com`)
4. Вставьте этот URL в файл `.env` вместо `https://your-firebase-project.firebaseio.com`

### Создание структуры данных

В приложении нет возможности менять блюда через интерфейс, поэтому блюда нужно добавлять напрямую в Firebase.

1. В Firebase Console откройте "Realtime Database"
2. Создайте путь `/dishes`
3. Добавьте блюда со следующей структурой:

```json
{
    "dishes": {
        "dish1": {
            "name": "Название блюда",
            "price": 299,
            "image": "https://example.com/image.jpg"
        },
        "dish2": {
            "name": "Еще одно блюдо",
            "price": 399,
            "image": "https://example.com/image2.jpg"
        }
    }
}
```

### Структура данных блюда

Каждое блюдо должно содержать следующие поля:

- `name` (string) - название блюда
- `price` (number) - цена блюда
- `image` (string) - ссылка на изображение блюда

Пример добавления блюда через Firebase Console:

```
dishes/
  ├── burger/
  │   ├── name: "Классический бургер"
  │   ├── price: 350
  │   └── image: "https://example.com/burger.jpg"
  ├── pizza/
  │   ├── name: "Маргарита"
  │   ├── price: 450
  │   └── image: "https://example.com/pizza.jpg"
  └── salad/
      ├── name: "Цезарь"
      ├── price: 320
      └── image: "https://example.com/salad.jpg"
```

## Технологии

- **React 19** - UI библиотека
- **TypeScript** - типизация
- **Vite** - сборщик проекта
- **Redux Toolkit** - управление состоянием
- **Material UI** - UI компоненты
- **Axios** - HTTP клиент
- **Firebase Realtime Database** - база данных

## Скрипты

- `npm run dev` - запуск сервера разработки
- `npm run build` - сборка
