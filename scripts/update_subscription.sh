#!/bin/bash

filepath="../prisma/dev.db"

createDbConnection() {
  sqlite3 $filepath <<EOF
EOF
  echo "Connection with SQLite has been established"
}

db_each() {
  sqlite3 $filepath "SELECT * FROM user" | while read -r row; do
    DateEndSplit=$(echo "$row" | awk '{print $3}' | tr -d '.')
    newFormatArrayDate=$(echo "$DateEndSplit" | sed 's/\(....\)\(..\)\(..\)/\1-\2-\3/')
    dateEndMs=$(date -d "$newFormatArrayDate" +%s)
    dateEnd=$(date -d "@$dateEndMs")
    dateNow=$(date)
    if [ "$DateEndSplit" != "" ] && [ "$dateEnd" \< "$dateNow" ]; then
      id=$(echo "$row" | awk '{print $1}')
      sqlite3 $filepath "UPDATE user SET subscriptionEndDate = 'never' WHERE id = $id"
      echo "Row $id has been updated"
    fi
  done
}

createDbConnection
db_each