import React, { createContext, useEffect, useState } from 'react'
import Callaxios from './Callaxios';
export const Simplecontext = createContext();

export default function Simplecontextprovider({children}) {
    const [categorydata,setcategorydata]=useState([])
    const [topicsdata,settopicsdata]=useState([])
    useEffect(() => {
        getcategory()
        gettopics()
    }, [])
    const getcategory =async()=>{
        try {
            let data = await Callaxios("get","categories/")
            // console.log("data",data.data.data)
            if (data.status===200){
                setcategorydata(data.data.data)
            }
        } catch (error) {
            
        }
    }
    const gettopics = async()=>{
        try {
            let data = await Callaxios("get","topics/")
            // console.log("datatopic",data)
            if (data.status===200){
                settopicsdata(data.data.data)
            }
        } catch (error) {
            
        }
    }
    const accesscheck =()=>{
       let token = window.localStorage.getItem('login-access')
    //    console.log("tken",token)
    if (token==="false"){
        // console.log("tkensdds")
        window.location="/"
    }
    
    }
  return (
    <Simplecontext.Provider value={{
        categorydata,getcategory,accesscheck,topicsdata,gettopics
    }}>{children}</Simplecontext.Provider>
  )
}
