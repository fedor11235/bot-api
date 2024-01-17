#!/bin/bash

filepath="/home/ubuntu/test/bot-api/prisma/test.db"
botToken='6127498929:AAEwKurouSkiF8Snfs1_9Q1EHyFQQZbBHJE'

createDbConnection() {
  sqlite3 $filepath <<EOF
EOF
  echo "Соединение с SQLite установлено"
}

db_each() {
  dateNow=$(date +"%d.%m") # получаем текущую даты в формате <день>.<месяц>
  IFS="." read -r dateNowDay dateNowMonth <<< "$dateNow"
  let dateNowDayInt="$dateNowDay"
  let dateNowMonthInt="$dateNowMonth"
  # в коде выше получили числовые представления дня и месяца текущей даты

  while IFS="|" read -r creatives booking_date idUser check; do
      if [[ -z "${booking_date}" ]]; then
        echo "No booking date found"
      else
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
        IFS="." read -r dateMaxDay dateMaxMonth <<< "$maxValue"
        let dateMaxDayInt="$dateMaxDay"
        let dateMaxMonthInt="$dateMaxMonth"
        diffMonth=$((dateMaxMonthInt - dateNowMonthInt))
        diffDay=$((dateMaxDayInt - dateNowDayInt))
        if [[ ($diffMonth -eq 0) && ($diffDay -eq 1) ]]; then
              if [[ (-z "${check}") || (-z "${creatives}") ]]; then
                sendMessage $idUser "Приближается дата выхода опта! Добавьте чек или посты, если Вы не добавили."
              fi
        fi
      fi
  done< <(sqlite3 -separator "|" "$filepath" "SELECT creatives, booking_date, idUser, \`check\` FROM recommendationInto")
}

sendMessage() {
  chatId=$1
  text=$2
  url="https://api.telegram.org/bot$botToken/sendMessage"
  data="chat_id=$chatId&text=$text&parse_mode=HTML"
  curl -s -d "$data" $url
}

createDbConnection
db_each
