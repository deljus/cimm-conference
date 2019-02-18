export default (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    avatar: {
      type: DataTypes.TEXT
    },

    firstName: {
      type: DataTypes.STRING
    },

    lastName: {
      type: DataTypes.STRING
    },

    middleName: {
      type: DataTypes.STRING
    },

    affiliation: {
      type: DataTypes.STRING
    },

    country: {
      type: DataTypes.STRING
    },

    address: {
      type: DataTypes.STRING
    },

    mobilePhone: {
      type: DataTypes.STRING
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },

    hash: {
      type: DataTypes.STRING
    },

    isVerifiedEmail: {
      type: DataTypes.BOOLEAN
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Users.associate = (models) => {
  //     models.users.hasMany(models.posts);
  // };

  return Users;
};
