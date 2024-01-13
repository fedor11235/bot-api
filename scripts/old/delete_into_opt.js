const sqlite3 = require("sqlite3").verbose();
const filepath = "../prisma/dev.db";

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
    const dateEnd = lateDate(row.booking_date)
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


// функция для самой поздней даты, подавать строчку вида "morning/13.12_day/13.12_day/14.12"
function lateDate(booking_date) {
  const bookingDateArray = booking_date.split('_');
  const bookingDateArrayNumber = bookingDateArray.map(element => {
    const array = element.split('/')[1].split('.')
    return [Number(array[0]), Number(array[1])]
  });
  resultDate = bookingDateArrayNumber[0];
  for (let i = 0; i < bookingDateArrayNumber.length; i++) {
      if (bookingDateArrayNumber[i][1] > resultDate[1]) {
          resultDate = bookingDateArrayNumber[i];
      } else if (bookingDateArrayNumber[i][1] === resultDate[1] && bookingDateArrayNumber[i][0] > resultDate[0]) {
          resultDate = bookingDateArrayNumber[i];
      }
  }
  return resultDate; // возвращает массив двух элементов [<число>, <месяц>]
}
