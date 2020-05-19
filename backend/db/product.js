let mongoose = require('mongoose');
// Create product schema
let productSchema = new mongoose.Schema({
   cname: {
      type: String,
      required: true
   },
   pname: {
      type: String,
      unique: true
   },
   price: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   features: {
      type: String,
      required: true
   },
   created_at: {
      type: Date,
      default: Date.now()
   }
});


//model
module.exports = mongoose.model('product', productSchema);