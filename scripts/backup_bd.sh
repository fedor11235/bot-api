#!/bin/bash

# Путь к базе данных SQLite
DATABASE_PATH="../prisma/dev.db"

# Путь до папки backups
BACKUP_DIR="../prisma/backups"

# Проверяем количество существующих backup-файлов
NUM_BACKUPS=0

for BACKUP in $(ls $BACKUP_DIR)
do
    ((NUM_BACKUPS=NUM_BACKUPS+1))
done

# Если файлов больше или равно 10, то удаляем самый старый (с наименьшим номером)
if ((NUM_BACKUPS >= 10))
then
    MIN_FILE_NUM="10"
    MIN_FILE_NAME=""

    for BACKUP in $(ls $BACKUP_DIR)
    do
        FILE_NUM=${BACKUP%.*}
        if [[ "$FILE_NUM" -lt "$MIN_FILE_NUM" ]]
        then
            MIN_FILE_NUM=$FILE_NUM
            MIN_FILE_NAME=$BACKUP
        fi
    done
    rm "$BACKUP_DIR/$MIN_FILE_NAME"
fi

# После того как уверились, что в папке не более 10 файлов, создаем новый
NEW_BACKUP="$BACKUP_DIR/$((NUM_BACKUPS+1)).db"
cp $DATABASE_PATH $NEW_BACKUP
