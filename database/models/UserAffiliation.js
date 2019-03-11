export default (sequelize, DataTypes) => {
  const UserAffiliation = sequelize.define('user_affiliation', {

  }, {
    timestamps: false
  });

  return UserAffiliation;
};
