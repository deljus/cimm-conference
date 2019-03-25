import { config } from '../../globalConfig';

export default (sequelize, DataTypes) => {
  const UserAffiliation = sequelize.define('user_affiliation', {

  }, {
    schema: config.db.schema,
    timestamps: false
  });

  return UserAffiliation;
};
