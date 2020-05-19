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


audioRouter.post('/',upload.single('audioFile'),(req,res,next)=>{
    ffmpeg(req.file.path)
    .on('error',(error)=>{
        console.log(error);
    })
    .on('end',()=>{
        console.log('finished');
        var song = fs.readFileSync(req.file.path);
        var encoded_song = song.toString('base64');
        var data = new Buffer.from(encoded_song,'base64');
        mm.parseBuffer(data)
        .then( metadata => {
            // console.log(util.inspect(metadata, {showHidden: false, depth: null}));
            audio.create({
                title : metadata.common.title.split('.')[0],
                duration : metadata.format.duration,
                song_path : path.join(__dirname+'/converts',req.file.filename.split('.')[0]+'.mp3')
            })
            .then((song)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(song);
            })   
        })
        .catch((err) => {
            console.error(err.message);
        })
    })
    .save(path.join(__dirname+'/converts',req.file.filename.split('.')[0]+'.mp3'));
})

module.exports = audioRouter;
