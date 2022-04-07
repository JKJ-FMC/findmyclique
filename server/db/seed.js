const faker = require('faker');
const User = require('./models/User');

const createUser = async () => {
  try {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: faker.date.past(),
      imageUrl: faker.image.people(),
      job: faker.name.jobTitle(),
      bio: `I love ${faker.commerce.productAdjective()} ${faker.animal.fish()}`,
      email: faker.internet.email(),
      password: '123',
      phoneNumber: faker.phone.phoneNumber(),
    };
    await User.create(user);
  } catch (err) {
    console.log(err);
  }
};

createUser();
