// import axios from 'axios'
import axios from 'axios';
import React, { useEffect } from 'react'

// const {convertXML} = require("simple-xml-to-json")
// const { parse } = require('rss-to-json');
// import rssToJson from 'rss-to-json';
export default function Rsfeed() {
    useEffect(() => {
        Rssread()
    }, [])
    
    const Rssread =async()=>{
        // const header ='Authorization: Bearer OAuthA3tWOfOcxZXMGY58frpCRSofj905vGD7hGr0EfcQqBtVwqRlBKOpqk0VLWuGZbRCAsAapwV_BjtHmPoxXcHnK1jv_caiqSu0gzu-TvTdcCWJ7RcKKXRy6sfotyNRbZSDkmj_ylMSleno1EBSJq2V64A0VzjRZXbZbCwBIrskCss7DRs9BQxjZp0uCVgwopDWuBqICGrI5yUTm31r4nStfsd-a1_ZWR40Gdn5B9QGxXliNdKYUvnZsVt747El';

        // let data = await  axios.get(" https://feedly.com/i/collection/content/user/681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b/category/a384bc96-c5c0-4bc6-906b-a4cd82682c10",)
        // console.log("rssdata",data)
        const accessToken = 'A3tWOfOcxZXMGY58frpCRSofj905vGD7hGr0EfcQqBtVwqRlBKOpqk0VLWuGZbRCAsAapwV_BjtHmPoxXcHnK1jv_caiqSu0gzu-TvTdcCWJ7RcKKXRy6sfotyNRbZSDkmj_ylMSleno1EBSJq2V64A0VzjRZXbZbCwBIrskCss7DRs9BQxjZp0uCVgwopDWuBqICGrI5yUTm31r4nStfsd-a1_ZWR40Gdn5B9QGxXliNdKYUvnZsVt747El:feedlydev';

        axios.get('https://cloud.feedly.com/v3/streams/contents?streamId=user/681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b/category/a384bc96-c5c0-4bc6-906b-a4cd82682c10', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });




        // Authorization: OAuth <access_token>
        // const myJson = convertXML(data)
        // console.log("myJson",myJson)
        // rssToJson(`A3tWOfOcxZXMGY58frpCRSofj905vGD7hGr0EfcQqBtVwqRlBKOpqk0VLWuGZbRCAsAapwV_BjtHmPoxXcHnK1jv_caiqSu0gzu-TvTdcCWJ7RcKKXRy6sfotyNRbZSDkmj_ylMSleno1EBSJq2V64A0VzjRZXbZbCwBIrskCss7DRs9BQxjZp0uCVgwopDWuBqICGrI5yUTm31r4nStfsd-a1_ZWR40Gdn5B9QGxXliNdKYUvnZsVt747El:feedlydev`)
        //     .then(data => {
        //         console.log("rssfeed",data.items);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
//         fetch("https://cloud.feedly.com/v3/streams/contents?streamId=user/681cb5bf-c7bd-4c08-bbdc-bfee06c38a8b/category/a384bc96-c5c0-4bc6-906b-a4cd82682c10", {
//   method: "GET",
//   headers: {
//     Authorization: "Bearer A3tWOfOcxZXMGY58frpCRSofj905vGD7hGr0EfcQqBtVwqRlBKOpqk0VLWuGZbRCAsAapwV_BjtHmPoxXcHnK1jv_caiqSu0gzu-TvTdcCWJ7RcKKXRy6sfotyNRbZSDkmj_ylMSleno1EBSJq2V64A0VzjRZXbZbCwBIrskCss7DRs9BQxjZp0uCVgwopDWuBqICGrI5yUTm31r4nStfsd-a1_ZWR40Gdn5B9QGxXliNdKYUvnZsVt747El:feedlydev"
//   }
// })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));
    }
  return (
    <div>

    </div>
  )
}
