### **1. Автоматизация `ab` (Apache Benchmark) с помощью Bash-скрипта**

**Вместо ввода команды вручную**, создадим **скрипт `benchmark.sh`**, который будет автоматически запускать `ab` и логировать результаты.

**Создайте файл `benchmark.sh` в корне проекта:**

```bash
#!/bin/bash

# Настройки тестирования
URL="http://localhost:3000/users/1/balance"
REQUESTS=10000
CONCURRENT=100
DATA_FILE="request.json"

# Проверка, запущен ли сервер
if ! nc -z localhost 3000; then
  echo "Ошибка: Сервер не запущен на порту 3000. Запустите сервер и попробуйте снова."
  exit 1
fi

# Запуск Apache Benchmark
echo "Запуск тестирования с $REQUESTS запросами..."
ab -n $REQUESTS -c $CONCURRENT -p $DATA_FILE -T application/json $URL | tee benchmark_results.txt

echo "Тест завершён. Результаты сохранены в benchmark_results.txt"
```

**Сделайте скрипт исполняемым:**

```bash
chmod +x benchmark.sh
```

**Запуск теста:**

```bash
./benchmark.sh
```

**Что делает этот скрипт?**

- Проверяет, **работает ли сервер** (`nc -z localhost 3000`).
- Запускает `ab` с **10000 запросами и 100 параллельными соединениями**.
- **Сохраняет результаты** в `benchmark_results.txt`.
- Выводит статус выполнения.

---

### **2. README.md — Инструкция по развертыванию и тестированию**

**Создайте файл `README.md` в корне проекта:**

````markdown
# Backend App (Express + PostgreSQL + Sequelize)

### Описание

Простое web-приложение на **Node.js (Express)** с **PostgreSQL (Sequelize ORM)**, реализующее:

- Автоматическое создание таблицы `Users` с полем `balance = 10000` при запуске.
- API для обновления баланса пользователя (не может быть отрицательным).
- Реальное время обработки без очередей и фоновых задач.
- Нагрузочное тестирование на 10 000 запросов.

---

## 1. Установка и запуск

### Клонирование репозитория (SSH)

```bash
git clone git@github.com:your-username/backend-app.git
cd backend-app
```
````

### Установка зависимостей

```bash
npm install
```

### Настройка `.env`

Создайте файл `.env` в корне проекта:

```ini
DB_NAME="database_development"
DB_USER="root"
DB_PASS=""
DB_HOST="127.0.0.1"
PORT=3000
APP_URL="http://localhost:3000"

```

---

## 2. Миграции и сидирование базы данных

### Создание таблицы `Users`

```bash
npx sequelize-cli db:migrate
```

### Заполнение базы (`id = 1, balance = 10000`)

```bash
npx sequelize-cli db:seed:all
```

**Проверка в `psql`:**

```sql
SELECT * FROM "Users";
```

---

## 3. Запуск сервера

### В `development` режиме

```bash
npm run start
```

### В `production` режиме (из `dist/`)

```bash
npm run build
npm run start:prod
npm run start:prodwatch
```

---

## 🔥 4. Тестирование API

### Запрос на **изменение баланса** (POST)

```bash
curl -X POST -H "Content-Type: application/json" -d '{"amount": -2}' http://localhost:3000/users/1/balance
```

**Ожидаемый результат:**

- Если баланс >= 2:
  ```json
  { "userId": 1, "newBalance": 9998 }
  ```
- Если баланс < 2:
  ```json
  { "error": "Insufficient funds" }
  ```

---

## ⚡ 5. Нагрузочное тестирование (10 000 запросов)

### Запуск автоматизированного теста

```bash
chmod +x benchmark.sh
./benchmark.sh
```

**Ожидаемый результат:**

- **5000 успешных списаний (`200 OK`)**
- **5000 отказов (`400 Bad Request: Insufficient funds`)**

Результаты тестирования сохранятся в `benchmark_results.txt`.

---

## 🔒 6. Безопасный доступ к репозиторию

🔐 **Доступ к коду ограничен**:

- Репозиторий приватный.
- Доступ предоставляется только по SSH ключу (`Deploy Key`).
- Для проверки теста передайте **GitHub username**, и доступ будет открыт.

  **Добавление нового пользователя в приватный репозиторий (GitHub CLI)**

```bash
gh repo edit backend-app --add-collaborator USERNAME
```

---

**Теперь у вас есть подробная инструкция по развертыванию, тестированию и безопасному доступу к коду!**

```

```
