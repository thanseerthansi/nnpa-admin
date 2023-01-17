import React, { createContext, useEffect, useState } from 'react'
import Callaxios from './Callaxios';
export const Simplecontext = createContext();

export default function Simplecontextprovider({children}) {
    const [categorydata,setcategorydata]=useState([])
    useEffect(() => {
        getcategory()
    }, [])
    const getcategory =async()=>{
        try {
            let data = await Callaxios("get","category/get-all-category/")
            // console.log("data",data)
            if (data.data.status===200){
                setcategorydata(data.data.data)
            }
        } catch (error) {
            
        }
        

    }
    const accesscheck =()=>{
       let token = window.localStorage.getItem('login-access')
       console.log("tken",token)
    if (token==="false"){
        // console.log("tkensdds")
        window.location="/"
    }
    
    }
  return (
    <Simplecontext.Provider value={{
        categorydata,getcategory,accesscheck
    }}>{children}</Simplecontext.Provider>
  )
}
