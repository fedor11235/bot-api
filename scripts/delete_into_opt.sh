#!/bin/bash

filepath="/home/ubuntu/bot-api/prisma/dev.db"

createDbConnection() {
  sqlite3 "$filepath" <<EOF
EOF
  echo "Connection with SQLite has been established"
}

db_each() {
  while IFS="|" read -r id booking_date view; do
    if [ -n "$booking_date" ]; then
      IFS="_" read -r -a bookingDateArray <<< "$booking_date"
      maxValue="0.0"
      elementArray=()
      for element in "${bookingDateArray[@]}"; do
        IFS="/" read -r -a elementArray <<< "$element"
        date="${elementArray[1]}"

        IFS="." read -r dateElementDay dateElementMonth <<< "$date"
        let dateElementDayInt="$dateElementDay"
        let dateElementMonthInt="$dateElementMonth"

        IFS="." read -r dateMaxDay dateMaxMonth <<< "$maxValue"
        let dateMaxDayInt="$dateMaxDay"
        let dateMaxMonthInt="$dateMaxMonth"

        if [[ ($dateMaxMonthInt < $dateElementMonthInt)  ||
              (($dateMaxMonthInt -eq $dateElementMonthInt) && ($dateMaxDayInt < $dateElementDayInt)) ]]; then
          maxValue=$date
        fi
        elementArray=()
      done

      # на данном этапе нашли максимальную дату и теперь сравниваем её с текущей
      IFS="." read -r dateMaxDay dateMaxMonth <<< "$maxValue"
      let dateMaxDayInt="$dateMaxDay"
      let dateMaxMonthInt="$dateMaxMonth"
      # в коде выше получили числовые представления дня и месяца максимальной даты

      dateNow=$(date +"%d.%m") # получаем текущую даты в формате <день>.<месяц>
      IFS="." read -r dateNowDay dateNowMonth <<< "$dateNow"
      let dateNowDayInt="$dateNowDay"
      let dateNowMonthInt="$dateNowMonth"
      # в коде выше получили числовые представления дня и месяца текущей даты

      # ниже в условии просто проверяем, что текущая дата больше максимальной; и если это так, то апдейтим таблицу по id
      if [[ ($dateMaxMonthInt < $dateNowMonthInt)  ||
      (($dateMaxMonthInt -eq $dateNowMonthInt) && ($dateMaxDayInt < $dateNowDayInt)) ]]; then
       sqlite3 "$filepath" "UPDATE recommendationInto SET view = false WHERE id = $id"
       echo "Row $id has been updated"
      fi
    fi
  done < <(sqlite3 -separator "|" "$filepath" "SELECT id, booking_date, view FROM recommendationInto")
}

createDbConnection
db_each