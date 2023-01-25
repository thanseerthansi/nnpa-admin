// import axios from 'axios'
import React, { useEffect } from 'react'

// const {convertXML, createAST} = require("simple-xml-to-json")
// const { parse } = require('rss-to-json');
import rssToJson from 'rss-to-json';
export default function Rsfeed() {
    useEffect(() => {
        Rssread()
    }, [])
    
    const Rssread =async()=>{
        // let data = await  axios.get("https://thewest.com.au/news/world/rss")
        // console.log("rssdata",data)
        // const myJson = convertXML(data)
        // console.log("myJson",myJson)
        rssToJson(`https://cors-anywhere.herokuapp.com/"https://www1.cbn.com/app_feeds/rss/news/rss.php?section=us"`, {headers: {'host': 'https://nnpa-dc6b4.web.app/'}})
            .then(data => {
                console.log("rssfeed",data.items);
            })
            .catch(error => {
                console.log(error);
            });
    }
  return (
    <div>

    </div>
  )
}
