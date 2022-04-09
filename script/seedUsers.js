const axios = require('axios');

const seedUsers = async() => {
  const usersResp = (await axios.get('https://randomuser.me/api/?results=100')).data.results;
  // await Promise.all(usersResp.map())
};

module.exports = seedUsers;
