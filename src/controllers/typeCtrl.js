
const Modeles = require('../models/kmodel');
const TypeModel = require('../models/ktype')

class TypeCtrl extends TypeModel {
    constructor() {
        super();
    }



    async getAlltype(req, res, next) {
        await TypeModel.findAll({ where: { active: true }, include: Modeles }).then((tp) => {
            if (!tp) {
                return res.status(503).json({ result: false, data: [], message: 'not found ', status: 503 });
            }
            return res.status(200).json({ result: true, data: tp, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async getTypebyId(req, res, next) {
        await TypeModel.findOne({ where: { id: req.body.id, active: true } }).then((tp) => {
            if (!tp) {
                return res.status(503).json({ result: false, data: [], message: 'not found ', status: 503 });
            }
            return res.status(200).json({ result: true, data: tp, message: 'ok', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    // 
    async createType(req, res, next) {
        await TypeModel.create(req.body).then((tp) => {
            if (!tp) {
                return res.status(503).json({ result: false, data: [], message: 'unable to create ressource ', status: 503 });
            }
            return res.status(201).json({ result: true, data: tp, message: 'ok', status: 201 });
        }).catch((err) => {
            return next(err)
        });
    }
    //
    async createMulti(req, res, next) {
        try {
            const listType = req.body;
            if (!listType || listType.length === 0) {
                return res.status(400).json({ result: false, message: 'No Type provided', status: 400 });
            }
            const newlistType = [];
            for await (const md of listType) {
                await TypeModel.create(md).then((md) => {
                    if (!md) { console.log('failed to create') } else { newlistType.push(md); }
                }).catch((err) => { console.log(err) });
            }
            if (!newlistType || newlistType.length === 0) {
                return res.status(500).json({ result: false, data: [], message: 'Service Unavailable', status: 500 });
            }
            return res.status(201).json({ result: true, data: newlistType, message: 'Multiple TypeModel created successfully', status: 201 });
        } catch (error) {
            return next(error);
        }
    }
    // 
    async updateType(req, res, next) {
        await TypeModel.update(req.body, { where: { id: req.body.id }, returning: true, }).then((tp) => {
            if (!tp[0]) {
                return res.status(404).json({ result: false, data: [], message: 'type not found', status: 404 });
            }
            return res.status(200).json({ result: true, data: tp[1][0], message: 'Updated successfully', status: 200 });
        }).catch((err) => {
            return next(err)
        });
    }

    async deleteType(req, res, next) {
        try {
            const deletedtype = await TypeModel.update(
                { active: false },
                {
                    where: { id: req.body.id, active: true },
                    returning: true,
                }
            );

            if (!deletedtype[0]) {
                return res.status(404).json({ result: false, data: [], message: 'type not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: deletedtype[1][0], message: 'Deleted successfully', status: 200 });
            }
        } catch (err) {
            next(err);
        }
    }

    async destroyType(req, res, next) {
        await TypeModel.destroy({
            where: { id: req.body.id },
        }).then((tp) => {
            if (!tp) {
                return res.status(404).json({ result: false, data: [], message: 'Category not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: [], message: 'Physically deleted successfully', status: 200 });
            }
        }).catch((err) => {
            next(err);
        });

    }
}
module.exports = TypeCtrl;
