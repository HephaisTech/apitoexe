const { DataTypes, Model } = require("sequelize")
const sequelize = require('../config/dao');

class Operation extends Model { }

Operation.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false, },
    dateOperation: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    description: { type: DataTypes.STRING, allowNull: true },
    // latitudeOperation: { type: DataTypes.STRING, allowNull: true },
    // longitudeOperation: { type: DataTypes.STRING, allowNull: true },
    montantOperation: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
    dateValidation: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    etatOperation: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
    dateAnnulation: { type: DataTypes.DATE, allowNull: true },
    session_id: { type: DataTypes.UUID, allowNull: true },
    type_operation_id: { type: DataTypes.UUID, allowNull: false, },
    agent_id: { type: DataTypes.UUID, allowNull: false, },
    commune_id: { type: DataTypes.UUID, allowNull: false, },
    activites_id: { type: DataTypes.UUID, allowNull: true, },
    contribuable_id: { type: DataTypes.UUID, allowNull: true, },

    active: { type: DataTypes.BOOLEAN, defaultValue: true },

}, {
    sequelize,
    modelName: 'Operation',
    underscored: true,
    timestamps: true,
});

Operation.sync().then(() => { console.log(`Operation Table created successfully.`); }).catch((error) => { console.error('Error creating table:', error); });

module.exports = Operation;