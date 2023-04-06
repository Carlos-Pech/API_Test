const path  = require('path')
const multer =require('multer')

var storage = multer.diskStorage
({
    destination:(req, file, cb)=>{
        cb(null, './uploads')
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})
// var upload = multer({
//     storage:storage,
//         fileFilter:function(req, file, callback){
// if(
//         file.mimetype =="image/png" ||
//         file.mimetype == "image/jpg"
//     ){
//             callback(null, true)
//         } else
//         {
//                 console.log('Only jpg & ong file supported')
//                 callback(null, false)
//             }
//         },
//         limits:{
//                 fileSize:1024*1024 *2
//             }
//         })
                                    
upload = multer({storage})
module.exports = upload