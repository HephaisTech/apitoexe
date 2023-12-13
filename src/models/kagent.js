const { DataTypes, Model } = require("sequelize")
const sequelize = require('../config/dao');
const Contribuable = require("./contribuable");
const bcrypt = require('bcrypt');
class Agent extends Model { }

Agent.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false, },
    nom: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, }, },
    prenom: { type: DataTypes.STRING, allowNull: true, validate: { notEmpty: false, }, },
    ifu: { type: DataTypes.STRING, allowNull: true, validate: { notEmpty: false, }, },
    dateNaiss: { type: DataTypes.DATE, allowNull: false, validate: { notEmpty: true, }, },
    sex: { type: DataTypes.ENUM, allowNull: true, validate: { notEmpty: false }, values: ["féminin", "masculin"] },
    pays: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, }, },
    adress: { type: DataTypes.STRING, allowNull: true, validate: { notEmpty: false, }, },
    lieuNaiss: { type: DataTypes.STRING, allowNull: true, validate: { notEmpty: false, }, },
    email: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: { msg: "Must be a valid email address", }, } },
    telephone: { type: DataTypes.STRING, allowNull: true, },
    codepin: { type: DataTypes.STRING, allowNull: true, },
    pwd: { type: DataTypes.STRING, allowNull: true, },
    photo: { type: DataTypes.STRING, allowNull: true, },
    username: { type: DataTypes.STRING, allowNull: true, },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    commune_id: { type: DataTypes.UUID, allowNull: false, },


}, {
    sequelize,
    modelName: 'Agent',
    timestamps: true,
    underscored: true,
});
Agent.hasMany(Contribuable);
Agent.sync(   ).then(() => { console.log(`Agent Table created successfully.`); }).catch((error) => { console.error('Error creating table:', error); });


Agent.beforeCreate(async (agent, options) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(agent.pwd, salt);
    const hashedcodepin = await bcrypt.hash(agent.codepin, salt);
    agent.pwd = hashedPwd;
    agent.codepin = hashedcodepin;

});

module.exports = Agent;