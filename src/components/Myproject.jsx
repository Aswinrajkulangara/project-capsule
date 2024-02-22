import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteUserProjectAPI, userProjectAPI } from './services/allAPI'
import { AddProjectResponseContext, EditProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'

function Myproject() {
  const {addProjectResponse,setAddProjectResponse} = useContext(AddProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(EditProjectResponseContext)
  

  const [userProject,setUserProject]= useState([])

  const getUserProject = async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`

    }

    const result = await userProjectAPI(reqHeader)
    console.log(result.data);
    setUserProject(result.data)

    }
  useEffect(()=>{
    getUserProject()

  },[addProjectResponse,editProjectResponse])

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await deleteUserProjectAPI(id,reqHeader)
    console.log(result);
    if(result.status === 200)
    {
      getUserProject()
    }
    else{
      console.log(result.response.data);
      
    }
  }

  
  return (
    <div>
      <div className=' border shadow p-3 rounded'>
       <div className='d-flex justify-content-between' >
          <h3 className='text-primary'>My project</h3>
          <div ><Addproject/></div>
  
       </div>
       {userProject?.length>0?
       userProject.map((item)=>(
        <div className='d-flex justify-content-between rounded border mt-5 p-2  bg-dark'  >
        <h5 className='p-1 text-light'>{item.title}</h5>
        <div className='icon ms-auto d-flex '>
       
       
         <EditProject project={item} />

        <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github m-1 text-success"></i></a>
        
        <button onClick={(e)=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash m-1 text-danger"></i></button>
       
        </div>

       </div>

       ))
       :
       <h3 style={{color:'red'}} className='mt-5'>
        no project yet
      </h3>}

      

      </div>
      
      
    </div>
  )
}

export default Myproject  


