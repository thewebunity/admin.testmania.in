

const Footer = require("../models/footer");
const { ObjectId } = require("mongodb");




 exports.editFooter = async (req, res) => {

    try {
      await Footer.updateOne(
        { _id: "footer" },
        {
            address: req.body.address,
            phone:req.body.phone,
            email:req.body.email,
            fb:req.body.fb,
            inst:req.body.inst,
            twiter:req.body.twiter,
            google:req.body.google,
            linkedin:req.body.linkedin,
            youtube:req.body.youtube
            }
        
      );
  
      
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(`Error while updating footer:============> ${err}`);
      res
        .status(500)
        .json({ message: `Error while updating footer :============> ${err}` });
    }
  };

  exports.getFooter = async (req, res) => {
    try {
      let footer = await Footer.findOne({
        _id: "footer"
      })
  

  
      return res.status(200).json({
        success:true,
        footer,
      });
    } catch (err) {
      console.log(`Error :=======> ${err.message}`);
      res
        .status(500)
        .json({ message: `Error  :=======> ${err.message} ` });
    }
  };