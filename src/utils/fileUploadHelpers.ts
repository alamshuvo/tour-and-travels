import multer from 'multer'
import path from 'path'
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