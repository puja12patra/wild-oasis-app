//USING CUSTOM HOOK

import { useEffect, useRef } from "react";



export function useOutsideClick(handler, listenCapturing=true)
{
   //REACT QUERY FOR CLICK OUTSIDE EVENT::
   
    const ref = useRef();
   
     useEffect(() => {
       function handleClick(e) {
   
         if(ref.current && !ref.current.contains(e.target))
         {
           //Click Outside and then Form Window close
           console.log("Click Outside");        
           handler();
         }
       };
   
       document.addEventListener("click", handleClick , listenCapturing);
   
       return () => document.removeEventListener("click", handleClick , listenCapturing);
       
     }, [handler, listenCapturing]);
   

      return ref;
}