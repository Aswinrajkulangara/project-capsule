import React from 'react'
import { Link } from 'react-router-dom'


function Footer () { 
  return (
    <div className='container-fluid bg-primary '>
        <div className='row d-flex '>
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center  mt-3 ">
               
                <h4 style={{overflowY:'hidden',marginTop:'20px'}} class color='black' ><i class="fa-solid fa-building"></i> Company</h4>

                <p style={{textAlign:'justify'}} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae consectetur facilis quo. Hic blanditiis molestias, voluptatibus vitae consectetur commodi delectus, repellat autem eos soluta dolore exercitationem eum quos cum odit?</p>
                
            </div>
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center  mt-3 ">
                
                <h4 style={{overflowY:'hidden'}}>Links</h4>

                 <Link to={"/"} style={{textDecoration:'none',color:'black'}}>Home page</Link>
                 <Link to={"/login"} style={{textDecoration:'none',color:'black'}}>Login</Link>
                  <Link to={"/project"} style={{textDecoration:'none',color:'black'}}>Project</Link>
    

            </div>
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center  mt-3 ">
                
                <h4 style={{overflowY:'hidden'}}>guides</h4>

                 <Link to={"/"} style={{textDecoration:'none',color:'black'}}>React</Link>
                 <Link to={"/login"} style={{textDecoration:'none',color:'black'}}>React bootstrap</Link>
                  <Link to={"/project"} style={{textDecoration:'none',color:'black'}}></Link>
    

            </div>
            <div className="col-md-3 text-center mt-3 ">
              <h3 >Contact Us</h3>
              <div className='d-flex flex-column'>
                <input type="text" className='form-control' />
                 <button type='button' className='btn btn-outline-dark mt-4'>contact</button>
              </div>
            </div>

        </div>

    </div>
  )
}

export default Footer