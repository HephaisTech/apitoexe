
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao');
const TypeActivite = require('./ktype');



class Categorie extends Model { };

Categorie.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        descript: { type: DataTypes.TEXT, allowNull: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,

    });

Categorie.hasMany(TypeActivite);

Categorie.sync( ).then(() => { console.log('Categorie Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Categorie;