
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao'); 
const Modeles = require('./kmodel');

class Mesure extends Model { };
Mesure.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        code: { type: DataTypes.STRING, allowNull: false, unique: true }, 
        active: { type: DataTypes.BOOLEAN, defaultValue: true }, 

    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
    });

Mesure.hasMany(Modeles);

Mesure.sync(  ).then(() => { console.log('Mesure Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Mesure;