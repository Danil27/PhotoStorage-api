'use strict';
const { USER_DB } = require('../../../utils/user_db');
const UserData = require('../../../utils/user_data');
const fs = require('fs')

module.exports.photos = async (ctx, next) => {
  const photos = await getPhoto(UserData.fromCtx(ctx).id);
  ctx.body = photos;
  ctx.status = 200;
  next();
};

module.exports.loadPhoto = async (ctx, next) => {
  const data = ctx.files;
  console.log(data)
  fs.writeFile('./public/' + data.name, data.formData, 'binary', (err) => {
    if (err) return console.log(err);
    console.log("The file was saved!");
  })
  ctx.body = '';
  ctx.status = 200;
  next();
};

async function getPhoto(id) {
  const user = await USER_DB.find(item => {
    if (item.id === id) {
      return true;
    }
  });
  return user.imgs;
}
