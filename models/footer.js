const mongoose = require("mongoose");
const { Schema } = mongoose;


const FooterSchema = new Schema(
    {
    _id: { type: String, required: true },
    address: { type: String },
    phone:{type:String},
    email:{type:String},
    fb:{type:String},
    inst:{type:String},
    twiter:{type:String},
    google:{type:String},
    linkedin:{type:String},
    youtube:{type:String},
    }
  );
  
  const Footer = mongoose.model("Footer", FooterSchema);
  
  module.exports = Footer;