#!/bin/bash

# Путь к базе данных SQLite
DATABASE_PATH="../prisma/dev.db"

# SQL-запрос, который нужно выполнить
SQL_QUERY="SELECT * FROM user;"

# Выполняем SQL-запрос с использованием sqlite3
RESULT=$(sqlite3 "$DATABASE_PATH" "$SQL_QUERY")
