const { format } = require('util');
const { createWorker } = require('tesseract.js');
var pdfUtil = require('pdf-to-text');
var inspect = require('eyes').inspector({ maxLength: 20000 });
var pdf_extract = require('pdf-extract');
var PDFImage = require("pdf-image").PDFImage;
const path = require("path");
const { CostExplorer } = require('aws-sdk');
var XLSX = require('xlsx');
const axios = require("axios");
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
})


var S3bucketName;
var BucketURL;
S3bucketName = process.env.AWS_S3_BUCKET;
BucketURL = process.env.AWS_S3_BUCKET_URL;

const worker = createWorker();
/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = async (userId, file) => new Promise(async (resolve, reject) => {
    async function downloadFile(bucketName, fileName) {
        let s3Params = {
            Bucket: bucketName,
            Key: fileName,
        };
        await s3.getObject(s3Params, function (err, data) {
            if (err) {
                resolve('');
            } else {
                var workbook = XLSX.read(data.Body, { type: 'buffer' });
                var sheet_name_list = workbook.SheetNames;
                let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                const result = xlData;
                resolve(result);
            }
        });
    }
    const { originalname, buffer } = file;
    let fileinfo = getFileExtension(originalname)
    const params = {
        Bucket: S3bucketName,
        Key: userId + '/' + fileinfo[0] + '_' + new Date().getTime() + '.' + fileinfo[1],
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        Body: buffer
    }

    await s3.upload(params, (err, data) => {
        if (err) {
            
        }
        downloadFile(S3bucketName, params?.Key).catch((err) => { 
    })
});
function getFileExtension(filename) {
    // get file extension
    const extension = filename.split('.');
    return extension;
}
const uploadImage1 = (userId, file) => new Promise((resolve, reject) => {
    
    const { originalname, buffer } = file;
    const params = {
        Bucket: S3bucketName,
        Key: userId + '/' + originalname,
        ContentType: 'application/pdf',
        Body: buffer
    }
    s3.upload(params, (err, data) => {
        if (err) {
            
        }
    })

    blobStream.on('finish', async (success) => {
        var publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        
        resolve(publicUrl, file)
    })
        .on('error', (err) => {
            
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
});

module.exports = {
    uploadImage: uploadImage,
    uploadImage1: uploadImage1
};