import { DBConfig } from '../../utils/globalConfig';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert({ tableName: 'pages', schema: DBConfig.schema }, [{

      title: 'Hello World',

      body: '# Header \n ___ \n Hello world.',

      url: '/',

      order: 0
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete({ tableName: 'pages', schema: DBConfig.schema }, null, {});
  }
};
