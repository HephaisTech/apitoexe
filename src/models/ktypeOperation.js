const { DataTypes, Model } = require("sequelize")
const sequelize = require('../config/dao');
const Operation = require("./koperation");

class TypeOperation extends Model { }

TypeOperation.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false, },
    NOM_TYPE_OPERATION: { type: DataTypes.STRING, allowNull: false },
    TYPE_OPERATION: { type: DataTypes.STRING, allowNull: false },
    ETAT_TYPE: { type: DataTypes.INTEGER, allowNull: true, defaultValue: true },
    NUM_MANUEL: { type: DataTypes.STRING(10), allowNull: true },
    NUM_MANUEL_COMMISSION: { type: DataTypes.STRING(10), allowNull: true },
    MODULE_OPERATION: { type: DataTypes.STRING(50), allowNull: true },
    DESCRIPTION_ECRITURE: { type: DataTypes.TEXT, allowNull: true },
    MONTANT: { type: DataTypes.DOUBLE, allowNull: true },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },


}, {
    sequelize,
    modelName: 'TypeOperation',
    underscored: true,
    timestamps: true,
});

TypeOperation.hasMany(Operation);

TypeOperation.sync().then(() => { console.log(`TypeOperation Table created successfully.`); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = TypeOperation;