const Activites = require('../models/kActivites');
const Marche = require('../models/kmarche')

class MarcheCtrler extends Marche {
    constructor() {
        super()
    }

    async getAll(req, res, next) {
        await Marche.findAll({ where: { active: true }, include: Activites }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }
    async getById(req, res, next) {
        await Marche.findOne({ where: { id: req.body.id, active: true }, include: Activites }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async create(req, res, next) {
        await Marche.create(req.body).then((ac) => {
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
                await Marche.create(act).then((ac) => {
                    if (!ac) {
                        console.log(`Error creating Marche index of: ${act}`);
                    } else { newList.push(ac); }
                }).catch((err) => { console.log(err); });
            }
            if (!newList || newList.length === 0) return res.status(500).json({ result: false, data: [], message: 'Service Unavailable', status: 500 });

            return res.status(201).json({ result: true, data: newList, message: 'Multiple Marche created successfully', status: 201 });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        await Marche.update(req.body, { where: { id: req.body.id }, returning: true }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to update ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

    async delete(req, res, next) {
        await Marche.update({ active: false }, { where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to delete ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

    async destroy(req, res, next) {
        await Marche.destroy({ where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to destroy ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }
}

module.exports = MarcheCtrler 