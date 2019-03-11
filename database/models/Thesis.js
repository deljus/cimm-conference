export default (sequelize, DataTypes) => {
  const Thesis = sequelize.define('thesis', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      access: { read: true }
    },

    title: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });

  Thesis.associate = (models) => {
    models.thesis.belongsToMany(models.users, { through: 'user_thesis' });
  };

  return Thesis;
};