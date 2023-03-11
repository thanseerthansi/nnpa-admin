import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BaseURL } from './urlcall'
import JoditEditor from 'jodit-react';
import ReactPlayer from 'react-player'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import { Simplecontext } from './Simplecontext'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react'
import Callaxios from './Callaxios'
import { ColorRing } from 'react-loader-spinner'
import Select from 'react-select';


function Rss_News_List() {

    const { categorydata, accesscheck,topicsdata } = useContext(Simplecontext)

    let navigate = useNavigate()
    let { state } = useLocation()
    const [rss_newses, setrss_newses] = useState([])

    const [modal, setmodal] = useState(false)

    const [newsitem, setnewsitem] = useState("")
    const [topic,settopic]=useState()
    const [category,setcategory]=useState([])
     const [tag,settag]=useState()
  const [image, setimage] = useState('')
  const [isslider, setisslider] = useState(false)
  const [sliderdata, setsliderdata] = useState('')
  const [pushnotification, setpushnotification] = useState(false)
  const editor = useRef(null);
 const [isloading,setisloading]=useState(false)
 const [dataloading,setdataloading]=useState(false)



  const notify = (msg) => toast.success(msg, {
    position: "top-right",
  });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-right",
  });


  const  urlparam  = useParams()
  let urlname = urlparam.url_name
  // console.log("dataurl",urlname)

    const Choose_Modal = (title,short_description,content,author,date) => {
        // console.log("author",author)
        // console.log("short",short_description.props.dangerouslySetInnerHTML.__html)
        // console.log("content  ",content.props.dangerouslySetInnerHTML.__html)
        // let regeximg = <img[^>]+src="([^">]+)"
        // const image = document.querySelector('img.webfeedsFeaturedVisual');
        const image = content.props.dangerouslySetInnerHTML.__html  
        let thumbnail;
        if(image){
          // const htmlTag = '<img src="https://example.com/image.jpg" alt="Example Image">';
          const srcRegex = /<img.*?src="(.*?)"/;
          const srcMatch = image.match(srcRegex);
          const srcLink = srcMatch[1];
          // console.log(srcLink)
          thumbnail = srcLink
          // setnewsitem({...newsitem,thumbnail:srcLink})
        }
        let descriptiontext
        let descriptiondata = short_description.props.dangerouslySetInnerHTML.__html
        if (descriptiondata.shouldRenderAsText) {
          descriptiontext = descriptiondata
        } else {
          const parser = new DOMParser();
          const doc = parser.parseFromString(descriptiondata, 'text/html');
          descriptiontext = doc.body.textContent;
        }
        setnewsitem({ ...newsitem, heading: title , short_description: descriptiontext,content:content.props.dangerouslySetInnerHTML.__html,author:author,createdAt:date,source:urlname,thumbnail:thumbnail })
        // setnewsitem({ ...newsitem, short_description: short_description.props.dangerouslySetInnerHTML.__html })
        setmodal(true)
        const list_item=[]
        if (state.category){
          // console.log("ok",state.category )
          list_item.push( {label:state.category.name, value: state.category._id} ,)
          setcategory(()=>[...list_item])
          // console.log("listitm",newsitem)
        } 
           
    }

    useEffect(() => {
      setdataloading(true)
      Get_Rss_News()
    }, [])

    const Get_Rss_News = async () => {
      // console.log("category",state.category.name)
      
        if (state)
        
        {
            const body = {
                'url' : state?.rss_link ?? ''
            }
            try {
                let response  = await Callaxios('post','rss/news',body)
                setrss_newses(response.data)
                // console.log("response",response.data)

            } catch (error) {
                
            }
           
        }
        else
        {
            return navigate('/news')
        }
        setdataloading(false)
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
        if (category) {
          let catlist=[] 
          category.map((item) => {
            catlist.push(item.value);
          });
          datalist.category = catlist
        }else{
          notifyerror("Category not found")
          setisloading(false)
          return
        }
        if (topic) {
          let topiclist=[] 
          topic.map((item) => {
            topiclist.push(item.value);
          });
          datalist.topics = topiclist
        }else{
          notifyerror("Topic not found")
          setisloading(false)
          return
        }
        datalist.is_slider = isslider
        datalist.is_pushnotification = pushnotification
        if (tag){
        if (Array.isArray(tag) !== true){   
          let taglist =[]
          tag.split(',').map((tagitm)=>{
              taglist.push(tagitm)
          })
          datalist.tag = taglist
        }else{
          datalist.tag = tag
        }
        form_data.append("tag",JSON.stringify(datalist.tag))
       }else{
        delete datalist.tag
       }
        if (!datalist.content){
          delete datalist.content
        }
        for (const [key, value] of Object.entries(datalist)) {
          if(key !== "category" && key !== "tag" && key !== "topics"){
            form_data.append(`${key}`, `${value}`)
          }
        }
        form_data.append("category",JSON.stringify(datalist.category))
        
        form_data.append("topics",JSON.stringify(datalist.topics))
        if (image) {
          if (datalist.thumbnail){
            notifyerror("Both Image and Thumbnail are not allowed Choose one of them ")
            setisloading(false)
            return
          }else{
            form_data.append('media', image)
          }
          
        }else{
          if (!datalist.thumbnail){
            notifyerror("Image not found")
            setisloading(false)
            return
          }
          
        }
    
        if (datalist._id) {
          action = "put"
          url=`news/${datalist._id}`
          form_data = datalist
          delete datalist.topics
          delete datalist.category
          delete datalist.image
          // console.log("formdata",form_data)
          msg =" News updated Successfully"
        } else {
          action = "post"
          url=`news/`
          msg ="News added Successfully"
        }
        try {
          // console.log("dataenter")
        //   for (var pair of form_data.entries()) {
        //     console.log("formdata",pair[0]+ ', ' + pair[1]);
        // }
          let data = await Callaxios(action, url, form_data)
          // console.log("data", data)
          if (data.status === 200) {
    
            setmodal(!modal)
            Get_Rss_News()     
            notify(msg)
            setisloading(false)
            setallnull()
          
    
          }else{
            setisloading(false)
            notifyerror("Something went wrong")
          }
        } catch (error) {
          console.log(error)
          setisloading(false)
          notifyerror("Something went wrong")
        }
        } catch (error) {
          console.log(error)
          setisloading(false)
          notifyerror("Something went wrong")
        }
        
      }



    const slidercheckfn=()=>{
        // console.log("slider",isslider)
       if (newsitem.media_type){
        // if (isslider===false || isslider ==="false"){
        //   if(newsitem.media_type==="image"){
            
        //     if( sliderdata.image_slider_count<10 ){
        //       setisslider(true)
        //     }else{
        //       notifyerror("only 10 image sliders are allowed")
        //     }
        //   }else{
        //     if( sliderdata.vedio_slider_count<10 ){
        //       setisslider(true)
        //     }else{
        //       notifyerror("only 10 video sliders are allowed")
        //     }
        //   } 
        // }else{
        //   setisslider(!isslider)
        // }
        setisslider(!isslider)
       }else{
        notifyerror("Need to Select Media Type")
       }
          
      }
      const handledate=(cd)=>{
        const date = new Date(cd);
        const isoString = date.toISOString();
        // console.log("date,",isoString)
        return isoString
      }
      // console.log("caegotry",category)
      const setallnull = () => {
        setnewsitem('')
        setisslider(false)
        setpushnotification(false)
        setimage('')
        setcategory('')
        settopic('')
        settag('')
      }
  return (
    <div className='page-wrapper px-3 mt-5'>
    <ToastContainer/>
   <div className="row">
<div className="col-md-12 grid-margin stretch-card">
 <div className="card">
   <div className="card-body">
     <div className='row ' >
       <div className='col-6' >
     <h6 className="card-title text-start text-bold">{urlname}</h6>
     {/* <div className='text-start'><button  className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div> */}
     </div>
     {/* <div className='col-6'>
     <form className="search-form ml-auto">
       <div className="input-group">
         <div className="input-group-text">
           <BiSearch/>
         </div>
         <input  type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
       </div>
     </form>
     </div> */}
     </div>

     <div className="table-responsive pt-3" style={{height:"80vh"}}>
       <table className="table table-bordered">
         <thead>
           <tr>
             <th>#</th>
             <th>Title</th>
             <th>News Link</th>
             <th>Description</th>
             <th>Pub.Date</th>
             <th>Action</th>
             
             
           </tr>
         </thead>
         <tbody>
            {
                rss_newses.length === 0 ? 
                <tr>
                    <td colSpan={6} > 
                    <div style={dataloading ? {display:"none"}:{display:"block"}} >No Rss News Found</div>
                    <ColorRing
                    visible={dataloading}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[]}
                  /> 
                    </td>
                    
                   
                </tr>
                
                :
                <>
                {
                    rss_newses.map((value,key) => (
                        <tr key={key}>
                            <td>{ key+ 1}</td>
                            <td style={{textAlign:'left',whiteSpace:"initial"}}><div style={{ wordWrap:"break-word" , width:"350px"}}>{ value.title?._text ?? value.title?._cdata ??"" }</div></td>
                            <td style={{textAlign:'left' }}>
                                <a href={ value.link?._text ?? value.link?._cdata??"" } target="_blank" >
                                <button className='btn btn-primary btn-xs'>Details </button></a>
                               </td>
                            <td style={{textAlign:'left'}}><div style={{ whiteSpace:"nowrap",width:"150px",maxHeight:"150px",overflow:"hidden",textOverflow:"ellipsis"}} dangerouslySetInnerHTML={{ __html: value.description?._text ?? value.description?._cdata??"" }} /> </td>
                            <td>{ (Date(value.pubDate?._text ?? value.pubDate?._cdata??"").split('+')[0])  }</td>
                            <td><button className='btn btn-success btn-xs' onClick={()=>Choose_Modal(value.title?._text ?? value.title?._cdata??"" ,<div dangerouslySetInnerHTML={{ __html:  value.description?._text ?? value.description?._cdata??"" }} />,<div dangerouslySetInnerHTML={{ __html: value['content:encoded'] ? value['content:encoded']['_cdata'] : null   }} /> ,value['dc:creator']?value['dc:creator']['_cdata']:"",handledate(value.pubDate?._text ?? value.pubDate?._cdata??"")  )} >Save</button></td>
                        </tr>
                    ))
                }
                </>
            }
         </tbody>
      
       </table>
     </div>
   </div>
 </div>
