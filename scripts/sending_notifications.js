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
    const dateEnd = earlyDate(row.booking_date)
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


// функция для самой ранней даты, подавать строчку вида "morning/13.12_day/13.12_day/14.12"
function earlyDate(booking_date) {
  const bookingDateArray = booking_date.split('_');
  const bookingDateArrayNumber = bookingDateArray.map(element => {
    const array = element.split('/')[1].split('.')
    return [Number(array[0]), Number(array[1])]
  });
  resultDate = bookingDateArrayNumber[0];
  for (let i = 0; i < bookingDateArrayNumber.length; i++) {
      if (bookingDateArrayNumber[i][1] < resultDate[1]) {
          resultDate = bookingDateArrayNumber[i];
      } else if (bookingDateArrayNumber[i][1] === resultDate[1] && bookingDateArrayNumber[i][0] < resultDate[0]) {
          resultDate = bookingDateArrayNumber[i];
      }
  }
  return resultDate; // возвращает массив двух элементов [<число>, <месяц>]
}
