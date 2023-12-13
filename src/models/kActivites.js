
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dao');

class Activites extends Model { };
Activites.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING, allowNull: false },
        matricule: { type: DataTypes.STRING, allowNull: false, unique: true },
        descript: { type: DataTypes.TEXT, allowNull: true },
        produits: { type: DataTypes.TEXT, allowNull: true },
        qty: { type: DataTypes.DOUBLE, allowNull: false, defaultValue: 0 },
        largeur: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        longueur: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        latitude: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        longitude: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        adress: { type: DataTypes.STRING, allowNull: true },
        dateContrat: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
        active: { type: DataTypes.BOOLEAN, defaultValue: true },
        modele_id: { type: DataTypes.UUID, allowNull: false, },
        marche_id: { type: DataTypes.UUID, allowNull: false, },
        arrondissement_id: { type: DataTypes.UUID, allowNull: false, },
        contribuable_id: { type: DataTypes.UUID, allowNull: false, },
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
    });

// Modeles.hasMany(Activites);

Activites.sync( ).then(() => { console.log('Activites Table created successfully.'); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Activites;