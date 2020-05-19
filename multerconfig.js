var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname+'/routes','uploads'));
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

var upload = multer({storage : storage});

module.exports = upload;
