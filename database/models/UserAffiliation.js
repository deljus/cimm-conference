import { DBConfig } from '../../utils/globalConfig';

export default (sequelize, DataTypes) => {
  const UserAffiliation = sequelize.define('user_affiliation', {

  }, {
    schema: DBConfig.schema,
    timestamps: false
  });

  return UserAffiliation;
};
