import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'

import { allProjectAPI } from '../components/services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [allProject,setAllProject]=useState([])
  const [searchKey,setSearchKey]= useState("")
  const [isToken,setIsToken] = useState(false)

  const getAllProject = async()=>{
    if(sessionStorage.getItem("token"))
    {
      const token = sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`

      }
      const result = await allProjectAPI( searchKey,reqHeader)
      console.log(result);
      if(result.status === 200)
      {
        setAllProject(result.data)

      }
      else
      {
        console.log(result.response.data);
      }
    }
  }
  console.log(allProject);
  console.log(searchKey);
  useEffect(()=>{
    getAllProject()

  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    setIsToken(true)

  },[])
  
  
  return (
    <>
   
      <Header/>
      <div className='container-fluid text-center' style={{marginTop:'100px'}}>
        <h1>All Project</h1>
        <div className='d-flex justify-content-center align-items-center '>
          <div className='d-flex mt-3 w-50 mb-5'>
          <input type="text" value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} className='form-control me-1' placeholder='search project'  />
          <i className='search' class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:'-40px'}}></i>

          </div>

        </div>
       
        


      </div>
      <Row className=' container-fluid mb-5'>
       {allProject?.length>0?
       allProject.map((item)=>(
        <Col sm={12} md={6} lg={4}  >
          <ProjectCard project={item}/>
        </Col>

       ))
        :<div>
        { isToken? <p className='fs-4 text-danger text-center'>sorry no such projects currently available</p>: <div className='d-flex justify-content-center align-items-center flex-column'>
          <img src="https://www.bing.com/th/id/OGC.c4d84c7b1b6902974c58a25f06a2557b?pid=1.7&rurl=https%3a%2f%2fpro2-bar-s3-cdn-cf.myportfolio.com%2f9bdefa6fb51a3e100907c6ce7b8d8b05%2f12f90cf5-d59b-4fa0-986e-8270e95c6a6a_rw_600.gif%3fh%3d4480998c4d68c54ee0ed10b802ae096a&ehk=O4Tihtc8%2fBxok9dOgLDf9ujKYR%2b1tP%2fE3njg1AH2VrU%3d" alt="no image" width={'200px'} height={'200px'}/>
          <p className='fs-3 mt-3 text-danger'>please <Link style={{textDecoration:'none', color:'green'}} to={'/login'}>login</Link> to see more project</p>
          </div>}
        :</div>}
      </Row>
      
    </>
  )
}

export default Project