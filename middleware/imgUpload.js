const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'E:/Bajaj/server_backup/faceImages');
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
/*     if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      console.log('Upload only PNG, JPG or PDF files');
      cb(null, false);
    } */
    cb(null,true);
  },
  limits: {
    fileSize: 1024 * 1024 * 100 // 20 MB
  }
});

module.exports = upload;