import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
    const loginfn=()=>{
        return navigate('/news');
    }
  return (
    <div className='main-wrapper'>
        <div className="page-wrapper full-page">
  <div className="page-content d-flex align-items-center justify-content-center">
    <div className="row w-100 mx-0 auth-page">
      <div className="col-md-8 col-xl-6 mx-auto">
        <div className="card">
          <div className="row">
            
            <div className="col-md-8 m-auto ps-md-0">
              <div className="auth-form-wrapper px-4 py-5">
                <a href="#" className="noble-ui-logo d-block mb-2">Noble<span>UI</span></a>
                <h5 className="text-muted fw-normal mb-4">Welcome back! Log in to your account.</h5>
                <form className="forms-sample" onSubmit={()=>loginfn()}>
                  <div className="mb-3 text-start">
                    <label htmlFor="userEmail" className="form-label ">Email address</label>
                    <input type="email" className="form-control" id="userEmail" placeholder="Email" />
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="userPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="userPassword" autoComplete="current-password" placeholder="Password" />
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
