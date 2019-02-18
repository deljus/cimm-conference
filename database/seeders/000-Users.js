const faker = require('faker');

const generateUsers = (amount = 10) => [...Array(amount).keys()].map(() => (
    {
        firstName: faker.name.findName(),
        login: faker.name.findName(),
        about: faker.lorem.sentences(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: 'dfbdfbdfbdfb',
        friendIds: [1, 2, 3, 4, 5],
        friendRequestIds: [6, 7, 8, 9, 10],
        createdAt: new Date(),
        updatedAt: new Date()

    }));

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', generateUsers(), {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
