require("dotenv").config();

const express = require("express");
const mongoose = require("./middleware/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const studentsRoutes = require("./routes/student.routes");
const subjectsRoutes = require("./routes/subject.routes");
const examsRoutes = require("./routes/exam.routes");
const usersRoutes = require("./routes/user.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const pagesRoutes = require("./routes/page.routes");
const footerRoutes=require("./routes/footer.routes");
const Page=require('./models/page');
const Logo=require('./models/logo');
const Footer =require('./models/footer');

const app = express();

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/students", studentsRoutes);
app.use("/api/v1/subjects", subjectsRoutes);
app.use("/api/v1/exams", examsRoutes);
app.use("/api/v1/pages", pagesRoutes);
app.use("/api/v1/footer", footerRoutes);
app.use("/public", express.static(path.join(__dirname, 'public')));


pagesTab=[{name: "About-Us",html: "",css:""  },{name: "How It Works",html: "",css:""},{name: "Privacy Policy",html: "",css:""},{name: "Terms & Conditions - Refund Policy",html: "",css:""},
{name: "Instructions",html: "",css:""},{name: "FAQs",html: "",css:""},{name: "Affiliates",html: "",css:""},{name: "Disclaimer",html: "",css:""},{name: "Test Calendar",html: "",css:""},
{name: "Awards",html: "",css:""},
{name: "Annoucement",html: "",css:""}
]
for (let i=0;i<pagesTab.length;i++){
  var pPage =  Page.findOne({
    name: pagesTab[i].name,
    }).then(res => {
    
    if(res==null){
      Page.create(pagesTab[i], function(e) {
    
        if (e) {
            throw e;
        }
    });
    }
    
    });
}
const f={_id:"footer",address:"",phone:"",email:"",fb:"",inst:"",twiter:"",google:"",linkedin:"",youtube:""};

var foo =  Footer.findOne({
  _id: f._id,
  }).then(res => {
  
  if(res==null){
    Footer.create(f, function(e) {
  
      if (e) {
          throw e;
      }
  });
  }
  
  });

const l={_id :'logo',src:" "}
  var log =  Logo.findOne({
    _id: l._id,
    }).then(res => {
    
    if(res==null){
      Logo.create(l, function(e) {
    
        if (e) {
            throw e;
        }
    });
    }
    
    });

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() +'-' + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

app.post('/api/upload' , upload.single('photo'), (req, res) => {


  try {
    const p=  Logo.updateOne(
       { _id: 'logo' },
       {
        src: req.file.filename
       },(e,res)=>{
        console.log(res);
       }

     );
 

   } catch (err) {
     console.log(`Error while updating page:============> ${err}`);

   }




  } );



app.listen(process.env.PORT || 8020, () => {
  console.log("Server up!");
});
