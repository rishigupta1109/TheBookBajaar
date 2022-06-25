import { useCallback ,useRef}  from "react";
import { toast } from 'react-toastify';
 const useHttpClient=()=>{
    const toastId = useRef(null);
    const request=useCallback(async(url,method="GET",headers={},body={},successmsg) => {
       toast.dismiss();
       console.log(url,successmsg);
      if(url&&!toast.isActive(toastId.current)&&successmsg!==""){
        toastId.current = toast.loading("loading...",{toastId:successmsg});
        console.log("craeting toast",toastId.current)
      }
       try{
        let response;
        if(method==="GET"){
            console.log("req")
            response=await fetch(url);
        }
        else{
              response = await fetch(url, {
            method,
            headers,
            body,
          });
        }
      
              console.log(response)
              const responseData=await response.json();
              console.log(responseData);
           if(!response.ok){
              throw new Error(responseData.message);
           }else{
            if(successmsg!==""){
              toast.update(toastId.current, {
                render: String(successmsg),
                type: "success",
                isLoading: false,
                hideProgressBar: false,
                autoClose: 2000,
                closeOnClick: true,
              });}
                return responseData;
           }
      }catch(err){
        if(successmsg!==""){
         toast.update(toastId.current, {
           render: String(err),
           type: "error",
           isLoading: false,
           hideProgressBar: false,
           autoClose: 2000,
           closeOnClick: true,
         });}
         console.log(err);
         return null;
      }
    })
    return {request,toastId};
}


export default useHttpClient;