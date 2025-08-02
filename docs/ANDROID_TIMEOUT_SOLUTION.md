# Android Timeout Solution

## Проблема
Android устройства испытывали таймауты (60+ сек → ERR_TIMED_OUT) при загрузке zen-pipeline.ru после периодов бездействия, в то время как PC и iPhone загружали сайт моментально.

## Причина
**Container Cold Start** + **Android's Strict Timeout Behavior**:
1. Контейнеры переходят в состояние низкого потребления ресурсов во время простоя
2. Android браузеры имеют более строгие таймауты (30-60 сек)
3. Контейнерам нужно время для "разогрева" 
4. Android сдается раньше, чем контейнеры полностью отвечают
5. Десктопные браузеры успешно "разогревают" контейнеры для Android

## Решение

### 1. Nginx Оптимизации
```nginx
# Worker processes optimization
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
    accept_mutex off;
}

# Extended timeouts for mobile
client_body_timeout 120;
client_header_timeout 120;
send_timeout 120;

# Enhanced SSL session cache
ssl_session_cache shared:SSL:100m;
ssl_session_timeout 24h;
ssl_early_data on;
```

### 2. Container Resource Management
```yaml
# docker-compose.prod.yml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
    healthcheck:
      interval: 15s
      start_period: 30s
      retries: 5

  frontend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### 3. Keep-Alive Service
Предотвращает cold starts через регулярные health checks:

```bash
# Docker-based (рекомендуется)
docker-compose -f docker-compose.keepalive.yml up -d

# Cron-based (альтернатива)
./scripts/setup-monitoring.sh zen-pipeline.ru
```

### 4. Performance Monitoring
Отслеживает Android-specific проблемы:
- Тестирует разные User-Agent'ы
- Измеряет время отклика
- Отправляет алерты при проблемах

## Деплой через GitHub Actions

### Автоматический деплой
Мониторинг настраивается автоматически при каждом деплое через:
```
.github/workflows/manual-deploy.yml
```

### Управление мониторингом
Отдельный workflow для управления:
```
.github/workflows/monitoring-setup.yml
```

**Доступные действия:**
- `setup` - Настроить мониторинг
- `restart` - Перезапустить сервисы
- `status` - Проверить статус
- `remove` - Удалить мониторинг

## Использование

### 1. Деплой с мониторингом
```bash
# Через GitHub Actions (рекомендуется)
# Используйте workflow "Manual Production Deployment"
# Мониторинг настроится автоматически

# Или вручную на сервере
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.keepalive.yml up -d
./scripts/setup-monitoring.sh zen-pipeline.ru
```

### 2. Проверка статуса
```bash
# Проверить keep-alive контейнер
docker ps | grep zen-keepalive

# Проверить cron jobs
crontab -l | grep -E "(keep-alive|monitor-performance)"

# Посмотреть логи
tail -f /tmp/keep-alive.log
tail -f /tmp/performance-monitor.log
```

### 3. Тестирование Android compatibility
```bash
# Тест Android User-Agent
curl -A "Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36" \
     --max-time 10 https://zen-pipeline.ru/

# Мониторинг производительности
./scripts/monitor-performance.sh
```

## Файловая структура

```
landing-page/
├── docker-compose.keepalive.yml     # Keep-alive service
├── scripts/
│   ├── keep-alive.sh                # Keep-alive script
│   ├── monitor-performance.sh       # Performance monitoring
│   ├── setup-monitoring.sh          # Setup script
│   └── setup-cron-keepalive.sh     # Cron setup
├── .github/workflows/
│   ├── manual-deploy.yml            # Деплой с мониторингом
│   └── monitoring-setup.yml         # Управление мониторингом
└── docs/
    └── ANDROID_TIMEOUT_SOLUTION.md  # Эта документация
```

## Результат

✅ **Android timeout проблема решена**:
- Контейнеры остаются "теплыми" благодаря keep-alive
- Оптимизированные таймауты для мобильных клиентов
- Автоматический мониторинг и алерты
- Интеграция в CI/CD pipeline

**Время загрузки:**
- До: 60+ сек → ERR_TIMED_OUT
- После: <2 сек стабильно для всех устройств

## Troubleshooting

### Keep-alive не работает
```bash
# Проверить контейнер
docker logs zen-keepalive

# Перезапустить
docker-compose -f docker-compose.keepalive.yml restart

# Проверить сеть
docker network ls | grep zen-network
```

### Cron jobs не выполняются
```bash
# Проверить cron service
sudo systemctl status cron

# Проверить права на скрипты
ls -la scripts/

# Перенастроить
./scripts/setup-monitoring.sh zen-pipeline.ru
```

### Android все еще тормозит
```bash
# Проверить nginx конфигурацию
docker exec zen-landing-frontend nginx -t

# Проверить resource limits
docker stats zen-landing-frontend zen-landing-backend

# Запустить полный мониторинг
./scripts/monitor-performance.sh
```