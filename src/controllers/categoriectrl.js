const Categorie = require('../models/categorie');
const TypeActivite = require('../models/ktype');
class CategorieCtrl extends Categorie {
    constructor() {
        super();
    }

    // Create a new Category
    async createCategory(req, res, next) {
        await Categorie.create(req.body).then((cat) => {
            if (!cat) {
                return res.status(503).json({ result: false, data: [], message: 'Service Unavailable', status: 503 });
            }
            return res.status(201).json({ result: true, data: cat, message: 'Created successfully', status: 201 });

        }).catch((err) => {
            return next(err);
        });
    }
    // Create multiple Categories
    async createMultipleCategories(req, res, next) {
        try {
            const categories = req.body;

            if (!categories || categories.length === 0) {
                return res.status(400).json({ result: false, message: 'No categories provided', status: 400 });
            }
            const listeCategories = [];

            for await (const categ of categories) {
                await Categorie.create(categ).then((cat) => {
                    if (!cat) {
                        console.log(`Error creating categorie index of: ${categ}`);
                    }
                    listeCategories.push(cat);
                }).catch((err) => { console.error(`Error creating categorie: ${err.message}`); });
            }

            if (!listeCategories || listeCategories.length === 0) {
                return res.status(500).json({ result: false, data: [], message: 'Service Unavailable', status: 500 });
            }
            return res.status(201).json({ result: true, data: listeCategories, message: 'Multiple categories created successfully', status: 201 });
        } catch (err) {
            return next(err);
        }
    }

    // Get all Categories
    async getAllCategories(req, res, next) {
        await Categorie.findAll({ where: { active: true }, include: TypeActivite }).then((cat) => {
            if (!cat) {
                return res.status(404).json({ result: false, data: [], message: 'Not found', status: 404 });
            }
            return res.status(200).json({ result: true, data: cat, message: 'OK', status: 200 });
        }).catch((err) => {
            return next(err);
        });
    }

    // Get a specific Category by ID
    async getCategoryById(req, res, next) {
        await Categorie.findOne({ where: { id: req.body.id, active: true } }).then((cat) => {
            if (!cat) {
                return res.status(404).json({ result: false, data: [], message: 'Category not found', status: 404 });
            }
            return res.status(200).json({ result: true, data: cat, message: 'OK', status: 200 });
        }).catch((err) => {
            return next(err);
        });
    }

    // Update a Category by ID
    async updateCategory(req, res, next) {
        try {
            await Categorie.update(req.body, { where: { id: req.body.id, active: true }, returning: true, }).then((cat) => {
                if (!cat[0]) {
                    return res.status(404).json({ result: false, data: [], message: 'Category not found', status: 404 });
                }
                return res.status(200).json({ result: true, data: cat[1][0], message: 'Updated successfully', status: 200 });
            }).catch((err) => {
                return next(err);
            });
        } catch (err) {
            return next(err);
        }
    }

    // Soft delete a Category by ID
    async deleteCategory(req, res, next) {
        try {
            const categoryId = req.params.id;
            const deletedCategory = await Categorie.update(
                { active: false },
                {
                    where: { id: categoryId, active: true },
                    returning: true,
                }
            );

            if (!deletedCategory[0]) {
                return res.status(404).json({ result: false, data: [], message: 'Category not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: deletedCategory[1][0], message: 'Deleted successfully', status: 200 });
            }
        } catch (err) {
            next(err);
        }
    }

    // Physically delete a Category by ID
    async destroyCategory(req, res, next) {
        try {
            const categoryId = req.params.id;

            const destroyedCategory = await Categorie.destroy({
                where: { id: categoryId },
            });

            if (!destroyedCategory) {
                return res.status(404).json({ result: false, data: [], message: 'Category not found', status: 404 });
            } else {
                return res.status(200).json({ result: true, data: [], message: 'Physically deleted successfully', status: 200 });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategorieCtrl;
