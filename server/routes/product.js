const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');


//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res)  => {
    // save the image which was sent
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        } 
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/', (req, res)  => {
  // send data to DB
  const product = new Product(req.body);
  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  });
  
})

router.post('/products', (req, res)  => {
  // bring all products list
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;
  let findArgs = {};

  for(let key in req.body.filters) {
     if(req.body.filters[key].length > 0) {
        if(key === "price") {
          findArgs[key] = {
            // gte(greater than or equal) lte(less than or equal) = mongoDB function
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          }
        } else {
          findArgs[key] = req.body.filters[key];
        }
        
     }
  }
  // console.log("findArgs", findArgs)
  
  if (term) {
      Product.find(findArgs)
      .find({ $text: { $search: term }})
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      })
  } else {
      Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      })
  }

  
})

router.get('/products_by_id', (req, res)  => {
  let type = req.query.type;
  let productIds = req.query.id;

  if(type === "array") {
    let ids = req.query.id.split(',')
    productIds = ids.map(item => {
      return item;
    })
  }

  Product.find({ _id: { $in: productIds } })
      .populate('writer')
      .exec((err, product) => {
          if(err) return res.status(400).send(err)
          return res.status(200).json({ success: true, product})
      })
  
})



module.exports = router;
