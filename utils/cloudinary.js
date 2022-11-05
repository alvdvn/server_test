const cloudinary =require('cloudinary');

const dotenv =require('dotenv');

dotenv.config()

cloudinary.config({
    cloud_name: 'dzlcjxu3l',
    api_key: '783651758656233',
    api_secret: 'I5jjibY-0L5Jjpxqo99_7NZxjNI'
});
exports.uploads=(file,folder)=>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file,(result)=>{
        resolve({
            url:result.url,
        })
        },{
            resource_type:"auto",
            folder:folder
        })
    })
}
