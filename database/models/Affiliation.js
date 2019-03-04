export default (sequelize, DataTypes) => {
    const Affiliation = sequelize.define('affiliation', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
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
        timestamps: false,
    });

    Affiliation.associate = (models) => {
        models.affiliation.belongsToMany(models.users, {through: 'user_affiliation'});
    };

    return Affiliation;
};