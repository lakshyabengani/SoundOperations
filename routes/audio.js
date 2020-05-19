var express= require('express');
var audioRouter = express.Router();
var audio = require('../models/audios');
var bodyParser = require('body-parser');

audioRouter.use(bodyParser.json());

audioRouter.get('/',(req,res,next)=>{
    audio.find({})
    .then((songs)=>{
        res.statusCode = 200;
        res.contentType('application/json');
        res.json(songs);
    },((err)=>next(err)))
    .catch(err => next(err));
})

module.exports = audioRouter;