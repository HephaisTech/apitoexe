const Modeles = require('../models/kmodel');

class ModelCtrl extends Modeles {
    constructor() {
        super();
    }

    async createModel(req, res, next) {
        await Modeles.create(req.body).then((md) => {
            if (!md) return res.status(503).json({ result: false, data: [], message: 'unable to create ressource ', status: 503 });
            return res.status(201).json({ result: true, data: md, message: 'ok', status: 201 });
        }).catch((err) => {
            return next(err);
        });
    }

    async createMulti(req, res, next) {
        try {
            const listModel = req.body;
            if (!listModel || listModel.length === 0) {
                return res.status(400).json({ result: false, message: 'No Modele provided', status: 400 });
            }
            const newlistModel = [];
            for await (const md of listModel) {
                await Modeles.create(md).then((md) => {
                    if (!md) { console.log('failed to create') } else { newlistModel.push(md); }
                }).catch((err) => { console.log(err) });
            }
            if (!newlistModel || newlistModel.length === 0) {
                return res.status(500).json({ result: false, data: [], message: 'Service Unavailable', status: 500 });
            }
            return res.status(201).json({ result: true, data: newlistModel, message: 'Multiple Modeles created successfully', status: 201 });
        } catch (error) {
            return next(error);
        }
    }

    async getAllModeles(req, res, next) {
        try {
            await Modeles.findAll({ where: { active: true } }).then((md) => {
                if (!md) return res.status(503).json({ result: false, data: [], message: 'unable to find ressource ', status: 503 });
                return res.status(200).json({ result: true, data: md, message: 'ok', status: 200 });
            }).catch((err) => { return next(err); });
        } catch (error) {
            return next(error);
        }
    }

    async getModelId(req, res, next) {
        try {
            await Modeles.findOne({ where: { id: req.body.id, active: true } }).then((md) => {
                if (!md) return res.status(503).json({ result: false, data: [], message: 'unable to find ressource ', status: 503 });
                return res.status(200).json({ result: true, data: md, message: 'ok', status: 200 });
            }).catch((err) => { return next(err); });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        await Modeles.update(req.body, { where: { id: req.body.id }, returning: true, }).then((md) => {
            if (!md[0]) return res.status(404).json({ result: false, data: [], message: 'ressource not found', status: 404 });
            return res.status(200).json({ result: true, data: md[1][0], message: 'Updated successfully', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async delete(req, res, next) {
        await Modeles.update({ active: false }, { where: { id: req.body.id }, returning: true, }).then((md) => {
            if (!md[0]) return res.status(404).json({ result: false, data: [], message: 'ressource not found', status: 404 });
            return res.status(200).json({ result: true, data: [], message: 'deleted successfully', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async destroy(req, res, next) {
        await Modeles.destroy({ where: { id: req.body.id }, }).then((md) => {
            if (!md) return res.status(404).json({ result: false, data: [], message: 'ressource not found', status: 404 });
            return res.status(200).json({ result: true, data: [], message: 'destroyed successfully', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }
}

module.exports = ModelCtrl;