import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { BiSearch } from 'react-icons/bi'
import { useLocation, useParams } from 'react-router-dom'
import { BaseURL } from './urlcall'
import JoditEditor from 'jodit-react';
// import ReactPlayer from 'react-player'
// import MultiSelect from 'react-multiple-select-dropdown-lite'
import { Simplecontext } from './Simplecontext'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react'
import Callaxios from './Callaxios'
import { ColorRing } from 'react-loader-spinner'
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import "react-data-table-component-extensions/dist/index.css";


function Feedly() {

  const { categorydata, topicsdata,gettopics } = useContext(Simplecontext)

  // let navigate = useNavigate()
  let { category_id } = useParams()
  let { state } = useLocation()
  const [feedly_news, setfeedly_news] = useState([])

  const [modal, setmodal] = useState(false)

  const [newsitem, setnewsitem] = useState("")
  const [topic, settopic] = useState('')
  const [category, setcategory] = useState('')
  const [tag, settag] = useState('')
  const [image, setimage] = useState('')
  const [isslider, setisslider] = useState(false)
  const [sliderdata, setsliderdata] = useState('')
  const [pushnotification, setpushnotification] = useState(false)
  const editor = useRef(null);
  const [isloading, setisloading] = useState(false)
  const [dataloading, setdataloading] = useState(true)
  const [count, setcount] = useState(50)
  // console.log("dataloading",dataloading)
  // console.log("state",state.categoryname)
  const notify = (msg) => toast.success(msg, {
    position: "top-right",
  });
  const notifyerror = (msg) => toast.error(msg, {
    position: "top-right",
  });

  const Choose_Modal = (title, short_description, author, source, tags, date, content, thumbnail, commonTopics) => {
    // console.log("fullContent",content)
    // console.log("commonTopics",commonTopics)
    let descriptiontext
    let descriptiondata = short_description.props.dangerouslySetInnerHTML.__html
    if (descriptiondata.shouldRenderAsText) {
      descriptiontext = descriptiondata
    } else {
      const parser = new DOMParser();
      const doc = parser.parseFromString(descriptiondata, 'text/html');
      descriptiontext = doc.body.textContent;
    }
    // console.log("thmbnail",thumbnail)
    if (!thumbnail) {
      let image = short_description.props.dangerouslySetInnerHTML.__html
      // console.log("image",image)
      if (image) {
        const srcRegex = /<img.*?src="(.*?)"/;
        const srcMatch = image.match(srcRegex);
        if (srcMatch) {
          const srcLink = srcMatch[1];
          // console.log(srcLink)
          thumbnail = srcLink
        }

      }
    }
    if (commonTopics) {
      gettopicname(commonTopics)
    }
    setnewsitem({ ...newsitem, heading: title, short_description: descriptiontext, author: author, source: source, createdAt: date, content: content, thumbnail: thumbnail })
    // setnewsitem({ ...newsitem, short_description: short_description.props.dangerouslySetInnerHTML.__html })
    settag(tags)
    getcategoryname()
    setmodal(true)

  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // setdataloading(true)
    Get_feedly()
    gettopics()

  }, [])
  const gettopicname = (topics) => {
    const listdata = []
    topics.map((itm) => {
      let tdata = topicsdata.filter(t => t.name.trim().toLowerCase().includes(itm.label.toLowerCase()))
      // console.log("tdata",tdata)
      if (tdata.length) {
        listdata.push(tdata[0])
      }
    })
    // console.log("datalist",listdata)
    if (listdata.length) {
      const topic_array = []
      listdata.forEach(topicitm => {
        topic_array.push({ label: topicitm.name, value: topicitm._id },)
      });
      settopic(() => [...topic_array])
    }
    // console.log("listafterloop",listdata[0])
    // let data = topicsdata.filter(t=>(t.name.includes(listdata)))
    // console.log("sat",data)
  }
  const getcategoryname = () => {
    // console.log("category ",state.categoryname)
    if (state.categoryname) {
      // console.log("categorydata",categorydata)
      let categoryvalue = categorydata.filter(t => (state.categoryname).toLowerCase().includes(t.name.trim().toLowerCase()))
      // console.log("category",categoryvalue)
      if (categoryvalue.length) {
        const list_itm = []
        list_itm.push({ label: categoryvalue[0].name, value: categoryvalue[0]._id },)
        setcategory(() => [...list_itm])

      }
    }
  }
  const Get_accesstoken = async () => {
    // const refresh_token = "A00R7OwejcquDDf5_eoJh45w6Xdz7l3p9yNNqp93KNhkagpQhEhRqp-Q2CA6oIc3mYcNxqCOH5YjmwQcfBjlz_HuUlnCAZUlL4h96Jo3Q0JFa1nQ1fge_bU-LXNmA_3Vh3Mo993Lev7Jg6aYWpGUAa9bowzR6KwsGTBya0ryBcU444bvKhUmSaKXjHzkQXEbdi4qqZWgk6cqwxC6Lyy1CoFnnbSoQrap:feedlydev"
    const data = {
      grant_type: 'refresh_token',
      refresh_token: "A_fnGFWHFND_Q1V3TRDmBvN9_jPGMa-0GDFkjGo0awjqriRaOZRN1DAYLEKH-Gec7qTgRA-aQZMBWznshP6-ypMNGSMRN96JRmHttj6CiFpDEw9vG-hhNQXnMQjtPlnOoHhrxYN1OIlJEcRQdM-7HyL80xet58ZVjFeY5YeBC3FRU_68gKoErSSpywnKSXIagne1expjKVbsD3DtEFMlWZSmhc7Ymuo:feedlydev",
      client_id: "681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b",
      client_secret: 'your_client_secret'
    };
    let response = await fetch('https://cloud.feedly.com/v3/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data)
    });
  }
  const Get_feedly = async () => {
    // setdataloading(true)
    const datalist = {
      "url": `https://cloud.feedly.com/v3/streams/contents?streamId=user/681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b/category/${category_id}&count=${count}`
    }
    axios.post(`${BaseURL}feedly/news`, datalist, {
      headers: {
        Authorization: `Axw_tbQ_nCXIh6XUurEXgGTJB1xEpIMqheXQ3Yln8K4rNwBRk_04vVgJef6sZoPHbjKYSYgChlRqM68AiV2LO3MLwm0Hl3HLyKyiiojR42YJVmsDRp100h7Byzr7QrTq_dKsvs35qzjL5qdeps5g7FjtcN2mUIWEF7_cxAxvgE36nDEX1tCMjQRNFskzbERKrRW2Wb9HlrPegNLY7xczeHG8mfcn1kRS0RzpsKaC_VXTY9jBRHiKSNrfSFg:feedlydev`
      },
    })
      .then((res) => {
        // console.log("response",res)
        if(res.data.items){
          setfeedly_news(res.data.items)
        }else{
          // setdataloading(true)
          console.log("error",res.data.message)
        }
        
      })
    setdataloading(false)
  }

  const postnewsfn = async (e) => {
    // console.log("THE CONTENT")
    // console.log("newsitem",newsitem)
    e.preventDefault();
    setisloading(true)

    let action
    let url
    let msg
    let form_data = new FormData();
    let datalist = Object.assign({}, newsitem);

    if (category) {
      let catlist = []
      category.map((item) => {
        catlist.push(item.value);
      });
      datalist.category = catlist
    } else {
      notifyerror("Category not found")
      setisloading(false)
      return
    }
    if (topic) {
      let topiclist = []
      topic.map((item) => {
        topiclist.push(item.value);
      });
      datalist.topics = topiclist
    } else {
      notifyerror("Topic not found")
      setisloading(false)
      return
    }
    datalist.is_slider = isslider
    datalist.is_pushnotification = pushnotification
    // console.log("tagsbefore",tag)
    if (tag) {
      if (Array.isArray(tag) !== true) {

        // console.log("tagvalue",tag)
        // console.log("tag",Array.isArray(tag))

        let taglist = []
        tag.split(',').map((tagitm) => {
          taglist.push(tagitm)
        })
        datalist.tag = taglist
      } else {
        datalist.tag = tag
      }
      form_data.append("tag", JSON.stringify(datalist.tag))
    } else {
      delete datalist.tag
    }
    if (!datalist.content) {
      delete datalist.content
    }


    for (const [key, value] of Object.entries(datalist)) {
      if (key !== "category" && key !== "tag" && key !== "topics") {
        form_data.append(`${key}`, `${value}`)
      }
    }
    form_data.append("category", JSON.stringify(datalist.category))

    form_data.append("topics", JSON.stringify(datalist.topics))
    if (image) {
      if (datalist.thumbnail) {
        notifyerror("Both Image and Thumbnail not allowed Choose image or Thumbnail url")
        setisloading(false)
        return
      } else {
        form_data.append('media', image)
      }

    } else {
      if (!datalist.thumbnail) {
        notifyerror("Image or Thumbnail url not found")
        setisloading(false)
        return
      }

    }

    if (datalist._id) {
      action = "put"
      url = `news/${datalist._id}`
      // form_data = datalist
      delete datalist.topics
      delete datalist.category
      delete datalist.image
      // console.log("formdata",form_data)
      msg = " News updated Successfully"
    } else {
      action = "post"
      url = `news/`
      msg = "News added Successfully"
    }
    try {
      //   for (var pair of form_data.entries()) {
      //     console.log("formdata",pair[0]+ ', ' + pair[1]);
      // }
      let data = await Callaxios(action, url, form_data)
      // console.log("data", data)
      if (data.status === 200) {

        setmodal(!modal)
        Get_feedly()
        notify(msg)
        setisloading(false)
        setallnull()


      } else {
        setisloading(false)
        notifyerror("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      setisloading(false)
      notifyerror("Something went wrong")
    }
  }



  const slidercheckfn = () => {
    if (newsitem.media_type) {
      setisslider(!isslider)
    } else {
      notifyerror("Need to Select Media Type")
    }

  }
  const handledate = (cd) => {
    const date = new Date(cd);
    const isoString = date.toISOString();
    // console.log("date,",isoString)
    return isoString
  }
  const setallnull = () => {
    setnewsitem('')
    setisslider(false)
    setpushnotification(false)
    setimage('')
    setcategory('')
    settopic('')
    settag('')
  }
  const rowNumber = (row) => feedly_news.indexOf(row) + 1;
  const columns = [
    {
      name: "#",
      selector: (row) => rowNumber(row),
      width: "50px"
    },
    {
      name: "HEADING",
      selector: (itm) => <div style={{ wordWrap: "break-word", width: "350px",textAlign:'start' }}>{itm.title}</div>
    },
    {
      name: "NEWS LINK",
      selector: (itm) => <a href={itm.canonicalUrl} target="_blank" >
        <button className='btn btn-primary btn-xs'>Details </button></a>,
    },
    {
      name: "DESCRIPTION",
      selector: (itm) => <div style={{ whiteSpace: "nowrap", width: "150px", maxHeight: "100px", overflow: "hidden", textOverflow: "ellipsis" }} dangerouslySetInnerHTML={{ __html: itm.leoSummary?.sentences[0]?.text ?? itm.summary?.content ?? "" ?? "" }} />,
    },
    {
      name: "PUB.DATE",
      selector: (itm) => (handledate((itm.published)))?.split('T')[0] ?? "",
    },
    {
      name: "ACTION",
      selector: (itm) => <button className=' btn btn-success btn-xs' onClick={() => Choose_Modal(itm.title, <div dangerouslySetInnerHTML={{ __html: itm.leoSummary?.sentences[0]?.text ?? itm.summary?.content ?? "" ?? "" }} />, itm?.author ?? "", itm.origin?.title ?? "", itm?.keywords, handledate(itm.published), itm?.fullContent ?? itm.content?.content ?? itm.summary?.content ?? "", itm.visual?.url ?? "", itm?.commonTopics ?? "")} >Save</button>,
    },
  ]
  const customStyles = {
    cells: {
      style: {
        border: "0.5px solid #f5f2f2 ",
        // textalign:"center"
      },
    },
    header: {
      style: {
        border: "1px solid gray",
        minHeight: "56px",
        paddingLeft: "16px",
        paddingRight: "16px",

      },
    },
    filter: {
      style: {
        bordr: "1px solid gray",
      }
    }

  };
  return (
    <div className='page-wrapper px-3 mt-5'>
      <ToastContainer />
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body" >
              <div className='row ' >
                <div className='col-6' >
                  <h6 className="card-title text-start text-bold">Feedly</h6>
                  {/* <div className='text-start'><button  className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div> */}
                </div>
                <div className='col-6 '>
                  <form className="search-form " style={{ textAlign: " -webkit-right" }} onSubmit={(e) => e.preventDefault() & Get_feedly()} >
                    <div className="input-group d-flex  mr-5" style={{ width: "200px" }}>
                      <label className='mt-2 text-secondary'>Count Show :&nbsp; </label>
                      <input type="number" className="form-control" onChange={(e) => setcount(e.target.value)} value={count} id="navbarForm" />
                      <div className="">
                        <button type='submit' className='btn btn-secondary btn-sm   rounded-right' ><BiSearch size={20} /></button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div>
                

                  <div className='text-center'>
                    <ColorRing
                      visible={dataloading}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[]}
                    />

                  </div>
                   <DataTable
                    columns={columns}
                    data={feedly_news}
                    noHeader
                    responsive
                    pagination
                    highlightOnHover
                    defaultSortField="_id"
                    defaultSortAsc={false}
                    fixedHeader
                    fixedHeaderScrollHeight='72vh'
                    className="tablereact  tablereact  "
                    customStyles={customStyles}
                  />
              </div>
              {/* <div className="table-responsive pt-3" style={{height:"80vh"}} >
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
            {feedly_news.length === 0 ? 
                <tr>
                    <td colSpan={6}>
                      <div style={dataloading?{display:"none"}:{display:"block"}}>
                      No Rss News Found
                      </div>
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
                    feedly_news.map((value,key) => (
                        <tr key={key}>
                            <td>{ key+ 1}</td>
                            <td style={{textAlign:'left',whiteSpace:"initial"}}><div style={{ wordWrap:"break-word" , width:"350px"}}>{ value.title}</div></td>
                            <td style={{textAlign:'left' }}>
                                <a href={ value.canonicalUrl } target="_blank" >
                                <button className='btn btn-primary btn-xs'>Details </button></a>
                               </td>
                            <td style={{textAlign:'left'}}><div style={{  whiteSpace:"nowrap",width:"150px",maxHeight:"100px",overflow:"hidden",textOverflow:"ellipsis"}} dangerouslySetInnerHTML={{ __html: value.leoSummary?.sentences[0]?.text??value.summary?.content??"" ??"" } } /> </td>
                            <td>{ (handledate((value.published)))?.split('T')[0]??"" }</td>
                            <td><button className=' btn btn-success btn-xs' onClick={()=>Choose_Modal(value.title ,<div dangerouslySetInnerHTML={{ __html: value.leoSummary?.sentences[0]?.text??value.summary?.content??"" ?? "" }} />,value?.author??"",value.origin?.title??"",value?.keywords,handledate(value.published),value?.fullContent??value.content?.content??value.summary?.content??"",value.visual?.url??"",value?.commonTopics??"")} >Save</button></td>
                        </tr>
                    ))
                }
                </>
            }
         </tbody>     
       </table>
     </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="modal " tabIndex={-1} role="dialog" style={modal === true ? { display: 'block', paddingRight: 17 } : { display: 'none' }} >
        <div className="modal-dialog modal-xl box-shadow-blank">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4" id="myExtraLargeModalLabel">News</h5>
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
                    </div>

                  </div>

                  <div className="row" style={newsitem._id ? { "display": 'none' } : {}} >
                    <div className="col-sm-4 " >
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect2" className="form-label"><b>Topics </b></label><br />

                        {/* <MultiSelect style={{ maxWidth: "100%" }}
                          onChange={newcontent => { settopic(newcontent ) }}
                          defaultValue={null}
                          options={topicsdata ?topicsdata.map((topicitm,kt)=>(
                            { label: topicitm.name, value: topicitm._id }
                          ))
                            
                           :null }
                      
                        /> */}
                        <Select
                          options={topicsdata ? topicsdata.map((topicitm, kt) => (
                            { label: topicitm.name, value: topicitm._id }
                          )) : null}
                          value={topic}
                          // defaultValue={topicsdata ?topicsdata.filter(t=>t.label.includes()).map((topicitm,kt)=>(
                          //   { label: topicitm.name, value: topicitm._id }
                          // )):null}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          onChange={newcontent => { settopic(newcontent) }}
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
                          defaultValue={null}
                          options={categorydata ?categorydata.map((catitm,kc)=>(
                            { label: catitm.name, value: catitm._id }
                          ))
                           :null }
                          // defaultValue={ label: "sdf", value: "sdsf" }
                        /> */}
                        <Select
                          options={categorydata ? categorydata.map((catitm, kc) => (
                            { label: catitm.name, value: catitm._id }
                          ))
                            : null}
                          value={category}
                          // defaultValue={topicsdata ?topicsdata.filter(t=>t.label.includes()).map((topicitm,kt)=>(
                          //   { label: topicitm.name, value: topicitm._id }
                          // )):null}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          onChange={newcontent => { setcategory(newcontent) }}
                          isMulti={true}
                          isRequired={true}
                        />
                        {/* <select multiple  onChange={(e)=>handleChange(e.target.value)}>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select> */}
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
                        <input type="text" onChange={(e) => setnewsitem({ ...newsitem, source: e.target.value })} value={newsitem.source ? newsitem.source : ''} className="form-control" placeholder="Enter Source" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Author</b></label>
                        <input type="text" onChange={(e) => setnewsitem({ ...newsitem, author: e.target.value })} value={newsitem.author ? newsitem.author : ''} className="form-control" placeholder="Enter author" />
                      </div>
                    </div>{/* Col */}
                  </div>{/* Row */}
                  <div className="row">

                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label className="form-label"><b>Tags</b></label>
                        <input type="text" onChange={(e) => settag(e.target.value)} value={tag} className="form-control" placeholder="Enter tags Sepperate by comma(,) . " />
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
                        <div className=''>

                          {image ?
                            <div className=''>
                              <img className='rounded image-size' src={URL.createObjectURL(image)} alt='img' height="auto" width="auto" />&nbsp;
                              <button className='border-0 btn-link   btn-sm' onClick={() => setimage()}><RiDeleteBin6Fill size={20} color={"red"} /></button>
                            </div>
                            : null}
                        </div>
                        <input onChange={(e) => setimage(e.target.files[0])} style={newsitem._id ? { "display": 'none' } : { color: "rgba(0, 0, 0, 0)" }} value={''} type="file" className="form-control" />
                      </div>
                    </div>

                    <div className="col-sm-6" >
                      <div className="mb-3">
                        <label className="form-label"><b>Thumbnail url</b></label>

                        <div className='' >
                          {newsitem.thumbnail ?
                            <img className='rounded  image-size' src={newsitem.thumbnail.startsWith('https') || newsitem.thumbnail.startsWith('http') ? newsitem.thumbnail : BaseURL + newsitem.thumbnail} alt='img' height="auto" width="auto" />
                            : null}
                        </div>
                        <input type="text" onChange={(e) => setnewsitem({ ...newsitem, thumbnail: e.target.value })} value={newsitem.thumbnail ? newsitem.thumbnail : ""} className="form-control" placeholder="Enter thumbnail url" />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className="form-check mb-2">
                        <input type="checkbox" onChange={(e) => slidercheckfn()} checked={isslider === "false" ? false : Boolean(isslider)} className="form-check-input" id="checkChecked" />
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
                    <button type="button" onClick={() => setmodal(!modal) & setallnull()} className="btn btn-secondary " style={{ marginRight: "5px" }} data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                  </div>
                  <div className='text-end ' >
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

export default Feedly