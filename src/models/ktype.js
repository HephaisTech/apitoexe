
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao');
const Modeles = require('./kmodel');


class TypeActivite extends Model { }

TypeActivite.init(
    {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false, },
        name: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { notEmpty: true, }, },
        descript: { type: DataTypes.TEXT, allowNull: true, validate: { notEmpty: true, }, },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },
        categorie_id: { type: DataTypes.UUID, allowNull: false, },
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
    }
);

TypeActivite.hasMany(Modeles);

TypeActivite.sync( ).then(() => { console.log('TypeActivite Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = TypeActivite;
