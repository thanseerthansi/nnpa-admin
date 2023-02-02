
// import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Callaxios from './Callaxios';
import { BaseURL } from './urlcall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch, BiAddToQueue, BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import JoditEditor from 'jodit-react';
import { Simplecontext } from './Simplecontext';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { confirmAlert } from "react-confirm-alert";
// import Multiselect from 'multiselect-react-dropdown';
import ReactPlayer from 'react-player'
import Scripts from './Scripts';
// import Scripts from './Scripts';
export default function News() {
  const { categorydata, accesscheck,topicsdata } = useContext(Simplecontext)
  const [newsdata, setnewsdata] = useState([]);
  const [newsitem, setnewsitem] = useState('')
  const [page, setpage] = useState(1)
  const [next, setnext] = useState(false)
  const [modal, setmodal] = useState(false)
  const [isslider, setisslider] = useState(false)
  const [pushnotification, setpushnotification] = useState(false)
  // const [content, setContent] = useState('');
  const [newsvideomodal, setnewsvideomodal] = useState(false)
  const [searchvalue, setsearchvalue] = useState('')
  const [image, setimage] = useState('')
  const [sliderdata, setsliderdata] = useState('')
  const editor = useRef(null);
  const [loading, setLoading] = useState(true);
  const [category,setcategory]=useState()
  const [topic,settopic]=useState()
  const [tag,settag]=useState()

  // console.log("isslider",isslider)
  // console.log("sliderdata",sliderdata)
  // console.log("sliderdata.image_slider_count",sliderdata.image_slider_count ? sliderdata.image_slider_count :"null")
  
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
  const getnews = async (e, pages) => {
    if (e) {
      e.preventDefault();
    }
    if (!pages){
      pages = 1  
    }
    try {
      // console.log("pages",pages)
      let data = await Callaxios("get", "news/admin-news", { page: pages, limit: 10, query: searchvalue,category:'' })
      // console.log("datanews", data)
      if (data.status === 200) {
        setnewsdata(data.data.data.news)
        setnext(data.data.data.is_next)
        if (pages) {
          setpage(pages)
        }
        try {
          let slidercount = await Callaxios("get","filter/get-slider-count")
          // console.log("slidredat",slidercount)
          if (slidercount.status===200){
            setsliderdata(slidercount.data.data)
          }
        } catch (error) {
          
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deletenews = async (itmid) => {
    // console.log("itmid",itmid)
    try {
      let data = await Callaxios("delete", `news/${itmid}`)
      // console.log("data",data)
      if (data.status === 200) {
        notify("Deleted Successfully")
        getnews('', page)
      }
    } catch (error) {
      notifyerror("Something went wrong")
    }

  }
  const postnewsfn = async (e) => {
    e.preventDefault();
    let action
    let url
    const form_data = new FormData();
    let datalist = newsitem
    delete datalist.is_pushnotification;
    if (category) {
      let catlist=[] 
      category.split(',').map((item) => {
        catlist.push(item);
      });
      datalist.category = catlist
    }else{
      delete datalist.category;
    }
    if (topic) {
      let topiclist=[] 
      topic.split(',').map((item) => {
        topiclist.push(item);
      });
      datalist.topics = topiclist
    }else{
      delete datalist.topics;
    }
    datalist.is_slider = isslider
    datalist.is_pushnotification = pushnotification
    if (tag){
      let taglist =[]
      tag.split(',').map((tagitm)=>{
          taglist.push(tagitm)
      })
      datalist.tag = taglist
    }
    
    for (const [key, value] of Object.entries(datalist)) {
      if(key !== "category" && key !== "tag" && key !== "topics"){
        form_data.append(`${key}`, `${value}`)
      }
    }
    form_data.append("category",JSON.stringify(datalist.category))
    form_data.append("tag",JSON.stringify(datalist.tag))
    form_data.append("topics",JSON.stringify(datalist.topics))
    if (image) {
      form_data.append('media', image)
    }
    if (datalist._id) {
      action = "put"
      url=`news/${datalist._id}`
      
    } else {
      action = "post"
      url=`news/`
    }
    try {
    //   for (var pair of form_data.entries()) {
    //     console.log("formdata",pair[0]+ ', ' + pair[1]);
    // }
      let data = await Callaxios(action, url, form_data)
      // console.log("data", data)
      if (data.data.status === 200) {

        setmodal(!modal)
        getnews('',page)       
        
        setallnull()
        if (datalist._id){
          notify('News updated Successfully')
        }else{
          notify('News added Successfully')
        }

      }
    } catch (error) {
      console.log(error)
    }
  }

  const options = [
    
    { label: 'Trending', value: 'trending' },
    { label: 'Top Stories', value: 'topstories' },
  ]
  const setallnull = () => {
    setnewsitem('')
    setisslider(false)
    setpushnotification(false)
    setimage('')
    setcategory('')
    settopic('')
    settag('')
  }
  const submitdelete = (itemid) => {
    confirmAlert({
      title: "Confirmation",
      message: `Are you sure to delete this ?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deletenews(itemid),
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
  const slidercheckfn=()=>{
    // console.log("slider",isslider)
   if (newsitem.media_type){
    if(newsitem.media_type==="image"){
      if( sliderdata.image_slider_count<10 ){
        setisslider(!isslider)
      }else{
        notifyerror("only 10 image sliders are allowed")
      }
    }else{
      if( sliderdata.vedio_slider_count<10 ){
        setisslider(!isslider)
      }else{
        notifyerror("only 10 video sliders are allowed")
      }
    } 
   }else{
    notifyerror("Need to Select Media Type")
   }
      
  }
  function handleVideoLoad() {
    setLoading(false);
  }
  const seteditfn=(itm)=>{
    setnewsitem(itm) 
    setmodal(!modal) 
    setisslider(itm.is_slider.toString())
    setpushnotification(itm.is_pushnotification.toString())
    settag(itm.tag)
  }
  return (
    <div className='page-wrapper p-3 mt-5'>
      <ToastContainer />
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className='row ' >
                <div className='col-6' >
                  <h6 className="card-title text-start text-bold">News</h6>
                  <div className='text-start'><button onClick={() => setmodal(!modal)} className='btn btn-success btn-sm'><BiAddToQueue size={20} />Add</button></div>
                </div>
                <div  className='col-6'>
                  <form className="search-form ml-auto" onSubmit={(e) => getnews(e, 1)} >
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
                      <th >Heading</th>
                      <th>Thumbnail</th>
                      <th>category</th>
                      <th>Topics</th>
                      <th>Content</th>
                      <th>Slider</th>
                      <th>tags</th>
                      <th>description</th>
                      <th>created date</th>
                      <th>action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsdata.length ? newsdata.map((itm, k) => (
                      <tr key={k}>
                        <td>{k + 1}</td>
                        <td className='table-linebreak' onClick={() => setnewsitem(itm)} data-bs-toggle="modal" data-bs-target="#exampleModalCenter">{itm.heading}</td>
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
                        <td ><img src={BaseURL + itm.thumbnail} onClick={() => itm.media_type === "video" ? setnewsitem(itm) & setnewsvideomodal(!newsvideomodal) : {}} style={itm.media_type === "video" ? { cursor: "pointer" } : {}} /></td>
                        <td>{itm.category.length ? itm.category.map((cat,kc)=>(
                          <ul key={kc}>
                            <li>{cat.name}</li>
                          </ul>
                        )): null}</td>
                        <td>{itm.topics.map((topicitm,key)=>(
                          <ul key={key}>
                            <li >{topicitm.name}</li>
                          </ul>
                        ))}</td>
                        <td className='table-linebreak' onClick={() => setnewsitem(itm)}><button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">
                          Content
                        </button>
                        </td>
                        
                        <td>{itm.is_slider.toString()}</td>
                        <td>{itm.tag.map((itmtag,ke)=>(
                          <ul key={ke}>
                            <li >{itmtag}</li>
                          </ul>
                        ))}</td>

                        <td className='table-linebreak' onClick={() => setnewsitem(itm)} data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg-dis">{itm.short_description} </td>

                        <td>{itm.createdAt.split('T')[0]}</td>
                        <td>
                          <ul className=''>
                            <li className='list-group-item'>
                              <button onClick={() => seteditfn(itm)} className='btn btn-warning btn-xs edit-btn'><BiEdit size={15} />edit</button>
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
              <div className="row mt-1">
                <div className=" ">
                  <div className="dataTables_paginate paging_simple_numbers " >

                    <ul className="pagination ">

                      <li className="paginate_button page-item previous" id="dataTableExample_previous">
                        <button onClick={() => getnews('', page - 1)} disabled={page === 1} className="page-link">Previous</button>
                      </li>
                      <li className="paginate_button page-item previous" id="dataTableExample_previous">
                        <button disabled className="page-link active">{page}</button>
                      </li>


                      <li className="paginate_button page-item next" id="dataTableExample_next">
                        <button onClick={() => getnews('', page + 1)} disabled={next === false} className="page-link">Next</button>
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
              <button onClick={() => setnewsitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
              </button>
            </div>
            <div className="modal-body text-start">
              <div dangerouslySetInnerHTML={{ __html: newsitem.content }} />
            </div>
            <div className="modal-footer">
              <button onClick={() => setnewsitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
              <button onClick={() => setnewsitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
            </div>

            <div className="modal-body text-start">

              <p>{newsitem.heading}</p>

            </div>
            <div className="modal-footer">
              <button onClick={() => setnewsitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

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
              <button onClick={() => setnewsitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
              </button>
            </div>
            <div className="modal-body text-start">
              <p>{newsitem.short_description}</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setnewsitem('')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* newsmodal */}
      <div className="modal" tabIndex={-1} role="dialog" style={newsvideomodal === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }}>
        <div className="modal-dialog modal-lg box-shadow-blank">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4" id="myLargeModalLabel"></h5>
              <button onClick={() => setnewsitem('') & setnewsvideomodal(!newsvideomodal) & setLoading(true)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
              </button>
            </div>
            <div className="modal-body text-start">
            {loading &&
            <div className='m-auto mt-6' style={{padding: "80px 0"}}>
             <div className='text-center' >Loading...</div>
            </div>
            }
              <ReactPlayer
                url={newsitem.url}
                width='auto'
                height='350px'
                onReady={handleVideoLoad}
                controls
              />
            </div>
            <div className="modal-footer">
              <button onClick={() => setnewsitem('') & setnewsvideomodal(!newsvideomodal) & setLoading(true)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* edit modal */}
      <div className="modal " tabIndex={-1} role="dialog" style={modal === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }}>
        <div className="modal-dialog modal-xl box-shadow-blank">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4" id="myExtraLargeModalLabel">Extra large modal</h5>
              <button onClick={() => setmodal(!modal) & setallnull()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
              </button>
            </div>
            <div className="modal-body text-start">
              <div>
                <form onSubmit={(e) => postnewsfn(e)}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb-3">
                        <label className="form-label "><b>Heading</b></label>
                        <input onChange={(e) => setnewsitem({ ...newsitem, heading: e.target.value })} value={newsitem.heading ? newsitem.heading : ''} required type="text" className="form-control" placeholder="Enter Heading" />
                      </div>
                    </div>{/* Col */}
                    {/* <div className="col-sm-6">
        
              
      </div> */}
                    {/* Col */}
                  </div>{/* Row */}
                  <div className="row">
                    <div className="col-sm-4 ">
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect2" className="form-label"><b>Topics </b></label><br />
                        {/* <b>{newsitem.tag}</b> */}
                        <MultiSelect style={{ maxWidth: "100%" }}
                          onChange={newcontent => { settopic(newcontent ) }}
                          options={topicsdata ?topicsdata.map((topicitm,kt)=>(
                            { label: topicitm.name, value: topicitm._id }
                          ))
                            
                           :null }
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
                        {/* <select required className="form-select" onChange={(e) => { setnewsitem({ ...newsitem, category: e.target.value }) }} value={newsitem.category ? newsitem.category[0]._id : ''} >
                          <option hidden >Select Category</option>
                          {categorydata.length ? categorydata.map((itm, k) => (
                            <option key={k} value={itm._id} >{itm.name}</option>
                          )) : null}

                        </select> */}
                        <MultiSelect style={{ maxWidth: "100%" }}
                          onChange={newcontent => { setcategory( newcontent ) }}
                          options={categorydata ?categorydata.map((catitm,kc)=>(
                            { label: catitm.name, value: catitm._id }
                          ))
                            
                           :null }
                        // selected={[
                        //   // newsitem.tag ? newsitem.tag.split(',').map((item,key)=>(
                        //     { label:  'Around The World',value:'item'}
                        //   // )) : ''
                        // ]}
                        />
                        {/* {newsitem.category} */}
                      </div>

                    </div>{/* Col */}
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <label className="form-label"><b>Media Type</b></label>

                        <select required onChange={(e) => setnewsitem({ ...newsitem, media_type: e.target.value })} value={newsitem.media_type ? newsitem.media_type : ''} className="form-select" id="exampleFormControlSelect1">
                          <option hidden>Select Media Type</option>
                          <option value={"image"}  >Image</option>
                          <option value={"video"}  >Video</option>
                        </select>
                      </div>
                    </div>{/* Col */}

                  </div>{/* Row */}
                  <div className="row">
                    
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Tags</b></label>
                        <input type="text" onChange={(e) => settag( e.target.value )} value={tag} className="form-control" placeholder="Enter description" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Description</b></label>
                        <textarea type="text" onChange={(e) => setnewsitem({ ...newsitem, short_description: e.target.value })} value={newsitem.short_description ? newsitem.short_description : ''} className="form-control" placeholder="Enter description" />
                      </div>
                    </div>{/* Col */}
                  </div>{/* Row */}
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Image</b></label>
                        {image ?
                          <div className=''>
                            <img className='rounded image-size' src={URL.createObjectURL(image)} alt='img' height="auto" width="auto" />
                          </div>
                          : <div className=''>
                            {newsitem.thumbnail ?
                              <img className='rounded  image-size' src={BaseURL + newsitem.thumbnail} alt='img' height="auto" width="auto" />
                              : null}
                          </div>}
                        <input onChange={(e) => setimage(e.target.files[0])} style={{ color: "rgba(0, 0, 0, 0)" }} value={''} type="file" className="form-control" />
                      </div>
                    </div>{/* Col */}
                    </div>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className="form-check mb-2">
                        <input type="checkbox" onChange={(e) =>slidercheckfn()} checked={!!(isslider) ===true ? true : false }  className="form-check-input" id="checkChecked" />
                        <label className="form-check-label" htmlFor="checkChecked">
                          <b>Is-Slider</b>
                        </label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="checkbox" onChange={(e) => setpushnotification(!pushnotification)} className="form-check-input" id="checkChecked" />
                        <label className="form-check-label" htmlFor="checkChecked">
                          <b>Push Notification</b>
                        </label>
                      </div>
                    </div>
                    {newsitem.media_type ? newsitem.media_type === "video" ?
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label className="form-label"><b>Video url</b></label>
                          <input required type="text" onChange={(e) => setnewsitem({ ...newsitem, url: e.target.value })} value={newsitem.url} className="form-control" placeholder="Enter viedo url" />
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
                          onBlur={(newContent) => setnewsitem({ ...newsitem, content: newContent })} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => { }}
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
                    <button type="button" onClick={() => setmodal(!modal) & setallnull()} className="btn btn-secondary " style={{ marginRight: "5px" }} data-bs-dismiss="modal">Close</button>
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
