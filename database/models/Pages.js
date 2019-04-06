import { DBConfig } from '../../utils/globalConfig';

export default (sequelize, DataTypes) => {
  const Pages = sequelize.define('pages', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    title: {
      type: DataTypes.TEXT
    },

    body: {
      type: DataTypes.TEXT
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    schema: DBConfig.schema,
    timestamps: false
  });

  return Pages;
};
