import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUD_UPLOAD_PRESET  = "moneymanager";

export const UPLOAD_PROFILE_IMAGE = async(image)=>{
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset",CLOUD_UPLOAD_PRESET);

    try{
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE,{
            method: "POST",
            body: formData
        });
       if(!response.ok){
        const errorData = await response.json();
        throw new Error(`Cloudinary upload fail: ${errorData.error.message||response.statusText}`)
       }
       const data = await response.json();
       return data.secure_url;
    }catch(error){
         console.log("Error in uploading image",error);
         throw error;
    }
}