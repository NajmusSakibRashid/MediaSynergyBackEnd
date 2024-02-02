const express=require('express');
const multer = require('multer');
const router=express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  // Access the uploaded file using req.file
  console.log(req.file);

  // Handle the file as needed
  // ...

  res.send('<img src="/' + req.file.filename + '">');
});

module.exports=router;