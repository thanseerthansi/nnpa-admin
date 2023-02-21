import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Callaxios from './Callaxios';
import Scripts from './Scripts';
export default function Login() {
    let navigate = useNavigate();
    const [password,setpassword]=useState('')
    const [username,setusername]=useState('')
    useEffect(() => {
      Scripts()
    }, [])
    
    const notify = (msg) => toast.success(msg, {
      position: "top-right",
      });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-right",
      });
    const loginfn=async(e)=>{
      e.preventDefault();
      try {
        let data = await Callaxios ("post","user/login/",{"username":username,"password":password})
        // console.log("data",data)
        if(data.status===200){
          window.localStorage.setItem("login-access","true")
          window.location='/news'
        }else{
          notifyerror("invalid Username or password")
        }
      } catch (error) {
        console.log(error)
        notifyerror("invalid Username or password")
      }
      // if (username==="nnpa" & password==="nnpa"){
      //   window.localStorage.setItem("login-access","true")
      //   window.location='/news'
      //   // return navigate('/news');
      // }else{
      //   notifyerror("invalid Username or password")
      // }
        
    }
  return (
    <div className='main-wrapper'>
      <ToastContainer/>
        <div className="page-wrapper full-page">
  <div className="page-content d-flex align-items-center justify-content-center">
    <div className="row w-100 mx-0 auth-page">
      <div className="col-md-6 col-xl-6 mx-auto">
        <div className="card">
          <div className="row">
            
            <div className="col-md-8 m-auto ps-md-0">
              <div className="auth-form-wrapper px-4 py-5">
                <a href= "/" className="noble-ui-logo d-block mb-2">
                  {/* Noble<span>UI</span> */}
                  <img src="../assets/images/logo/NNPA-VECTOR-LOGO.webp" alt="light theme" width={50} />
                  </a>
                <h5 className="text-muted fw-normal mb-4">Welcome back! Log in to your account.</h5>
                <form className="forms-sample" onSubmit={(e)=>loginfn(e)}>
                  <div className="mb-3 text-start">
                    <label htmlFor="userEmail" className="form-label ">Username</label>
                    <input type="text" required onChange={(e)=>setusername(e.target.value)} value={username} className="form-control" id="username" placeholder="Username" />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" required onChange={(e)=>setpassword(e.target.value)} value={password} id="userPassword" autoComplete="current-password" placeholder="Password" />
                  </div>
                  
                  <div>
                   
                    <button type="submit" className="btn btn-primary btn-icon-text mb-2 mb-md-0 ">
                     
                      Login
                    </button>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
