const faker = require('faker');

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('pages', [{

            title: 'Hello World',

            body: '# Header \n ___ \n Hello world.',

            url: '/',

            order: 0
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('pages', null, {});
    }
};
