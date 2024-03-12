const { createWorker } = require('tesseract.js');
var pdf_extract = require('pdf-extract');
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

const uploadImage = (userId,file) => new Promise((resolve, reject) => {
    async function downloadFile(bucketName, fileName) {
        var split = '';
        var val = '';
        var output = {};


        function identifyPdf(temp) {
            for (let i = 0; i < temp.length; i++) {
                val = val.concat(temp[i])
            }
            try {
                
                split = val.split("\n");
                
                split = split.filter(function(el) {
                    return el.trim() != '';
                });
                

                var boeNumberLine = getAllIndexes("BE No");
                var sbno = getAllIndexes("SB");
                getJson()
            } catch {
                
            }
            
            
        }
        function getAllIndexes(val) {
            var indexes = [],
                i = -1;
            var line;
            for (var m = 0; m < split.length; m++) {
                while ((i = split[m].indexOf(val, i + 1)) != -1) {
                    if (line != m) indexes.push(m);
                    line = m;
                }
            }
            return indexes;
        }

        function getValuesFromPdf(line, separator, index, str2) {
            if (str2 == null) {
                return split[line].split(separator)[index];
            } else if (str2 != null) {
                return str2.split(separator)[index];
            }
        }

        function getJson() {

            var billNo = getAllIndexes("Bill");
            if (billNo.length > 0) {
                var billNo2 = getValuesFromPdf(parseInt(billNo) + 0, " ", 3, null);
                output["billNo"] = billNo2;

                if (billNo2 == undefined || billNo2 == "") {
                    var billNo3 = getAllIndexes("BiII");
                    
                    if (billNo3.length > 0) {
                        var billNo4 = getValuesFromPdf(parseInt(billNo3) + 0, " ", 3, null);
                        output["billNo"] = billNo4
                    }
                }
            } else {
                output["billNo"] = ""
            }


            // Date of Bill
            var date = getAllIndexes("Customer");
            
            if (date.length > 0) {
                var date2 = getValuesFromPdf(parseInt(date) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(date) + 1, " ", 3, null) == undefined) {
                    output["date"] = date2
                }
                if (getValuesFromPdf(parseInt(date) + 1, " ", 3, null) != undefined) {
                    date2 = date2 + getValuesFromPdf(parseInt(date) + 1, " ", 3, null);
                    output["date"] = date2
                }
            } else {
                output["date"] = ""
            }


            // Customer Name

            var customer = getAllIndexes("Customer");
            
            if (customer.length > 0) {
                var customer2 = getValuesFromPdf(parseInt(customer) + 0, " ", 2, null) + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 3, null);
                if (getValuesFromPdf(parseInt(customer) + 0, " ", 4, null) == undefined) {
                    output["customer"] = customer2
                }
                if (getValuesFromPdf(parseInt(customer) + 0, " ", 4, null) != undefined) {
                    customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 4, null);

                    if (getValuesFromPdf(parseInt(customer) + 0, " ", 5, null) == undefined) {
                        output["customer"] = customer2
                    }

                    if (getValuesFromPdf(parseInt(customer) + 0, " ", 5, null) != undefined) {
                        customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 5, null);

                        if (getValuesFromPdf(parseInt(customer) + 0, " ", 6, null) == undefined) {
                            output["customer"] = customer2
                        }
                        if (getValuesFromPdf(parseInt(customer) + 0, " ", 6, null) != undefined) {
                            customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 6, null);

                            if (getValuesFromPdf(parseInt(customer) + 0, " ", 7, null) == undefined) {
                                output["customer"] = customer2
                            }
                            if (getValuesFromPdf(parseInt(customer) + 0, " ", 7, null) != undefined) {
                                customer2 = customer2 + " " + getValuesFromPdf(parseInt(customer) + 0, " ", 7, null);
                                output["customer"] = customer2
                            }
                        }

                    }
                }

            } else {
                output["customer"] = ""
            }

            // Party Name

            var partyName = getAllIndexes("Other");
            
            if (partyName.length > 0) {
                var partyName2 = getValuesFromPdf(parseInt(partyName) + 1, " ", 1, null) + " " + getValuesFromPdf(parseInt(partyName) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(partyName) + 1, " ", 3, null) == undefined) {
                    output["partyName"] = partyName2
                }
                if (getValuesFromPdf(parseInt(partyName) + 1, " ", 3, null) != undefined) {
                    partyName2 = partyName2 + ' ' + getValuesFromPdf(parseInt(partyName) + 1, " ", 3, null);

                    if (getValuesFromPdf(parseInt(partyName) + 1, " ", 4, null) == undefined) {
                        output["partyName"] = partyName2
                    }
                    if (getValuesFromPdf(parseInt(partyName) + 1, " ", 4, null) != undefined) {
                        partyName2 = partyName2 + ' ' + getValuesFromPdf(parseInt(partyName) + 1, " ", 4, null);
                        output["partyName"] = partyName2
                    }
                }
            } else {
                output["partyName"] = ""
            }

            // Exchange Rate

            var exchangeRate = getAllIndexes("Other");
            
            if (exchangeRate.length > 0) {
                var exchangeRate2 = getValuesFromPdf(parseInt(exchangeRate) + 1, " ", 0, null);
                output["exchangeRate"] = exchangeRate2;
            } else {
                output["exchangeRate"] = ""
            }

            // Currency
            var Currency = getAllIndexes("Charge");
            
            if (Currency.length > 0) {
                var Currency2 = getValuesFromPdf(parseInt(Currency) + 1, " ", 0, null);
                output["currency"] = Currency2;
            } else {
                output["currency"] = ""
            }

            // Amount
            var amountforex = getAllIndexes("Currency");
            let amount = amountforex
            
            if (amount.length > 0) {
                var amount2 = getValuesFromPdf(parseInt(amount) + 1, " ", 1, null);
                var amount3 = parseFloat(amount2.replace(/,/g, ''));
                
                output["amount"] = amount3

            } else {
                output["amount"] = ""
            }

            // Commission Amount
            var commision = getAllIndexes("Commission");
            
            if (commision.length > 0) {
                var commision2 = getValuesFromPdf(parseInt(commision) + 0, " ", 11, null);
                output["commision"] = commision2;

                if (commision2 == undefined) {
                    var commision3 = getValuesFromPdf(parseInt(commision) + 0, " ", 10, null);
                    output["commision"] = commision3
                }

            } else {
                output["commision"] = ""
            }

            // Recieved Date
            var recievedDate = getAllIndexes("Customer");
            
            if (recievedDate.length > 0) {
                var recievedDate2 = getValuesFromPdf(parseInt(recievedDate) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(recievedDate) + 1, " ", 3, null) == undefined) {
                    output["recievedDate"] = recievedDate2

                }
                if (getValuesFromPdf(parseInt(recievedDate) + 1, " ", 3, null) != undefined) {
                    recievedDate2 = recievedDate2 + getValuesFromPdf(parseInt(recievedDate) + 1, " ", 3, null);
                    output["recievedDate"] = recievedDate2
                }

            } else {
                output["recievedDate"] = ""
            }

            // Conversion Date
            var conversionDate = getAllIndexes("Customer");
            
            if (conversionDate.length > 0) {
                var conversionDate2 = getValuesFromPdf(parseInt(conversionDate) + 1, " ", 2, null);
                if (getValuesFromPdf(parseInt(conversionDate) + 1, " ", 3, null) == undefined) {
                    output["conversionDate"] = conversionDate2

                }
                if (getValuesFromPdf(parseInt(conversionDate) + 1, " ", 3, null) != undefined) {
                    conversionDate2 = conversionDate2 + getValuesFromPdf(parseInt(conversionDate) + 1, " ", 3, null);
                    output["conversionDate"] = conversionDate2
                }
            } else {
                output["conversionDate"] = ""
            }


            
            // 
            
            let res = [output, publicUrl];
            resolve(res)

        }



        //getJson(temp)

        function getAllIndexes(val) {
            var indexes = [],
                i = -1;
            var line;
            for (var m = 0; m < split.length; m++) {
                while ((i = split[m].indexOf(val, i + 1)) != -1) {
                    if (line != m) indexes.push(m);
                    line = m;
                }
            }
            return indexes;
        }

        function getValuesFromPdf(line, separator, index, str2) {
            if (str2 == null) {
                return split[line].split(separator)[index];
            } else if (str2 != null) {
                return str2.split(separator)[index];
            }


        }
        const options = {
            // The path to which the file should be downloaded, e.g. "./file.txt"
            destination: `./app/tempFolder/${fileName}`,
        };

       var publicUrl = `${BucketURL}/${fileName}`;
        var s3Params = {
            Bucket: S3bucketName,
            Key: userId+'/'+originalname,
        };

        let readStream = await s3.getObject(s3Params).createReadStream();
        let writeStream = fs.createWriteStream(`./app/tempFolder/${fileName}`);
        readStream.pipe(writeStream)

        setTimeout(() => {
            if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
                
                (async () => {
                    
                    await worker.load();
                    
                    await worker.loadLanguage('eng');
                    
                    await worker.initialize('eng');
                    
                    resolve(publicUrl);
                    const { data: { text } } = await worker.recognize(`./app/tempFolder/${fileName}`);
                    
                    

                    await worker.terminate();
                    resolve(publicUrl)
                })();
            } else if (fileName.includes("pdf")) {
                const fs = require('fs');
                const PDFDocument = require('pdf-lib').PDFDocument;

                async function splitPdf(pathToPdf) {
                    
                    const docmentAsBytes = await fs.promises.readFile(pathToPdf);
                    // Load your PDFDocument
                    const pdfDoc = await PDFDocument.load(docmentAsBytes);
                    const numberOfPages = pdfDoc.getPages().length;
                    
                    // Create a new "sub" document
                    const subDocument = await PDFDocument.create();
                    // copy the page at current index
                    const [copiedPage] = await subDocument.copyPages(pdfDoc, [0]);
                    subDocument.addPage(copiedPage);
                    const pdfBytes = await subDocument.save();
                    await writePdfBytesToFile(`./app/tempFolder/${fileName}`, pdfBytes);
                }
                async function writePdfBytesToFile(fileName, pdfBytes) {
                    
                    return fs.promises.writeFile(fileName, pdfBytes);
                }
                (async () => {
                    
                    await splitPdf(`./app/tempFolder/${fileName}`);
                    const absolute_path_to_pdf = `./app/tempFolder/${fileName}`;
                    // if (absolute_path_to_pdf.includes(" ")) throw new Error("will fail for paths w spaces like " + absolute_path_to_pdf);

                    const options = {
                        type: 'ocr', // perform ocr to get the text within the scanned image
                        ocr_flags: ['--psm 1'], // automatically detect page orientation
                        clean: false
                    };
                    const processor = pdf_extract(absolute_path_to_pdf, options, () => 
                    processor.on('complete', data => callback(null, data));
                    processor.on('error', callback);
                    var i = 0;
                    function callback(error, data) {
                        error ? console.error(error) : console.error(data.text_pages[0]);
                        identifyPdf(data.text_pages[0])
                    }
                })();
            }
        }, 2000);
        
            `gs://${bucketName}/${fileName} downloaded to ./app/tempFolder/${fileName}.`
        );
    }
    const { originalname, buffer } = file;
    const params = {
        Bucket: S3bucketName,
        Key: userId+'/'+originalname,
        ContentType: 'application/pdf',
        Body: buffer
    }

    s3.upload(params, (err, data) => {
        if (err) {
            
        }
        downloadFile(S3bucketName, originalname).catch((err) => { 
    })
});

const uploadImage2 = (userId,file) => new Promise(async (resolve, reject) => {
    
    const { originalname, buffer } = file;

    let readStream = await s3.getObject(s3Params).createReadStream();
    let writeStream = fs.createWriteStream(`./app/tempFolder/${file}`);
    readStream.pipe(writeStream)
    writeStream.on('finish', async() => {
        var publicUrl = `${BucketURL}/${file}`;
        
        resolve(publicUrl, file)
    }).on('error', (err) => {
        
        reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer);

});

module.exports = {
    uploadImage: uploadImage,
    uploadImage2: uploadImage2
};