import React, { useContext, useEffect, useState } from 'react'
import Callaxios from './Callaxios'
import { Simplecontext } from './Simplecontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Category() {
  const {categorydata,getcategory} =useContext(Simplecontext)
  const [categoryitem,setcategoryitem]=useState('')
  const [searchvalue,setsearchvalue]=useState('')
  // console.log("d=search",searchvalue)
  useEffect(() => {
    
  }, [])
  const notify = (msg) => toast.success(msg, {
    position: "top-right",
    });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-right",
    });
  const deletecat = async(itmid)=>{
    try {
      let data =await Callaxios("post","category/create-category/",{id:itmid,action:"delete"})
      // console.log("data",data)
      if (data.data.status===200){
        notify("Deleted Successfully")
        getcategory()
      }
    } catch (error) {
      notifyerror("Something went wrong")
    }    
  }
  const categorypost = async(e,action)=>{
    e.preventDefault();
    let datalist = categoryitem
    if (action==="create"){
      datalist.action="create"
    }else if(action==="update"){
      datalist.action="update"
    }
    console.log("datalist",datalist)
    // try {
    //   let data =await Callaxios("post","category/create-category/",datalist)
    //   // console.log("data",data)
    //   if (data.data.status===200){
    //     notify("Deleted Successfully")
    //     getcategory()
    //   }
    // } catch (error) {
    //   notifyerror("Something went wrong")
    // }  
  }
  return (
    <div className='page-wrapper p-3 mt-5'>
       <ToastContainer/>
      <div className="row">
  <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
      <div className="card-body">
        <div className='row ' >
          <div className='col-6' >
        <h6 className="card-title text-start text-bold">Category</h6>
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto">
          <div className="input-group">
            <div className="input-group-text">
              <i data-feather="search" />
            </div>
            <input onChange={(e)=>setsearchvalue(e.target.value.toLowerCase())} type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        </div>
        </div>

        <div className="table-responsive pt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
                
                
              </tr>
            </thead>
            <tbody>
              {categorydata.length? categorydata.filter(t=>t.name.toLowerCase().includes(searchvalue)).map((itm,k)=>(
                <tr key={k}>
                <td>{k+1}</td>
                <td>{itm.name}</td>
                <td>
                  <ul className=''>
                    <li className='list-group-item'>
                      <button onClick={()=>setcategoryitem(itm)} className='btn btn-warning btn-xs' data-bs-toggle="modal" data-bs-target="#exampleModalCenter">edit</button>
                    </li>
                    <li className='list-group-item mt-1' >
                    
                      <button onClick={()=>deletecat(itm._id)} className='btn btn-danger btn-xs' >delete</button>
                    </li>
                  </ul>
                </td>
              </tr>
              )):null}
              
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

   {/* Modal */}
<div className="modal fade" id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button onClick={()=>setcategoryitem('')}  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>categorypost(e,"create")}>
      <div className="modal-body">
      
                  <div className="mb-3 text-start">
                    <label htmlFor="userEmail" className="form-label ">Name</label>
                    <input type="text" className="form-control" onChange={(e)=>setcategoryitem({...categoryitem,name:e.target.value})}value={categoryitem.name} placeholder="Name" />
                  </div>
                  
                  
                  <div>
                   
                    
                  </div>
                 
                
      </div>
      <div className="modal-footer">
        <button onClick={()=>setcategoryitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
      </form>
    </div>
  </div>
</div>
    </div>
  )
}
