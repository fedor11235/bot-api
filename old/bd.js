import request from 'request';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const token = '746c997297440937501f953ec01c985f'

const categoriesList = [
  'education',
  'language',
  'edutainment',
  'art',
  'economics',
  'business',
  'marketing',
  'medicine',
  'health',
  'news',
  'politics',
  'tech',
  'apps',
  'crypto',
  'entertainment',
  'psychology',
  'babies',
  'video',
  'blogs',
  'sales',
  'other',
  'travels',
  'design',
]

const categoriesUrl = `https://api.tgstat.ru/database/categories?token=${token}`

function getUrlCategoriesTop(category, limit) {
  return `https://api.tgstat.ru/channels/search?token=${token}&category=${category}&limit=${limit}&country=ru`
}

function getUrlCategoryStat(username) {
  return `https://api.tgstat.ru/channels/stat?token=${token}&channelId=${username}`
}

function categoriesMap (name) {
  if(name === 'education' || name === 'language' || name === 'edutainment' || name === 'art') {
    return 'education'
  } else if (name === 'economics' || name === 'business' || name === 'marketing') {
    return 'finance'
  } else if (name === 'medicine' || name === 'health') {
    return 'health'
  } else if (name === 'news' || name === 'politics') {
    return 'news'
  } else if (name === 'tech' || name === 'apps' || name === 'crypto') {
    return 'tech'
  } else if (name === 'entertainment') {
    return 'entertainment'
  } else if (name === 'psychology' || name === 'babies') {
    return 'psychology'
  } else if (name === 'video') {
    return 'video'
  } else if (name === 'blogs') {
    return 'author'
  } else if (name === 'sales' || name === 'other' || name === 'travels' || name === 'design') {
    return 'other'
  }
}

function getCategoriesTop() {
  for(const category of categoriesList) {
    const urlCategoriesTop = getUrlCategoriesTop(category, 30)

    request({url: urlCategoriesTop, json: true}, async (error, response, data) => {
      console.log(data)
      if(data.status === 'error') return;
      const chanelsTop = data.response;
      for(const chanel of chanelsTop.items) {
        const urlCategoryStat = getUrlCategoryStat(chanel.username)
        request({url: urlCategoryStat, json: true}, async (error, response, data) => {
          const categoryStat = data.response;
          // console.log(data)
          if(categoryStat) {
            const catalogNew = await prisma.catalog.create({
              data: { 
                category: categoriesMap(category),
                username: chanel.username,
                title: chanel.title,
                link: chanel.link,
                daily_reach: categoryStat.daily_reach,
                ci_index: categoryStat.ci_index,
                participants_count: categoryStat.participants_count,
                avg_post_reach: categoryStat.avg_post_reach,
                forwards_count: categoryStat.forwards_count,
              },
            });
          }
        });
      }
    });
    
  }
}

getCategoriesTop()