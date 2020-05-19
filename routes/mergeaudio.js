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
    var fm = ffmpeg();
    for(i=0;i<arr.length;++i){
        console.log(arr[i].path);
        fm.input(arr[i].path);
    }
    fm.format('mp4')
    .on('error',(error)=>{
        console.log(error);
    })
    .on('end',()=>{
        console.log('processing finished');
        res.statusCode=200;
        res.contentType('audio/mp4');
        res.attachment('output.mp4');
        fs.createReadStream(path.join(__dirname+'/combined','new_output1.mp4')).pipe(res);
    })
    .mergeToFile(path.join(__dirname+'/combined','new_output1.mp4'),path.join(__dirname+'/temp'));
    console.log(arr.length);
})

module.exports = audioRouter;