const sequelize = require('../config/dao');
const Activites = require('../models/kActivites');
const Modeles = require('../models/kmodel');
const Operation = require('../models/koperation');

class ActiviteCtrl extends Activites {

    constructor() {
        super()
    }

    async getAll(req, res, next) {
        await Activites.findAll({ where: { active: true } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }
    async getById(req, res, next) {
        await Activites.findOne({ where: { id: req.body.id, active: true } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async getAnyWhere(req, res, next) {
        await Activites.findAll({
            where: {
                ArrondissementId: req.body.arrondissement_id,
                MarcheId: req.body.marche_id,
                active: true
            }
        }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to read ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'list', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }
    async getRecouvrement(req, res, next) {
        try {
            var listActivite = await Activites.findAll({
                where: {
                    ArrondissementId: req.body.arrondissement_id,
                    MarcheId: req.body.marche_id,
                    active: true
                }
            });

            let listresult = [];

            for await (const ac of listActivite) {
                var lastOperation = await Operation.findAll({ where: { activites_id: ac.id }, attributes: [[sequelize.fn('max', sequelize.col('created_at')), 'max']], })
                var leModel = await Modeles.findOne({ where: { id: ac.modele_id } });
                if (typeof parseFloat(leModel.mesure_id) == 'number') {
                    var ladate = Date.now()
                    var dateope = new Date(lastOperation[0].dataValues.max); 
                    var difer = ladate - dateope;
                    difer = difer / (1000 * 3600 * 24);
                    console.log(parseFloat(leModel.mesure_id));
                    console.log(difer);
                    if (parseFloat(leModel.mesure_id) < difer) {
                        // listresult.push(ac)
                    }
                    listresult.push(ac)
                }
            }
            return res.status(200).json({ result: true, data: listresult, message: 'ok', status: 200 });
        } catch (error) {
            return next(error)
        }
    }

    async create(req, res, next) {
        await Activites.create(req.body).then((ac) => {
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
                await Activites.create(act).then((ac) => {
                    if (!ac) {
                        console.log(`Error creating Activite index of: ${act}`);
                    } else {
                        newList.push(ac);
                    }
                }).catch((err) => { console.log(err); });
            }
            if (!newList || newList.length === 0) return res.status(500).json({ result: false, data: [], message: 'Service Unavailable', status: 500 });

            return res.status(201).json({ result: true, data: newList, message: 'Multiple Activites created successfully', status: 201 });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        await Activites.update(req.body, { where: { id: req.body.id }, returning: true }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to update ressource ', status: 503 });
            return res.status(200).json({ result: true, data: ac, message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

    async delete(req, res, next) {
        await Activites.update({ active: false }, { where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to delete ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }
    async destroy(req, res, next) {
        await Activites.destroy({ where: { id: req.body.id } }).then((ac) => {
            if (!ac) return res.status(503).json({ result: false, data: [], message: 'unable to destroy ressource ', status: 503 });
            return res.status(200).json({ result: true, data: [], message: 'ok', status: 200 });
        }).catch((err) => { return next(err); });
    }

}

module.exports = ActiviteCtrl;