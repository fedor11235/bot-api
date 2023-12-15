const sqlite3 = require("sqlite3").verbose();
const filepath = "../prisma/dev.db";
const botToken = '6127498929:AAEwKurouSkiF8Snfs1_9Q1EHyFQQZbBHJE'

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
    const minValue = Math.min.apply(null, bookingDateArrayNumber);
    const prepareDate = String(minValue).split('.')
    const dateNow = new Date()
    const fullYear = dateNow.getFullYear()
    prepareDate.unshift(String(fullYear))
    const endDateParse = prepareDate.join('-')
    const dateEndMs = Date.parse(endDateParse)
    const dateEnd =  new Date(dateEndMs)
    dateEnd.setDate(dateEnd.getDate() + 1) 
    if(dateEnd < dateNow) {
      if(!row.check || !row.creatives) {
        sendMessage(row.idUser, 'Приблежает дата выхода опта добавьте чек или посты если вы не добавили')
      }
    }
  }
});

function sendMessage(chatId, text) {
  const data = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  }
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}