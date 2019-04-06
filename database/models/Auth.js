import { DBConfig } from '../../utils/globalConfig';

export default (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.STRING(50000)
  }, { schema: DBConfig.schema });
  return Session;
};
