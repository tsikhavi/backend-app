#!/bin/bash

# Загружаем переменные из .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Используем APP_URL из .env или значение по умолчанию
URL="${APP_URL:-http://localhost:3000}/users/1/balance"
REQUESTS=10000
CONCURRENT=100
DATA_FILE="request.json"

# Проверка, запущен ли сервер
if ! nc -z "$(echo $URL | awk -F[/:] '{print $4}')" 3000; then
  echo "Ошибка: Сервер не запущен на $(echo $URL | awk -F[/:] '{print $4}'):3000. Запустите сервер и попробуйте снова."
  exit 1
fi

# Запуск Apache Benchmark
echo "Запуск тестирования с $REQUESTS запросами..."
ab -n $REQUESTS -c $CONCURRENT -p $DATA_FILE -T application/json $URL | tee benchmark_results.txt

echo "Тест завершён. Результаты сохранены в benchmark_results.txt"
