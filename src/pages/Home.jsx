import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../image/design1.webp'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../components/services/allAPI'

function Home() {
    const [islogin,setIsLogin]=useState(false)
    const [hproject,setHproject]=useState([])


   useEffect(()=>{
    if(sessionStorage.getItem("token"))
    {
        setIsLogin(true)
    }

   },[])

   const getHomeProject = async ()=>{
     const result = await homeProjectAPI()
     console.log(result.data);
     setHproject(result.data)
   }

   useEffect(()=>{
    getHomeProject()

   },[])

   
   
    


    
  return (
    <>
    <div style={{width:'100%', height:'100vh', backgroundColor:'#de32fb'}}>
        <div className='container-fluid rounded'>
            <Row className='align-items-center p-5'>
                <Col sm={12} md={6}>
                    <h2 style={{fontSize:'80px',color:'white'}}>Project<span  style={{color:'#000080', fontFamily:''}}> Capsule</span></h2>
                    <p style={{color:'black'}}>one stop destination for all software projects</p>

                    {islogin ?
                    <Link to={'/dashboard'}><button style={{width:'300px'}} 
                    className='btn btn-success'>manage projecct <i class="fa-solid fa-arrow-right ms-2"></i></button></Link>


                    :<Link to={'/login'}><button style={{width:'300px'}} 
                    className='btn btn-success'>Get started <i class="fa-solid fa-arrow-right ms-2"></i></button></Link>}

                    


                </Col >

                <Col sm={12} md={6} >
                    <img  src={titleimage} alt="no image" className='w-75 rounded' style={{marginTop:'100px'}} />

                </Col>
            </Row>

        </div>

    </div>

    <div style={{width:'100%', height:'100vh', backgroundColor:'#4b0158'}}>
        <h1 style={{color:'white',marginTop:'30px'}} className='text-center mt-3 '>Explore Project</h1>
       <marquee scrollAmount={14} className="mt-5">
            <div className='d-flex'>
                { hproject?.length>0?
                  hproject.map((item)=>(
                    <div className='ms-5' style={{width:'500px'}}>
                    <ProjectCard project ={item} />
                    
    
                </div>

                  ))
                :null}
    
                
                
            </div>
       </marquee>
       <div className='text-center mt-5'>
        <Link to={'/project'}>See more projects</Link>
       </div>
       


    </div>


    </>
  )
}

export default Home