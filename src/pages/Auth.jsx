import React, { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import titleimage from '../image/design1.webp'
import { loginAPI, registerAPI } from '../components/services/allAPI'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({register}) {
  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const [userData,setUserData] = useState({
    username:"",
    email:"",
    password:""

  })
   const navigate = useNavigate()

  
  
  // console.log(userData);
  const Register=register ? true:false
  // function to register
  const handleRegister= async (e)=>{
    e.preventDefault()
    const {username,email,password} = userData
    if (!username || !email || !password)
    {
      toast.info('please fill the form completely')
    }
    else
    {
     const result = await  registerAPI(userData)
     console.log(result);
     if(result.status===200)
     {
      
    toast.success(`${result.data.username} registered successfully`) 
      setUserData({
        username:"",email:"",password:""
      })
      navigate('/login')

        
     }
     else
     {
      toast.error(`${result.response.data}`)
     }
    }
  }
  // function to login

  const handleLogin = async(e)=>{
    e.preventDefault()
    const {email,password} = userData
    if(!email || !password)
    {
      toast.info('please fill the form completly')
    }
    else
    {
      const result = await loginAPI(userData)
      console.log(result);
      // store data
      if(result.status===200)
      {
        setIsAuthToken(true)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data. existingUser))
        sessionStorage.setItem("token",result.data.token)
        toast.success('login successfully')

        setUserData({
          username:"",email:"",password:""
        })

        setTimeout(() => {
          navigate('/')
          
        },2000);

       

      }
      else
      {
        toast.error(result.response.data)
      }

    }

  }

 
  return (
    
    <>
      <div style={{width:'100%', height:'100vh'}} className='container-fluid d-flex justify-content-center align-items-center'>
  
         <div className='w-75 container'>
          <Link to={'/'}  > <i class="fa-solid fa-arrow-left-long "></i> back to home</Link>
          <div style={{background:'#101d6b'}} className='card  rounded p-5 shadow'>
              <div className="row align-items-center">
                  <div className="col-6">
                      <img className='w-100' src={titleimage} alt="no image" />
                  </div>
                  <div className="col-6">
                      <div className='d-flex align-items-center justify-content-center flex-column'>
  
                      <h2 ><Link style={{textDecoration:'none', color:'white'}} to={'/project'}><i class="fa-solid fa-sheet-plastic fa-1x"></i> Project <span style={{color:'violet'}}> Capsule</span></Link></h2>
                      <h5 className='mt-3 mb-3' style={{color:'goldenrod'}}>
                        {Register?"Sign up to your account":"Sign in to your account"}
                      </h5>
                      
                      <form className='form-group w-75'>
                        
                        <div className='d-flex flex-column'>
                        {Register&&
                        <div>
                          <label style={{color:'goldenrod'}} className='form-label'>name</label>
                          <input className='form-control' placeholder='enter your name' type="text"  value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
                        </div>
  
                                  }
  
                         
                         <label style={{color:'goldenrod'}} className='form-label'>Email</label>
                         <input className='form-control' placeholder='enter your email' type="email" onChange={(e)=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                         <label style={{color:'goldenrod'}} className='form-label'>Password</label>
                         <input className='form-control' placeholder='enter your password' type="text" onChange={(e)=>setUserData({...userData,password:e.target.value})} value={userData.password} />
                        </div>
  
                      </form>
                      
  
                      
                      
                      <div >
                       {Register?<div className='d-flex justify-content-center align-items-center flex-column'>
                       <button onClick={handleRegister} className='btn btn-outline-success mt-3'>Register</button>
                       <p>Already a user?Click here to<Link to={'/login'}> Login</Link></p>
                         
                       </div>
                         :
                         
  
                       <div className='d-flex justify-content-center align-items-center flex-column'>
                       <button onClick={handleLogin} className='btn btn-outline-success mt-3'>Login</button>
                         
                          <p>New user?Click here to <Link to={'/register'}>Register</Link></p>
                       </div>
                          }
                      </div>
                      
  
                      </div>
  
                  </div>
  
              </div>
  
          </div>
  
         </div>
  
      </div>
      
       <ToastContainer theme='colored' autoClose={2000} position='top-center'  />
      
    </>
  )
}

export default Auth