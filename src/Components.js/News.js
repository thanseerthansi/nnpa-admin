
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
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import { confirmAlert } from "react-confirm-alert";
// import Multiselect from 'multiselect-react-dropdown';
import ReactPlayer from 'react-player'
import Scripts from './Scripts';
// import Scripts from './Scripts';
export default function News() {
  const {categorydata,accesscheck} =useContext(Simplecontext)
    const [newsdata,setnewsdata]=useState([]);
    const [newsitem,setnewsitem]=useState('')
    const [page,setpage]=useState(1)
    const [next,setnext]=useState(false)
    const [modal,setmodal]=useState(false)
    const [isslider,setisslider]=useState(false)
    const [pushnotification,setpushnotification]=useState(false)
    // const [content, setContent] = useState('');
    const [newsvideomodal,setnewsvideomodal]=useState(false)
    const [searchvalue,setsearchvalue]=useState('')
    const [image,setimage]=useState('')
    const editor = useRef(null);

    
    // console.log("newsitem",newsitem)
    useEffect(() => {
      // Scripts()
      accesscheck()
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
          getnews('',page)
        }
      } catch (error) {
        notifyerror("Something went wrong")
      }
      
    } 
    const postnewsfn =async(e)=>{
      e.preventDefault();
      console.log("newsiteminpost",newsitem)
      const form_data = new FormData();
      let datalist = newsitem
      // console.log("datrlistcat",datalist.category[0].name)
      if(datalist.category[0].name){
        
        datalist.category = datalist.category[0]._id
      }
      datalist.is_slider = isslider
      datalist.is_pushnotification= pushnotification

      console.log("datalist",datalist)
      for (const [key, value] of Object.entries(datalist)) {
        
        form_data.append(`${key}`, `${value}`)
      }
      // console.log("form_data",form_data)
      if (image ){
        form_data.append('media',image)
      }
      if (datalist._id){
        form_data.append('id',datalist._id)
        form_data.append('action','update')
      }else{
        form_data.append('action','create')
      }
      try {
        let data = await Callaxios("post","news/create-news",form_data)
        console.log("data",data)
        if(data.data.status===200){
          
          setmodal(!modal)
          getnews()
          setallnull()
        
        }
      } catch (error) {
        console.log(error)
      }
    }
    
  const options = [
    { label:  'Around The World', value:  'aroundtheworld'  },
    { label:  'Trending', value:  'trending'  },
    { label:  'Top Stories', value:  'topstories'  },
]
  const setallnull =()=>{
    setnewsitem('')
    setisslider(false)
    setpushnotification(false)
    setimage('')
  } 
  const submitdelete = (itemid) => {
    confirmAlert({
        title: "Confirmation",
        message: `Are you sure to delete this ?`,
        buttons: [
        {
            label: "Yes",           
            onClick:()=>deletenews(itemid),
        },
        {
            label: "No"
            // onClick: () => alert("Click No")
        } 
        ],
        
    });
    };
    // const config = useMemo(
    //   {
    //     readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    //     placeholder: placeholder || 'Start typings...'
    //   },
    //   [placeholder]
    // );
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
                <th>Thumbnail</th>
                <th>category</th>
                <th>Content</th>
                <th>Slider</th>
                <th>tags</th>
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
                    {/* <td>
                    {itm.media_type==="image" ?
                    <img src={BaseURL+itm.thumbnail} />
                    : <ReactPlayer 
                    url={itm.url}
                    width='200px'
                    height='300px'
                    controls
                />
                  //   <video 
                  //   controls
                  //   src="https://www.youtube.com/watch?v=G-zyTlZQYpE"
                  //   style={{ width: '100%' }}
                  // />
                    
                    
                    }
                    </td> */}
                    <td ><img src={BaseURL+itm.thumbnail} onClick={()=>itm.media_type==="video" ? setnewsitem(itm)&  setnewsvideomodal(!newsvideomodal) : {} } style={ itm.media_type==="video"?{cursor:"pointer"}:{}} /></td>
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
                    
                    <td className='table-linebreak' onClick={()=>setnewsitem(itm) } data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg-dis">{itm.short_description} </td>
                   
                    <td>{itm.createdAt.split('T')[0]}</td>
                    <td>
                    <ul className=''>
                    <li className='list-group-item'>
                      <button onClick={()=>setnewsitem(itm) &setmodal(!modal) & setisslider(itm.is_slider.toString()) &setpushnotification(itm.is_pushnotification.toString())} className='btn btn-warning btn-xs'><BiEdit size={15}/>edit</button>
                    </li>
                    <li className='list-group-item mt-1' >
                    
                      <button onClick={()=>submitdelete(itm._id)} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15}/>delete</button>
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
                <button   onClick={()=>getnews('',page-1) } disabled={page===1}  className="page-link">Previous</button>
                </li>
                <li className="paginate_button page-item previous" id="dataTableExample_previous">
                <button disabled className="page-link active">{page}</button>
                </li>
                
                
                <li className="paginate_button page-item next" id="dataTableExample_next">
                <button   onClick={()=>getnews('',page+1)}  disabled={next===false} className="page-link">Next</button>
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
      <div className="modal-body text-start">
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
      
      <div className="modal-body text-start">
      
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
      <div className="modal-body text-start">
      <p>{newsitem.short_description}</p> 
      </div>
      <div className="modal-footer">
        <button onClick={()=>setnewsitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
{/* newsmodal */}
  <div className="modal" tabIndex={-1} role="dialog" style={newsvideomodal===true ? {display: 'block', paddingRight: 17}:{display:'none'}}>
  <div className="modal-dialog modal-lg box-shadow-blank">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title h4" id="myLargeModalLabel"></h5>
        <button onClick={()=>setnewsitem('') & setnewsvideomodal(!newsvideomodal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
        </button>
      </div>
      <div className="modal-body text-start">
      <ReactPlayer 
                    url={newsitem.url}
                    width='auto'
                    height='350px'
                    controls
                /> 
      </div>
      <div className="modal-footer">
        <button onClick={()=>setnewsitem('') & setnewsvideomodal(!newsvideomodal)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
        <button onClick={()=>setmodal(!modal) & setallnull()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
        </button>
      </div>
      <div className="modal-body text-start">
      <div>
  <form onSubmit={(e)=>postnewsfn(e)}>
    <div className="row">
      <div className="col-sm-12">
        <div className="mb-3">
          <label className="form-label "><b>Heading</b></label>
          <input onChange={(e)=>setnewsitem({...newsitem,heading:e.target.value})} value={newsitem.heading ? newsitem.heading :''} required type="text" className="form-control" placeholder="Enter Heading" />
        </div>
      </div>{/* Col */}
      {/* <div className="col-sm-6">
        
              
      </div> */}
      {/* Col */}
    </div>{/* Row */}
    <div className="row">
      <div className="col-sm-4 ">
      <div className="mb-3">
        <label htmlFor="exampleFormControlSelect2" className="form-label"><b>Tags </b></label><br/>
        {/* <b>{newsitem.tag}</b> */}
        <MultiSelect style={{maxWidth: "100%"}}
        onChange={newcontent => {setnewsitem({...newsitem,tag:newcontent})}}
        options={options}  
        // selected={[
        //   // newsitem.tag ? newsitem.tag.split(',').map((item,key)=>(
        //     { label:  'Around The World',value:'item'}
        //   // )) : ''
        // ]}
      />
      </div>
                    
      </div>{/* Col */}
      <div className="col-sm-4">
      <div className="mb-3">
        <label htmlFor="exampleFormControlSelect1" className="form-label"><b>Select Category</b></label>
        <select required className="form-select" onChange={(e)=>{setnewsitem({...newsitem,category:e.target.value})}} value={newsitem.category ? newsitem.category[0]._id :''} >
          <option hidden >Select Category</option>
          {categorydata.length ?  categorydata.map((itm,k)=>(
            <option key={k} value={itm._id} >{itm.name}</option>
          )):null}

        </select>
      </div>

      </div>{/* Col */}
      <div className="col-sm-4">
      <div className="mb-3">
          <label className="form-label"><b>Media Type</b></label>
          
          <select required onChange={(e)=>setnewsitem({...newsitem,media_type:e.target.value})} value={newsitem.media_type ? newsitem.media_type : '' } className="form-select" id="exampleFormControlSelect1">
          <option  hidden>Select Image Type</option>
          <option value={"image"}  >Image</option>
          <option  value={"video"}  >Video</option>
          </select>
        </div>
      </div>{/* Col */}
      
    </div>{/* Row */}
    <div className="row">
      <div className="col-sm-6">
        <div className="mb-3">
          <label className="form-label"><b>Image</b></label>
          {image? 
          <div className=''>
          <img  className='rounded image-size'  src={ URL.createObjectURL(image )} alt='img' height="auto" width="auto" />
          </div>
          :<div className=''>
            {newsitem.thumbnail  ? 
          <img  className='rounded  image-size' src={ BaseURL+newsitem.thumbnail}   alt='img' height="auto" width="auto" />
          :null}
          </div>}
          <input  onChange={(e)=>setimage(e.target.files[0])} style={{color: "rgba(0, 0, 0, 0)"}} value={''} type="file" className="form-control"  />
        </div>
      </div>{/* Col */}
      <div className="col-sm-6">
        <div className="mb-3">
          <label className="form-label"><b>Description</b></label>
          <input type="text" onChange={(e)=>setnewsitem({...newsitem,short_description:e.target.value})} value={newsitem.short_description ?newsitem.short_description :'' } className="form-control" placeholder="Enter description" />
        </div>
      </div>{/* Col */}
    </div>{/* Row */}
    <div className='row'>
      <div className='col-sm-6'>
      <div className="form-check mb-2">
      <input type="checkbox" onChange={(e)=>setisslider(!isslider)} checked={isslider===true}   className="form-check-input" id="checkChecked"   />
      <label className="form-check-label" htmlFor="checkChecked">
        <b>Is-Slider</b>
      </label>
    </div>
      <div className="form-check mb-2">
      <input type="checkbox"  onChange={(e)=>setpushnotification(!pushnotification)}   className="form-check-input" id="checkChecked"  />
      <label className="form-check-label" htmlFor="checkChecked">
        <b>Push Notification</b>
      </label>
    </div>
    </div>
    {newsitem.media_type ? newsitem.media_type === "video"? 
    <div className="col-sm-6">
      <div className="mb-3">
        <label className="form-label"><b>Video url</b></label>
        <input required type="text" onChange={(e)=>setnewsitem({...newsitem,url:e.target.value})} value={newsitem.url} className="form-control" placeholder="Enter viedo url" />
      </div>
    </div>
    : null : null}
    </div> 
    <div className='row'>
    <div className="col-sm-12">
        <div className="mb-3">
          <label className="form-label"><b>Content</b></label>
          <JoditEditor 
            ref={editor}
            value={newsitem.content ? newsitem.content : ''}
            
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setnewsitem({...newsitem,content:newContent})} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          
          {/* <JoditEditor
          ref={editor}
          // config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={newcontent => setnewsitem({...newsitem,content:newcontent})}  
          value={newsitem.content ? newsitem.content : ''}
          onChange={newcontent => {setnewsitem({...newsitem,content:newcontent})}}
      /> */}
        </div>
      </div>{/* Col */}
    </div>{/* row */}
    {/* <div className=''>
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

    </div> */}
    <div className='text-end '>
          <button type="button" onClick={()=>setmodal(!modal) & setallnull()} className="btn btn-secondary " style={{marginRight:"5px"}} data-bs-dismiss="modal">Close</button>
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
