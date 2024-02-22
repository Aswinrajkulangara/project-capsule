import React, { useEffect } from 'react'
import { useState } from 'react';

import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from './services/baseurl';
import { editProfileAPI } from './services/allAPI';
import Swal from 'sweetalert2';
function Profile() {
    const [open, setOpen] = useState(false);

    const [userProfile,setUserProfile]=useState({
        username:"",
        email:"",
        password:"",
        github:"",
        linkedin:"",
        profile:""
    })
    const [isUpdate,setIsUpdate]= useState(false)
    // once an image is uploaded then that image is stored in that existing image 
    const [existingImage,setExistingImage]=useState("")
    // to hold the url of the new image
    const [preview,setPreview]=useState("")

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""})
        setExistingImage(user.profile)


    },[isUpdate])
    useEffect(()=>{
       if(userProfile.profile)
       {
        setPreview(URL.createObjectURL(userProfile.profile))
       }
       else
       {
        setPreview("")
       }

    },[userProfile.profile])

    const handleProfileUpdate = async()=>{
        const{username,email,password,github,linkedin,profile} = userProfile

        if(!github|| !linkedin)
        {
            Swal.fire({
                title: "Ooops..",
                text: "please fill the form completly",
                icon: "info"
              });
        }
        else
        {
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
        
        const token = sessionStorage.getItem("token")
        

        if(preview)
        {
            const reqHeader ={
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${token}`

            }
            const result = await editProfileAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status ===200)
            {
                Swal.fire({
                    title: "your update has been saved",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  
                 
                sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                setIsUpdate(true)
                
            }
            else
            {
                console.log(result.response.data);
            }
        }
        else
        {
            const reqHeader ={
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`

            }
            const result = await editProfileAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status ===200)
            {
                Swal.fire({
                    title: "your update has been saved",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
                  sessionStorage.setItem("existngUser",JSON.stringify(result.data))
                setIsUpdate(true)
            }
            else
            {
                console.log(result.response.data);
            }

        }
    }
    }
  return (
    <>
        <div className='border shadow rounded'>
            <div className='p-4  boarder d-flex justify-content-between '>
                <h4>Profile</h4>
                <button onClick={()=> setOpen(!open)} className='btn btn-outline-success'><i class="fa-solid fa-upload fa-rotate-180"></i></button>
    
    
            </div>
            <Collapse in={open}>
                <div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <label htmlFor="profile">
                            <input id='profile' type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} />
                           {existingImage==""? <img width={'200px'} height={'200px'} src={preview?preview:"https://th.bing.com/th/id/OIP.782pgkykrZ_q6GXCsO7wlgHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="no image" className='rounded-circle' />:
                           <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle' />
                           }
                            <div className='mb-3 mt-3 w-100'>
                                <input type="text" placeholder='Github' className='form-control' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} />
        
                            </div>
                            <div className='mb-3  w-100'>
                                <input type="text" placeholder='linkedin' className='form-control' value={userProfile.linkedin}onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} />
        
                            </div>
                            <div className='mb-3 mt-3 w-100  '>
                                <div><button onClick={handleProfileUpdate} className='btn btn-success'>Update</button></div>
        
                            </div>
        
                        </label>
        
                    </div>
                </div>
            </Collapse>
        </div>

    </>
  )
}

export default Profile