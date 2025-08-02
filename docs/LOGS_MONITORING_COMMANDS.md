# Команды для мониторинга логов Landing Page

## SSH подключение к VPS

```bash
# Подключение к серверу (с паролем)
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11

# Или установить алиас для удобства
alias zen-ssh="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11"

# Переход в рабочую директорию
cd /opt/zen-landing
```

## 1. Логи основных сервисов

### Docker контейнеры (удаленно)

```bash
# Все контейнеры landing page
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker ps --filter "name=zen-landing"'

# Логи frontend (nginx)
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs zen-landing-frontend'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -f zen-landing-frontend'  # follow mode
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs --tail 100 zen-landing-frontend'

# Логи backend (Node.js)
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs zen-landing-backend'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -f zen-landing-backend'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs --tail 50 zen-landing-backend'

# Логи базы данных
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs zen-landing-postgres'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -f zen-landing-postgres'
```

### Docker контейнеры (на сервере)

```bash
# Все контейнеры landing page
docker ps --filter "name=zen-landing"

# Логи frontend (nginx)
docker logs zen-landing-frontend
docker logs -f zen-landing-frontend  # follow mode
docker logs --tail 100 zen-landing-frontend  # последние 100 строк

# Логи backend (Node.js)
docker logs zen-landing-backend
docker logs -f zen-landing-backend
docker logs --tail 50 zen-landing-backend

# Логи базы данных
docker logs zen-landing-postgres
docker logs -f zen-landing-postgres
```

### Детальные логи с временными метками

```bash
# Frontend с временными метками
docker logs -t zen-landing-frontend

# Backend с фильтрацией по времени (последний час)
docker logs --since 1h zen-landing-backend

# Логи за определенный период
docker logs --since "2024-01-01T00:00:00" --until "2024-01-01T23:59:59" zen-landing-frontend
```

## 2. Keep-Alive сервис

### Docker-based keep-alive (удаленно)

```bash
# Статус keep-alive контейнера
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker ps --filter "name=zen-keepalive"'

# Логи keep-alive сервиса
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs zen-keepalive'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -f zen-keepalive'  # в реальном времени
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs --tail 200 zen-keepalive'

# Детальные логи с временными метками
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -t zen-keepalive'

# Логи за последние 30 минут
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs --since 30m zen-keepalive'
```

### Docker-based keep-alive (на сервере)

```bash
# Статус keep-alive контейнера
docker ps --filter "name=zen-keepalive"

# Логи keep-alive сервиса
docker logs zen-keepalive
docker logs -f zen-keepalive  # в реальном времени
docker logs --tail 200 zen-keepalive  # последние 200 строк

# Детальные логи с временными метками
docker logs -t zen-keepalive

# Логи за последние 30 минут
docker logs --since 30m zen-keepalive
```

### Файловые логи keep-alive (удаленно)

```bash
# Основной лог keep-alive
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'tail -f /tmp/keep-alive.log'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'tail -n 100 /tmp/keep-alive.log'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cat /tmp/keep-alive.log | grep "FAILED"'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cat /tmp/keep-alive.log | grep "$(date +%Y-%m-%d)"'

# Поиск по логам
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'grep "zen-pipeline.ru" /tmp/keep-alive.log'
sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'grep -i "error\|failed\|timeout" /tmp/keep-alive.log'
```

### Файловые логи keep-alive (на сервере)

```bash
# Основной лог keep-alive
tail -f /tmp/keep-alive.log
tail -n 100 /tmp/keep-alive.log  # последние 100 строк
cat /tmp/keep-alive.log | grep "FAILED"  # только ошибки
cat /tmp/keep-alive.log | grep "$(date '+%Y-%m-%d')"  # сегодняшние логи

# Поиск по логам
grep "zen-pipeline.ru" /tmp/keep-alive.log
grep -i "error\|failed\|timeout" /tmp/keep-alive.log
```

## 3. Performance мониторинг

### Логи производительности

```bash
# Основной лог мониторинга
tail -f /tmp/performance-monitor.log
tail -n 50 /tmp/performance-monitor.log

# Фильтрация по устройствам
grep "Android" /tmp/performance-monitor.log
grep "iPhone" /tmp/performance-monitor.log  
grep "Desktop" /tmp/performance-monitor.log

# Поиск медленных запросов
grep "SLOW\|VERY SLOW" /tmp/performance-monitor.log
grep "TIMEOUT" /tmp/performance-monitor.log

# Статистика по времени отклика
grep -o "[0-9]\+ms" /tmp/performance-monitor.log | sort -n
```

