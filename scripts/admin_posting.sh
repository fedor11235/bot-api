#!/bin/bash

filepath="../prisma/test.db"
botToken='6127498929:AAEwKurouSkiF8Snfs1_9Q1EHyFQQZbBHJE'


createDbConnection() {
  sqlite3 "$filepath" <<EOF
EOF
  echo "Connection with SQLite has been established"
}

do_each() {

  dateNow=$(date +"%d.%m") # получаем текущую даты в формате <день>.<месяц>
  IFS="." read -r dateNowDay dateNowMonth <<< "$dateNow"
  let dateNowDayInt="$dateNowDay"
  let dateNowMonthInt="$dateNowMonth"
  timeNow=$(date +"%H.%M")
  IFS="." read -r dateNowHour dateNowMinutes <<< "$dateNow"
  let dateNowHourInt="$dateNowHour"
  let dateNowMinutesInt="$dateNowMinutes"
  # в коде выше получили числовые представления дня и месяца текущей даты

  admin_id="-1001959790816"
  while IFS="|" read -r creatives booking_date idUser; do

    IFS="_" read -r -a bookingDateArray <<< "$booking_date"

    for element in "${bookingDateArray[@]}"; do
        IFS="/" read -r -a elementArray <<< "$element"
        date="${elementArray[1]}"

        IFS="." read -r dateElementDay dateElementMonth <<< "$date"
        let dateElementDayInt="$dateElementDay"
        let dateElementMonthInt="$dateElementMonth"

        diffMonth=$((dateElementMonthInt - dateNowMonthInt))
        diffDay=$((dateElementDayInt - dateNowDayInt))
        if [[ ($diffMonth -eq 0) && ($diffDay -eq 0) ]]; then
          # Разделение строки по разделителю "///" с помощью awk
          IFS='~^~' read -d '' -r -a split_creatives <<< "$(echo "$creatives" | awk -F '///' '{gsub("///", "~^~"); print $0}')"
          url="https://api.telegram.org/bot$botToken/sendMessage"
          username=$(sqlite3 -separator "|" "$filepath" "SELECT username FROM User WHERE id = $idUser")
          # Вывод разделенных строк
          curl -X POST $url \
                   -H "Content-Type: application/json" \
                   -d '{
                    "chat_id": "'$admin_id'",
                    "text": "-----<a href=\"https://t.me/'$username'\">'$username'</a>-----",
                    "parse_mode": "HTML",
                    }'
          for post in "${split_creatives[@]}"; do
            if [[ -n "$post" ]]; then
              echo $post
              post_refactoring=${post//\"/\'}
              curl -X POST -H "Content-Type: application/json" -d @- $url <<EOF
{
  "chat_id": "$admin_id",
  "text": "$post_refactoring",
  "parse_mode": "html"
}
EOF
            fi
          done
          curl -X POST $url \
                   -H "Content-Type: application/json" \
                   -d '{
                    "chat_id": "'$admin_id'",
                    "text": "-----<a href=\"https://t.me/'$username'\">'$username'</a>-----",
                    "parse_mode": "HTML",
                    }'

        fi
    done
  done< <(sqlite3 -separator "|" "$filepath" "SELECT creatives, booking_date, idUser FROM recommendationInto")
}

createDbConnection
do_each