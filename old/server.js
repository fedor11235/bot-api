import express from 'express'
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const port = 3001

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PROFILE
app.get('/chanel', async  (req, res) => {
  const username = req.query.username
  const chanel = await prisma.catalog.findFirst({
    where: {
      username: username,
    }
  });
  res.send(chanel)
})

app.get('/chanel-user', async  (req, res) => {
  const idUser = req.query.idUser
  const chanel = await prisma.userChanel.findMany({
    where: {
      idUser: idUser
    },
  });
  res.send(chanel)
})

app.get('/categories', async  (req, res) => {
  const categoryQuery = req.query.category
  let categoryFind
  if(categoryQuery === 'all') {
    categoryFind = await prisma.catalog.findMany();
  } else {
    categoryFind = await prisma.catalog.findMany({
      where: {
        category: categoryQuery,
      }
    });
  }
  res.send(categoryFind)
})

app.get('/promocode', async  (req, res) => {
  const idUser = req.query.id
  const promocode = String(new Date().valueOf())
  await prisma.promoCode.create({
    data: { 
      idUser: idUser,
      code: promocode
    },
  });
  res.send(promocode)
})

app.get('/create-chanel', async  (req, res) => {
  const idUser = req.query.idUser
  const idChanel = req.query.idChanel
  const isUserChanel = await prisma.userChanel.findFirst({
    where: {
      idUser: idUser,
      idChanel: idChanel
    },
  });
  if(isUserChanel) {
    res.send('exist')
    return
  }
  // modeDb = await prisma.mode.create({
  //   data: {
  //     idUser: idUser,
  //     state: state
  //   },
  // });
  await prisma.userChanel.create({
    data: { 
      idUser: idUser,
      idChanel: idChanel
    },
  });
  await prisma.User.create({
    data: { 
      idUser: idUser,
    },
  });
  res.send('created')
})

// USER
app.get('/check', async  (req, res) => {
  const idUser = req.query.idUser
  const isUserChanel = await prisma.userChanel.findFirst({
    where: {
      idUser: idUser,
    },
  });
  if(isUserChanel) {
    res.send('exist')
    return
  }
  res.send('empty')
})

app.get('/profile', async  (req, res) => {
  const idUser = req.query.idUser
  const user = await prisma.user.findFirst({
    where: {
      idUser: idUser,
    },
  });

  res.send({
    tariffPlan: user.tariffPlan,
    subscriptionEndDate: user.subscriptionEndDate,
    createdOpt: user.createdOpt,
    byOpt: user.byOpt,
    totalSavings: user.totalSavings,
    invitedUsers: user.invitedUsers,
    totalEarned: user.totalEarned,
    channels: user.channels,
  })
})

//OPT
app.get('/opt-create', async  (req, res) => {
  const idUser = req.query.idUser
  const chanel = req.query.chanel

  const user = await prisma.user.findFirst({
    where: { idUser: idUser},
  });

  await prisma.opt.deleteMany({
    where: { idUser: user.id}
  });

  const opt = await prisma.opt.create({
    data: { 
      idUser: user.id,
      chanel: chanel
    },
  });
  res.send('ok')
})

//OPT
app.post('/opt-set', async  (req, res) => {
  const idUser = req.query.idUser
  const data = req.body;

  const user = await prisma.user.findFirst({
    where: { idUser: idUser},
    include: {
      opts: true,
    },
  });

  const opt = await prisma.opt.update({
    where: { id: user.opts[0].id},
    data: data
  });

  res.send(opt)
})

app.get('/opt-get', async  (req, res) => {
  const idUser = req.query.idUser

  const user = await prisma.user.findFirst({
    where: { idUser: idUser},
    include: {
      opt: true,
    },
  });
  res.send(user.opt)
})

// MODE MESSAGE
app.get('/mode-set', async  (req, res) => {
  const idUser = req.query.idUser
  const mode = req.query.mode

  const user = await prisma.user.findFirst({
    where: { idUser: idUser},
  });

  await prisma.user.update({
    where: { id: user.id},
    data: {
      message_mode: mode
    },
  });
  res.send("ok")
})

app.get('/mode-get', async  (req, res) => {
  const idUser = req.query.idUser

  const user = await prisma.user.findFirst({
    where: { idUser: idUser}
  });

  if(user) {
    res.send(user.message_mode)
    return
  }
  res.send('standart')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // getCategoriesTop()
})
