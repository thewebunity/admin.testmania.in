
const Page = require("../models/page");
const { ObjectId } = require("mongodb");
const Logo = require('../models/logo');




exports.getPage = async (req, res) => {
    try {
      let page = await Page.findOne({
        _id: req.params.id
      })
  

  
      return res.status(200).json({
        success:true,
        page,
      });
    } catch (err) {
      console.log(`Error finding student :=======> ${err.message}`);
      res
        .status(500)
        .json({ message: `Error finding student :=======> ${err.message} ` });
    }
  };

  exports.getPages = async (req, res) => {
    console.log(`---------------- Getting pages ------------------`);
    try {
      let pages;
  
      pages = await Page.find()

  
      
      return res.status(200).json({
        pages,
      });
    } catch (err) {
      console.log(`Error while getting exams :========> ${err.message}`);
      return res.status(500).json({ message: `Error while getting exams ` });
    }
  };

  exports.editPage = async (req, res) => {

    try {
     const p= await Page.updateOne(
        { _id: req.body.id },
        {
        html:req.body.html,
        css:req.body.css
        }
      );
  

      return res.status(200).json({ success: true , p });
    } catch (err) {
      console.log(`Error while updating page:============> ${err}`);
      res
        .status(500)
        .json({ message: `Error while updating page :============> ${err}` });
    }
  };


  exports.getLogo = async (req, res) => {
    try {
      let logo = await Logo.findOne({
        _id: 'logo'
      })
  

  
      return res.status(200).json({
        success:true,
        logo,
      });
    } catch (err) {
      console.log(`Error ${err.message}`);
      res
        .status(500)
        .json({ message: `Error  ${err.message} ` });
    }
  };