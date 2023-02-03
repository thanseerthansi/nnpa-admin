import axios from 'axios'
// import React from 'react'
import { BaseURL } from './urlcall'

export default async function Callaxios(action,url,datalist) {
    try {
        let data
        if (action==="get"){
            data = await axios.get(BaseURL+url,{params:datalist})
        }else {
            // console.log("datainpost",datalist)
            data = await axios(
                {
                    method: action,
                    url: BaseURL+url,           
                    data: datalist
                }
            )
        } 
        return data
    } catch (error) {
        console.log(error)
    }
}
