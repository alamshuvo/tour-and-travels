import multer from 'multer'
import path, { resolve } from 'path'
import { v2 as cloudinary } from 'cloudinary'
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
     console.log(file);
     const fileExt = path.extname(file.originalname);
     const fileName = file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-")+"-"+Date.now()
     
     cb(null,fileName+fileExt)
    }
})

export const  upload =multer({storage:storage})
cloudinary.config({cloud_name:"dqugrb0la",api_key:"873695859846382",api_secret:"cVbocNrFEicAWKXP5PIjiPCVtb8"})


export const sendImageCloudinary = (imageName:string,path:string)=>{
 return new Promise((resolve,rejects)=>{
  cloudinary.uploader.upload(path,{public_id:imageName.trim()},(error,result)=>{
    if (error) {
      rejects(error)
    }
    resolve(result)
  })
 })
}