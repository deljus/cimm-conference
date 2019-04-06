import { DBConfig } from '../../utils/globalConfig';

export default (sequelize, DataTypes) => {
  const UserThesis = sequelize.define('user_thesis', {

  }, {
    schema: DBConfig.schema,
    timestamps: false
  });

  return UserThesis;
};
