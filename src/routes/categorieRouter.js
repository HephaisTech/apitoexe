

const CategorieCtrl = require('../controllers/categoriectrl');
const router = require('express').Router();
const categorie = new CategorieCtrl();


router.get('/all', categorie.getAllCategories);
router.get('/id', categorie.getCategoryById);
router.post('/create', categorie.createCategory);
router.post('/multi', categorie.createMultipleCategories);
router.delete('/id', categorie.deleteCategory);
router.delete('/destroy', categorie.destroyCategory);

module.exports = router;