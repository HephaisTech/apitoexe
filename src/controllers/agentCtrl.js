const Contribuable = require('../models/contribuable');
const Agent = require('../models/kagent');

class AgentCtrler extends Agent {
    constructor() {
        super()
    }

    async getAll(req, res, next) {
        await Agent.findAll({ where: { active: true }, attributes: { exclude: ['pwd', "codepin"] } },).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            ac.pwd = '';
            ac.codepin = '';
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }
    async getById(req, res, next) {
        await Agent.findOne({ where: { id: req.body.id, active: true }, attributes: { exclude: ['pwd', "codepin"] }, include: Contribuable }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async create(req, res, next) {
        await Agent.findOne({ where: { email: req.body.email }, attributes: { exclude: ['pwd', "codepin"] } }).then((result) => {
            if (result) return res.status(300).json({ result: false, data: [], message: 'email already in use! ', status: 300 });
        }).catch((err) => {
            return next(err)
        });
        await Agent.create(req.body).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to create ressource ', status: 503 });
            const { pwd, codepin, ...newAg } = ac.dataValues;
            return res.status(201).json({ result: true, data: newAg, message: 'ok', status: 201 });
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
                await Agent.create(act).then((ac) => {
                    if (!ac) {
                        console.log(`Error creating Agent index of: ${act}`);
                    } else { const { pwd, codepin, ...newAg } = ac.dataValues; newList.push(newAg); }
                }).catch((err) => { console.log(err); });
            }
            if (!newList || newList.length === 0) return res.status(500).json({ result: false, data: [], message: 'Service Unavailable', status: 500 });

            return res.status(201).json({ result: true, data: newList, message: 'Multiple Agent created successfully', status: 201 });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        await Agent.update(req.body, { where: { id: req.body.id }, returning: true }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to update ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

    async delete(req, res, next) {
        await Agent.update({ active: false }, { where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to delete ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

    async destroy(req, res, next) {
        await Agent.destroy({ where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to destroy ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }
}

module.exports = AgentCtrler 