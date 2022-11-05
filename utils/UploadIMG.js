const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');

let streamUpload = (req)=>{
    if (req.file ==null){
        return ;
    }
    return new Promise((resolve,reject)=>{
        let stream =cloudinary.uploader.upload_stream(
            (err,result)=>{
                if (result){
                    resolve(result);
                }else {
                    reject(err);
                }
            }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};
let steamUploadMutilFile =(req)=>{
    return new Promise((resolve,reject)=>{
        req.files.forEach(async (file,i)=>{
            const stream =cloudinary.uploader.upload_stream(file,{
                resource_type: "image",
                crop: "scale",
                quality: "auto",
            });
            streamifier.createReadStream(req.files.buffer).pipe(stream);
        })
    })
}
module.exports = {streamUpload,steamUploadMutilFile};
