#!/bin/bash

filepath="../prisma/test.db"

createDbConnection() {
  sqlite3 "$filepath" <<EOF
EOF
  echo "Connection with SQLite has been established"
}

db_each() {
  let targetMonth=$1
  while IFS="|" read -r id booking_date; do
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

        if [[ $dateElementMonthInt -ne $targetMonth ]]; then
          IFS="." read -r dateMaxDay dateMaxMonth <<< "$maxValue"
          let dateMaxDayInt="$dateMaxDay"
          let dateMaxMonthInt="$dateMaxMonth"

          if [[ ($dateMaxMonthInt < $dateElementMonthInt)  ||
                (($dateMaxMonthInt -eq $dateElementMonthInt) && ($dateMaxDayInt < $dateElementDayInt)) ]]; then
            maxValue=$date
          fi
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
      (($dateMaxMonthInt -eq $dateNowMonthInt) && ($dateMaxDayInt -lt $dateNowDayInt)) ]]; then
       sqlite3 "$filepath" "UPDATE recommendationInto SET view = false WHERE id = $id"
       echo "Row $id has been updated"
      fi
    fi
  done < <(sqlite3 -separator "|" "$filepath" "SELECT id, booking_date FROM recommendationInto")
}

createDbConnection
db_each $1

# запуск -> /bin/bash update_view.sh 12  аргумент (в данном случае число 12) указывает на номер месяца,
#                                        который не будет учитываться в поиске максимальной даты
