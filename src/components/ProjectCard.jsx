import React from 'react'

import Card from 'react-bootstrap/Card';
import projectimg from '../image/videoplayer.png'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from './services/baseurl';

function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card className='shadow rounded btn-primary' onClick={handleShow}>
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project.projectimage}`:projectimg} />
      <Card.Body>
        <Card.Title style={{color:'#4b0158'}} className='text-center'>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header  closeButton className='texr-center'>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <img style={{width:'100%', height:'150px' }} src={project?`${BASE_URL}/uploads/${project.projectimage}`:projectimg} alt="no image" />
            </div>
            <div className="col-6 text-center">
              <h3 style={{color:'darkblue'}} className='text-center'>{project.title}</h3>
              <p style={{textAlign:'justify', fontSize:'12px'}} >{project.overview}</p>
            
            </div>
            <p className='text-center mt-3'>Technology Used :<span style={{color:'darkblue'}}> {project.language}</span></p>
          </div>
          <div className='d-flex mt-4 mb-4'>
            <a href={project.github} target='_blank'><i class="fa-brands fa-github fa-beat-fade fa-2x ms-3"></i></a>
            <a href={project.website} target='_blank'><i class="fa-solid fa-link fa-2x ms-5"></i></a>
            
            

          </div>
          
        </Modal.Body>
        
      </Modal>

    </>
  )
}

export default ProjectCard