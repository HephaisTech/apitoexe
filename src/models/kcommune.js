
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao');
const Marche = require('./kmarche');
const Activites = require('./kActivites');
const Agent = require('./kagent');
const Arrondissement = require('./karrondissement');

class Commune extends Model { };
Commune.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        reponsable: { type: DataTypes.STRING, allowNull: true, },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },

    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
    });


Commune.hasMany(Agent);
Commune.hasMany(Arrondissement);

Commune.sync( ).then(() => { console.log('Commune Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Commune;