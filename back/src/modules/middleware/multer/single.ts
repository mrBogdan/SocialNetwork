const multer = require('@koa/multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, './uploads');
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage
});

export default upload.single('package');
