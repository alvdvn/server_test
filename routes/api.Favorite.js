var express = require('express');
var router = express.Router();
const auth =require('../middleware/api.auth.middleware');
const FavoriteController =require('../controllers/api.Favorite.Controller');
router.get('/FavoriteListByUserId',auth,FavoriteController.GetListFavorite)
router.get('/FavorGetOne/:id',auth,FavoriteController.GetFavoriteOne)
router.post('/AddFavorite/:id',auth,FavoriteController.PostAddFavorite)
// router.delete('/DeleteFavorite/:itemId',auth,FavoriteController.DeleteFavorite)
router.delete('/DeleteFavorite/:ProductId',auth,FavoriteController.DeleteFavoriteByItemProduct)

module.exports = router;