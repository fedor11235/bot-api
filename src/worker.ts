import { PrismaClient } from '@prisma/client'
const fs = require('fs');

const PATH_DIR_BACKUP = './prisma/backups'
const PATH_DB = './prisma/dev.db'
const MAX_NUMBER_BACKUPS = 10
const DELAY_BEFORE_START = 86400000

const prisma = new PrismaClient()

export async function updateTable() {
  createBackupBd()
  await updateSubscription()
  setTimeout(() => {
    console.log("Delayed for 1 second.");
    updateTable()
  }, DELAY_BEFORE_START);  
}


function createBackupBd() {
  const files = fs.readdirSync(PATH_DIR_BACKUP)
  if(files.length === 0) {
    fs.copyFileSync(PATH_DB, PATH_DIR_BACKUP + '/1.db');
  } else {
    const lastFile = files.at(-1)
    const lastFileSplit = lastFile.split('.')
    const numberBackup = lastFileSplit[0]
    fs.copyFileSync(PATH_DB, PATH_DIR_BACKUP + `/${Number(numberBackup) + 1}.db`);
    if(files.length > MAX_NUMBER_BACKUPS) {
      const fileDelete = files.shift()
      console.log(fileDelete)
      fs.unlinkSync(PATH_DIR_BACKUP + '/' + fileDelete)
    }
  }
}

async function updateSubscription() {
  const users = await prisma.user.findMany()

  for(const user of users) {
    const DateEndSplit: any = user?.subscriptionEndDate?.split('.')
    if(DateEndSplit) {
      const DateEndFormat = new Date(DateEndSplit[2], DateEndSplit[1], DateEndSplit[0])
      const dateNow = new Date()
      if(DateEndFormat < dateNow) {
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            tariffPlan: 'base',
            subscriptionEndDate: 'never'
          }
        })
      }
    }
  }
}