export default (sequelize, DataTypes) => {
  const UserThesis = sequelize.define('user_thesis', {

  }, {
    timestamps: false
  });

  return UserThesis;
};
