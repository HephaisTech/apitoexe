const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao');
const Activites = require('./kActivites');

class Marche extends Model { };
Marche.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        code: { type: DataTypes.STRING, allowNull: false, unique: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },
        arrondissement_id: { type: DataTypes.UUID, allowNull: false, },
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
    });

Marche.hasMany(Activites);

Marche.sync().then(() => { console.log('Marche Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Marche;
