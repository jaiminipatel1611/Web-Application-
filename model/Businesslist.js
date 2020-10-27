  
const mongoose = require("mongoose");

const BusinessSchema =new mongoose.Schema({
  contact_name: {
    type: String
  },
  contact_number: {
    type: String
  },
  email_address: {
    type: String
  }
});


module.exports = mongoose.model("Businesslist", BusinessSchema);