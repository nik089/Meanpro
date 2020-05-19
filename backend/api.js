const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const fs = require('fs');
const app = express();

// for image uplaoding
const multer = require('multer');
let DIR = './attach';
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
      '-' +
      Date.now() +
      '.' +
      file.originalname.split('.')[file.originalname.split('.').length - 1]
    );
  }
});
let upload = multer({
  storage: storage
}).single('attach');
// end uploading

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('attach'));

//connection with mongodb
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost/MeanPro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('Connect to Mongodb');
  }
);

//admin  model call
let adminModel = require('./db/adminlogin');
//Cat Model call
let catModel = require('./db/category');
// product model call
let productModel = require('./db/product');
//register Model call
let regModel = require('./db/register');
let signinModel = require('./db/register');

// contact  model call
let conModel = require('./db/contact');

//api admin login and changepass
app.post('/api/adminlogin', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log("hello");
  //insert data
  //   let ins = new adminModel({ email: email, password: password });
  //   ins.save(err => {
  //     if (err) {
  //     } else {
  //       res.json({ msg: 'Data Stored' });
  //     }
  //   });

  adminModel.findOne({
      email: email,
      password: password
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else if (data == null) {
        res.json({
          err: 1,
          msg: 'Email or Password is not Correct'
        });
      } else {
        res.json({
          err: 0,
          msg: 'Login Successfully',
          uid: email
        });
      }
    }
  );
});
app.post('/api/changepass', (req, res) => {
  let op = req.body.op;
  let np = req.body.np;
  let uid = req.body.uid;
  adminModel.findOne({
      email: uid
    },
    (err, data) => {
      if (err) {} else {
        if (op == data.password) {
          if (op == np) {
            res.json({
              err: 1,
              msg: 'Old Password and New Password is not same'
            });
          } else {
            adminModel.updateOne({
                email: uid
              }, {
                $set: {
                  password: np
                }
              },
              err => {
                if (err) {} else {
                  res.json({
                    err: 0,
                    msg: 'Password Change successfully'
                  });
                }
              }
            );
          }
        } else {
          res.json({
            err: 1,
            msg: 'Old password is not correct'
          });
        }
      }
    }
  );
});
// api add category
app.post('/api/addcategory', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({
        err: 1,
        msg: 'Uploading Error'
      });
    } else {
      let cname = req.body.cname;
      let fname = req.file.filename;
      let ins = new catModel({
        cname: cname,
        image: fname
      });
      ins.save(err => {
        if (err) {
          console.log(`./attach/${fname}`);
          fs.unlink(`./attach/${fname}`, err => {
            if (err) {
              res.json({
                err: 1,
                msg: 'Went Wrong'
              });
            } else {
              res.json({
                err: 1,
                msg: 'Already Exists'
              });
            }
          });
        } else {
          res.json({
            err: 0,
            msg: 'Category saved'
          });
        }
      });
    }
  });
});
// api fetch or get category
app.get('/api/getcategory/:cid?', (req, res) => {
  let cid = req.params.cid;
  if (cid) {
    catModel.findOne({
      _id: cid
    }, (err, data) => {
      if (err) {} else {
        res.json({
          err: 0,
          cdata: data
        });
      }
    });
  } else {
    catModel.find({}, (err, data) => {
      if (err) {} else {
        res.json({
          err: 0,
          cdata: data
        });
      }
    });
  }
});
//api delete cat
app.post('/api/delcategory', (req, res) => {
  let cid = req.body.cid;
  console.log(cid);
  catModel.deleteOne({
      _id: cid
    },
    err => {
      if (err) {} else {
        res.json({
          err: 0,
          msg: 'Category Daleted'
        });
      }
    }
  );
});
// api edit category
app.post("/api/editcategory", (req, res) => {
  let cname = req.body.cname;
  let cid = req.body.cid;
  catModel.updateOne({
    _id: cid
  }, {
    $set: {
      cname: cname
    }
  }, (err) => {
    if (err) {} else {
      res.json({
        'err': 0,
        'msg': 'Category updated'
      });
    }
  });
});
// api edit categorybyimage
app.post("/api/editcategorybyimage", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({
        'err': 1,
        'msg': 'Uploading Error'
      })
    } else {
      let cname = req.body.cname;
      let fname = req.file.filename;
      let cid = req.body.cid;
      catModel.updateOne({
        _id: cid
      }, {
        $set: {
          cname: cname,
          image: fname
        }
      }, (err) => {
        if (err) {
          console.log(`./attach/${fname}`)
          fs.unlink(`./attach/${fname}`, (err) => {
            if (err) {
              res.json({
                'err': 1,
                'msg': 'Went wrong'
              })
            } else {
              res.json({
                'err': 1,
                'msg': 'Already exists'
              })
            }
          })

        } else {
          res.json({
            'err': 0,
            'msg': 'Category Saved'
          })
        }
      })
    }
  })
});
// //api add product
app.post('/api/addproduct', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({
        err: 1,
        msg: 'Uploading Error'
      });
    } else {
      let cname = req.body.cname;
      let fname = req.file.filename;
      let pname = req.body.pname;
      let price = req.body.price;
      let features = req.body.features;
      // console.log(cname + fname + pname + price + features);

      let ins = new productModel({
        cname: cname,
        image: fname,
        pname: pname,
        price: price,
        features: features
      });
      ins.save(err => {
        if (err) {
          console.log(`./attach/${fname}`);
          fs.unlink(`./attach/${fname}`, err => {
            if (err) {
              res.json({
                err: 1,
                msg: 'Went Wrong'
              });
            } else {
              res.json({
                err: 1,
                msg: 'Already Exists'
              });
            }
          });
        } else {
          res.json({
            err: 0,
            msg: 'Product saved'
          });
        }
      });
    }
  });
});
// api get product(addproduct to product page)
app.get('/api/fetchproduct/:cname?', (req, res) => {

  let cname = req.params.cname;
  // console.log(cname);
  if (cname) {
    productModel.find({
      cname: cname
    }, (err, data) => {
      if (err) {} else {
        // console.log(data)
        res.json({
          'err': 0,
          'pdata': data
        })
      }
    })
  } else {
    productModel.find({}, (err, data) => {
      if (err) {} else {
        //console.log(data);
        res.json({
          'err': 0,
          'pdata': data
        });
      }
    })
  }
})
// api product delete
app.post('/api/delproduct', (req, res) => {
  let cid = req.body.cid;
  productModel.deleteOne({
      _id: cid
    },
    err => {
      if (err) {} else {
        res.json({
          err: 0,
          msg: 'Product Deleted'
        });
      }
    }
  );
});
// api registration insert data
app.post('/api/registration', (req, res) => {
  let fn = req.body.fn;
  let ln = req.body.ln;
  let email = req.body.email;
  let pass = req.body.pass;
  let cpass = req.body.cpass
  console.log(email);
  // insert data
  let ins = new regModel({
    fn: fn,
    ln: ln,
    email: email,
    pass: pass,
    cpass: cpass
  });
  ins.save(err => {
    if (err) {} else {
      res.json({
        msg: 'Data Stored'
      });
    }
  });
})
//api sign in data
app.post('/api/getSign', (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;

  signinModel.findOne({
    'email': email,
    'pass': pass
  }, (err, data) => {
    if (err) {} else if (data == null) {
      res.json({
        'err': 1,
        'msg': 'Email Or Password Not Correct'
      })
    } else {
      res.json({
        'err': 0,
        'msg': 'Login Successfully',
        'uid': email
      })
    }
  })
})
// api contact insert data
app.post('/api/contactdata', (req, res) => {
  let yn = req.body.yn;
  let email = req.body.email;
  let cn = req.body.cn;
  let msg = req.body.msg;
  //insert data
  let ins = new conModel({
    yn: yn,
    email: email,
    cn: cn,
    msg: msg
  });
  ins.save(err => {
    if (err) {} else {
      res.json({
        msg: 'Data Stored'
      });
    }
  });
})
// data get contact to feedback
app.get('/api/feedback', (req, res) => {
  conModel.find({}, (err, data) => {
    if (err) {} else {
      res.json({
        err: 0,
        fedata: data
      });
    }
  });
})

