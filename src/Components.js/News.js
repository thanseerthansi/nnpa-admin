
import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import Callaxios from './Callaxios';
import { BaseURL } from './urlcall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function News() {
    const [newsdata,setnewsdata]=useState([]);
    const [newsitem,setnewsitem]=useState('')
    const [page,setpage]=useState(1)
    const [query,setquery]=useState('')
    const [next,setnext]=useState(false)
    const [searchvalue,setsearchvalue]=useState('')
    
    // console.log("page",next)
    useEffect(() => {
        getnews()
    }, [])
    const notify = (msg) => toast.success(msg, {
      position: "top-right",
      });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-right",
      });
    const getnews=async(e,pages)=>{
      if (e ){
        e.preventDefault();
      }
        try {
            let data = await Callaxios("get","news/get-all-news/",{page:pages,limit:parseInt(10) ,query:searchvalue})
            console.log("datanews",data.data.data)
            if(data.data.status===200){
                setnewsdata(data.data.data.news)
                setnext(data.data.data.is_next)
                if(pages){
                    setpage(pages)                    
                }                
            }   
        } catch (error) {
            console.log(error)
        }        
    }
    const deletenews = async(itmid)=>{
      // console.log("itmid",itmid)
      try {
        let data =await Callaxios("post","news/create-news",{id:itmid,action:"delete"})
        // console.log("data",data)
        if (data.data.status===200){
          notify("Deleted Successfully")
          getnews()
        }
      } catch (error) {
        notifyerror("Something went wrong")
      }
      
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
        <h6 className="card-title text-start text-bold">News</h6>
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto" onSubmit={(e)=>getnews(e,1)} >
          <div className="input-group">
            
            <input onChange={(e)=>setsearchvalue(e.target.value)} type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
            <div className="">
              <button type='submit' className='btn btn-primary ' ><i  data-feather="search" /></button>
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
                <th >Heading</th>
                <th>image/video</th>
                <th>category</th>
                <th>Content</th>
                <th>tags</th>
                <th>Thumbnail</th>
                <th>description</th>
                <th>created date</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
                {newsdata.length ? newsdata.map((itm,k)=>(
                    <tr key={k}>
                    <td>{itm._id}</td>
                    <td className='table-linebreak' onClick={()=>setnewsitem(itm)} data-bs-toggle="modal" data-bs-target="#exampleModalCenter">{itm.heading}</td>
                    <td>
                    {itm.media_type==="image" ?
                    <img src={BaseURL+itm.url} />
                    :<video width="750" height="500" controls >
                          <source src={BaseURL+itm.url} type="video/mp4"/>
                    </video>
                    }
                    </td>
                    <td>{itm.category.length ?itm.category[0].name:null}</td>
                    <td className='table-linebreak' onClick={()=>setnewsitem(itm)}><button  type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">
                    Content
                    </button>
                    </td>
                    <td>{itm.tag ?  itm.tag.split(',').map((tagitm,tagk)=>(
                      <ul key={tagk}>
                        <li> {tagitm}</li>
                      </ul>
                    )):null}</td>
                    <td >{itm.thumbnail}</td>
                    <td className='table-linebreak' onClick={()=>setnewsitem(itm)} data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg-dis">{itm.short_description} </td>
                   
                    <td>{itm.createdAt.split('T')[0]}</td>
                    <td>
                    <ul className=''>
                    <li className='list-group-item'>
                      <button onClick={()=>setnewsitem(itm)} className='btn btn-warning btn-xs'>edit</button>
                    </li>
                    <li className='list-group-item mt-1' >
                    
                      <button onClick={()=>deletenews(itm._id)} className='btn btn-danger btn-xs' >delete</button>
                    </li>
                  </ul>
                    </td>
                  </tr>
                )) :null}
              
             
            </tbody>
          </table>

        </div>
        <div className="row mt-1">
        <div className=" ">
            <div className="dataTables_paginate paging_simple_numbers " >

            <ul className="pagination ">
              
                <li className="paginate_button page-item previous" id="dataTableExample_previous">
                <button href="#" onClick={()=>getnews(page-1) } disabled={page===1}  className="page-link">Previous</button>
                </li>
                <li className="paginate_button page-item previous" id="dataTableExample_previous">
                <button href="#" onClick={()=>getnews(page-1) } disabled className="page-link active">{page}</button>
                </li>
                
                
                <li className="paginate_button page-item next" id="dataTableExample_next">
                <button href="#" onClick={()=>getnews(page+1)}  disabled={next===false} className="page-link">Next</button>
                </li>
                
            </ul>
            </div>
        </div>
</div>

      </div>
    </div>
  </div>
    </div>
    
    
    {/* content Modal */}
    <div className="modal fade bd-example-modal-lg" tabIndex={-1} aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title h4" id="myLargeModalLabel">Content</h5>
        <button onClick={()=>setnewsitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
        </button>
      </div>
      <div className="modal-body">
      <div dangerouslySetInnerHTML={{__html: newsitem.content}} />
      </div>
      <div className="modal-footer">
        <button onClick={()=>setnewsitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    {/* modal heading */}
    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Heading</h5>
        <button onClick={()=>setnewsitem('')}  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      
      <div className="modal-body">
      
      <p>{newsitem.heading}</p>
     
      </div>
      <div className="modal-footer">
        <button onClick={()=>setnewsitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
      
      </div>
    </div>
  </div>
  {/* description Modal */}
  <div className="modal fade bd-example-modal-lg-dis" tabIndex={-1} aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title h4" id="myLargeModalLabel">Description</h5>
        <button onClick={()=>setnewsitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
        </button>
      </div>
      <div className="modal-body">
      <p>{newsitem.short_description}</p> 
      </div>
      <div className="modal-footer">
        <button onClick={()=>setnewsitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
 {/* edit modal */}


    </div>
  )
}
