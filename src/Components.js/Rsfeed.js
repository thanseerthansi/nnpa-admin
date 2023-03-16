import React, { useContext, useEffect, useState } from 'react'
import Callaxios from './Callaxios'
import { Simplecontext } from './Simplecontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch,BiAddToQueue,BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsFillEyeFill } from 'react-icons/bs';
// import Scripts from './Scripts';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Rsfeed() {

  
  let navigate = useNavigate()

  const {categorydata,getcategory,accesscheck} = useContext(Simplecontext)
  const [rssdata,setrssdata] = useState([])
  const [rssitem,setrssitem]=useState('')
  const [searchvalue,setsearchvalue]=useState('')
  const [modal,setmodal]=useState(false)
  const [page,setpage]=useState(1)
  // console.log("d=search",searchvalue)
  useEffect(() => {
    window.scrollTo(0, 0);
    accesscheck()
    getrss()
    // Scripts()
  }, [])
  const notify = (msg) => toast.success(msg, {
    position: "top-right",
    });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-right",
    });
  const getrss = async(e,pageno)=>{
    if (e) {
      e.preventDefault();
    }
    if (!pageno){
      pageno = 1  
    }
    // console.log("pageno",pageno)
    let data = await Callaxios("get","rss/",{page:pageno,limit:1,query:searchvalue})
    // console.log("rssdata",data.data.data)
    if (data.status === 200){
      setrssdata(data.data.data)
      setpage(pageno)
    }
  }

  const deleterss = async(itmid)=>{
    try {
      let data =await Callaxios("delete",`rss/${itmid}`)
      // console.log("data",data)
      if (data.status===200){
        notify("Deleted Successfully")
        getrss()
      }
    } catch (error) {
      notifyerror("Something went wrong")
    }    
  }

  const rsspost = async(e)=>{
    e.preventDefault();
    let url 
    let action
    let msg
    let datalist = rssitem
    if (datalist._id){
     
      if (datalist.name){
        // console.log("dataname")
        url = `rss/${datalist._id}`
        action = "put"
        msg = "Successfully updated"
      }else(notifyerror("Name required"))
          
    }else{
      // console.log("notid")
      url = `rss/`
      action = "post"
      msg = "Successfully Added"
    }
    // console.log("datalist",datalist)
    try {
      let data =await Callaxios(action,url,datalist)
      // console.log("data",data)
      if (data.status===200){
        notify(msg)
        getrss()
        setrssitem('')
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
            onClick:()=>deleterss(itemid),
        },
        {
            label: "No"
            // onClick: () => alert("Click No")
        } 
        ],
        
    });
    };
  return (
    <div className='page-wrapper px-3 mt-5'>
       <ToastContainer/>
      <div className="row">
  <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
      <div className="card-body">
        <div className='row ' >
          <div className='col-6' >
        <h6 className="card-title text-start text-bold">Rss Feed</h6>
        <div className='text-start'><button onClick={()=>setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div>
        </div>
        <div  className='col-6'>
                  <form className="search-form ml-auto" onSubmit={(e) => getrss(e, 1)} >
                    <div className="input-group">

                      <input onChange={(e) => setsearchvalue(e.target.value)} type="text" className="form-control form-control-sm" id="navbarForm" placeholder="Search here..." />
                      <div className="">
                        <button type='submit' className='btn btn-primary btn-sm ' ><BiSearch size={20} /></button>
                      </div>
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
                <th>URL</th>
                <th>Category</th>
                <th>Action</th>
                
                
              </tr>
            </thead>
            <tbody>
              {rssdata.rss_links? rssdata.rss_links.length?rssdata.rss_links.map((itm,k)=>(
                <tr key={k}>
                <td>{k+1}</td>
                <td>{itm.name}</td>
                <td>{itm.url}</td>
                <td>{itm.category ? itm.category.name :null}</td>
                <td>
                  <ul className='text-center'>

                  <li className='list-group-item '  >
                   
                      <button className='btn btn-primary btn-xs' onClick={()=>{ return navigate(`/news/Rss-News/${itm.name}`,{ state : { rss_link : itm.url ,category:itm.category??''}})}} ><BsFillEyeFill size={15}/></button>
                      <button style={{marginLeft:"2px"}} onClick={()=>setrssitem(itm) & setmodal(!modal)} className='btn btn-warning btn-xs ' ><BiEdit size={15}/></button>
                      <button style={{marginLeft:"2px"}} onClick={()=>submitdelete(itm._id)} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15} /></button>
                  </li>


                    {/* <li className='list-group-item mt-1'>
                      
                    </li>
                    <li className='list-group-item mt-1' >
                    
                      
                    </li> */}
                  </ul>
                </td>
              </tr>
              )):<tr>
              <td colSpan={4} > 
              <div >No RssFeed Found</div>
              </td>
              </tr>:<tr>
              <td colSpan={4} > 
              <div >No RssFeed Found</div>
              </td>
              </tr>
              }
              
             
            </tbody>
          </table>
        </div>
        {/* <div className="row mt-1">
                <div className=" ">
                  <div className="dataTables_paginate paging_simple_numbers " >

                    <ul className="pagination ">

                      <li className="paginate_button page-item previous" id="dataTableExample_previous">
                        <button onClick={() => getrss('', page - 1)} disabled={page === 1} className="page-link">Previous</button>
                      </li>
                      <li className="paginate_button page-item previous" id="dataTableExample_previous">
                        <button disabled className="page-link active">{page}</button>
                      </li>


                      <li className="paginate_button page-item next" id="dataTableExample_next">
                        <button onClick={() => getrss('', page + 1)} disabled={rssdata.is_next === false} className="page-link">Next</button>
                      </li>

                    </ul>
                  </div>
                </div>
              </div> */}
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
        <button onClick={()=>setrssitem('')}  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>rsspost(e,"create")}>
      <div className="modal-body">
      
                  <div className="mb-3 text-start">
                    <label htmlFor="userEmail" className="form-label ">Name</label>
                    <input type="text" className="form-control" onChange={(e)=>setrssitem({...rssitem,name:e.target.value})}value={rssitem.name} placeholder="Name" />
                  </div>
                  
                  
                  <div>
                   
                    
                  </div>
                 
                
      </div>
      <div className="modal-footer">
        <button onClick={()=>setrssitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </div>
      </form>
    </div>
  </div>
</div> */}
  <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal===true ? {display: 'block', paddingRight: 17}:{display:'none'}}>
  <div className="modal-dialog modal-dialog-centered  box-shadow-blank" >
    <div className="modal-content"><div className="modal-header">
      <h5 className="modal-title" id="exampleModalCenterTitle">Rss Feed</h5>
      <button onClick={()=>setmodal(!modal) & setrssitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>rsspost(e)}>
        <div className="modal-body">
        <div className="mb-3 text-start">
          <label htmlFor="userEmail" className="form-label ">Name</label>
          <input type="text" required onChange={(e)=>setrssitem({...rssitem,name:e.target.value})} value={rssitem.name?rssitem.name:'' } className="form-control" placeholder="Name"  />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="userEmail" className="form-label ">URL</label>
          <input type="text" required onChange={(e)=>setrssitem({...rssitem,url:e.target.value})} value={rssitem.url?rssitem.url:'' } className="form-control" placeholder="URL"  />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="userEmail" className="form-label ">Category</label>
          {/* <input type="text" required onChange={(e)=>setrssitem({...rssitem,url:e.target.value})} value={rssitem.url?rssitem.url:'' } className="form-control" placeholder="URL"  /> */}
          <select required  onChange={(e) => setrssitem({ ...rssitem, category_id: e.target.value })} value={rssitem.category_id ?? rssitem.category?._id??''} className="form-select" id="exampleFormControlSelect1">
            <option hidden   >Select Category</option>
            {categorydata.map((catitm,ck)=>(
              <option key={ck} value={catitm._id} >{catitm.name}</option>            
            ))}
            
          </select>
        </div>
        <div />
        </div>
        <div className="modal-footer">
          <button onClick={()=>setmodal(!modal) & setrssitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
    </div>
  </div>
    </div>
  )
}
