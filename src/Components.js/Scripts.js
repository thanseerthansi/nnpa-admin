// import React, { useEffect } from 'react'

export default function Scripts() {
   
        const script = document.createElement('script');
        script.src = "/assets/vendors/feather-icons/feather.min.js";
        script.src = "/assets/js/template.js";
        script.src = "/assets/vendors/core/core.js"              
        script.async = true;
        document.body.appendChild(script);
      


}
