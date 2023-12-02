"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTable = void 0;
const client_1 = require("@prisma/client");
const fs = require('fs');
const PATH_DIR_BACKUP = './prisma/backups';
const PATH_DB = './prisma/dev.db';
const MAX_NUMBER_BACKUPS = 10;
const DELAY_BEFORE_START = 86400000;
const prisma = new client_1.PrismaClient();
async function updateTable() {
    createBackupBd();
    await updateSubscription();
    setTimeout(() => {
        console.log("Delayed for 1 second.");
        updateTable();
    }, DELAY_BEFORE_START);
}
exports.updateTable = updateTable;
async function deleteIntoOpt() {
    const recommendationsInto = await prisma.recommendationInto.findMany();
    for (const recommendationInto of recommendationsInto) {
        if (recommendationInto.booking_date) {
            const bookingDateArray = recommendationInto.booking_date.split('_');
            const bookingDateArrayNumber = bookingDateArray.map(element => {
                const array = element.split('/')[1].split('.');
                return Number(`${array[1]}.${array[0]}`);
            });
            const maxValue = Math.max.apply(null, bookingDateArrayNumber);
            const prepareDate = String(maxValue).split('.');
            const dateNow = new Date();
            const fullYear = dateNow.getFullYear();
            prepareDate.unshift(String(fullYear));
            const endDateParse = prepareDate.join('-');
            const dateEndMs = Date.parse(endDateParse);
            const dateEnd = new Date(dateEndMs);
            if (dateEnd < dateNow) {
                await prisma.recommendationInto.delete({
                    where: {
                        id: recommendationInto.id
                    }
                });
            }
        }
        else {
            await prisma.recommendationInto.delete({
                where: {
                    id: recommendationInto.id
                }
            });
        }
    }
}
function createBackupBd() {
    const files = fs.readdirSync(PATH_DIR_BACKUP);
    if (files.length === 0) {
        fs.copyFileSync(PATH_DB, PATH_DIR_BACKUP + '/1.db');
    }
    else {
        const lastFile = files.at(-1);
        const lastFileSplit = lastFile.split('.');
        const numberBackup = lastFileSplit[0];
        fs.copyFileSync(PATH_DB, PATH_DIR_BACKUP + `/${Number(numberBackup) + 1}.db`);
        if (files.length > MAX_NUMBER_BACKUPS) {
            const fileDelete = files.shift();
            console.log(fileDelete);
            fs.unlinkSync(PATH_DIR_BACKUP + '/' + fileDelete);
        }
    }
}
async function updateSubscription() {
    const users = await prisma.user.findMany();
    for (const user of users) {
        const DateEndSplit = user?.subscriptionEndDate?.split('.');
        const newFormatArrayDate = [DateEndSplit[2], DateEndSplit[1], DateEndSplit[0]].join('-');
        const dateEndMs = Date.parse(newFormatArrayDate);
        const dateEnd = new Date(dateEndMs);
        if (DateEndSplit) {
            const dateNow = new Date();
            console.log(dateNow);
            if (dateEnd < dateNow) {
                const test = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        tariffPlan: 'base',
                        subscriptionEndDate: 'never'
                    }
                });
                console.log('test: ', test);
            }
        }
    }
}
//# sourceMappingURL=worker.js.map