### Анализ производительности

```bash
# Последние алерты
grep "ALERT" /tmp/performance-monitor.log | tail -10

# Android-specific проблемы
grep "Android-specific" /tmp/performance-monitor.log

# Статистика успешных/неуспешных запросов
grep -c "✅" /tmp/performance-monitor.log  # успешные
grep -c "❌\|🐌" /tmp/performance-monitor.log  # проблемные
```

## 4. Системные логи

### Nginx логи (внутри контейнера)

```bash
# Войти в контейнер nginx
docker exec -it zen-landing-frontend /bin/bash

# Внутри контейнера:
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
grep "Android" /var/log/nginx/access.log
grep "error\|warn" /var/log/nginx/error.log
```

### Системные ресурсы

```bash
# Использование ресурсов контейнерами
docker stats zen-landing-frontend zen-landing-backend zen-keepalive

# Дисковое пространство
df -h
docker system df  # использование Docker

# Сетевые подключения
netstat -tlnp | grep -E ":80|:443"
ss -tlnp | grep -E ":80|:443"
```

## 5. Cron jobs мониторинг

### Статус cron jobs

```bash
# Список активных cron jobs
crontab -l

# Логи cron демона
sudo tail -f /var/log/cron
sudo journalctl -u cron -f

# Системные логи (на некоторых системах)
sudo tail -f /var/log/syslog | grep CRON
```

## 6. Комплексные команды мониторинга

### Быстрая диагностика (удаленно)

```bash
#!/bin/bash
# Быстрая проверка статуса с локальной машины

sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 "
cd /opt/zen-landing

echo '=== КОНТЕЙНЕРЫ ==='
docker ps --filter 'name=zen-'

echo -e '\n=== ПОСЛЕДНИЕ ЛОГИ KEEP-ALIVE ==='
tail -n 5 /tmp/keep-alive.log 2>/dev/null || echo 'Логи не найдены'

echo -e '\n=== ПОСЛЕДНИЕ ЛОГИ МОНИТОРИНГА ==='
tail -n 5 /tmp/performance-monitor.log 2>/dev/null || echo 'Логи не найдены'

echo -e '\n=== ИСПОЛЬЗОВАНИЕ РЕСУРСОВ ==='
docker stats --no-stream zen-landing-frontend zen-landing-backend zen-keepalive 2>/dev/null

echo -e '\n=== СЕТЕВЫЕ ПОРТЫ ==='
netstat -tlnp | grep -E ':80|:443'

echo -e '\n=== CRON JOBS ==='
crontab -l | grep -E '(keep-alive|monitor-performance)'
"
```

### Быстрая диагностика (на сервере)

```bash
#!/bin/bash
# Сохранить как quick-status.sh на сервере

echo "=== КОНТЕЙНЕРЫ ==="
docker ps --filter "name=zen-"

echo -e "\n=== ПОСЛЕДНИЕ ЛОГИ KEEP-ALIVE ==="
tail -n 5 /tmp/keep-alive.log 2>/dev/null || echo "Логи не найдены"

echo -e "\n=== ПОСЛЕДНИЕ ЛОГИ МОНИТОРИНГА ==="
tail -n 5 /tmp/performance-monitor.log 2>/dev/null || echo "Логи не найдены"

echo -e "\n=== ИСПОЛЬЗОВАНИЕ РЕСУРСОВ ==="
docker stats --no-stream zen-landing-frontend zen-landing-backend zen-keepalive 2>/dev/null

echo -e "\n=== СЕТЕВЫЕ ПОРТЫ ==="
netstat -tlnp | grep -E ":80|:443"

echo -e "\n=== CRON JOBS ==="
crontab -l | grep -E "(keep-alive|monitor-performance)"
```

### Детальный анализ производительности (удаленно)

