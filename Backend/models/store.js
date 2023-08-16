const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({

  sno: {
    type: Number,
    
  },

  name: {
    type: String,
  },

  barcode: {
    type: String,
  }

});

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;