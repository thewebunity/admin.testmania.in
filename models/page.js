const mongoose = require("mongoose");
const { Schema } = mongoose;


const PageSchema = new Schema(
    {
    name: { type: String },
    html:{type:String},
    css:{type:String},
    }
  );
  
  const Page = mongoose.model("Page", PageSchema);
  
  module.exports = Page;