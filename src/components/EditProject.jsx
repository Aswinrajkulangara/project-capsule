import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from './services/baseurl';
import { editProjectAPI } from './services/allAPI';
import { EditProjectResponseContext } from '../context/ContextShare';

function EditProject({project}) {

  const {editProjectResponse,setEditProjectResponse} = useContext(EditProjectResponseContext)
  
    const [show, setShow] = useState(false);
    // state to hold values to the input box
    const [projectDetails,setProjectDetails]= useState({
        id:project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectimage:""
      })
      const [preview,setPreview] = useState("")

    const handleClose = () =>{ setShow(false)
    handleClose1()
} ;
       
       const handleShow = () => setShow(true);

       const handleClose1 = ()=>{
        setProjectDetails({
            title:project.title,
            language:project.language,
            github:project.github,
            website:project.website,
            overview:project.overview,
            projectimage:""
        })
        setPreview("")
       }

       const handleUpdate= async (e)=>{
        e.preventDefault()

        const {id,title,language,github,website,overview,projectimage}= projectDetails
        if( !title || !language || !github || !website || !overview )
        {
            alert('please fill all the field completely')
        }
        else

        {
            const reqBody= new FormData()
            reqBody.append('title',title)
            reqBody.append('language',language)
            reqBody.append('github',github)
            reqBody.append('overview',overview)
            preview? reqBody.append('projectimage',projectimage):reqBody.append('projectimage',project.projectimage)
    
        

        const token = sessionStorage.getItem("token")
        if(preview)
        {
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${token}`  // tokens can be stored only in the Authorization key along with bearer which seperates token by only one space bar no more or no less 
              }
              const result = await editProjectAPI(id,reqBody,reqHeader)
              console.log(result);
              if(result.status===200)
              {
                alert('updated successfully')
                handleClose()
                setEditProjectResponse(result.data)
              }
              else
              {
                console.log(result.response.data);
              }
        }
        else
        {
            const reqHeader={
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`  // tokens can be stored only in the Authorization key along with bearer which seperates token by only one space bar no more or no less 
              }
              const result = await editProjectAPI(id,reqBody,reqHeader)
              console.log(result);
              if(result.status===200)
              {
                alert('updated successfully')
                handleClose()
                setEditProjectResponse(result.data)
              }
              else
              {
                console.log(result.response.data);
              }
        }
       

       }
    }

       useEffect(()=>{
       if(projectDetails.projectimage)
       
        {
            setPreview(URL.createObjectURL(projectDetails.projectimage))
        }

       },[projectDetails.projectimage])

  return (
    <div> 
        <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square m-1 text-primary"></i></button>

        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-primary'>Edit Project Detail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="row">
                <div className="col-lg-6">
                    <label htmlFor="upload">
                        <input id='upload' type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectimage:e.target.files[0]})}   />
                        <img width={'100%'} height={'200px'} src={preview?preview: `${BASE_URL}/uploads/${project.projectimage}`} alt="no image"/>
                        
                    </label>
                </div>
                <div className="col-lg-6">
                    <div className='mb-3 w-100'>

                        <input type="text" className='form-control m-2' placeholder='project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
                       
                        
                        <input type="text" className='form-control m-2' placeholder='language' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
                        <input type="text" className='form-control m-2' placeholder='GitHub Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}  />
                        <input type="text" className='form-control m-2' placeholder='website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />

                        <textarea className='form-control m-2' name="" id="" cols="30" rows="5" placeholder='project overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} ></textarea>

                    </div>
                   
                </div>
            </div>
        
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

    
    </div>
  )
}

export default EditProject