import { config } from '../../globalConfig';

export default (sequelize, DataTypes) => {
  const UserThesis = sequelize.define('user_thesis', {

  }, {
    schema: config.db.schema,
    timestamps: false
  });

  return UserThesis;
};
