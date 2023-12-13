
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao'); 
const Marche = require('./kmarche');
const Activites = require('./kActivites');

class Arrondissement extends Model { };
Arrondissement.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        reponsable: { type: DataTypes.STRING, allowNull: true, },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },
        commune_id: { type: DataTypes.UUID, allowNull: false, },

    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
    });

 
Arrondissement.hasMany(Marche);
Arrondissement.hasMany(Activites);

Arrondissement.sync( ).then(() => { console.log('Arrondissement Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Arrondissement;