import { useCallback ,useRef}  from "react";
import { toast } from 'react-toastify';
 const useHttpClient=()=>{
    const toastId = useRef(null);
    const request=useCallback(async(url,method="GET",headers={},body={},successmsg) => {
      toastId.current = toast.loading("loading...");
       try{
        const response = await fetch(url, {
            method,
            headers,
            body,
          });
              console.log(response)
              const responseData=await response.json();
              console.log(responseData);
           if(!response.ok){
              throw new Error(responseData.message);
           }else{
              toast.update(toastId.current, {
                render: String(successmsg),
                type: "success",
                isLoading: false,
                hideProgressBar: false,
                autoClose: 2000,
                closeOnClick: true,
              });
                return responseData;
           }
      }catch(err){
         toast.update(toastId.current, {
           render: String(err),
           type: "error",
           isLoading: false,
           hideProgressBar: false,
           autoClose: 2000,
           closeOnClick: true,
         });
         return null;
          console.log(err);
      }
    })
    return {request,toastId};
}


export default useHttpClient;