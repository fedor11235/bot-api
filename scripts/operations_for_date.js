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
