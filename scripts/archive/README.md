# Archived Keep-Alive Scripts

## ℹ️ Статус: АРХИВ

Эти скрипты были заменены на **UptimeRobot** - профессиональный внешний сервис мониторинга.

## Что здесь находится

### Локальные keep-alive скрипты (заменены):
- `keep-alive.sh` - основной keep-alive скрипт
- `monitor-performance.sh` - мониторинг производительности  
- `setup-monitoring.sh` - автоматическая настройка
- `setup-cron-keepalive.sh` - настройка cron jobs

### Docker конфигурации (заменены):
- `docker-compose.keepalive.yml` - keep-alive контейнер

## Почему заменили?

### Проблемы локальных скриптов:
- ❌ Docker keep-alive контейнер не запускался (проблемы с пакетами)
- ❌ Зависимость от работоспособности самого сервера
- ❌ Нет мониторинга с разных географических точек
- ❌ Ограниченные возможности алертов

### Преимущества UptimeRobot:
- ✅ Работает независимо от нашего сервера
- ✅ Мониторинг с разных локаций по всему миру
- ✅ Профессиональные алерты (email, SMS, Slack, Telegram)
- ✅ Бесплатный план: 50 мониторов, проверка каждые 5 минут
- ✅ Статистика uptime и производительности
- ✅ Не нагружает наш сервер

## Текущее решение

**UptimeRobot мониторинг:**
- 📍 https://zen-pipeline.ru/ - основная страница
- 📍 https://zen-pipeline.ru/api/health - health check
- ⏱️ Проверка каждые 5 минут
- 🌍 Мониторинг с разных континентов
- 📧 Алерты при недоступности

## Если нужно восстановить локальные скрипты

```bash
# Скопировать из архива
cp scripts/archive/keep-alive.sh scripts/
cp scripts/archive/monitor-performance.sh scripts/
cp scripts/archive/setup-monitoring.sh scripts/

# Настроить
chmod +x scripts/*.sh
./scripts/setup-monitoring.sh zen-pipeline.ru
```

**Но рекомендуется использовать UptimeRobot!** 🚀

---
*Архивировано: 3 августа 2025*