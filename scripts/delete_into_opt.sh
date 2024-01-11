#!/bin/bash
filepath="../prisma/dev.db"
createDbConnection() {
  sqlite3 "$filepath" <<EOF
EOF
  echo "Connection with SQLite has been established"
}
db_each() {
  while IFS="|" read -r id booking_date view; do
    if [ -n "$booking_date" ]; then
      bookingDateArray=($(echo "$booking_date" | tr -d '_' | tr -d ' '))
      maxValue=0
      for element in "${bookingDateArray[@]}"; do
        array=($(echo "$element" | tr -d '/' | tr -d ''))
        value=$(echo "${array[1]}.${array[0]}" | bc)
        if (( $(echo "$value > $maxValue" | bc -l) )); then
          maxValue=$value
        fi
      done
      prepareDate=$(date -d "@$maxValue" +"%Y-%m-%d")
      dateNow=$(date +"%s")
      if (( maxValue < dateNow )); then
        sqlite3 "$filepath" "UPDATE recommendationInto SET view = 'false' WHERE id = $id"
        echo $id
        echo "Row $id has been updated"
      fi
    fi
  done < <(sqlite3 -separator "|" "$filepath" "SELECT id, booking_date, view FROM recommendationInto")
}

createDbConnection
db_each