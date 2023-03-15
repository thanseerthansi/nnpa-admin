
// import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Callaxios from './Callaxios';
import { BaseURL } from './urlcall';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch, BiAddToQueue, BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line,RiDeleteBin6Fill } from 'react-icons/ri';
import JoditEditor from 'jodit-react';
import { Simplecontext } from './Simplecontext';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { confirmAlert } from "react-confirm-alert";
import { ColorRing } from 'react-loader-spinner'
// import Multiselect from 'multiselect-react-dropdown';
import ReactPlayer from 'react-player'
// import Scripts from './Scripts';
// import Scripts from './Scripts';
import Select from 'react-select';
import Compressor from 'compressorjs';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import "react-data-table-component-extensions/dist/index.css";

export default function News() {
  const { categorydata, accesscheck,topicsdata } = useContext(Simplecontext)
  const [newsdata, setnewsdata] = useState([]);
  const [newsitem, setnewsitem] = useState('')
  const [page, setpage] = useState(1)
  const [next, setnext] = useState(false)
  const [modal, setmodal] = useState(false)
  const [isslider, setisslider] = useState(false)
  const [pushnotification, setpushnotification] = useState(false)
  // const [filteredvalue, setfilteredvalue] = useState('');
  const [newsvideomodal, setnewsvideomodal] = useState(false)
  const [searchvalue, setsearchvalue] = useState('')
  const [image, setimage] = useState('')
  const [sliderdata, setsliderdata] = useState('')
  const editor = useRef(null);
  const [loading, setLoading] = useState(true);
  const [category,setcategory]=useState()
  const [topic,settopic]=useState()
  const [tag,settag]=useState()
  const [isloading,setisloading]=useState(false)
  // const [item_topics,setitem_topics]=useState([])
  // const [item_category,setitem_category]=useState([])
  // console.log("isslider",isslider)
  // console.log("sliderdata",sliderdata)
  // console.log("sliderdata.image_slider_count",sliderdata.image_slider_count ? sliderdata.image_slider_count :"null")
  
  useEffect(() => {
    // Scripts()
    accesscheck()
    getnews()
    window.scrollTo(0, 0);
  }, [])
  // useEffect(()=>{
  //   // console.log("dataserach")
  //   // const result = Object.values(newsdata).some((value) =>{
  //   //   return  value.toLowerCase().includes(searchvalue.toLowerCase())
  //   // })
  //   const result =newsdata.filter((news)=>{
  //     return news.heading.toLowerCase().match(searchvalue.toLowerCase()) 
  //   });
  //   setfilteredvalue(result)
  // },[searchvalue])

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
      let data = await Callaxios("get", "news/admin-news", { page: pages, limit: 20,category:'' })
      // console.log("datanews", data)
      if (data.status === 200) {
        setnewsdata(data.data.data.news)
        // setfilteredvalue(data.data.data.news)

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
    setisloading(true)
    try {
      let action
      let url
      let msg
      let form_data = new FormData();
      let datalist = Object.assign({}, newsitem); 
      // console.log("category",category)
      if (datalist._id) {
        // console.log("put")
        action = "put"
        url=`news/${datalist._id}`
        delete datalist.category
        delete datalist.topics
        // delete datalist.tag
        msg =" News updated Successfully"
      } else {
        action = "post"
        url=`news/`
        msg ="News added Successfully"
      }
      
      if (category) {
        let catlist=[] 
        category.map((item) => {
          catlist.push(item.value);
        });
        form_data.append("category",JSON.stringify(catlist))
        // datalist.category = catlist
      }
       
      if (topic) {
        let topiclist=[]
        topic.map((item) => {
          topiclist.push(item.value);
        });
        // datalist.topics = topiclist
        form_data.append("topics",JSON.stringify(topiclist))
      }
      datalist.is_slider = isslider
      datalist.is_pushnotification = pushnotification
      // console.log("tag",tag)
      if (tag){
        let taglist =[]
        if (Array.isArray(tag) !== true){         
          tag.split(',').map((tagitm)=>{
              taglist.push(tagitm)
          })
          form_data.append("tag",JSON.stringify(taglist))
        }else{
          form_data.append("tag",JSON.stringify(datalist.tag))
        }
      }else{
        delete datalist.tag
      }
      for (const [key, value] of Object.entries(datalist)) {
        // console.log("data",key +":"+value)
        if(key !== "category" && key !== "tag" && key !== "topics"){
          // console.log("datainpairkey",key +":"+value)
          form_data.append(`${key}`, `${value}`)
        }
      }      
      if (image) {
        if (datalist.thumbnail){
          notifyerror("Both Image and Thumbnail not allowed Choose image or Thumbnail url")
          setisloading(false)
          return 
        }else{
          form_data.append('media', image)
        }
        
      }else{
        if(!datalist.thumbnail){
          notifyerror("Image or Thumbnail url not found")
          setisloading(false)
          return 
        }
        
      }
      try {
    //   for (var pair of form_data.entries()) {
    //     console.log("dini",pair[0]+ ', ' + pair[1]); 
    // }      
        let data = await Callaxios(action, url, form_data)
        // console.log("data", data)
        if (data.status === 200) { 
          setmodal(!modal)
          getnews('',page)       
          notify(msg)
          setallnull()
          setisloading(false)
        }else{
          setisloading(false)         
          notifyerror("Something went wrong")         
        }
      } catch (error) {
        console.log("error",error)
        setisloading(false)
        notifyerror("Something went wrong")       
      }
    } catch (error) {
      console.log(error)
      setisloading(false)
      notifyerror("Something went wrong")
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
    if (isslider===false || isslider ==="false"){
      // if(newsitem.media_type==="image"){
        
      //   if( sliderdata.image_slider_count<10 ){
      //     setisslider(true)
      //   }else{
      //     notifyerror("only 10 image sliders are allowed")
      //   }
      // }else{
      //   if( sliderdata.vedio_slider_count<10 ){
      //     setisslider(true)
      //   }else{
      //     notifyerror("only 10 video sliders are allowed")
      //   }
      // } 
      setisslider(true)
    }else{
      setisslider(!isslider)
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
    sortarr(itm.topics)
    sortcategory(itm.category)
  }
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.     

        setimage(compressedResult)
      },
    });
  };
  // console.log("datalist",newsitem?newsitem.topics:"")
  const sortarr=(topic_list)=>{
    // console.log("topic list",topic_list)
    const list_item=[]
    topic_list.map((topicitm,kt)=>(    
        list_item.push( {label:topicitm.name, value: topicitm._id} ,)
    ))
    // console.log("listvalue",list_item)
   settopic(()=>[...list_item])
  }
  const sortcategory=(category_list)=>{
    // console.log("topic list",category_list)
    const list_item=[]
    category_list.map((catitm,kt)=>(    
        list_item.push( {label:catitm.name, value: catitm._id} ,)
    ))
    // console.log("listvalue",list_item)
   setcategory(()=>[...list_item])
  }
  // const rowNumber = (row) => filteredvalue.indexOf(row) + 1;
  const columns =[
    
    // {
    //   name: '#',
    //   selector: (row) => rowNumber(row),
    // },
    {
      name:"HEADING",
      selector : (itm)=>itm.heading,
    },
    {
      name:"THUMBNAIL",
      selector : (itm)=><ul className='p-1'><img  src={itm.thumbnail.startsWith('https')||itm.thumbnail.startsWith('http')? itm.thumbnail:BaseURL+itm.thumbnail} onClick={() => itm.media_type === "video" ? setnewsitem(itm) & setnewsvideomodal(!newsvideomodal) : {}} style={itm.media_type === "video" ? { cursor: "pointer" } : {}} /></ul>,
    },
    {
      name:"CATEGORY",
      selector : (itm)=>itm.category.length ? itm.category.map((cat,kc)=>(
        <ul key={kc} style={{marginLeft: "-15px"}}>
          <li>{cat.name}</li>
        </ul>
      )): null,
    },
    {
      name:"TOPICS",
      selector : (itm)=>itm.topics.map((topicitm,key)=>(
        <ul key={key} style={{marginLeft: "-15px"}}>
          <li >{topicitm.name}</li>
        </ul>
      )),
    },
    {
      name:"CONTENT",
      selector : (itm)=><ul  style={{marginLeft: "-15px"}} className='table-linebreak' onClick={() => setnewsitem(itm)}><button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">
      Content
    </button></ul>,
    },
    {
      name:"SLIDER",
      selector : (itm)=>itm.is_slider?<p>YES</p>:<p>NO</p>,
    },
    {
      name:"TAGS",
      selector : (itm)=>itm.tag.map((itmtag,ke)=>(
        <ul key={ke} style={{marginLeft: "-15px"}}>
          <li >{itmtag}</li>
        </ul>
      )),
    },
    {
      name:"CREATED",
      selector : (itm)=>itm.createdAt.split('T')[0],
    },
    {
      name:"ACTION",
      selector : (itm)=><ul style={{marginLeft: "-15px"}}>
      <li className='list-group-item d-flex'>
        <div>
        <button onClick={() => seteditfn(itm)} className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
        </div>
        <div className='ml-5' style={{marginLeft:"2px"}}>
        <button  onClick={() => submitdelete(itm._id)} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15} /></button>
      </div>
      </li>
     
    </ul>,
    },
  ]
  const customStyles = {
    cells: {
      style: {
        border: "0.5px solid #f5f2f2 ",
        textalign:"center"
      },
    },
    header: {
      style: {
        border: "1px solid gray",
        minHeight: "56px",
        paddingLeft: "16px",
        paddingRight: "16px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      },
    },
    filter:{
      style:{
        bordr:"1px solid gray",
      }
    }
 
  };
  // const tableData = {
  //   columns,
  //   newsdata
  // };
  // console.log("topics",topic)
  return (
    <div className='page-wrapper px-3 mt-5'>
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
                  {/* <form className="search-form ml-auto" onSubmit={(e) => getnews(e, 1)} >
                    <div className="input-group">

                      <input onChange={(e) => setsearchvalue(e.target.value)} type="text" className="form-control form-control-sm" id="navbarForm" placeholder="Search here..." />
                      <div className="">
                        <button type='submit' className='btn btn-primary btn-sm ' ><BiSearch size={20} /></button>
                      </div>
                    </div>
                  </form> */}

                </div>
              </div>

              
              <div className="">
              <DataTableExtensions
          columns={columns}
          data={newsdata}
          print={false}
          export={false}
          
        >
          <DataTable
            // columns={columns}
            // data={data}
            // noHeader
            // defaultSortField="id"
            // defaultSortAsc={false}
            pagination
            highlightOnHover
            // columns={columns}
            // data={filteredvalue}
           
            defaultSortField="_id"
            defaultSortAsc={false}
            // pagination
            // highlightOnHover
            // pagination
            fixedHeader
            fixedHeaderScrollHeight='63vh'
            className="tablereact  tablereact "
            // highlightOnHover
            // subHeader
            customStyles={customStyles}
          />
        </DataTableExtensions>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content Modal */}
      <div className="modal fade bd-example-modal-lg" tabIndex={-1} aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4" id="myLargeModalLabel">Content</h5>
              <button onClick={() => setnewsitem('')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
              </button>
            </div>
            <div className="modal-body text-start">
              <div  dangerouslySetInnerHTML={{ __html: newsitem.content }} />
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
              <h5 className="modal-title h4" id="myExtraLargeModalLabel">NEWS</h5>
              <button onClick={() => setmodal(!modal) & setallnull() & setcategory(null)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
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
                  </div>{/* Row */}
                  <div className="row"  >
                    <div className="col-sm-4 " >
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect2"  className="form-label"><b>Topics </b></label><br />
                        <Select
                            options={topicsdata ?topicsdata.map((topicitm,kt)=>(
                              { label: topicitm.name, value: topicitm._id }
                            )):null}
                            value={topic}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onChange={newcontent => { settopic(newcontent ) }}
                            isMulti={true}
                            isRequired={true}
                          />
                      </div>
                    </div>{/* Col */}
                    <div className="col-sm-4" >
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect1" className="form-label"><b>Select Category</b></label>
                        <Select
                            options={categorydata ?categorydata.map((catitm,kc)=>(
                              { label: catitm.name, value: catitm._id }
                            ))
                             :null }
                            value={category}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onChange={newcontent => { setcategory( newcontent ) }}
                            isMulti={true}
                            isRequired={true}
                          />
                      </div>

                    </div>{/* Col */}
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <label className="form-label"><b>Media Type</b></label>

                        <select required onChange={(e) => setnewsitem({ ...newsitem, media_type: e.target.value })} value={newsitem.media_type ? newsitem.media_type : ''} className="form-select" id="exampleFormControlSelect1">
                          <option value="" hidden>Select Media Type</option>
                          <option value={"image"}  >Image</option>
                          <option value={"video"}  >Video</option>
                        </select>
                      </div>
                    </div>{/* Col */}

                  </div>{/* Row */}
                  <div className="row">
                    
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Source</b></label>
                        <input type="text" required onChange={(e) => setnewsitem({ ...newsitem, source: e.target.value })} value={newsitem.source ? newsitem.source : ''} className="form-control" placeholder="Enter Source" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Author</b></label>
                        <input type="text"  onChange={(e) => setnewsitem({ ...newsitem, author: e.target.value })} value={newsitem.author ? newsitem.author : ''} className="form-control" placeholder="Enter Author" />
                      </div>
                    </div>{/* Col */}
                  </div>{/* Row */}
                  <div className="row">
                    
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Tags</b></label>
                        <input  type="text" onChange={(e) => settag( e.target.value )} value={tag} className="form-control" placeholder="Enter tags Sepperate by comma(,) . " />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Description</b></label>
                        <textarea rows={3} type="text" required onChange={(e) => setnewsitem({ ...newsitem, short_description: e.target.value })} value={newsitem.short_description ? newsitem.short_description : ''} className="form-control" placeholder="Enter description" />
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
                            <button className='border-0 btn-link   btn-sm' onClick={()=>setimage()}><RiDeleteBin6Fill size={20} color={"red"}/></button>
                          </div>
                          :null }
                        <input   onChange={(e) => handleCompressedUpload(e)} style={{ color: "rgba(0, 0, 0, 0)" }} value={''} type="file" className="form-control" />
                      </div>
                    </div>{/* Col */}
                    <div className="col-sm-6" >
                      <div className="mb-3">
                        <label className="form-label"><b>Thumbnail url</b></label>
                        <div className='' >
                            {newsitem.thumbnail ?
                              <img className='rounded  image-size' src={newsitem.thumbnail.startsWith('https')||newsitem.thumbnail.startsWith('http')? newsitem.thumbnail:BaseURL+newsitem.thumbnail}  alt='img' height="auto" width="auto" />
                              : null}
                          </div>
                       
                        <input  type="text" onChange={(e) => setnewsitem({ ...newsitem, thumbnail: e.target.value })} value={newsitem.thumbnail?newsitem.thumbnail:""} className="form-control" placeholder="Enter thumbnail url" />
                      </div>
                    </div>
                    </div>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className="form-check mb-2">
                        <input type="checkbox" onChange={(e) =>slidercheckfn()} checked={isslider === "false" ? false : Boolean(isslider)}  className="form-check-input" id="checkChecked" />
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
                          <input required type="text" onChange={(e) => setnewsitem({ ...newsitem, url: e.target.value })} value={newsitem.url?newsitem.url:""} className="form-control" placeholder="Enter viedo url" />
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
                      </div>
                    </div>{/* Col */}
                  </div>{/* row */}
                  <div className='text-end '>
                    <button type="button" onClick={() => setmodal(!modal) & setallnull()} className="btn btn-secondary " style={{ marginRight: "5px" }} data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary " style={isloading ? {pointerEvents:'none'}:{}}>Submit</button>
                  </div>
                  <div  className='text-end ' >
                  <ColorRing
                    visible={isloading}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  />
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