//search api
app.get("/api/searchproduct/:ser", (req, res) => {
  let ser = req.params.ser;
  productModel.find({
    $or: [{
      pname: {
        $regex: ser,
        $options: 'i'
      }
    }, {
      cname: {
        $regex: ser,
        $options: 'i'
      }
    }, {
      features: {
        $regex: ser,
        $options: 'i'
      }
    }]
  }, (err, data) => {
    if (err) {
      res.json({
        'err': 1,
        'msg': err
      });
    } else {
      console.log(data);
      res.json({
        'err': 0,
        'sdata': data
      });
    }
  })

})

//api pro details
app.get("/api/fetchproductbyid/:pid", (req, res) => {
  let pid = req.params.pid;
  // console.log(pid)
  productModel.findOne({
    _id: pid
  }, (err, data) => {
    if (err) {} else {
      res.json({
        'err': 0,
        'pdata': data
      });
    }
  })
});

app.get('/api/getcart/:cartid', (req, res) => {
  let cartid = req.params.cartid;
  console.log(cartid)
  productModel.findOne({
    _id: cartid
  }, (err, data) => {
    if (err) {} else {
      console.log(data)
      res.json({
        'err': 0,
        'crtdata': data
      });
    }
  })
});
app.listen(8899, () => {
  console.log('Project work on 8899');
})