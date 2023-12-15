const sqlite3 = require("sqlite3").verbose();
const filepath = "./prisma/dev.db";

function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log("Connection with SQLite has been established");
  return db;
}
const db = createDbConnection()


db.each(`SELECT * FROM user`, (error, row) => {
  if (error) {
    throw new Error(error.message);
  }
  const DateEndSplit = row?.subscriptionEndDate?.split('.')
  const newFormatArrayDate = [DateEndSplit[2], DateEndSplit[1], DateEndSplit[0]].join('-')
  const dateEndMs = Date.parse(newFormatArrayDate)
  const dateEnd =  new Date(dateEndMs)
  if(DateEndSplit) {
    const dateNow = new Date()
    if(dateEnd < dateNow) {
      db.run(
        `UPDATE user SET subscriptionEndDate = 'never' WHERE id = ${row.id}`,
        function (error) {
          if (error) {
            console.error(error.message);
          }
          console.log(`Row ${row.id} has been updated`);
        })
    }
  }
});