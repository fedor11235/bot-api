#!/bin/bash

filepath="/home/ubuntu/test/bot-api/prisma/test.db"

createDbConnection() {
  sqlite3 "$filepath" <<EOF
EOF
  echo "Connection with SQLite has been established"
}

db_each() {
  dateNow=$(date +"%d.%m.%Y") # получаем текущую дату в формате <день>.<месяц>.<год>
  IFS="." read -r dateNowDay dateNowMonth dateNowYear <<< "$dateNow"
  dateNowDayInt=$((10#$dateNowDay))
  dateNowMonthInt=$((10#$dateNowMonth))
  dateNowYearInt=$((10#$dateNowYear))
  # в коде выше получили числовые представления дня, месяца и года текущей даты

  while IFS="|" read -r id subscriptionEndDate; do
    if [[ "$subscriptionEndDate" != "never" ]]; then
      IFS="." read -r -a subscriptionUserDate <<< "$subscriptionEndDate"
      subscriptionUserDayInt=$((10#${subscriptionUserDate[0]}))
      subscriptionUserMonthInt=$((10#${subscriptionUserDate[1]}))
      subscriptionUserYearInt=$((10#${subscriptionUserDate[2]}))
      diffYear=$((subscriptionUserYearInt - dateNowYearInt))
      diffMonth=$((subscriptionUserMonthInt - dateNowMonthInt))
      diffDay=$((subscriptionUserDayInt - dateNowDayInt))
      if [[ ((diffYear -eq 0) && (diffMonth -eq 0) && (diffDay -lt 0)) ||
            ((diffYear -eq 0) && (diffMonth -lt 0)) ||
            (diffYear -lt 0) ]]; then
        sqlite3 "$filepath" "UPDATE User SET subscriptionEndDate = 'never' WHERE id = $id"
        sqlite3 "$filepath" "UPDATE User SET tariffPlan = 'base' WHERE id = $id"
        echo "Row $id has been updated"
      fi
    fi
  done < <(sqlite3 -separator "|" "$filepath" "SELECT id, subscriptionEndDate FROM User")
}

createDbConnection
db_each