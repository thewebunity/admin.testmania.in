import React,{useState} from'react';
import axios from'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ImageUpload=()=>{
    
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);

const navigate = useNavigate();
const [url, seturl] = useState(
    {

        url: '',
    }
);
    const [newUser, setNewAuthor] = useState(
        {

            link: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);


        axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload`, formData)
             .then(res => {
               
             })
             .catch(err => {
                console.log(err);
             });
             navigate("/")
    }




  

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/pages/logo`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setNewAuthor({...newUser, photo: result.logo.src});
              seturl({...url, link: `${process.env.REACT_APP_BASE_URL}/public/uploads/${result.logo.src}`});
              console.log("okey ",result.logo.src)
            
            },
         
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])



    const handlePhoto = (e) => {
        setNewAuthor({...newUser, photo: e.target.files[0]});
       
    }
    console.log('hhhhh',newUser.photo)
    return(

        <DashboardLayout>
        <>
      
        </>
  
        <DashboardNavbar />
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input
                type="file"
                accept=".png,.jpg,.jpeg"
                name="photo"
                onChange={handlePhoto}
                />
                <input type="submit" />
                </form>
                <div>
                
                
                {url.link ? <img src={url.link} alt="" />  : "we don't have a logo please upload"}
    </div>
                </DashboardLayout>
    );
}

export default ImageUpload;

