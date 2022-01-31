# База данных

### Описание

Модуль для работы с базами данных реализован с использованием библиотеки [TypeORM](https://typeorm.io).
Если в переменных средах параметр `DATABASE_LOGGER=1`, будет включено полное логирование всех событий  
модуля в файл `ormlogs.log` в корневом каталоге.

### Использование модуля

Сущности (таблицы) хранятся в каталоге `/src/lib/entities`. Конфигурация TypeORM CLI использует
только данный каталог для синхронизации схемы базы данных и генерации миграций.

### Синхронизация схемы базы данных

Для работы TypeORM CLI необходимо создать в корневом каталоге конфигурационный файл `ormconfig.json`  
со следующим содержимым:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "database": "name",
  "username": "username",
  "password": "пароль",
  "ssl": {
    "rejectUnauthorized": false
  },
  "cli": {
    "migrationsDir": "libs/databases/src/lib/migration"
  },
  "entities": [
    "libs/database/src/lib/entities/*.entity.ts",
    "libs/database/src/lib/entities/*/*.entity.ts"
  ],
  "migrations": [
    "libs/database/src/lib/migration/*.ts",
    "libs/database/src/lib/migration/**/*.ts"
  ],
  "subscribers": [
    "libs/database/src/lib/subscriber/*.ts",
    "libs/database/src/lib/subscriber/**/*.ts"
  ]
}
```

Если добавляются новые сущности или в существующие вносятся изменения - необходимо синхронизировать
схему базы данных. Для этого необходимо ознакомиться с вносимыми в схему изменениями с помощью команды
`npm run typeorm schema:log` которая отобразит в консоли все SQL-запросы которые будут выполнены.
Проверьте все запросы и если уверены что ничего не сломается - выполните синхронизацию схемы командой
`npm run typeorm schema:sync`.

### Миграции

При любом изменении схемы базы данных необходимо добавить миграции в ближайший pull request.  
Миграции выполняются следующими командами:

- `npm run typeorm migration:generate -- -n Init` генерирует новую миграцию на основе изменений схемы.
- `npm run typeorm migration:run` запуск всех новых миграций.
- `npm run typeorm migration:create -- -n Init` используйте данную команду для построения различных SQL-запросов.

Более подробная информация о миграциях доступна в [документации](https://typeorm.io/#/migrations) библиотеки TypeORM.