```bash
#!/bin/bash
# Анализ производительности с локальной машины

sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 "
echo '=== АНАЛИЗ ПРОИЗВОДИТЕЛЬНОСТИ ЗА ПОСЛЕДНИЙ ЧАС ==='

# Статистика по устройствам
echo 'Android запросы:'
grep 'Android' /tmp/performance-monitor.log | grep \"\$(date '+%Y-%m-%d %H')\" | wc -l

echo 'iPhone запросы:'
grep 'iPhone' /tmp/performance-monitor.log | grep \"\$(date '+%Y-%m-%d %H')\" | wc -l

echo 'Desktop запросы:'
grep 'Desktop' /tmp/performance-monitor.log | grep \"\$(date '+%Y-%m-%d %H')\" | wc -l

# Проблемные запросы
echo -e '\nПроблемные запросы за последний час:'
grep -E 'TIMEOUT|VERY SLOW|FAILED' /tmp/performance-monitor.log | grep \"\$(date '+%Y-%m-%d %H')\"

# Алерты
echo -e '\nАлерты за последний час:'
grep 'ALERT' /tmp/performance-monitor.log | grep \"\$(date '+%Y-%m-%d %H')\"
"
```

### Детальный анализ производительности (на сервере)

```bash
#!/bin/bash
# Сохранить как performance-analysis.sh на сервере

echo "=== АНАЛИЗ ПРОИЗВОДИТЕЛЬНОСТИ ЗА ПОСЛЕДНИЙ ЧАС ==="

# Статистика по устройствам
echo "Android запросы:"
grep "Android" /tmp/performance-monitor.log | grep "$(date '+%Y-%m-%d %H')" | wc -l

echo "iPhone запросы:"
grep "iPhone" /tmp/performance-monitor.log | grep "$(date '+%Y-%m-%d %H')" | wc -l

echo "Desktop запросы:"
grep "Desktop" /tmp/performance-monitor.log | grep "$(date '+%Y-%m-%d %H')" | wc -l

# Проблемные запросы
echo -e "\nПроблемные запросы за последний час:"
grep -E "TIMEOUT|VERY SLOW|FAILED" /tmp/performance-monitor.log | grep "$(date '+%Y-%m-%d %H')"

# Алерты
echo -e "\nАлерты за последний час:"
grep "ALERT" /tmp/performance-monitor.log | grep "$(date '+%Y-%m-%d %H')"
```

## 7. Экстренная диагностика

### При проблемах с Android

```bash
# Тест Android User-Agent прямо с сервера
curl -A "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36" \
     --max-time 10 -w "Time: %{time_total}s\nHTTP: %{http_code}\n" \
     https://zen-pipeline.ru/

# Проверка keep-alive
docker logs --tail 20 zen-keepalive

# Перезапуск keep-alive при необходимости
docker-compose -f docker-compose.keepalive.yml restart
```

### При полном отказе сайта

```bash
# Проверка всех сервисов
docker ps -a --filter "name=zen-landing"

# Логи ошибок
docker logs zen-landing-frontend | grep -i error | tail -10
docker logs zen-landing-backend | grep -i error | tail -10

# Рестарт сервисов
docker-compose -f docker-compose.prod.yml restart

# Проверка портов
sudo netstat -tlnp | grep -E ":80|:443"
```

## 8. Архивация логов

### Создание архива логов

```bash
# Создать архив всех логов
mkdir -p /tmp/logs-backup/$(date +%Y%m%d-%H%M)
cd /tmp/logs-backup/$(date +%Y%m%d-%H%M)

# Экспорт Docker логов
docker logs zen-landing-frontend > frontend.log 2>&1
docker logs zen-landing-backend > backend.log 2>&1
docker logs zen-landing-postgres > postgres.log 2>&1
docker logs zen-keepalive > keepalive.log 2>&1

# Копирование файловых логов
cp /tmp/keep-alive.log ./keep-alive-file.log 2>/dev/null || true
cp /tmp/performance-monitor.log ./performance.log 2>/dev/null || true

# Системная информация
docker ps > docker-containers.txt
docker stats --no-stream > docker-stats.txt
crontab -l > cron-jobs.txt 2>/dev/null || true

# Создание архива
cd ..
tar -czf logs-$(date +%Y%m%d-%H%M).tar.gz $(date +%Y%m%d-%H%M)/
echo "Архив создан: /tmp/logs-backup/logs-$(date +%Y%m%d-%H%M).tar.gz"
```

## 9. Полезные алиасы

### Локальные алиасы (для работы с удаленным сервером)

Добавить в `~/.bashrc` или `~/.zshrc` на локальной машине:

