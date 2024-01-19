#!/bin/bash

filepath="../prisma/test.db"
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

  while IFS="|" read -r chanel creatives booking_date idUser check; do
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

          if [[ ($dateMaxMonthInt -lt $dateElementMonthInt)  ||
                (($dateMaxMonthInt -eq $dateElementMonthInt) && ($dateMaxDayInt -lt $dateElementDayInt)) ]]; then
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
              if [[ (-z "${check}") && (-z "${creatives}") ]]; then
                sendMessage $idUser 2
              elif [[ (-z "${check}") ]]; then
                sendMessage $idUser 1
              elif [[ (-z "${creatives}") ]]; then
                sendMessage $idUser 0
              fi
        fi
      fi
  done< <(sqlite3 -separator "|" "$filepath" "SELECT chanel, creatives, booking_date, idUser, \`check\` FROM recommendationInto")
}

sendMessage() {
  chatId=$1
  status=$2
  username=$(sqlite3 -separator "|" "$filepath" "SELECT chanel FROM RecommendationInto WHERE idUser = $chatId")
  title=$(sqlite3 -separator "|" "$filepath" "SELECT title FROM Recommendation WHERE username = '$username'")
  encodedTitle=$(echo "$title" | sed 's/ /_/g')
  link=$(sqlite3 -separator "|" "$filepath" "SELECT link FROM Recommendation WHERE username = '$username'")
  url="https://api.telegram.org/bot$botToken/sendMessage"
  if [[ $status -eq 0 ]]; then
    curl -X POST $url \
     -H "Content-Type: application/json" \
     -d '{
        "chat_id": "'$chatId'",
        "text": "<b>Похоже, вы ещё не прислали завтрашний пост в канал</b> \n\n<a href=\"'$link'\">'$encodedTitle'</a> \n\nНажмите на кнопку ниже, чтобы добавить пост👇",
        "parse_mode": "HTML",
        "reply_markup": {
          "inline_keyboard": [
            [
              {"text": "Добавить пост", "callback_data": "test"}
            ]
          ]
        }
     }'
  elif [[ $status -eq 1 ]]; then
    curl -X POST $url \
     -H "Content-Type: application/json" \
     -d '{
        "chat_id": "'$chatId'",
        "text": "<b>Похоже, вы ещё не прислали завтрашний чек в канал</b> \n\n<a href=\"'$link'\">'$encodedTitle'</a> \n\nНажмите на кнопку ниже, чтобы добавить чек👇",
        "parse_mode": "HTML",
        "reply_markup": {
          "inline_keyboard": [
            [
              {"text": "Добавить чек", "callback_data": "test"}
            ]
          ]
        }
     }'
  else
    curl -X POST $url \
     -H "Content-Type: application/json" \
     -d '{
        "chat_id": "'$chatId'",
        "text": "<b>Похоже, вы ещё не прислали завтрашний пост и чек в канал</b> \n\n<a href=\"'$link'\">'$encodedTitle'</a> \n\nНажмите на кнопку ниже, чтобы добавить пост и чек👇",
        "parse_mode": "HTML",
        "reply_markup": {
          "inline_keyboard": [
            [
              {"text": "Добавить пост", "callback_data": "test"},
              {"text": "Добавить чек", "callback_data": "test"}
            ]
          ]
        }
     }'
  fi
}

createDbConnection
db_each
