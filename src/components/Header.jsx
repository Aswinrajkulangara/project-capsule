import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthTokenContext } from '../context/ContextShare'

function Header({dash}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)

  
  const navigate = useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setIsAuthToken(false)

  }
  
  
  return (
    <Navbar className='bg-primary ' >
      <Container>
        <Navbar.Brand className='d-flex'>
        <div className='d-flex justify-centent-between' >

        <h2 ><Link style={{textDecoration:'none', color:'white'}} to={'/project'}><i class="fa-solid fa-sheet-plastic fa-1x"></i> Project <span style={{color:'darkblue'}}> Capsule</span></Link></h2>

       
       {dash&&
        <div >
          <button  onClick={handleLogout} className='btn btn-outline-danger ms-5'>logout</button>
  
        </div>
        }
         </div>


        </Navbar.Brand>


      </Container>


    </Navbar>
    



    // <div  className='container-fluid bg-primary d-flex '>
    //     <div className='d-flex' >
    //     <h2 ><Link style={{textDecoration:'none', color:'white'}} to={'/project'}><i class="fa-solid fa-sheet-plastic fa-1x"></i> Project <span style={{color:'darkblue'}}> Capsule</span></Link></h2>

    //     </div>
    //     {dash&&
    //     <button btn-btn-out-line-success>logout</button>

    //     }
        
        


    // </div>
  )
}

export default Header