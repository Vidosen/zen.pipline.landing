# Настройка SSL сертификата для zen-pipeline.ru

## 1. Скачайте файлы сертификата с REG.RU

Перейдите на страницу: https://www.reg.ru/user/account/#/card/109914580?card_type=ssl

Скачайте следующие файлы:

1. **Сертификат** (x509) → сохранить как `ssl/zen-pipeline.ru.crt`
2. **Private Key** → сохранить как `ssl/zen-pipeline.ru.key`
3. **Корневой сертификат** (CA) → сохранить как `ssl/ca-bundle.crt`

## 2. Создание полной цепочки сертификата

Nginx требует полную цепочку сертификатов. Создайте файл `ssl/zen-pipeline.ru-fullchain.crt`:

```bash
# Объедините основной сертификат с корневым
cat ssl/zen-pipeline.ru.crt ssl/ca-bundle.crt > ssl/zen-pipeline.ru-fullchain.crt
```

## 3. Установка правильных прав доступа

```bash
chmod 600 ssl/zen-pipeline.ru.key
chmod 644 ssl/zen-pipeline.ru-fullchain.crt
chmod 644 ssl/ca-bundle.crt
```

## 4. Структура папки ssl должна быть:

```
ssl/
├── zen-pipeline.ru.crt          # Основной сертификат
├── zen-pipeline.ru.key          # Закрытый ключ
├── ca-bundle.crt                # Корневой сертификат
└── zen-pipeline.ru-fullchain.crt # Полная цепочка (основной + корневой)
```

## 5. После размещения файлов запустите деплой:

```bash
./deploy-custom-ssl.sh
``` 