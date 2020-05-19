var express= require('express');
var audioRouter = express.Router();
var mm = require('music-metadata');
var util = require('util');
var audio = require('../models/audios');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var upload = require('../multerconfig');
var path = require('path');
var ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe')


audioRouter.use(bodyParser.json());

audioRouter.post('/',upload.array('audioFile'),(req,res,next)=>{
    console.log(req.files);
    var arr = req.files;
    ffmpeg()
    .input(req.files[0].path)
    .input(req.files[1].path)
    .complexFilter([
        {
            filter:'amix',
            duration:'longest',
            dropout_transition:'1',
            outputs:'output'
        }
    ],'output')
    .format('mp4')
    .on('error',error=>{
        console.log(error);
    })
    .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
      })
    .on('end',()=>{
        console.log('processing finished');
        res.statusCode=200;
        res.contentType('audio/mp4');
        fs.createReadStream(path.join(__dirname+'/mixed','new_output.mp4')).pipe(res);
    })
    .save(path.join(__dirname+'/mixed','new_output.mp4'))
})

module.exports = audioRouter;