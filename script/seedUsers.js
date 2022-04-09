const axios = require('axios');
const {
  db,
  models: { User },
} = require('../server/db');
const faker = require('faker');

const seedUsers = async() => {
  const usersResp = (await axios.get('https://randomuser.me/api/?results=100')).data.results;

  const users = await Promise.all(usersResp.map(user => User.create({
    firstName: user.name.first,
    lastName: user.name.last,
    dateOfBirth: user.dob.date,
    imageUrl: user.picture.large,
    job: faker.name.jobTitle(),
    bio: `I love ${faker.commerce.productAdjective()} ${faker.animal.fish()}`,
    email: user.email,
    password: '1234567',
    phoneNumber: faker.phone.phoneNumber(),
  })));

  console.log(`SEEDED ${users.length} users`)

};

module.exports = seedUsers;
