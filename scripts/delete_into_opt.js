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


db.each(`SELECT * FROM recommendationInto`, (error, row) => {
  if (error) {
    throw new Error(error.message);
  }

  if(row.booking_date) {
    const bookingDateArray = row.booking_date.split('_')
    const bookingDateArrayNumber = bookingDateArray.map(element => {
      const array = element.split('/')[1].split('.')
      return Number(`${array[1]}.${array[0]}`)
    });
    const maxValue = Math.max.apply(null, bookingDateArrayNumber);
    const prepareDate = String(maxValue).split('.')
    const dateNow = new Date()
    const fullYear = dateNow.getFullYear()
    prepareDate.unshift(String(fullYear))
    const endDateParse = prepareDate.join('-')
    const dateEndMs = Date.parse(endDateParse)
    const dateEnd =  new Date(dateEndMs)
    if(dateEnd < dateNow) {
      db.run(
        `UPDATE recommendationInto SET view = false WHERE id = ${row.id}`,
        function (error) {
          if (error) {
            console.error(error.message);
          }
          console.log(`Row ${row.id} has been updated`);
        })
    }
  }

});