var ImageKit = require("imagekit");
var mongoose = require('mongoose');

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});
/**
 * This function uploads a file to ImageKit and returns a promise.
 * @param {Object} file - The file object to be uploaded.
 * @returns {Promise} - A promise that resolves with the upload result or rejects with an error.
 */
// This function is used to upload files to ImageKit.
// It takes a file object as an argument and returns a promise.
// The file object should have a buffer property containing the file data.
// The function uses the ImageKit SDK to upload the file.
// The file is uploaded to the "Moody-Player" folder in ImageKit.
function uploadFile(file){
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file:file.buffer,
            fileName:(new mongoose.Types.ObjectId()).toString(), 
            folder:"Moody-Player"
        },(error,result)=>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        });
    });
};

module.exports = uploadFile;