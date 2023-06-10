const jwt = require('jsonwebtoken');

const payload = {
  userId: '123456789',
  username: 'exampleUser'
};

const secretKey = 'mySecretKey123!@#';
const token = jwt.sign(payload, secretKey);

console.log(token);



module.exports = token;