```bash
# SSH подключение
alias zen-ssh="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11"

# Быстрые команды мониторинга
alias zen-status="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker ps --filter \"name=zen-\"'"
alias zen-frontend-logs="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -f zen-landing-frontend'"
alias zen-backend-logs="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -f zen-landing-backend'"
alias zen-keepalive-logs="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker logs -f zen-keepalive'"
alias zen-keepalive-file="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'tail -f /tmp/keep-alive.log'"
alias zen-performance="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'tail -f /tmp/performance-monitor.log'"
alias zen-stats="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'docker stats --no-stream zen-landing-frontend zen-landing-backend zen-keepalive'"

# Управление сервисами
alias zen-restart-keepalive="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && docker-compose -f docker-compose.keepalive.yml restart'"
alias zen-restart-all="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && docker-compose -f docker-compose.prod.yml restart'"

# Быстрая диагностика
alias zen-quick-check="sshpass -p 'YruQ8kpFPET03sd7' ssh root@95.163.220.11 'cd /opt/zen-landing && echo \"=== CONTAINERS ===\" && docker ps --filter \"name=zen-\" && echo \"=== KEEP-ALIVE LOGS ===\" && tail -n 3 /tmp/keep-alive.log 2>/dev/null && echo \"=== PERFORMANCE LOGS ===\" && tail -n 3 /tmp/performance-monitor.log 2>/dev/null'"

# Тестирование сайта
alias zen-test-android="curl -A 'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36' --max-time 10 -w 'Time: %{time_total}s\nHTTP: %{http_code}\n' https://zen-pipeline.ru/"
alias zen-test-site="curl -w 'Time: %{time_total}s\nHTTP: %{http_code}\n' https://zen-pipeline.ru/"
```

### Серверные алиасы (для работы на сервере)

Добавить в `~/.bashrc` на сервере (после подключения через `zen-ssh`):

```bash
# Алиасы для мониторинга landing page
alias ll-frontend='docker logs -f zen-landing-frontend'
alias ll-backend='docker logs -f zen-landing-backend'
alias ll-keepalive='docker logs -f zen-keepalive'
alias ll-ka-file='tail -f /tmp/keep-alive.log'
alias ll-perf='tail -f /tmp/performance-monitor.log'
alias ll-status='docker ps --filter "name=zen-"'
alias ll-stats='docker stats --no-stream zen-landing-frontend zen-landing-backend zen-keepalive'
alias ll-restart-ka='docker-compose -f /opt/zen-landing/docker-compose.keepalive.yml restart'
alias ll-restart-all='docker-compose -f /opt/zen-landing/docker-compose.prod.yml restart'
alias ll-cd='cd /opt/zen-landing'
```

### Применение алиасов

```bash
# На локальной машине
source ~/.bashrc  # или ~/.zshrc

# На сервере (после подключения)
source ~/.bashrc
```

### Примеры использования алиасов

```bash
# Локально
zen-quick-check          # Быстрая проверка статуса
zen-frontend-logs        # Логи frontend в реальном времени
zen-test-android         # Тест Android User-Agent
zen-ssh                  # Подключение к серверу

# На сервере
ll-status               # Статус контейнеров
ll-frontend             # Логи frontend
ll-ka-file              # Файловые логи keep-alive
ll-restart-ka           # Перезапуск keep-alive
```

## 10. Мониторинг в реальном времени

### Мультиплексор логов

```bash
# Установить multitail (если не установлен)
sudo apt-get install multitail

# Мониторинг нескольких логов одновременно
multitail \
  -l "docker logs -f zen-landing-frontend" \
  -l "docker logs -f zen-landing-backend" \
  -f /tmp/keep-alive.log \
  -f /tmp/performance-monitor.log
```

### tmux сессия для мониторинга

```bash
# Создать tmux сессию
tmux new-session -d -s monitoring

# Разделить на панели
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v

# Запустить мониторинг в каждой панели
tmux send-keys -t 0 'docker logs -f zen-landing-frontend' C-m
tmux send-keys -t 1 'docker logs -f zen-landing-backend' C-m  
tmux send-keys -t 2 'tail -f /tmp/keep-alive.log' C-m
tmux send-keys -t 3 'tail -f /tmp/performance-monitor.log' C-m

# Подключиться к сессии
tmux attach-session -t monitoring
```

---

**Сохранить этот файл на VPS сервере для быстрого доступа к командам!**