// import axios from 'axios'
import axios from 'axios';
import React, { useEffect } from 'react'

// const {convertXML} = require("simple-xml-to-json")
// const { parse } = require('rss-to-json');
// import rssToJson from 'rss-to-json';
// let googleNewsAPI = require("google-news-json");
// import Parser from "rss-parser";
export default function Rsfeed() {
    // let parser = new Parser();
    // const CORS_PROXY = "<some cors proxy>";
    useEffect(() => {
        Rssread()
    }, [])
    
    // const Rssread =async()=>{
    //     // const header ='Authorization: Bearer OAuthA3tWOfOcxZXMGY58frpCRSofj905vGD7hGr0EfcQqBtVwqRlBKOpqk0VLWuGZbRCAsAapwV_BjtHmPoxXcHnK1jv_caiqSu0gzu-TvTdcCWJ7RcKKXRy6sfotyNRbZSDkmj_ylMSleno1EBSJq2V64A0VzjRZXbZbCwBIrskCss7DRs9BQxjZp0uCVgwopDWuBqICGrI5yUTm31r4nStfsd-a1_ZWR40Gdn5B9QGxXliNdKYUvnZsVt747El';

    //     // let data = await  axios.get(" https://feedly.com/i/collection/content/user/681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b/category/a384bc96-c5c0-4bc6-906b-a4cd82682c10",)
    //     // console.log("rssdata",data)
    //     const accessToken = 'A3tWOfOcxZXMGY58frpCRSofj905vGD7hGr0EfcQqBtVwqRlBKOpqk0VLWuGZbRCAsAapwV_BjtHmPoxXcHnK1jv_caiqSu0gzu-TvTdcCWJ7RcKKXRy6sfotyNRbZSDkmj_ylMSleno1EBSJq2V64A0VzjRZXbZbCwBIrskCss7DRs9BQxjZp0uCVgwopDWuBqICGrI5yUTm31r4nStfsd-a1_ZWR40Gdn5B9QGxXliNdKYUvnZsVt747El:feedlydev';

    //     axios.get('https://cloud.feedly.com/v3/streams/contents?streamId=user/681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b/category/a384bc96-c5c0-4bc6-906b-a4cd82682c10', {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`
    //     }
    //     })
    //     .then(response => {
    //         console.log("response",response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });

    //     console.log("rssfeed other")
        


    //     // Authorization: OAuth <access_token>
    //     // const myJson = convertXML(data)
    //     // console.log("myJson",myJson)
    //     // rssToJson(`https://news.google.com/news/rss`)
    //     //     .then(data => {
    //     //         console.log("rssfeed",data);
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error);
    //     //     });
    // //         fetch("https://cloud.feedly.com/v3/streams/contents?streamId=user/681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b/category/a384bc96-c5c0-4bc6-906b-a4cd82682c10", {
    // //   method: "GET",
    // //   headers: {
    // //     Authorization: "Bearer A3tWOfOcxZXMGY58frpCRSofj905vGD7hGr0EfcQqBtVwqRlBKOpqk0VLWuGZbRCAsAapwV_BjtHmPoxXcHnK1jv_caiqSu0gzu-TvTdcCWJ7RcKKXRy6sfotyNRbZSDkmj_ylMSleno1EBSJq2V64A0VzjRZXbZbCwBIrskCss7DRs9BQxjZp0uCVgwopDWuBqICGrI5yUTm31r4nStfsd-a1_ZWR40Gdn5B9QGxXliNdKYUvnZsVt747El:feedlydev"
    // //   }
    // // })
    // //   .then(response => response.json())
    // //   .then(data => console.log(data))
    // //   .catch(error => console.error(error));
    
    // // let news = await googleNewsAPI.getNews(googleNewsAPI.TOP_NEWS, null, "en-GB");
    // }
    const Rssread=async()=>{
        try {
            // let data = await parser.parseURL("https://rollingout.com/feed/");
            // console.log("daa",data)
            // let parser = new Parser();
            // const CORS_PROXY = "<some cors proxy>";
            // let data = await rssToJson(`https://rollingout.com/feed/`,{headers:{}})
            // console.log("rssfeed",data)
        //     let response = await fetch("https://rollingout.com/feed/", {
        //         method: 'GET',
        //         headers: {
        //           'Access-Control-Allow-Origin': '*'
        //         }
        //       });
        //       console.log("response",response)
        //       let data = await response.json();
        //       console.log("data",data)
        } catch (error) {
          console.log(error)  
        }
        
    }
  return (
    <div>

    </div>
  )
}
