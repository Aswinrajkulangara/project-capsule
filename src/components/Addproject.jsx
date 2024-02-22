import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from './services/allAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddProjectResponseContext, EditProjectResponseContext } from '../context/ContextShare';

function Addproject() {
  // use context hook is used to access the content
  const {addProjectResponse,setAddProjectResponse} = useContext(AddProjectResponseContext)

   // state to store value from inputbox
   const [projectDetails,setProjectDetails]= useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectimage:""
  })

  console.log(projectDetails);
  // state to store url of file

  const[preview,setPreview]=useState("")

  const [token,setToken]= useState("")
  // state to store token

  useEffect(()=>{
    sessionStorage.getItem("token") && setToken(sessionStorage.getItem("token"))

  },[])


  useEffect(()=>{
    projectDetails.projectimage &&
    setPreview(URL.createObjectURL(projectDetails.projectimage)) //url is a predefined method in javascript which has createObjectURL method which can convert file into url


  },[projectDetails.projectimage])

  console.log(preview);

  
    


    const [show, setShow] = useState(false);

    const handleClose = () => {
     setShow(false)
    handleClose1()
      
    };
    const handleClose1= ()=>{
      setProjectDetails({
        title:"",
        language:"",
        github:"",
        website:"",
        overview:"",
        projectimage:""

      })
      setPreview("")
    }
    const handleShow = () => setShow(true);

    // function to add 
    const handleProject = async(e)=>{
      e.preventDefault()
      const {title,language,github,website,overview,projectimage} = projectDetails

      if(!title || !language || !github || !website || !overview || !projectimage)
      {
        alert('please fill all the details ')
      }
      else
      {
        // reqbody
        // 1) create an object of formdata class- since we have uploaded content
        const reqBody= new FormData()
        // 2) add data - append() - append method can only add single item
        reqBody.append("title",title)    
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        reqBody.append("projectimage",projectimage)

        // reqHeader

       if(token) {const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`  // tokens can be stored only in the Authorization key along with bearer which seperates token by only one space bar no more or no less 
        }

        const result = await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status===200)
        {
          console.log(result.data);
          toast.success('project added successfully')
          
          setAddProjectResponse(result.data)
          handleClose()
        }
        else
        {
          toast.error(result.response.data);
          handleClose1()
        }

       
      }
      }

    } 

   


  return (
  
   <>
        <div>
            <button onClick={handleShow} className='btn btn-outline-success'>Add project</button>
        </div>

        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-primary'>Add Project Detail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="row">
                <div className="col-lg-6">
                    <label htmlFor="upload">
                        <input id='upload' type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectimage:e.target.files[0]})}  />
                        <img  style={{width:'100%', height:'100%'}}  src={preview?preview:"https://th.bing.com/th/id/OIP.OZKMsOaxYf--M9pawDmPQwHaFu?w=274&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="" />
                    </label>
                </div>
                <div className="col-lg-6">
                    <div className='mb-3 w-100'>

                        <input type="text" className='form-control m-2' placeholder='project Title' onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} value={projectDetails.title} />
                        <input type="text" className='form-control m-2' placeholder='language' onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} value={projectDetails.language} />
                        <input type="text" className='form-control m-2' placeholder='GitHub Link' onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} value={projectDetails.github} />
                        <input type="text" className='form-control m-2' placeholder='website Link' onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} value={projectDetails.website} />

                        <textarea className='form-control m-2' name="" id="" cols="30" rows="5" placeholder='project overview' onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} value={projectDetails.overview}></textarea>

                    </div>
                   
                </div>
            </div>
        
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme='colored' autoClose={2000} position='top-center'  />

   </>
  )
}

export default Addproject