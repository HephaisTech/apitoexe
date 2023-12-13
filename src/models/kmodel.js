
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao');
const Activites = require('./kActivites');

class Modeles extends Model { };
Modeles.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        descript: { type: DataTypes.TEXT, allowNull: true },
        prix_author: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
        prix_taxe: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
        permanent: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        variant: { type: DataTypes.STRING, allowNull: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },
        type_activite_id: { type: DataTypes.UUID, allowNull: false, },
        mesure_id: { type: DataTypes.UUID, allowNull: true, },

    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
    });

Modeles.hasMany(Activites);

Modeles.sync().then(() => { console.log('Modeles Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Modeles;