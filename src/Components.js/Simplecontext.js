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
  return (
    <Simplecontext.Provider value={{
        categorydata,getcategory
    }}>{children}</Simplecontext.Provider>
  )
}
