import { DBConfig } from '../../utils/globalConfig';

export default (sequelize, DataTypes) => {
  const Affiliation = sequelize.define('affiliation', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      access: { read: true }
    },

    country: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    affiliation: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.STRING
    }
  }, {
    schema: DBConfig.schema,
    timestamps: false
  });

  Affiliation.associate = (models) => {
    models.affiliation.belongsToMany(models.users, { through: 'user_affiliation' });
  };

  return Affiliation;
};
