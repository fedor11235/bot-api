#!/bin/bash

filepath="../prisma/dev.db"
botToken='6127498929:AAEwKurouSkiF8Snfs1_9Q1EHyFQQZbBHJE'

createDbConnection() {
  sqlite3 $filepath <<EOF
EOF
  echo "Соединение с SQLite установлено"
}

db_each() {
  sqlite3 $filepath "SELECT * FROM recommendationInto"
    if [ -z "$row.booking_date" ]; then
      echo "No booking date found"
    else
      bookingDateArray=(${row//_/ })
      bookingDateArrayNumber=(${bookingDateArray//\./})
      minValue=${bookingDateArrayNumber[0]}
      prepareDate=(${minValue//\./})
      dateNow=$(date +%s)
      fullYear=${prepareDate[0]}
      endDateParse="${prepareDate[1]}-${prepareDate[2]}-${fullYear}"
      dateEnd=$(date -d "$endDateParse" +%s)
      dateEnd=$(date -d "@$dateEnd" +%s)
      dateEnd=$(date -d "@$dateEnd" +%d)
      dateEnd=$(date -d "@$dateEnd" +%m)
      dateEnd=$(date -d "@$dateEnd" +%Y)
      echo $dateEnd
      if [ $dateEnd -lt $dateNow ]; then
        if [ -z "$row.check" ] || [ -z "$row.creatives" ]; then
          sendMessage "$row.idUser" "Приблежает дата выхода опта добавьте чек или посты если вы не добавили"
        fi
      fi
    fi

}

sendMessage() {
  chatId=$1
  text=$2
  url="https://api.telegram.org/bot$botToken/sendMessage"
  data="chat_id=$chatId&text=$text&parse_mode=HTML"
  curl -s -d "$data" $url
}

createDbConnection

while IFS=, read -r row
do
  db_each
done



# Логика запроса к базе данных и отправки сообщений будет зависеть от структуры базы данных и платформы обмена сообщениями
# Приведенный ниже пример демонстрирует использование утилиты sqlite3 для выполнения запроса к базе данных и отправки сообщения через curl
# Конкретный SQL-запрос и логика отправки сообщений будут зависеть от структуры базы данных и платформы обмена сообщениями

# Пример выполнения запроса к базе данных с использованием утилиты sqlite3
# sqlite3 $filepath "SELECT * FROM recommendationInto"

# Пример отправки сообщения с использованием curl
# chatId="12345"
# text="Пример сообщения"
# curl -X POST "https://api.telegram.org/bot$botToken/sendMessage" -H "Content-Type: application/json" -d "{\"chat_id\": \"$chatId\", \"text\": \"$text\", \"parse_mode\": \"HTML\"}"