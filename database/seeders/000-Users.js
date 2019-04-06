import { DBConfig } from '../../utils/globalConfig';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert({ tableName: 'users', schema: DBConfig.schema }, [{
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.ru',
      isAdmin: true,
      isVerifiedEmail: true,
      password: '$2b$12$hQkZGSu0X3JN9Nl91zc5sO1FNEzBDk4LydOy1EDqUPgct70a3isza' // Admin1
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete({ tableName: 'users', schema: DBConfig.schema }, null, {});
  }
};
