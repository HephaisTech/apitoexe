const Contribuable = require('../models/contribuable');
const Activites = require('../models/kActivites');
const Agent = require('../models/kagent');
const Operation = require('../models/koperation');
const TypeOperation = require('../models/ktypeOperation');

class ContribCntrller extends Contribuable {
    constructor() {
        super();
    }

    async createContrib(req, res, next) {
        try {
            let photos = '';
            req.body.photo = '';
            // if (req.files.length > 0) {
            //     photos = `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`
            //     req.body.photo = photos;
            // }
            const newContrib = await Contribuable.create(req.body);
            if (!newContrib) {
                return res.status(503).json({ result: false, data: [], message: 'Service Unavailable', status: 503 });
            }
            return res.status(201).json({ result: true, data: newContrib, message: 'Created successfully', status: 201 });
        } catch (err) { next(err); }
    }

    async enrollerWithActivities(req, res, next) {
        try {
            let photos = '';
            req.body.photo = '';
            // if (req.files.length > 0) {
            //     photos = `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`
            //     req.body.photo = photos;
            // }
            const listAct = req.body.Activites;
            const { id, updatedAt, createdAt, active, ...body } = req.body;

            const newContrib = await Contribuable.create(body)

            if (!newContrib) {
                return res.status(503).json({ result: false, data: [], message: 'Service Unavailable', status: 503 });
            }

            
            let tpOpe = await TypeOperation.findOne({ where: { TYPE_OPERATION: "PMAD" } });
            let egt = await Agent.findOne({ where: { id: newContrib.agent_id } });
            let op = {
                dateOperation: Date.now(),
                description: `Enrolement de ${newContrib.nom} ${newContrib.prenom}`,
                type_operation_id: tpOpe.id,
                agent_id: newContrib.agent_id,
                contribuable_id: newContrib.id,
                commune_id: egt.commune_id
            };
            await Operation.create(op);
            const newList = [];
            for await (const acti of listAct) {
                const { id, updatedAt, createdAt, active, ...act } = acti;
                act.contribuable_id = newContrib.id;
                act.ContribuableId = newContrib.id;
                await Activites.create(act).then((ac) => {
                    if (!ac) {
                        console.log(`Error creating Activite index of: ${act}`);
                    } else {
                        newList.push(ac);
                    }
                }).catch((err) => { console.log(err); });
            }
            if (!newList || newList.length === 0) console.log(`Error creating Activities `);
            newContrib.activites = newList;
            return res.status(201).json({ result: true, data: newContrib, message: 'Created successfully', status: 201 });
        } catch (err) { next(err); }
    }

    async createMultipleContrib(req, res, next) {
        try {
            const contributions = req.body;
            let messg = '';
            if (!contributions || contributions.length === 0) {
                return res.status(400).json({ result: false, message: 'No contributions provided', status: 400 });
            }
            const newContributions = [];
            for await (const contribution of contributions) {
                try {
                    const createdContrib = await Contribuable.create(contribution);
                    newContributions.push(createdContrib);
                } catch (error) {
                    console.error(`Error creating contribution: ${error.message}`);
                    messg = error;
                    // You can choose to handle or log individual errors here
                }
            }
            if (!newContributions || newContributions.length === 0) {
                return res.status(500).json({ result: false, data: [], message: messg.message, status: 500 });
            }
            return res.status(201).json({ result: true, data: newContributions, message: 'Multiple contributions created successfully', status: 201 });

        } catch (err) {
            next(err);
        }
    }


    async getContrib(req, res, next) {
        try {
            const ctb = await Contribuable.findAll({ where: { active: true, }, include: Activites });
            if (!ctb) return res.status(404).json({ result: false, data: [], message: 'Not found', status: 404 });
            return res.status(200).json({ result: true, data: ctb, message: 'OK', status: 200 });
        } catch (err) {
            next(err);
        }
    }

    async getContribById(req, res, next) {
        try {
            const contribId = req.body.id;
            const ctb = await Contribuable.findOne({ where: { id: contribId, active: true, }, include: Activites });
            if (!ctb) {
                return res.status(404).json({ result: false, data: [], message: 'Active Contribuable not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: ctb, message: 'OK', status: 200 });
            }
        } catch (err) {
            next(err);
        }
    }
    //  
    async updateContrib(req, res, next) {
        try {
            const contribId = req.body.id;
            const updatedContrib = await Contribuable.update(req.body, {
                where: { id: contribId },
                returning: true,
            });

            if (!updatedContrib[0]) {
                return res.status(404).json({ result: false, data: [], message: 'Contribuable not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: updatedContrib[1][0], message: 'Updated successfully', status: 200 });
            }
        } catch (err) {
            next(err);
        }
    }
    // Soft delete by updating the 'active' field to false 
    async deleteContrib(req, res, next) {
        try {
            const contribId = req.body.id;

            const deletedContrib = await Contribuable.update(
                { active: false },
                {
                    where: { id: contribId },
                    returning: true,
                }
            );

            if (!deletedContrib[0]) {
                return res.status(404).json({ result: false, data: [], message: 'Contribuable not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: deletedContrib[1][0], message: 'Deleted successfully', status: 200 });
            }
        } catch (err) { next(err); }
    }
    // Physically delete the record 
    async destroyContrib(req, res, next) {
        try {
            const contribId = req.body.id;

            const destroyedContrib = await Contribuable.destroy({
                where: { id: contribId },
            });

            if (!destroyedContrib) {
                return res.status(404).json({ result: false, data: [], message: 'Contribuable not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: [], message: 'Physically deleted successfully', status: 200 });
            }
        } catch (err) {
            next(err);
        }
    }


}

module.exports = ContribCntrller;
