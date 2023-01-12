import axios from 'axios'
import React from 'react'
import { BaseURL } from './urlcall'

export default async function Callaxios(action,url,datalist) {
    try {
        let data
        if (action==="get"){
            data = await axios.get(BaseURL+url,{params:datalist})
        }else if (action==="post") {
            // console.log("datainpost",datalist)
            data = await axios(
                {
                    method: 'post',
                    url: BaseURL+url,           
                    data: datalist
                }
            )
        } else {
            data =" error  "  
        }
        return data
    } catch (error) {
        console.log(error)
    }
}
