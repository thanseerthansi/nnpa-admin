import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { BiAddToQueue } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Category from './Category'
import { BaseURL } from './urlcall'

function FeedlyCategory() {
    let navigate = useNavigate()
    const [modal, setmodal] = useState(false)
    const [feedly_data, setfeedly_data] = useState("")
    const [all_feedly_category, setall_feedly_category] = useState([])
    const [page, setpage] = useState(0)
    const [limit, setlimit] = useState(10)

    useEffect(() => {
        Get_All_Feedly()
    }, [])


    const Get_All_Feedly = () => {
        axios.get(`${BaseURL}feedly`,{
            params : {
                'page' : page,
                'limit' : limit
            }
        })
        .then((res) => {
            setall_feedly_category(res.data.data)
        })
        .catch((error)=>{
            console.log("Something Went Wrong")
        })
    }
    

    const Feedly_Category =  (e) => {
        
        e.preventDefault()
        if (feedly_data._id){
            axios.put(`${BaseURL}feedly/${feedly_data._id}`,feedly_data)
            .then((res) => {
                setmodal( false )
                setfeedly_data("")
                Get_All_Feedly()
            })
            .catch((err)=>{
                console.log("Something went Wrong")
            })
        }
        else{
            axios.post(`${BaseURL}feedly`,feedly_data)
            .then((res) => {
                setmodal( false )
                setfeedly_data("")
                Get_All_Feedly()
            })
            .catch((err)=>{
                console.log("Something went Wrong")
            })
        }
    }



    const submitdelete = (itemid) => {
        confirmAlert({
          title: "Confirmation",
          message: `Are you sure to delete this ?`,
          buttons: [
            {
              label: "Yes",
              onClick: () => Delete_feedly_Category(itemid),
            },
            {
              label: "No"
              // onClick: () => alert("Click No")
            }
          ],
    
        });
      };

      const Delete_feedly_Category = (id) => {
        axios.delete(`${BaseURL}feedly/${id}`)
        .then((res) => {
            Get_All_Feedly()
        })
      }


  return (
    <div className='page-wrapper px-3 mt-5'>
    <ToastContainer/>
   <div className="row">
<div className="col-md-12 grid-margin stretch-card">
 <div className="card">
   <div className="card-body" >
     <div className='row ' >
       <div className='col-6' >
     <h6 className="card-title text-start text-bold">Feedly</h6>
     <div className='text-start'><button  className='btn btn-success btn-sm' onClick={()=>setmodal(true)} ><BiAddToQueue size={20}/>Add</button></div>
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

     <div className="table-responsive pt-3" style={{height:"80vh"}} >
       <table className="table table-bordered">
         <thead>
           <tr>
             <th>#</th>
             <th>Name</th>
             <th>Category ID</th>
             <th>Action</th>
        
             
           </tr>
         </thead>
            <tbody>
                {
                    all_feedly_category.length === 0 ? <tr><td style={{ textAlign:"center"}} colSpan={4}><b> No Feedly Category Found </b></td></tr>
                    :
                    <>
                    {
                        all_feedly_category.map((value,key) => (
                            <tr key={key}>
                                <td>{ key + 1 }</td>
                                <td>{ value.name }</td>
                                <td>{ value.feedly_category_id }</td>
                                <td>
                                <button type="button"  className="btn btn-primary btn-xs " style={{ marginRight: "5px" }} onClick={()=>navigate(`/news/feedly/${value.feedly_category_id}`)}  > Show News </button> <br />
                                <button type="button"  className="btn btn-warning btn-xs mt-2" style={{ marginRight: "5px" }}  onClick={()=>setfeedly_data({...feedly_data , name : value.name , feedly_category_id : value.feedly_category_id , _id : value._id })&setmodal(true)} > Edit </button> <br />
                                <button type="button"  className="btn btn-danger btn-xs mt-2" style={{ marginRight: "5px" }} onClick={()=>submitdelete(value._id)}  > Delete </button> <br />
                                </td>
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
        <div className="modal-dialog modal-md box-shadow-blank">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4" id="myExtraLargeModalLabel">Feedly Category</h5>
              <button onClick={() => setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close">
              </button>
            </div>
            <div className="modal-body text-start">
              <div>
                <form onSubmit={(e)=>Feedly_Category(e)}>
                <div className="row">
                    <div className="col-sm-12">
                      <div className="mb-3">
                        <label className="form-label "><b>Category Name</b></label>
                        <input  required type="text" value={ feedly_data.name ? feedly_data.name : ''} onChange={(e)=>setfeedly_data({...feedly_data , name : e.target.value })} className="form-control" placeholder="Enter Category Name" />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="mb-3">
                        <label className="form-label "><b>Category ID</b></label>
                        <input  required type="text" value={ feedly_data.feedly_category_id ? feedly_data.feedly_category_id : ''} onChange={(e)=>setfeedly_data({...feedly_data , feedly_category_id : e.target.value })} className="form-control" placeholder="Enter Category ID" />
                      </div>
                    </div>                
                  </div>
                  <div className='row'>
                  <div className='text-end '>
                    <button type="button" onClick={() => setmodal(!modal)} className="btn btn-secondary " style={{ marginRight: "5px" }} data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary ">Submit</button>
                  </div>
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

export default FeedlyCategory