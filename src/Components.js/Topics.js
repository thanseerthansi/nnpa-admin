import React, { useContext, useEffect, useState } from 'react'
import Callaxios from './Callaxios'
import { Simplecontext } from './Simplecontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch, BiAddToQueue, BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import Scripts from './Scripts';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Topics() {
    const { topicsdata, gettopics, accesscheck } = useContext(Simplecontext)
    const [categoryitem,setcategoryitem]=useState('')
    const [searchvalue,setsearchvalue]=useState('')
    const [modal,setmodal]=useState(false)
    // console.log("d=search",searchvalue)
    useEffect(() => {
      accesscheck()
      // Scripts()
    }, [])
    const notify = (msg) => toast.success(msg, {
      position: "top-right",
      });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-right",
      });
    const deletecat = async(itmid)=>{
      try {
        let data =await Callaxios("delete",`topics/${itmid}`)
        // console.log("data",data)
        if (data.status===200){
          notify("Deleted Successfully")
          gettopics()
        }
      } catch (error) {
        notifyerror("Something went wrong")
      }    
    }
    const categorypost = async(e)=>{
      e.preventDefault();
      let url 
      let action
      let msg
      let datalist = categoryitem
      if (datalist._id){
       
        if (datalist.name){
          // console.log("dataname")
          url = `topics/${datalist._id}`
          action = "put"
          msg = "Successfully updated"
        }else(notifyerror("Name required"))
            
      }else{
        // console.log("notid")
        url = `topics/`
        action = "post"
        msg = "Successfully Added"
      }
      // console.log("datalist",datalist)
      try {
        let data =await Callaxios(action,url,datalist)
        // console.log("data",data)
        if (data.status===200){
          notify(msg)
          gettopics()
          setcategoryitem('')
          setmodal(!modal)
        }
      } catch (error) {
        notifyerror("Something went wrong")
      }  
    }
    const submitdelete = (itemid) => {
      confirmAlert({
          title: "Confirmation",
          message: `Are you sure to delete this ?`,
          buttons: [
          {
              label: "Yes",           
              onClick:()=>deletecat(itemid),
          },
          {
              label: "No"
              // onClick: () => alert("Click No")
          } 
          ],
          
      });
      };
    return (
        <div className='page-wrapper p-3 mt-5'>
            <ToastContainer />
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className='row ' >
                                <div className='col-6' >
                                    <h6 className="card-title text-start text-bold">Topics</h6>
                                    <div className='text-start'><button onClick={() => setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20} />Add</button></div>
                                </div>
                                <div className='col-6'>
                                    <form className="search-form ml-auto">
                                        <div className="input-group">
                                            <div className="input-group-text">
                                                <BiSearch />
                                            </div>
                                            <input onChange={(e) => setsearchvalue(e.target.value.toLowerCase())} type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
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
                                            <th>list Style</th>
                                            <th>Action</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topicsdata.length ? topicsdata.filter(t => t.name.toLowerCase().includes(searchvalue)).map((itm, k) => (
                                            <tr key={k}>
                                                <td>{k + 1}</td>
                                                <td>{itm.name}</td>
                                                <td>{itm.list_style}</td>
                                                <td>
                                                    <ul className='text-center'>
                                                        <li className='list-group-item '>
                                                            <button onClick={() => setcategoryitem(itm) & setmodal(!modal)} className='btn btn-warning btn-xs edit-btn' ><BiEdit size={15} />edit</button>
                                                        </li>
                                                        <li className='list-group-item mt-1' >

                                                            <button onClick={() => submitdelete(itm._id)} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15} />delete</button>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        )) : null}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {/* <div className="modal fade" id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
      </form>
    </div>
  </div>
</div> */}
            <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }}>
                <div className="modal-dialog modal-dialog-centered  box-shadow-blank" >
                    <div className="modal-content"><div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Category</h5>
                        <button onClick={() => setmodal(!modal) & setcategoryitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
                    </div>
                        <form className="forms-sample" onSubmit={(e) => categorypost(e)}>
                            <div className="modal-body">
                                <div className="mb-3 text-start">
                                    <label htmlFor="userEmail" className="form-label ">Name</label>
                                    <input type="text" required onChange={(e) => setcategoryitem({ ...categoryitem, name: e.target.value })} value={categoryitem.name ? categoryitem.name : ''} className="form-control" placeholder="Name" />
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="userEmail" className="form-label ">List Style</label>
                                    {/* <input type="text" required onChange={(e) => setcategoryitem({ ...categoryitem, list_style: e.target.value })} value={categoryitem.list_style ? categoryitem.list_style : ''} className="form-control" placeholder="Name" /> */}
                                    <select required onChange={(e) => setcategoryitem({ ...categoryitem, list_style: e.target.value })} value={categoryitem.list_style ? categoryitem.list_style : ''} className="form-select" id="exampleFormControlSelect1">
                                        <option hidden>Select Slider Type</option>
                                        <option value={"horizontal_list"}  >horizontal_list</option>
                                        <option value={"vertical_list"}  >vertical_list</option>
                                        <option value={"list"}  >list</option>
                                    </select>
                                </div>
                                <div />
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => setmodal(!modal) & setcategoryitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