</div>
</div>




     
      <div className="modal " tabIndex={-1} role="dialog" style={modal === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }} >
        <div className="modal-dialog modal-xl box-shadow-blank">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4" id="myExtraLargeModalLabel">News</h5>
              <button onClick={() => setmodal(!modal)&setallnull()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
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
                    </div>
                    
                  </div>

                  <div className="row" style={newsitem._id ?{"display":'none'}:{}} >
                    <div className="col-sm-4 " >
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect2"  className="form-label"><b>Topics </b></label><br />
                      
                        {/* <MultiSelect style={{ maxWidth: "100%" }}
                          onChange={newcontent => { settopic(newcontent ) }}
                          defaultValue={null}
                          options={topicsdata ?topicsdata.map((topicitm,kt)=>(
                            { label: topicitm.name, value: topicitm._id }
                          ))
                            
                           :null }
                      
                        /> */}
                        <Select
                            options={topicsdata ?topicsdata.map((topicitm,kt)=>(
                              { label: topicitm.name, value: topicitm._id }
                            )):null}
                            value={topic}
                            // defaultValue={topicsdata ?topicsdata.filter(t=>t.label.includes()).map((topicitm,kt)=>(
                            //   { label: topicitm.name, value: topicitm._id }
                            // )):null}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onChange={newcontent => { settopic(newcontent ) }}
                            isMulti={true}
                            isRequired={true}
                          />
                      </div>

                    </div>
                    <div className="col-sm-4" >
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect1" className="form-label"><b>Select Category</b></label>
                       
                        {/* <MultiSelect style={{ maxWidth: "100%" }}
                          onChange={newcontent => { setcategory( newcontent ) }}
                          selected={{label:state?._name??"",value:state?._id??""}}
                          defaultValue 
                          options={categorydata ?categorydata.map((catitm,kc)=>(
                            { label: catitm.name, value: catitm._id }
                          ))
                           :null }
                          // defaultValue={ label: "sdf", value: "sdsf" }
                        /> */}
                        <Select
                            options={categorydata ?categorydata.map((catitm,kc)=>(
                              { label: catitm.name, value: catitm._id }
                            ))
                             :null }
                            value={category}
                            // defaultValue={state.category ? { label: state.category.name, value: state.category._id }:null}
                            
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onChange={newcontent => { setcategory( newcontent ) }}
                            isMulti={true}
                            isRequired={true}
                          />
                      </div>

                    </div>
                    <div className="col-sm-4">
                      <div className="mb-3">
                        <label className="form-label"><b>Media Type</b></label>

                        <select required onChange={(e) => setnewsitem({ ...newsitem, media_type: e.target.value })} value={newsitem.media_type ? newsitem.media_type : ''} className="form-select" id="exampleFormControlSelect1">
                          <option value="" hidden>Select Media Type</option>
                          <option value={"image"}  >Image</option>
                          <option value={"video"}  >Video</option>
                        </select>
                      </div>
                    </div>

                  </div>
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
                        <input type="text"  onChange={(e) => setnewsitem({ ...newsitem, author: e.target.value })} value={newsitem.author ? newsitem.author : ''} className="form-control" placeholder="Enter author" />
                      </div>
                    </div>{/* Col */}
                  </div>{/* Row */}
                  <div className="row">
                    
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Tags</b></label>
                        <input type="text" onChange={(e) => settag( e.target.value )} value={tag} className="form-control" placeholder="Enter tags Sepperate by comma(,) . " />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Description</b></label>
                        <textarea type="text" rows={3} onChange={(e) => setnewsitem({ ...newsitem, short_description: e.target.value })} value={newsitem.short_description ? newsitem.short_description : ''} className="form-control" placeholder="Enter description" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Image</b></label>
                        {image ?
                          <div className=''>
                            <img className='rounded image-size' src={URL.createObjectURL(image)} alt='img' height="auto" width="auto" />&nbsp;
                            <button className='border-0 btn-link   btn-sm' onClick={()=>setimage()}><RiDeleteBin6Fill size={20} color={"red"}/></button>
                          </div>
                          : null
                          }
                        <input   onChange={(e) => setimage(e.target.files[0])} style={newsitem._id ?{"display":'none'}: { color: "rgba(0, 0, 0, 0)" }} value={''} type="file" className="form-control" />
                      </div>
                    </div>
                    <div className="col-sm-6" >
                      <div className="mb-3">
                        <label className="form-label"><b>Thumbnail url</b></label>

                        <div className='' >
                            {newsitem.thumbnail ?
                              <img className='rounded  image-size' src={newsitem.thumbnail.startsWith('https')||newsitem.thumbnail.startsWith('http')? newsitem.thumbnail:BaseURL+newsitem.thumbnail} alt='img' height="auto" width="auto" />
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

                          tabIndex={1} 
                          onBlur={(newContent) => setnewsitem({ ...newsitem, content: newContent })} // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => { }}
                        />

                        
                      </div>
                    </div>
                  </div>
                 
                  <div className='text-end '>
                    <button type="button" onClick={() => setmodal(!modal)&setallnull()} className="btn btn-secondary " style={{ marginRight: "5px" }} data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                  </div>
                  <div  className='text-end ' >
                  <ColorRing
                    visible={isloading}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[]}
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

export default Rss_News_List