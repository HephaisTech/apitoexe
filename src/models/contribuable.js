const { DataTypes, Model } = require("sequelize")
const sequelize = require('../config/dao');
const Activites = require("./kActivites");

class Contribuable extends Model { }

Contribuable.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false, },
    nom: { type: DataTypes.STRING, allowNull: false, },
    prenom: { type: DataTypes.STRING, allowNull: true, },
    typecontr: { type: DataTypes.STRING, allowNull: true, },
    ifu: { type: DataTypes.STRING, allowNull: true, },
    dateNaiss: { type: DataTypes.DATE, allowNull: false, },
    sex: { type: DataTypes.ENUM, allowNull: true, values: ["féminin", "masculin"] },
    pays: { type: DataTypes.STRING, allowNull: false, },
    adress: { type: DataTypes.STRING, allowNull: true, },
    lieuNaiss: { type: DataTypes.STRING, allowNull: true, },
    email: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: { msg: "Must be a valid email address", }, } },
    telephone: { type: DataTypes.STRING, allowNull: true, },
    photo: { type: DataTypes.STRING, allowNull: true, },
    agent_id: { type: DataTypes.UUID, allowNull: false, },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },

}, {
    sequelize,
    modelName: 'Contribuable',
    underscored: true,
    timestamps: true,
});
Contribuable.hasMany(Activites)
Contribuable.sync().then(() => { console.log(`Contribuable Table created successfully.`); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Contribuable;