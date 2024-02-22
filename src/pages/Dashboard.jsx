import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard({Dashboard}) {
  const [username, setUsername]= useState("")
  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)

  },[])


  const dash= Dashboard
  return (
    <>
    <Header dash/>
    <h1 className='mt-3 ms-3'>welcome <span style={{color:'red'}}>{username}</span></h1>
    <Row className='container-fluid mt-5 mb-5'>
      <Col md={6}>
      <Myproject/>

      </Col>
      <Col md={6}>
      <Profile/>
      
      </Col>

    </Row>


    </>
  )
}

export default Dashboard