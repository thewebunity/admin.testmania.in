const mongoose = require("mongoose");
const { Schema } = mongoose;


const LogoSchema = new Schema(
    {
        _id: { type: String, required: true },
    src: { type: String },

    }
  );
  
  const Logo = mongoose.model("Logo", LogoSchema);
  
  module.exports = Logo;