const { Sequelize } = require('sequelize');
const Agent = require('../models/kagent');
const Operation = require('../models/koperation');
const TypeOperation = require('../models/ktypeOperation');
const Op = Sequelize.Op;
class OperationCtrler extends Operation {
    constructor() {
        super()
    }

    async getAll(req, res, next) {
        await Operation.findAll({ where: { active: true, } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            let total = ac.reduce((total, operation) => total + operation.montantOperation, 0);
            return res.status(200).json({ result: true, data: ac, message: 'ok', total: total, status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }
    async getByAgentDate(req, res, next) {
        console.log(req.body.startDate);
        await Operation.findAll({
            where: {
                active: true,
                agent_id: req.body.agent_id,
                dateOperation: {
                    [Op.between]: [req.body.startDate, req.body.endDate],
                },
            }, order: [['dateOperation', 'DESC']]
        }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            let total = ac.reduce((total, operation) => total + operation.montantOperation, 0);
            return res.status(200).json({ result: true, data: ac, message: 'ok', total: total, status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async getById(req, res, next) {
        await Operation.findOne({ where: { id: req.body.id, active: true } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async create(req, res, next) {
        await Operation.create(req.body).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to create ressource ', status: 503 });
            return res.status(201).json({ result: true, data: ac, message: 'ok', status: 201 });
        }).catch((err) => {
            return next(err)
        });
    }
    async createTaxeEncaisse(req, res, next) {
        // DETX
        let tpOpe = await TypeOperation.findOne({ where: { TYPE_OPERATION: "DETX" } });
        let agt = await Agent.findOne({ where: { id: req.body.agentid } });
        let op = {
            dateOperation: Date.now(),
            description: `Encaissement de Taxe sur prestation`,//${newContrib.nom} ${newContrib.prenom}
            type_operation_id: tpOpe.id,
            montantOperation: req.body.montant,
            activites_id: req.body.activite,
            contribuable_id: req.body.contribuableid,
            agent_id: req.body.agentid,
            commune_id: agt.commune_id
        };
        await Operation.create(op).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to create ressource ', status: 503 });
            return res.status(201).json({ result: true, data: ac, message: 'ok', status: 201 });
        }).catch((err) => {
            return next(err)
        });
    }
    async createDroitEncaisse(req, res, next) {
        // DERDV
        let tpOpe = await TypeOperation.findOne({ where: { TYPE_OPERATION: "DERDV" } });
        let agt = await Agent.findOne({ where: { id: req.body.agentid } });
        let op = {
            dateOperation: Date.now(),
            description: `Encaissement de Droit de prestation Ambulant`,//${newContrib.nom} ${newContrib.prenom}
            type_operation_id: tpOpe.id,
            montantOperation: req.body.montant,
            activites_id: req.body.activite,
            contribuable_id: req.body.contribuableid,
            agent_id: req.body.agentid,
            commune_id: agt.commune_id
        };
        await Operation.create(op).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to create ressource ', status: 503 });
            return res.status(201).json({ result: true, data: ac, message: 'ok', status: 201 });
        }).catch((err) => {
            return next(err)
        });
    }
    async petaxeAmbulant(req, res, next) {
        // DERDV
        let tpOpe = await TypeOperation.findOne({ where: { TYPE_OPERATION: "DETX" } });
        let agt = await Agent.findOne({ where: { id: req.body.agentid } });
        let op = {
            dateOperation: Date.now(),
            description: `Encaissement  de Taxe sur prestation Ambulant`,//${newContrib.nom} ${newContrib.prenom}
            type_operation_id: tpOpe.id,
            montantOperation: req.body.montant,
            agent_id: req.body.agentid,
            commune_id: agt.commune_id
        };
        await Operation.create(op).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to create ressource ', status: 503 });
            return res.status(201).json({ result: true, data: ac, message: 'ok', status: 201 });
        }).catch((err) => {
            return next(err)
        });
    }
    async createMulti(req, res, next) {
        try {
            const sentList = req.body;
            if (!sentList || sentList.length === 0) {
                return res.status(400).json({ result: false, message: 'Nothing provided', status: 400 });
            }
            const newList = [];
            for await (const act of sentList) {
                await Operation.create(act).then((ac) => {
                    if (!ac) {
                        console.log(`Error creating Operation index of: ${act}`);
                    } else { newList.push(ac); }
                }).catch((err) => { console.log(err); });
            }
            if (!newList || newList.length === 0) return res.status(500).json({ result: false, data: [], message: 'Service Unavailable', status: 500 });

            return res.status(201).json({ result: true, data: newList, message: 'Multiple Operation created successfully', status: 201 });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        await Operation.update(req.body, { where: { id: req.body.id }, returning: true }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to update ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

    async delete(req, res, next) {
        await Operation.update({ active: false }, { where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to delete ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

    async destroy(req, res, next) {
        await Operation.destroy({ where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to destroy ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }
}

module.exports = OperationCtrler 