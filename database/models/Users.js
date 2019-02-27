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

    role: {
        type: DataTypes.INTEGER
    },

    isVerifiedEmail: {
      type: DataTypes.BOOLEAN
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      timestamps: false,
    });

  Users.associate = (models) => {
      models.users.belongsToMany(models.affiliation, {through: 'user_affiliation'});
  };

  return Users;
};
