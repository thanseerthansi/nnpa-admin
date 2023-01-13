
// import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Callaxios from './Callaxios';
import { BaseURL } from './urlcall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch ,BiAddToQueue,BiEdit} from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import JoditEditor from 'jodit-react';
import { Simplecontext } from './Simplecontext';
// import MultiSelect from  'react-multiple-select-dropdown-lite'
// import  'react-multiple-select-dropdown-lite/dist/index.css'
import Multiselect from 'multiselect-react-dropdown';
// import Scripts from './Scripts';
export default function News() {
  const {categorydata} =useContext(Simplecontext)
    const [newsdata,setnewsdata]=useState([]);
    const [newsitem,setnewsitem]=useState('')
    const [page,setpage]=useState(1)
    const [query,setquery]=useState('')
    const [next,setnext]=useState(false)
    const [modal,setmodal]=useState(false)
    const [searchvalue,setsearchvalue]=useState('')
    const editor = useRef(null);
	  const [content,setcontent] = useState('');
    
    console.log("newsitem",newsitem)
    useEffect(() => {
      // Scripts()
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
        <div className='text-start'><button onClick={()=>setmodal(!modal)} className='btn btn-success btn-sm'><BiAddToQueue size={20}/>Add</button></div>
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto" onSubmit={(e)=>getnews(e,1)} >
          <div className="input-group">
            
            <input onChange={(e)=>setsearchvalue(e.target.value)} type="text" className="form-control form-control-sm" id="navbarForm" placeholder="Search here..." />
            <div className="">
              <button type='submit' className='btn btn-primary btn-sm ' ><BiSearch size={20}/></button>
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
                <th>Slider</th>
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
                    <td>{k+1}</td>
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
                    <td className='table-linebreak' onClick={()=>setnewsitem(itm)}><button  type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">
                    Content
                    </button>
                    </td>
                    <td>{itm.is_slider.toString()}</td>
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
                      <button onClick={()=>setnewsitem(itm) &setmodal(!modal)} className='btn btn-warning btn-xs'><BiEdit size={15}/>edit</button>
                    </li>
                    <li className='list-group-item mt-1' >
                    
                      <button onClick={()=>deletenews(itm._id)} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15}/>delete</button>
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
<div className="modal " tabIndex={-1}  role="dialog" style={modal===true ? {display: 'block', paddingRight: 17}:{display:'none'}}>
  <div className="modal-dialog modal-xl box-shadow-blank">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title h4" id="myExtraLargeModalLabel">Extra large modal</h5>
        <button onClick={()=>setmodal(!modal) & setnewsitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
        </button>
      </div>
      <div className="modal-body text-start">
      <div>
  <form>
    <div className="row">
      <div className="col-sm-6">
        <div className="mb-3">
          <label className="form-label "><b>Heading</b></label>
          <input onChange={(e)=>setnewsitem({...newsitem,heading:e.target.value})} value={newsitem.heading ? newsitem.heading :''} required type="text" className="form-control" placeholder="Enter Heading" />
        </div>
      </div>{/* Col */}
      <div className="col-sm-6">
        <div className="mb-3">
          <label className="form-label"><b>Thumbnail</b></label>
          <input onChange={(e)=>setnewsitem({...newsitem,thumbnail:e.target.value})} value={newsitem.thumbnail ? newsitem.thumbnail :''} required type="text" className="form-control" placeholder="Enter Thumbnail" />
        </div>
      </div>{/* Col */}
    </div>{/* Row */}
    <div className="row">
      <div className="col-sm-4">
      <div className="mb-3">
        <label htmlFor="exampleFormControlSelect2" className="form-label"><b>Tags </b></label>
        <Multiselect
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={newcontent => {setnewsitem({...newsitem,tag:newcontent})}}
  onSearch={function noRefCheck(){}}
  onSelect={newcontent => {setnewsitem({...newsitem,tag:newcontent})}}
  options={[
    {
      cat: 'Group 1',
      key: 'Option 1'
    },
    {
      cat: 'Group 1',
      key: 'Option 2'
    },
    {
      cat: 'Group 1',
      key: 'Option 3'
    },
    {
      cat: 'Group 2',
      key: 'Option 4'
    },
    {
      cat: 'Group 2',
      key: 'Option 5'
    },
    {
      cat: 'Group 2',
      key: 'Option 6'
    },
    {
      cat: 'Group 2',
      key: 'Option 7'
    }
  ]}
  selectedValues={[
    {
      cat: 'Group 1',
      key: 'Option 1'
    },
    {
      cat: 'Group 1',
      key: 'Option 2'
    }
  ]}
/>
        {/* <MultiSelect
        onChange={newcontent => {setnewsitem({...newsitem,tag:newcontent})}}
        options={[
          { label:  'Around The World', value:  'aroundtheworld'  },
          { label:  'Trending', value:  'trending'  },
          { label:  'Top Stories', value:  'topstories'  },
          
        ]}
        value={newsitem.tag ? newsitem.tag :''}
          
      /> */}
        {/* <select onChange={(e)=>setnewsitem({...newsitem,tag:e.target.value})}  multiple="multiple" className="form-select" id="exampleFormControlSelect2">
          <option value={"aroundtheworld"}>Around The World</option>
          <option value={"trending"}>Trending</option>
          <option value={"topstories"}>Top Stories</option>
         
        </select> */}
      </div>
                    
      </div>{/* Col */}
      <div className="col-sm-4">
      <div className="mb-3">
        <label htmlFor="exampleFormControlSelect1" className="form-label"><b>Select Category</b></label>
        <select required className="form-select" id="exampleFormControlSelect1">
          <option hidden >Select Category</option>
          {categorydata.length ?  categorydata.map((itm,k)=>(
            <option key={k}>{itm.name}</option>
          )):null}

        </select>
      </div>

      </div>{/* Col */}
      <div className="col-sm-4">
      <div className="mb-3">
          <label className="form-label"><b>Media Type</b></label>
          <select required className="form-select" id="exampleFormControlSelect1">
          <option hidden >Select Image Type</option>
          <option value={"image"}  >Image</option>
          <option  value={"video"} >Video</option>
          </select>
        </div>
      </div>{/* Col */}
      
    </div>{/* Row */}
    <div className="row">
      <div className="col-sm-6">
        <div className="mb-3">
          <label className="form-label"><b>Image/Video</b></label>
          <input required type="file" className="form-control"  />
        </div>
      </div>{/* Col */}
      <div className="col-sm-6">
        <div className="mb-3">
          <label className="form-label"><b>Description</b></label>
          <input type="text" className="form-control" placeholder="Enter description" />
        </div>
      </div>{/* Col */}
    </div>{/* Row */}

    <div className='row'>
    <div className="col-sm-12">
        <div className="mb-3">
          <label className="form-label"><b>Content</b></label>
          <JoditEditor
        ref={editor}
        value={content}
        onChange={newcontent => {setcontent(newcontent)}}
      />
        </div>
      </div>{/* Col */}
    </div>{/* row */}
    <div className=''>
      <div className="form-check mb-2">
      <input type="checkbox" className="form-check-input" id="checkChecked"   />
      <label className="form-check-label" htmlFor="checkChecked">
        <b>Is-Slider</b>
      </label>
    </div>
      <div className="form-check mb-2">
      <input type="checkbox" className="form-check-input" id="checkChecked"  />
      <label className="form-check-label" htmlFor="checkChecked">
        <b>Push Notification</b>
      </label>
    </div>

    </div>
    <div className='text-end '>
          <button type="button" onClick={()=>setmodal(!modal) & setnewsitem('')} className="btn btn-secondary " style={{marginRight:"5px"}} data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary ">Submit</button>
        </div>
  </form>
  
</div>

      </div>
    </div>
  </div>
</div>


    </div>
  )
}
