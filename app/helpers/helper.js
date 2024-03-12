// const { format } = require('util');
// const { createWorker } = require('tesseract.js');
// var pdfUtil = require('pdf-to-text');
// var inspect = require('eyes').inspector({ maxLength: 20000 });
// var pdf_extract = require('pdf-extract');
// var PDFImage = require("pdf-image").PDFImage;
// const path = require("path");
// const PDFDocument = require('pdf-lib').PDFDocument;
// const fs = require('fs');
// const AWS = require('aws-sdk');
// const { PythonShell } = require('python-shell');
// const axios = require('axios');
// const express = require("express");
// const router = express.Router();
// const tesseract = require("node-tesseract-ocr")
// const childProcess = require("child_process");
// const document = require('../modules/shared/documents/document.controller.js');

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
// })

// var S3bucketName;
// var BucketURL;
// S3bucketName = process.env.AWS_S3_BUCKET;
// BucketURL = process.env.AWS_S3_BUCKET_URL;




// const worker = createWorker();
// /**
//  *
//  * @param { File } object file object that will be uploaded
//  * @description - This function does the following
//  * - It uploads a file to the image bucket on Google Cloud
//  * - It accepts an object as an argument with the
//  *   "originalname" and "buffer" as keys
//  */

// const uploadImage = (userId, file) => new Promise((resolve, reject) => {
//     async function downloadFile(bucketName, fileName) {
//         var split = '';
//         var val = '';
//         var output = {};
//         function identifyPdf(temp) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generatePdfJson()
//             } catch {
//                 let res = [output, publicUrl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfJson() {
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });

//             //AD BILL NO
//             output["adBillNo"] = "";

//             // SHIPPING BILL NO
//             var sbno = getAllIndexes("SB");
//             var sbDate;
//             var sbDateTpggle = false;
//             if (sbno.length > 0) {
//                 var sbNoValue = split[0].toLocaleLowerCase().includes("port") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 5, null) :
//                     split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) :
//                         getValuesFromPdf(parseInt(sbno) + 1, " ", 1, null);
//                 output["sbno"] = sbNoValue;
//                 if (sbNoValue.length < 2) {
//                     sbNoValue = split[0].toLocaleLowerCase().includes("port") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 6, null) :
//                         split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) :
//                             getValuesFromPdf(parseInt(sbno) + 1, " ", 1, null);
//                     output["sbno"] = sbNoValue;
//                     if (sbNoValue.length == 0) {
//                         output["sbno"] = "";
//                     }
//                     sbDate = split[0].toLocaleLowerCase().includes("port") ?
//                         (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 7, null) + "-" + getValuesFromPdf(parseInt(sbno) + 1, " ", 8, null) + "-" + getValuesFromPdf(parseInt(sbno) + 1, " ", 9, null)) :
//                         split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);

//                     sbDateTpggle = true;
//                     output["sbdate"] = sbDate;
//                     if (sbDate.length == 0) {
//                         output["sbdate"] = "";
//                     }

//                 }
//             } else if (sbno.length == 0) {
//                 output["sbno"] = "";
//             }

//             // // SHIPPING BILL DATE
//             if (!sbDateTpggle) {
//                 if (sbno.length > 0) {
//                     sbDate = split[0].toLocaleLowerCase().includes("port") ?
//                         (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 6, null)) :
//                         split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);
//                     if (sbDate.length < 2) {
//                         sbDate = split[0].toLocaleLowerCase().includes("port") ?
//                             (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 7, null)) :
//                             split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);
//                     }
//                     output["sbdate"] = sbDate;
//                 } else if (sbno.length == 0) {
//                     output["sbdate"] = "";
//                 }
//             }

//             //PORT CODE
//             var portCode = getValuesFromPdf(parseInt(sbno) + 1, " ", 4, null);
//             output["portCode"] = portCode;
//             if (portCode == undefined) {
//                 portCode = getValuesFromPdf(parseInt(sbno) + 1, " ", 0, null);
//                 output["portCode"] = portCode;
//             }

//             //IEC Code
//             var iecCodeLine = split[2].toLocaleLowerCase().includes("central") ? getAllIndexes("Br") : getAllIndexes("IEC/");
//             if (iecCodeLine.length > 0) {
//                 var iecCode = getValuesFromPdf(parseInt(iecCodeLine) + 0, " ", 9, null) + getValuesFromPdf(parseInt(iecCodeLine) + 0, " ", 10, null);
//                 output["ieccode"] = iecCode;
                
//                 if (iecCode.length < 5) {
//                     iecCode = getValuesFromPdf(iecCodeLine, " ", 9, null) + getValuesFromPdf(iecCodeLine, " ", 10, null);
//                     output["ieccode"] = iecCode;
//                 }
//             } else if (iecCodeLine.length == 0) {
//                 iecCodeLine = getAllIndexes("EClBr");
//                 if (iecCodeLine.length > 0) {
//                     iecCode = getValuesFromPdf(iecCodeLine, " ", 2, null);
//                     output["ieccode"] = iecCode;
//                 } else {
//                     iecCode = getValuesFromPdf([2], " ", 9, null);
//                     if (iecCode == undefined) {
//                         output["ieccode"] = ""
//                     }
//                 }
//             }
//             var iecNameLine = getAllIndexes("1.EXPORTER'S");
//             var iecNameLine1 = [iecNameLine[0] + 1];
//             if (iecNameLine.length > 0) {
//                 var iecNameCode = getValuesFromPdf(iecNameLine1, " ", 1, null) + " " + getValuesFromPdf(iecNameLine1, " ", 2, null) + " " + getValuesFromPdf(iecNameLine1, " ", 3, null) + " " + getValuesFromPdf(iecNameLine1, " ", 4, null) + " " + getValuesFromPdf(iecNameLine1, " ", 5, null);
//                 output["iecName"] = iecNameCode;
//             } else if (iecNameLine.length == 0) {
//                 output["iecName"] = "";
//             }

//             // EXPORTER'S Location
//             var exporterLocationLine = getAllIndexes("6'");
//             if (exporterLocationLine > 0) {
//                 var exporterLocationCode = getValuesFromPdf(exporterLocationLine, " ", 2, null) + " " + getValuesFromPdf(exporterLocationLine, " ", 3, null);
//                 output["exporterLocationCode"] = exporterLocationCode;
//             } else {
//                 output["exporterLocationCode"] = "";
//             }

//             // COUNTRY OF FINALDESTINATION
//             var finalDestinationLine = getAllIndexes("13.COUNTRY OF FINALDESTINATION");
//             if (finalDestinationLine.length > 0) {
//                 var finalDestinationCode = getValuesFromPdf(finalDestinationLine, " ", 10, null);
//                 if (finalDestinationCode == "KUWAIT") {
//                     output["countryOfFinaldestination"] = finalDestinationCode;
//                 } else if (finalDestinationCode != "KUWAIT") {
//                     var finalDestinationCode1 = getValuesFromPdf(finalDestinationLine, " ", 7, null);
//                     output["countryOfFinaldestination"] = finalDestinationCode1;
//                 } else {
//                     output["countryOfFinaldestination"] = " ";
//                 }
//             } else if (finalDestinationLine.length == 0) {
//                 output["countryOfFinaldestination"] = "";
//             }

//             // CONSIGNEE NAME
//             if (iecNameLine1.length > 0) {
//                 var consignNameCode = getValuesFromPdf(iecNameLine1, " ", 6, null) + " " + getValuesFromPdf(iecNameLine1, " ", 7, null) + " " + getValuesFromPdf(iecNameLine1, " ", 8, null) + " " + getValuesFromPdf(iecNameLine1, " ", 9, null);
//                 output["consigneeName"] = consignNameCode;
//             } else if (iecNameLine1.length == 0) {
//                 output["consigneeName"] = "";
//             }


//             //AD Code
//             var adCodeLine = getAllIndexes("AD CODE");
//             if (adCodeLine.length > 0) {
//                 var adCode1 = getValuesFromPdf(adCodeLine, ":", 1, null);
//                 var adCode = getValuesFromPdf(adCodeLine, " ", 1, adCode1);
//                 output["adCode"] = adCode;
//                 if (adCode.length < 3) {
//                     adCode = getValuesFromPdf(adCodeLine, " ", 8, adCode1);
//                     output["adCode"] = adCode;
//                 }

//             } else if (adCodeLine == 0) {
//                 output["adCode"] = "";
//             }

//             //LEO Date
//             var leoDateLine = getAllIndexes("LEO Date");
//             if (leoDateLine.length == 0) leoDateLine = getAllIndexes("LEo Date");

//             if (leoDateLine.length == 0) leoDateLine = getAllIndexes("LEODate");
//             if (leoDateLine.length > 0) {
                
//                 var n = split[leoDateLine].split(" ");
//                 var leoDate = n[n.length - 1];
//                 if (leoDate == undefined) {
//                     output["leodate"] = "dd-mm-yyyy";
//                 } else {
//                     output["leodate"] = leoDate;
//                 }

//             } else if (leoDateLine.length == 0) {
//                 output["leodate"] = "dd-mm-yyyy";
//             } else {
//                 output["leodate"] = "dd-mm-yyyy";
//             }

//             //Processing Status
//             output["processingStaus"] = "";

//             //Invoices
//             var invoiceLine = getAllIndexes("2.INV NO.");
//             if (invoiceLine.length == 0) {
//                 invoiceLine = getAllIndexes("2.INV NO.");
//                 if (invoiceLine.length > 0) {
//                     var invoiceValue = findInvoices(invoiceLine, "2.INV NO.");
//                     output["invoices"] = invoiceValue;
//                 } else if (invoiceLine.length == 0) {
//                     output["invoices"] = [{
//                         "sno": "1",
//                         "invoiceno": "",
//                         "amount": "",
//                         "currency": ""
//                     }]
//                 }

//             } else if (invoiceLine.length > 0) {
//                 var invoiceValue = findInvoices(invoiceLine, "2.INV NO.");
//                 output["invoices"] = invoiceValue;
//             }

//             //FOB Currency
//             currencyLine = getAllIndexes("USD");
//             if (currencyLine.length == 0) {
//                 currencyLine = getAllIndexes("INR");
//                 if (currencyLine.length > 0) {
//                     output["fobCurrency"] = 'INR'
//                 } else if (currencyLine.length == 0) {
//                     output["fobCurrency"] = ''
//                 }
//             } else if (currencyLine.length > 0) {
//                 output["fobCurrency"] = 'USD'
//             }

//             //FOB Value
//             var fobValueLine = getAllIndexes("FOB ");
//             if (fobValueLine.length > 0) {
//                 var fobValue = getValuesFromPdf(parseInt(fobValueLine) + 1, " ", 0, null);
//                 var checkValue = /^[+-]?\d+(\.\d+)?$/.test(fobValue);
//                 output["fobValue"] = checkValue ? fobValue : getValuesFromPdf(parseInt(fobValueLine) + 1, " ", 1, null)
//             } else if (fobValueLine.length == 0) {
//                 output["fobValue"] = "";
//             }

//             //REALIZED FOB
//             currencyLine = getAllIndexes("USD");
//             if (currencyLine.length == 0) {
//                 currencyLine = getAllIndexes("INR");
//                 if (currencyLine.length > 0) {
//                     output["realizedFobCurrency"] = 'INR'
//                 } else if (currencyLine.length == 0) {
//                     output["realizedFobCurrency"] = ''
//                 }
//             } else if (currencyLine.length > 0) {
//                 output["realizedFobCurrency"] = 'USD'
//             }


//             //CURRENCY
//             currencyLine = getAllIndexes("USD");
//             if (currencyLine.length == 0) {
//                 currencyLine = getAllIndexes("INR");
//                 if (currencyLine.length > 0) {
//                     output["currency"] = 'INR'
//                 } else if (currencyLine.length == 0) {
//                     output["currency"] = ''
//                 }
//             } else if (currencyLine.length > 0) {
//                 output["currency"] = 'USD'
//             }


//             //REALIZED FOB VALUE
//             output["realizedFobValue"] = "";

//             //EQUIVALENT FOB VALUE
//             output["equivalentFobValue"] = "";

//             //FREIGHT CURRENCY
//             currencyLine = getAllIndexes("USD");
//             if (currencyLine.length == 0) {
//                 currencyLine = getAllIndexes("INR");
//                 if (currencyLine.length > 0) {
//                     output["freightCurrency"] = 'INR'
//                 } else if (currencyLine.length == 0) {
//                     output["freightCurrency"] = ''
//                 }
//             } else if (currencyLine.length > 0) {
//                 output["freightCurrency"] = 'USD'
//             }
//             output["freightValueRealized"] = "";

//             //Realized FREIGHT CURRENCY
//             currencyLine = getAllIndexes("USD");
//             if (currencyLine.length == 0) {
//                 currencyLine = getAllIndexes("INR");
//                 if (currencyLine.length > 0) {
//                     output["realizedFreightCurrency"] = 'INR'
//                 } else if (currencyLine.length == 0) {
//                     output["realizedFreightCurrency"] = ''
//                 }
//             } else if (currencyLine.length > 0) {
//                 output["realizedFreightCurrency"] = 'USD'
//             }
//             output["realizedFreightValue"] = "";

//             //INSURANCE CURRENCY
//             currencyLine = getAllIndexes("USD");
//             if (currencyLine.length == 0) {
//                 currencyLine = getAllIndexes("INR");
//                 if (currencyLine.length > 0) {
//                     output["insuranceCurrency"] = 'INR'
//                 } else if (currencyLine.length == 0) {
//                     output["insuranceCurrency"] = ''
//                 }
//             } else if (currencyLine.length > 0) {
//                 output["insuranceCurrency"] = 'USD'
//             }

//             //INSURANCE VALUE
//             var insurancLine = getAllIndexes("INSURANc");
//             if (insurancLine.length > 0) {
//                 var insurancValue = getValuesFromPdf(parseInt(insurancLine) + 1, " ", 0, null);
//                 var insurancCheckValue = /^[+-]?\d+(\.\d+)?$/.test(insurancValue);
//                 output["insuranceValue"] = insurancCheckValue ? insurancValue : getValuesFromPdf(parseInt(insurancLine) + 1, " ", 3, null)
//             } else if (insurancLine.length == 0) {
//                 var insurancLine = getAllIndexes("INSURANC");
//                 if (insurancLine.length > 0) {
//                     var insurancValue = getValuesFromPdf(parseInt(insurancLine) + 1, " ", 0, null);
//                     var insurancCheckValue = /^[+-]?\d+(\.\d+)?$/.test(insurancValue);
//                     output["insuranceValue"] = insurancCheckValue ? insurancValue : getValuesFromPdf(parseInt(insurancLine) + 1, " ", 3, null)
//                 } else if (insurancLine.length == 0) {
//                     output["insuranceValue"] = "";
//                 }
//             } else {
//                 output["insuranceValue"] = "";
//             }

//             //REALIZED INSURANCE VALUE
//             output["realizedInsuranceValue"] = "";

//             //BANKING CHARGES
//             output["bankingCharges"] = "";

//             //EXPECTED PAYMENT LAST DATE
//             output["expectedPaymentlastdate"] = "";

//             //ADDED DATE
//             output["AddedDate"] = "";

//             //MODIFIED DATE
//             output["modifiedDate"] = "";



            
//             //
//             //let res = [output]
//             let res = [output, publicUrl];
//             resolve(res);
            

//         }

//         function findInvoices(line, str) {
//             var invoices = [];

//             var secondSNo = '1';
//             var secondInvoiceNo = str == "a" ? getValuesFromPdf(parseInt(line) + 1, " ", 5, null) : getValuesFromPdf(parseInt(line) + 1, " ", 6, null);
//             if (secondInvoiceNo.length < 9) {
                
//                 secondInvoiceNo = getValuesFromPdf(parseInt(line) + 1, " ", 5, null) != 1 ? getValuesFromPdf(parseInt(line) + 1, " ", 5, null) : getValuesFromPdf(parseInt(line) + 1, " ", 6, null)
//             }
//             var secondInvoiceAmount = getValuesFromPdf(parseInt(line) + 1, " ", 7, null);
//             var secondInvoiceCurrency = getValuesFromPdf(parseInt(line) + 1, " ", 8, null);
//             if (secondInvoiceCurrency == undefined) {
//                 secondInvoiceCurrency = 'USD'
//             }
//             if (secondInvoiceAmount == 'USD') {
//                 secondInvoiceAmount = getValuesFromPdf(parseInt(line) + 1, " ", 6, null)
//             }
//             if (secondInvoiceAmount != undefined && secondInvoiceCurrency != undefined) {
//                 invoices.push({
//                     "sno": secondSNo == undefined ? "" : secondSNo,
//                     "invoiceno": secondInvoiceNo == undefined ? "" : secondInvoiceNo,
//                     "amount": secondInvoiceAmount == undefined ? "" : secondInvoiceAmount,
//                     "currency": secondInvoiceCurrency == undefined ? "" : secondInvoiceCurrency
//                 })
//             }

//             return invoices;

//         }
//         //function to get all indexes of string
//         function getAllIndexes(val) {
//             var indexes = [],
//                 i = -1;
//             var line;
//             for (var m = 0; m < split.length; m++) {
//                 while ((i = split[m].indexOf(val, i + 1)) != -1) {
//                     if (line != m) indexes.push(m);
//                     line = m;
//                 }
//             }
//             return indexes;
//         }

//         function getValuesFromPdf(line, separator, index, str2) {
//             if (str2 == null) {
//                 return split[line].split(separator)[index];
//             } else if (str2 != null) {
//                 return str2.split(separator)[index];
//             }

//         }

//         //for Boe
//         function getJson() {


//             // Discharge port
//             var dischargePotLine = getAllIndexes("Port");
//             var dischargePort = getValuesFromPdf(dischargePotLine, ":", 2, null);
//             output["dischargePort"] = dischargePort;

//             //BOE number
//             var boeNumberLine = getAllIndexes("BE No");
//             var boeNumber = getValuesFromPdf(boeNumberLine, ":", "1", null);
//             output['boeNumber'] = boeNumber.split("/")[0];

//             //BOE date
//             var boeDate = getValuesFromPdf(boeNumberLine, ":", "1", null);
//             output['boeDate'] = [boeDate.split("/")[1], boeDate.split("/")[2], boeDate.split("/")[3]].join("/");

//             //IEC
//             var iecLine = getAllIndexes("Code");
//             var iecCode = getValuesFromPdf(iecLine, ":", "3", null);
//             output["adCode"] = iecCode;

//             //IEC NAME
//             var iecName = split[parseInt(iecLine) + 2];
//             output["iecName"] = "";

//             //AD CODE
//             var adCodeLine = getAllIndexes("AD Code");
//             var adCode = getValuesFromPdf(adCodeLine, ":", 3, null);
//             output["iecCode"] = "";

//             //Inv No
//             var invoiceNumberLine = getAllIndexes("Inv No");
//             var invoiceNumber1 = getValuesFromPdf(invoiceNumberLine, ":", 1, null);
//             var invoiceNumber = getValuesFromPdf(invoiceNumberLine, " ", 1, invoiceNumber1).split('=-').join('-');
//             output["invoiceNumber"] = invoiceNumber;

//             //Invoice Amount
//             var invoiceAmountLine = getAllIndexes("Inv Val");
//             var invoiceAmount1 = getValuesFromPdf(invoiceAmountLine, ":", 1, null);
//             var invoiceAmount = getValuesFromPdf(invoiceAmountLine, " ", 1, invoiceAmount1);
//             output["invoiceAmount"] = invoiceAmount;

//             //currency
//             output["currency"] = getValuesFromPdf(invoiceAmountLine, " ", 2, invoiceAmount1);

//             //Settled Amount
//             output["settledAmount"] = "";

//             //Status
//             output["status"] = "";

//             //Freight Amount
//             var freightAmountLine = getAllIndexes("Freight");
//             var freightAmount1 = getValuesFromPdf(freightAmountLine, ":", 1, null);
//             var freightAmount = getValuesFromPdf(freightAmountLine, " ", 1, freightAmount1);
//             output["freightAmount"] = freightAmount;

//             //Freight currency
//             var freightCurrency = getValuesFromPdf(freightAmountLine, " ", 2, freightAmount1);
//             output["freightCurrency"] = freightCurrency;

//             //Insurance amount
//             var insuranceAmountLine = getAllIndexes("Insurance");
//             var insuranceAmount1 = getValuesFromPdf(insuranceAmountLine, ":", 1, null);
//             var insuranceAmount = getValuesFromPdf(insuranceAmountLine, " ", 2, insuranceAmount1);
//             output["insuranceAmount"] = insuranceAmount;

//             //Insurance currency
//             var insuranceCurrency = getValuesFromPdf(insuranceAmountLine, " ", 3, insuranceAmount1);
//             output["insuranceCurrency"] = insuranceCurrency;

//             //Discount Amount
//             var discountAmountLine = getAllIndexes("Discount Amount");
//             var discountAmount = getValuesFromPdf(discountAmountLine, ":", 2, null);
//             output["discountAmount"] = discountAmount;

//             //Discount Currency
//             output["discountCurrency"] = "";


//             //Miscellaneous Amount
//             var misAmountLine = getAllIndexes("Misc");
//             var miscAmount1 = getValuesFromPdf(misAmountLine, ":", 1, null);
//             var miscAmount = getValuesFromPdf(misAmountLine, " ", 2, miscAmount1);
//             output["miscellaneousAmount"] = miscAmount;

//             //Miscellaneous currency
//             var miscCurrency = getValuesFromPdf(misAmountLine, " ", 3, miscAmount1);
//             output["miscellaneousCurrency"] = miscCurrency;

//             //Commission amount
//             output["commissionAmount"] = "";

//             //Commision Currency
//             output["commissionCurrency"] = "";

            
            
//             let res = [output, publicUrl];
//             resolve(res)
//             fs.unlinkSync(`./app/tempFolder/${fileName}`);
//         }

//         function getAllIndexes(val) {
//             var indexes = [],
//                 i = -1;
//             var line;
//             for (var m = 0; m < split.length; m++) {
//                 while ((i = split[m].indexOf(val, i + 1)) != -1) {
//                     if (line != m) indexes.push(m);
//                     line = m;
//                 }
//             }
//             return indexes;
//         }

//         function getValuesFromPdf(line, separator, index, str2) {
//             if (str2 == null) {
//                 return split[line].split(separator)[index];
//             } else if (str2 != null) {
//                 return str2.split(separator)[index];
//             }

//         }
//         var publicUrl = `${BucketURL}/${userId}/${fileName}`;
//         var s3Params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + originalname,
//         };

//         let readStream = await s3.getObject(s3Params).createReadStream();
//         let writeStream = fs.createWriteStream(`./app/tempFolder/${fileName}`);
//         readStream.on('close', function () {
            
//             if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
//                 (async () => {
//                     await worker.load();
//                     await worker.loadLanguage('eng');
//                     await worker.initialize('eng');
//                     resolve(publicUrl);
//                     const { data: { text } } = await worker.recognize(`./app/tempFolder/${fileName}`);
//                     await worker.terminate();
//                     resolve(publicUrl)
//                 })();
//             } else if (fileName.includes("pdf")) {
//                 async function splitPdf(pathToPdf) {
//                     const docmentAsBytes = await fs.promises.readFile(pathToPdf);
//                     // Load your PDFDocument
//                     const pdfDoc = await PDFDocument.load(docmentAsBytes);
//                     const numberOfPages = pdfDoc.getPages().length;

//                     // Create a new "sub" document
//                     const subDocument = await PDFDocument.create();
//                     // copy the page at current index
//                     const [copiedPage] = await subDocument.copyPages(pdfDoc, [0]);
//                     subDocument.addPage(copiedPage);
//                     const pdfBytes = await subDocument.save();
//                     await writePdfBytesToFile(`./app/tempFolder/${fileName}`, pdfBytes);
//                 }

//                 async function writePdfBytesToFile(fileName, pdfBytes) {
//                     return fs.promises.writeFile(fileName, pdfBytes);
//                 }

//                 (async () => {
                    
//                     await splitPdf(`./app/tempFolder/${fileName}`);
//                     const absolute_path_to_pdf = `./app/tempFolder/${fileName}`;
//                     const options = {
//                         type: 'ocr', // perform ocr to get the text within the scanned image
//                         ocr_flags: ['--psm 1'], // automatically detect page orientation
//                         clean: false
//                     };
//                     // const processor = pdf_extract(absolute_path_to_pdf, options, () => 
//                     // // processor.on('complete', data => callback(null, data));
//                     // processor.on('error', callback);
//                     // function callback(error, data) {
//                     //     error ? console.error(error) : console.error(data.text_pages[0]);
//                     //     identifyPdf(data.text_pages[0])
//                     // }
//                 })();
//             }
            
//         }).pipe(writeStream);
//     }
//     // const { originalname, buffer } = file;
//     // const params = {
//     //     Bucket: S3bucketName,
//     //     Key: userId + '/' + originalname,
//     //     ContentType: 'application/pdf',
//     //     Body: buffer
//     // }

//     // s3.upload(params, (err, data) => {
//     //     if (err) {
            
//     //     }
//     //     downloadFile(S3bucketName, originalname).catch((err) => { 
//     // })
// });

// const uploadImageSB = (userId, file) => new Promise(async (resolve, reject) => {
//     async function downloadFile(bucketName, fileName) {
//         var split = '';
//         var val = '';
//         var output = {};
//         function identifyPdf(temp) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generatePdfJson()
//             } catch {
//                 let res = [output, publicUrl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfJson() {
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             //AD BILL NO
//             output["adBillNo"] = "";

//             var SbNo_SbDate_PortCode = split[2].split(" ");

//             //PORT CODE
//             output["portCode"] = SbNo_SbDate_PortCode[0];
//             // SHIPPING BILL NO
//             output["sbno"] = SbNo_SbDate_PortCode[1];

//             // SHIPPING BILL Date
//             output["sbdate"] = SbNo_SbDate_PortCode[2]

//             // iecName
//             output["iecName"] = split[23] + '' + split[24] + '' + split[25]

//             split.forEach(element => {
//                 // COUNTRY OF FINALDESTINATION
//                 if (element.includes('Page Of*')) {
//                     let EXPORTERLocation = split[counter + 2].split(" ").filter(n => n);
//                     let COUNTRY_OF_FINALDESTINATION = split[counter + 2].split(" ").filter(n => n);
                    
//                     if (COUNTRY_OF_FINALDESTINATION.length == 2) {
//                         // EXPORTER'S Location
//                         output["exporterLocationCode"] = EXPORTERLocation[0];

//                         COUNTRY_OF_FINALDESTINATION.splice(0, 1);
//                         output["countryOfFinaldestination"] = COUNTRY_OF_FINALDESTINATION.join(" ");
                        
//                     } else {
//                         // EXPORTER'S Location
//                         output["exporterLocationCode"] = EXPORTERLocation[0] + ' ' + EXPORTERLocation[1];

//                         COUNTRY_OF_FINALDESTINATION.splice(0, 2);
//                         output["countryOfFinaldestination"] = COUNTRY_OF_FINALDESTINATION.join(" ");
                        
//                     }
//                 }

//                 // CONSIGNEE NAME
//                 if (element.includes('DETAILS7.CONSIGNEE NAME & ADDRESS')) {
//                     output["consigneeName"] = split[counter + 1];
//                 }
//                 //LEO Date
//                 if (element.includes('9.LEO')) {
//                     let leDateSplit = (element?.split('9.LEO')[1])?.split(" ");
                    
//                     output["leodate"] = leDateSplit[0];
//                 }

//                 //AD Code
//                 if (element.includes('3. AD CODE:')) {
//                     output["adCode"] = element?.replace('3. AD CODE:', '');
//                 }

//                 //IEC Code
//                 if (element.includes('IEC/Br')) {
//                     output["ieccode"] = element?.replace(' IEC/Br', '');
//                 }

//                 //Invoices
//                 if (element.includes('F.INVOICESUMMARYG. EQUIPMENT')) {
//                     let invoices = element.split(' ');
                    
//                     if (invoices.length > 4) {
//                         let currency = invoices[3]?.split(".")
//                         currency = currency[0]?.substring(0, 3)
//                         output["invoices"] = [{
//                             "sno": invoices[0],
//                             "invoiceno": invoices[1],
//                             "amount": invoices[2],
//                             "currency": currency
//                         }]

//                         //FOB Currency
//                         output["fobCurrency"] = currency;
//                         output["currency"] = currency;
//                         output["realizedFobCurrency"] = currency;
//                         output["freightCurrency"] = currency;
//                         output["realizedFreightCurrency"] = currency;
//                         output["insuranceCurrency"] = currency;
//                     } else {
//                         let currency = invoices[2]?.split(".")
//                         currency = currency[0]?.substring(0, 3)
//                         output["invoices"] = [{
//                             "sno": '1',
//                             "invoiceno": invoices[0],
//                             "amount": invoices[1],
//                             "currency": currency
//                         }]

//                         //FOB Currency
//                         output["fobCurrency"] = currency;
//                         output["currency"] = currency;
//                         output["realizedFobCurrency"] = currency;
//                         output["freightCurrency"] = currency;
//                         output["realizedFreightCurrency"] = currency;
//                         output["insuranceCurrency"] = currency;
//                     }
//                 }

//                 if (element.indexOf('7.P/') != -1) {
//                     let FOB_DETAILS = element?.split("7.P/C");
//                     FOB_DETAILS = FOB_DETAILS[1].split(" ")
                    
//                     //FREIGHT Value
//                     output["freightValue"] = FOB_DETAILS[0];
//                     output["freightValueRealized"] = FOB_DETAILS[0];

//                     //Realized FREIGHT Value
//                     output["realizedfreightValue"] = FOB_DETAILS[0];

//                     //INSURANCE VALUE
//                     output["insuranceValue"] = FOB_DETAILS[1];
//                 }
//                 if (element.indexOf('1.MODE') != -1) {
//                     let FOB_DETAILS = element?.split("1.MODE");
//                 }
//                 counter++;
//             });
//             output["fobValue"] = output["invoices"][0]?.amount;
//             //Processing Status
//             output["processingStaus"] = "";

//             //REALIZED FOB VALUE
//             output["realizedFobValue"] = "0";

//             //EQUIVALENT FOB VALUE
//             output["equivalentFobValue"] = "0";

//             //REALIZED INSURANCE VALUE
//             output["realizedInsuranceValue"] = "0";

//             //BANKING CHARGES
//             output["bankingCharges"] = "0";

//             //EXPECTED PAYMENT LAST DATE
//             output["expectedPaymentlastdate"] = "";

//             //ADDED DATE
//             output["AddedDate"] = "";

//             //MODIFIED DATE
//             output["modifiedDate"] = "";

            
//             let res = [output, publicUrl];
//             resolve(res);
            
//         }
//         function identifyImage(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generateImageJson()
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         function generateImageJson() {
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             //AD BILL NO
//             output["adBillNo"] = "";

//             var SbNo_SbDate_PortCode = split[1].split(" ");
            
//             //PORT CODE
//             output["portCode"] = SbNo_SbDate_PortCode[4];
//             // SHIPPING BILL NO
//             output["sbno"] = SbNo_SbDate_PortCode[5];

//             // SHIPPING BILL Date
//             output["sbdate"] = SbNo_SbDate_PortCode[6]



//             split.forEach(element => {
//                 // COUNTRY OF FINALDESTINATION
//                 if (element.includes('Page Of*')) {
//                     let EXPORTERLocation = split[counter + 2].split(" ").filter(n => n);
//                     let COUNTRY_OF_FINALDESTINATION = split[counter + 2].split(" ").filter(n => n);
                    
//                     if (COUNTRY_OF_FINALDESTINATION.length == 2) {
//                         // EXPORTER'S Location
//                         output["exporterLocationCode"] = EXPORTERLocation[0];

//                         COUNTRY_OF_FINALDESTINATION.splice(0, 1);
//                         output["countryOfFinaldestination"] = COUNTRY_OF_FINALDESTINATION.join(" ");
                        
//                     } else {
//                         // EXPORTER'S Location
//                         output["exporterLocationCode"] = EXPORTERLocation[0] + ' ' + EXPORTERLocation[1];

//                         COUNTRY_OF_FINALDESTINATION.splice(0, 2);
//                         output["countryOfFinaldestination"] = COUNTRY_OF_FINALDESTINATION.join(" ");
                        
//                     }
//                 }

//                 // iecName
//                 if (element.includes("1.EXPORTER'S NAME & ADDRESS")) {
//                     output["iecName"] = split[counter + 1];
//                 }

//                 // CONSIGNEE NAME
//                 if (element.includes('(7,CONSIGNEE NAME & ADDRESS')) {
//                     output["consigneeName"] = split[counter + 1];
//                 }
//                 //LEO Date
//                 if (element.includes('9.LEO')) {
//                     let leDateSplit = (element?.split('9.LEO')[1])?.split(" ");
                    
//                     output["leodate"] = leDateSplit[0];
//                 }

//                 //AD Code
//                 if (element.includes('3. AD CODE:')) {
//                     output["adCode"] = element?.replace('3. AD CODE:', '');
//                 }

//                 //IEC Code
//                 if (element.includes('IEC/Br')) {
//                     output["ieccode"] = element?.replace(' IEC/Br', '');
//                 }

//                 //Invoices
//                 if (element.includes('F.INVOICESUMMARYG. EQUIPMENT')) {
//                     let invoices = element.split(' ');
                    
//                     if (invoices.length > 4) {
//                         let currency = invoices[3]?.split(".")
//                         currency = currency[0]?.substring(0, 3)
//                         output["invoices"] = [{
//                             "sno": invoices[0],
//                             "invoiceno": invoices[1],
//                             "amount": invoices[2],
//                             "currency": currency
//                         }]

//                         //FOB Currency
//                         output["fobCurrency"] = currency;
//                         output["currency"] = currency;
//                         output["realizedFobCurrency"] = currency;
//                         output["freightCurrency"] = currency;
//                         output["realizedFreightCurrency"] = currency;
//                         output["insuranceCurrency"] = currency;
//                     } else {
//                         let currency = invoices[2]?.split(".")
//                         currency = currency[0]?.substring(0, 3)
//                         output["invoices"] = [{
//                             "sno": '1',
//                             "invoiceno": invoices[0],
//                             "amount": invoices[1],
//                             "currency": currency
//                         }]

//                         //FOB Currency
//                         output["fobCurrency"] = currency;
//                         output["currency"] = currency;
//                         output["realizedFobCurrency"] = currency;
//                         output["freightCurrency"] = currency;
//                         output["realizedFreightCurrency"] = currency;
//                         output["insuranceCurrency"] = currency;
//                     }
//                 }

//                 if (element.indexOf('7.P/') != -1) {
//                     let FOB_DETAILS = element?.split("7.P/C");
//                     FOB_DETAILS = FOB_DETAILS[1].split(" ")
                    
//                     //FREIGHT Value
//                     output["freightValue"] = FOB_DETAILS[0];
//                     output["freightValueRealized"] = FOB_DETAILS[0];

//                     //Realized FREIGHT Value
//                     output["realizedfreightValue"] = FOB_DETAILS[0];

//                     //INSURANCE VALUE
//                     output["insuranceValue"] = FOB_DETAILS[1];
//                 }
//                 if (element.indexOf('1.MODE') != -1) {
//                     let FOB_DETAILS = element?.split("1.MODE");
//                     output["fobValue"] = FOB_DETAILS[0];
//                 }
//                 counter++;
//             });

//             //Processing Status
//             output["processingStaus"] = "";

//             //REALIZED FOB VALUE
//             output["realizedFobValue"] = "0";

//             //EQUIVALENT FOB VALUE
//             output["equivalentFobValue"] = "0";

//             //REALIZED INSURANCE VALUE
//             output["realizedInsuranceValue"] = "0";

//             //BANKING CHARGES
//             output["bankingCharges"] = "0";

//             //EXPECTED PAYMENT LAST DATE
//             output["expectedPaymentlastdate"] = "";

//             //ADDED DATE
//             output["AddedDate"] = "";

//             //MODIFIED DATE
//             output["modifiedDate"] = "";

            
//             let res = [output, publicUrl];
//             resolve(res);
//             fs.unlinkSync(`./app/tempFolder/${fileName}`);
            
//         }
//         var publicUrl = `${BucketURL}/${userId}/${fileName}`;
//         var s3Params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + originalname,
//         };

//         let readStream = await s3.getObject(s3Params).createReadStream();
//         let writeStream = fs.createWriteStream(`./app/tempFolder/${fileName}`);
//         readStream.on('close', function () {
            
//             if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
//                 (async () => {
//                     let pyoptions = {
//                         args: [`./app/tempFolder/${fileName}`]
//                     };
//                     SocketSendData('uploadImageInwardOutward', 'Image convert to pdf in progress...')
//                     PythonShell.run('app/python_file/image_to_pdf.py', pyoptions).then(async (image_to_pdfresult) => {
//                         const fileStream = await fs.createReadStream(`./app/tempFolder/${image_to_pdfresult[0]}`);
//                         SocketSendData('uploadImageInwardOutward', 'converted pdf uploading in progress...')
//                         var RANDOM_KEY = Date.now()
//                         const params = {
//                             Bucket: S3bucketName,
//                             Key: userId + '/' + 'CITP_' + RANDOM_KEY + '.pdf',
//                             ContentType: 'application/pdf',
//                             Body: fileStream
//                         }
//                         s3.upload(params, (err, data) => {
//                             if (err) {
                                
//                             }
//                             PythonShell.run('app/python_file/pdf_to_image.py', pyoptions).then((result) => {
                                
//                                 publicUrl = `${BucketURL}/${params?.Key}`;
//                                 identifyImage(result.join("\n"), publicUrl)
//                             });
//                         });
//                     });
//                 })();
//             } else if (fileName.includes("pdf")) {
//                 (async () => {
                    
//                     pdfReader(fileName).then((responseReader) => {
//                         publicUrl = `${BucketURL}/${userId}/${fileName}`;
//                         if (responseReader?.type == 'pdf_to_image') {
                            
//                             identifyImage(responseReader?.data, publicUrl)
//                         } else {
                            
//                             identifyPdf(responseReader?.data, publicUrl)
//                         }
//                     })
//                 })();
//             }
            
//         }).pipe(writeStream);
//     }
//     // const { originalname, buffer } = file;
//     // const params = {
//     //     Bucket: S3bucketName,
//     //     Key: userId + '/' + originalname,
//     //     ContentType: 'application/pdf',
//     //     Body: buffer
//     // }

//     // s3.upload(params, (err, data) => {
//     //     if (err) {
            
//     //     }
//     //     downloadFile(S3bucketName, originalname).catch((err) => { 
//     // })
// });

// const uploadImageBOE = (userId, file) => new Promise(async (resolve, reject) => {
//     async function downloadFile(bucketName, fileName) {
//         var split = '';
//         var val = '';
//         var output = {
//             dischargePort: '',
//             boeNumber: '',
//             boeDate: '',
//             iecCode: '',
//             iecName: '',
//             adCode: '',
//             invoiceNumber: '',
//             invoiceAmount: '',
//             currency: '',
//             settledAmount: "",
//             status: '',
//             PdfFile: '',
//             freightAmount: '',
//             freightCurrency: '',
//             insuranceAmount: '',
//             insuranceCurrency: '',
//             discountAmount: '',
//             discountCurrency: '',
//             miscellaneousAmount: '',
//             miscellaneousCurrency: '',
//             commissionAmount: '',
//             commissionCurrency: '',
//             AWBNo: '',
//             HAWBNo: ''
//         };
//         function identifyPdf(temp) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generatePdfJson()
//             } catch {
//                 let res = [output, publicUrl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfJson() {
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });

//             let iecName = split[11].split(' ')?.filter((n) => n);
//             output['iecName'] = split[8]?.split(' ')?.filter((n) => n)?.join(' ');

//             split.forEach(element => {
//                 if (element.includes('BE No/Dt./cc/Typ:')) {
//                     let boenumber = element.replace('BE No/Dt./cc/Typ:', '')?.split('/');
//                     output['boeNumber'] = boenumber[0];
//                     output['boeDate'] = boenumber[3] + '/' + boenumber[2] + '/' + boenumber[1];
//                 }

//                 if (element.includes('MAWB No')) {
//                     let AWBNo = element?.split(' ')
//                     output['AWBNo'] = AWBNo[9];
//                 }

//                 if (element.includes('AD Code')) {
//                     let adCode = element.split(':')
//                     output['adCode'] = adCode[3].replace(/ /g, '');
//                 }

//                 if (element.includes('Importer Details')) {
//                     let adCode = element?.replace('Importer Details').split(' ')?.filter((n) => n);
//                     output['iecCode'] = adCode[1]?.replace(':', '')
//                 }

//                 if (element.includes('Inv No & Dt.')) {
//                     let InvNo = element.replace('Inv No & Dt. :', '');
//                     InvNo = InvNo.split(' ');
//                     if (isValidDate(InvNo[1])) {
//                         output['invoiceNumber'] = InvNo[0];
//                     } else {
//                         output['invoiceNumber'] = InvNo[1];
//                     }
//                 }

//                 if (element.includes('Inv Val')) {
//                     let InvAmount = element.replace('Inv Val', '');
//                     InvAmount = InvAmount.split(' ')?.filter((n) => n);
//                     output['invoiceAmount'] = InvAmount[1];
//                     output['currency'] = InvAmount[2];
//                 }
//                 if (element.includes('Freight')) {
//                     let Freight = element.replace('Freight', '');
//                     Freight = Freight.split(' ')?.filter((n) => n);
//                     output['freightAmount'] = Freight[1];
//                     output['freightCurrency'] = Freight[2];
//                 }
//                 if (element.includes('Insurance ')) {
//                     let Insurance = element.replace('Insurance', '');
//                     Insurance = Insurance.split(' ')?.filter((n) => n);
//                     output['insuranceAmount'] = Insurance[1];
//                     output['insuranceCurrency'] = Insurance[2]?.replace(/[0-9]/g, '');
//                 }
//                 if (element.includes('Misc. Charges: ')) {
//                     let MiscCharges = element.replace('Misc. Charges:', '');
//                     MiscCharges = MiscCharges.split(' ')?.filter((n) => n);
//                     output['miscellaneousAmount'] = MiscCharges[1];
//                     output['miscellaneousCurrency'] = MiscCharges[2];
//                 }

//                 if (element.includes('IGM No')) {
//                     let dischargePort = element.replace('IGM No', '');
//                     dischargePort = dischargePort.split(' ')?.filter((n) => n);
                    
//                     output['dischargePort'] = dischargePort[dischargePort?.length - 1]?.replace(":", "")
//                 }
//             });
            
//             let res = [output, publicUrl];
//             resolve(res);
            
//             fs.unlinkSync(`./app/tempFolder/${fileName?.replace('/', '_')}`);
//         }
//         // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
//         function isValidDate(dateString) {
//             // First check for the pattern
//             if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
//                 return false;

//             // Parse the date parts to integers
//             var parts = dateString.split("/");
//             var day = parseInt(parts[1], 10);
//             var month = parseInt(parts[0], 10);
//             var year = parseInt(parts[2], 10);

//             // Check the ranges of month and year
//             if (year < 1000 || year > 3000 || month == 0 || month > 12)
//                 return false;

//             var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//             // Adjust for leap years
//             if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
//                 monthLength[1] = 29;

//             // Check the range of the day
//             return day > 0 && day <= monthLength[month - 1];
//         };
//         async function identifyImage(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 await generateImageJson(split)
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         async function generateImageJson(datapdfimage) {
            
//             try {
//                 await datapdfimage.forEach(element => {
//                     if (element.includes('BE No')) {
//                         let boenumber = element.split('/')
//                         let orboenumber = boenumber[3].split(':')
//                         output['boeNumber'] = orboenumber[1];
//                         output['boeDate'] = boenumber[6] + '/' + boenumber[5] + '/' + boenumber[4];
//                     }
//                     if (element.includes('MAWB No')) {
//                         let AWBNo = element.split(' ')
//                         output['AWBNo'] = AWBNo[2];
//                     }
//                     if (element.includes('Cntry Of Orgn.:')) {
//                         let dischargePort = element.replace('Cntry Of Orgn.:', '')
//                         output['dischargePort'] = dischargePort.replace('Cntry Of Consgn.:', '');
//                     }
//                     if (element.includes('AD Code')) {
//                         let adCode = element.replace('AD Code', '')
//                         adCode = adCode.split(' ')
//                         output['adCode'] = adCode[adCode.length - 1];
//                         output['iecCode'] = adCode[adCode.length - 1];
//                     }
//                     if (element.includes('Inv No')) {
//                         let InvNo = element.replace('Inv No & Dt.', '');
//                         InvNo = InvNo.split(' ');
                        
//                         output['invoiceNumber'] = InvNo[1];
//                     }
//                     if (element.includes('Inv Val')) {
//                         let InvAmount = element.replace('Inv Val ', '');
//                         InvAmount = InvAmount.split(' ');
//                         output['invoiceAmount'] = InvAmount[0];
//                         output['currency'] = InvAmount[1];
//                         output['discountCurrency'] = InvAmount[1];
//                     }
//                     if (element.includes('Freight')) {
//                         let Freight = element.replace('Freight ', '');
//                         Freight = Freight.split(' ');
//                         output['freightAmount'] = Freight[0];
//                         output['freightCurrency'] = Freight[1];
//                     }
//                     if (element.includes('Insurance')) {
//                         let Insurance = element.replace('Insurance ', '');
//                         Insurance = Insurance.split(' ');
                        
//                         output['insuranceAmount'] = Insurance[0];
//                         output['insuranceCurrency'] = Insurance[1];
//                     }
//                     if (element.includes('Misc. Charges:')) {
//                         let MiscCharges = element.replace('Misc. Charges:', '');
//                         MiscCharges = MiscCharges.split(' ');
//                         output['miscellaneousAmount'] = MiscCharges[2];
//                         output['miscellaneousCurrency'] = MiscCharges[3];
//                     }
//                     if (element.includes('Misc. Charges')) {
//                         let MiscCharges = element.replace('Misc. Charges', '');
//                         MiscCharges = MiscCharges.split(' ');
//                         output['miscellaneousAmount'] = MiscCharges[2];
//                         output['miscellaneousCurrency'] = MiscCharges[3];
//                     }
//                 });

//                 output['iecName'] = datapdfimage[7];
                
//                 let res = [output, publicUrl];
//             } catch (err) {
                
//             }

//             await resolve(res);
            
//         }
//         var publicUrl = `${BucketURL}/${fileName}`;
//         var s3Params = {
//             Bucket: S3bucketName,
//             Key: fileName,
//         };

//         let readStream = await s3.getObject(s3Params).createReadStream();
//         let writeStream = fs.createWriteStream(`./app/tempFolder/${fileName?.replace('/', '_')}`);
//         readStream.on('close', function () {
            
//             if (fileName?.replace('/', '_')?.includes(".jpeg") || fileName?.replace('/', '_')?.includes(".jpg") || fileName?.replace('/', '_')?.includes(".png")) {
//                 (async () => {
//                     let pyoptions = {
//                         args: [`./app/tempFolder/${fileName?.replace('/', '_')}`]
//                     };
//                     PythonShell.run('app/python_file/image_to_pdf.py', pyoptions).then(async (image_to_pdfresult) => {
//                         const fileStream = await fs.createReadStream(`./app/tempFolder/${image_to_pdfresult[0]}`);
//                         var RANDOM_KEY = Date.now()
//                         const params = {
//                             Bucket: S3bucketName,
//                             Key: userId + '/' + 'CITP_' + RANDOM_KEY + '.pdf',
//                             ContentType: 'application/pdf',
//                             Body: fileStream
//                         }
//                         s3.upload(params, async (err, data) => {
//                             if (err) {
                                
//                             }
//                             var stdoutresult = '';
//                             const bash_run = childProcess.spawn('tesseract', [`./app/tempFolder/${fileName?.replace('/', '_')}`, "stdout"]);
//                             await bash_run.stdout.on('data', function (data) {
//                                 stdoutresult += data.toString();
//                             });
//                             await bash_run.stderr.on('data', function (data) {
                                
//                             });
//                             bash_run.on('close', function (code) {
                                
//                                 publicUrl = `${BucketURL}/${params?.Key}`;
//                                 identifyImage(stdoutresult, publicUrl)
//                             });
//                         });
//                     });
//                 })();
//             } else if (fileName?.replace('/', '_')?.includes("pdf")) {
//                 (async () => {
                    
//                     pdfReader(fileName?.replace('/', '_')).then((responseReader) => {
//                         publicUrl = `${BucketURL}/${fileName}`;
//                         if (responseReader?.type == 'pdf_to_image') {
                            
//                             identifyImage(responseReader?.data, publicUrl)
//                         } else {
                            
//                             identifyPdf(responseReader?.data, publicUrl)
//                         }
//                     })
//                 })();
//             }
            
//         }).pipe(writeStream);
//     }
//     // const { originalname, buffer } = file;
//     // var RANDOM_KEY = Date.now()
//     // const params = {
//     //     Bucket: S3bucketName,
//     //     Key: userId + '/' + RANDOM_KEY + '_' + originalname,
//     //     ContentType: 'application/pdf',
//     //     Body: buffer
//     // }

//     // s3.upload(params, (err, data) => {
//     //     if (err) {
            
//     //     }
//     //     downloadFile(S3bucketName, params?.Key).catch((err) => { 
//     // })
// });
// const uploadImageInwardOutward = (userId, file) => new Promise(async (resolve, reject) => {
//     SocketSendData('uploadImageInwardOutward', 'Upload pdf in progress...')
//     async function downloadFile(bucketName, fileName) {
//         var split = '';
//         var val = '';
//         var output = {
//             billNo: '',
//             date: '',
//             customer: '',
//             partyName: '',
//             exchangeRate: '',
//             currency: '',
//             amount: '',
//             commision: '',
//             recievedDate: '',
//             conversionDate: '',
//             Purpose_of_Remittance: '',
//             Remittance_Bank: '',
//             Swift_Field_70_and_72: []
//         };
//         function identifyPdf(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generatePdfJson()
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfJson() {
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             split.forEach(element => {
//                 if (element.includes('Credit Date')) {
//                     output['billNo'] = split[counter + 1].replace(/ /g, '')
//                     output['date'] = split[counter + 3].replace(/ /g, '')
//                     output['recievedDate'] = split[counter + 3].replace(/ /g, '')
//                     output['conversionDate'] = split[counter + 4].replace(/ /g, '')
//                 }
//                 if (element.includes('Bill No :')) {
//                     const bill = element.split("Bill No :");
//                     output['billNo'] = bill[1].replace(/ /g, '')
//                 }
//                 if (element.includes('Rate Other Party Name')) {
//                     let bill = split[counter + 1]?.split(" ");
//                     bill = bill.splice(12, bill?.length);
//                     output['partyName'] = bill?.join(' ')
//                 }
//                 if (element.includes('Remitting Bank')) {
//                     output['partyName'] = split[counter + 2]?.replace(/[0-9]/g, '');
//                 }
//                 if (element.includes('Date  :')) {
//                     const bill = element.split("Date  :");
//                     output['date'] = bill[1]
//                 }
//                 if (element.includes('Sale')) {
//                     const bill = element.split(" ");
//                     output['currency'] = bill[1];
//                     output['amount'] = bill[2].replace(',', '');
//                 }
//                 if (element.includes('FCY Amount')) {
//                     output['currency'] = split[counter + 3];
//                     output['amount'] = split[counter + 4];
//                     output['exchangeRate'] = split[counter + 5];
//                     output['commision'] = split[counter + 4];
//                 }

//                 if (element.includes('Commission Office')) {
//                     const bill = element.split(" ");
                    
//                     output['commision'] = parseFloat(bill[bill.length - 1]);
//                 }
//                 if (element.includes('Rate Other Party Name')) {
//                     const bill = split[counter + 1].split(" ");
//                     const index = bill.indexOf(output['date'].replace(/ /g, ''))
//                     output['exchangeRate'] = bill[index + 1];
//                 }
//                 counter++;
//             });
//             // output['commision'] = parseFloat(output['amount']) - parseFloat(output['commision']);
            
//             let res = [output, publicUrl];
//             SocketSendData('uploadImageInwardOutward', 'pdf reading done...')
//             setTimeout(() => { resolve(res); fs.unlinkSync(`./app/tempFolder/${fileName}`); }, 1000)
            
//         }

//         function identifyImage(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generateImageJson()
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         function generateImageJson() {
            
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             split.forEach(element => {
//                 if (element.includes('Value Date')) {
//                     const bill = split[counter + 1].split(" ");
//                     output['billNo'] = bill[0].replace(/ /g, '');
//                     output['date'] = bill[2]
//                     output['recievedDate'] = bill[3]
//                     output['conversionDate'] = bill[bill.length - 1]
//                 }
//                 if (element.includes('if Currency')) {
//                     const bill1 = split[counter + 2].split(" ");
//                     output['currency'] = bill1[0];
//                     output['amount'] = bill1[1];
//                     output['exchangeRate'] = bill1[2]
//                 }
//                 if (element.includes('ft Ae RemitterDetalis')) {
//                     const bill = split[counter + 1].split("|");
//                     output['partyName'] = bill[0]?.replace(/[0-9]/g, '');
//                     output['Remittance_Bank'] = split[counter + 3].split("|")[1];
//                 }
//                 if (element.includes('Additional information as per s')) {
//                     const bill = split[counter + 1] + ' ' + split[counter + 2];
//                     output['Purpose_of_Remittance'] = bill;
//                 }
//                 if (element.includes('wift message field 70 and 72')) {
//                     const bill = element?.replace("wift message field 70 and 72", "").split(" ");
//                     output['Swift_Field_70_and_72'] = bill;
//                     output['commision'] = parseFloat(bill[5]) - parseFloat(output['amount']);
//                 }
//                 counter++;
//             });
//             // output['commision'] = parseFloat(output['amount']) - parseFloat(output['commision']);
            
//             let res = [output, publicUrl];
            
//             SocketSendData('uploadImageInwardOutward', 'pdf reading done...')
//             setTimeout(() => { resolve(res) }, 1000)
//         }
//         function identifyPdfImage(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generatePdfImageJson()
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfImageJson() {
            
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             split.forEach(element => {
//                 if (element.includes('Value Date')) {
//                     const bill = split[counter + 1].split(" ");
//                     output['billNo'] = bill[0].replace(/ /g, '').split('|')[0];
//                     output['date'] = bill[3]
//                     output['conversionDate'] = bill[bill.length - 1];
//                     output['recievedDate'] = bill[4]
//                 }
//                 if (element.includes('Currency')) {
//                     const bill1 = split[counter + 2].split(" ");
//                     output['currency'] = bill1[0];
//                     output['amount'] = bill1[1];
//                     output['exchangeRate'] = bill1[2]
//                 }
//                 if (element.includes('Remitting Bank Ordering Institute')) {
//                     const bill = split[counter + 3].split("|");
//                     output['partyName'] = bill[0]?.replace(/[0-9]/g, '').replace("_", '');
//                     output['Remittance_Bank'] = split[counter + 3].split("|")[1];
//                 }
//                 if (element.includes('Additional information as per s')) {
//                     const bill = split[counter + 1] + ' ' + split[counter + 2];
//                     output['Purpose_of_Remittance'] = bill;
//                 }
//                 if (element.includes('wift message field 70 and 72')) {
//                     const bill = element?.replace("wift message field 70 and 72", "").split(" ");
//                     output['Swift_Field_70_and_72'] = bill;
//                     output['commision'] = parseFloat(bill[bill.length - 1]) - parseFloat(output['amount']);
//                 }
//                 counter++;
//             });
//             // output['commision'] = parseFloat(output['amount']) - parseFloat(output['commision']);
            
//             let res = [output, publicUrl];
            
//             SocketSendData('uploadImageInwardOutward', 'pdf reading done...')
//             setTimeout(() => { resolve(res) }, 1000)
//         }
//         var publicUrl = `${BucketURL}/${userId}/${fileName}`;
//         var s3Params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + originalname,
//         };

//         let readStream = await s3.getObject(s3Params).createReadStream();
//         let writeStream = fs.createWriteStream(`./app/tempFolder/${fileName}`);
//         readStream.on('close', function () {
            
//             if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
//                 (async () => {
//                     let pyoptions = {
//                         args: [`./app/tempFolder/${fileName}`]
//                     };
//                     SocketSendData('uploadImageInwardOutward', 'Image convert to pdf in progress...')
//                     PythonShell.run('app/python_file/image_to_pdf.py', pyoptions).then(async (image_to_pdfresult) => {
                        
//                         const fileStream = await fs.createReadStream(`./app/tempFolder/${image_to_pdfresult[0]}`);
//                         SocketSendData('uploadImageInwardOutward', 'converted pdf uploading in progress...')
//                         var RANDOM_KEY = Date.now()
//                         const params = {
//                             Bucket: S3bucketName,
//                             Key: userId + '/' + 'CITP_' + RANDOM_KEY + '.pdf',
//                             ContentType: 'application/pdf',
//                             Body: fileStream
//                         }
//                         s3.upload(params, async (err, data) => {
//                             if (err) {
                                
//                             }
//                             const config = {
//                                 lang: "eng",
//                                 oem: 1,
//                                 psm: 1,
//                             }
//                             const img = fs.readFileSync(`./app/tempFolder/${fileName}`)
//                             tesseract.recognize(img, config).then((text) => {
//                                 var orginalResult = text.toString().split(/\r?\n/);
//                                 const ans = orginalResult.filter(x => !/^\s*$/.test(x));
                                
                                
//                                 publicUrl = `${BucketURL}/${params?.Key}`;
//                                 identifyImage(ans.join('\n'), publicUrl)
//                             }).catch((error) => {
                                
//                             })
//                         });
//                     });
//                 })();
//             } else if (fileName.includes("pdf")) {
//                 SocketSendData('uploadImageInwardOutward', 'pdf reading started...')
//                 publicUrl = `${BucketURL}/${userId}/${fileName}`;
//                 pdfReader(fileName).then((responseReader) => {
//                     if (responseReader?.type == 'pdf_to_image') {
                        
//                         identifyPdfImage(responseReader?.data, publicUrl)
//                     } else {
                        
//                         identifyPdf(responseReader?.data, publicUrl)
//                     }
//                 })
//             }
            
//         }).pipe(writeStream);
//     }

//     // const { originalname, buffer } = file;
//     // const params = {
//     //     Bucket: S3bucketName,
//     //     Key: userId + '/' + originalname,
//     //     ContentType: 'application/pdf',
//     //     Body: buffer
//     // }

//     // s3.upload(params, (err, data) => {
//     //     if (err) {
            
//     //     }
//     //     SocketSendData('uploadImageInwardOutward', 'Upload pdf Sucessfully...')
//     //     downloadFile(S3bucketName, originalname).catch((err) => { 
//     // })
// });


// function pdfReader(fileName) {
//     return new Promise((resolve, reject) => {
//         async function splitPdf(pathToPdf) {
//             const docmentAsBytes = await fs.promises.readFile(pathToPdf);
//             // Load your PDFDocument
//             const pdfDoc = await PDFDocument.load(docmentAsBytes);
//             // Create a new "sub" document
//             const subDocument = await PDFDocument.create();
//             // copy the page at current index
//             const [copiedPage] = await subDocument.copyPages(pdfDoc, [0]);
//             subDocument.addPage(copiedPage);
//             const pdfBytes = await subDocument.save();
//             await writePdfBytesToFile(`./app/tempFolder/${fileName}`, pdfBytes);
//         }

//         async function writePdfBytesToFile(fileName, pdfBytes) {
//             return fs.promises.writeFile(fileName, pdfBytes);
//         }

//         (async () => {
            
//             await splitPdf(`./app/tempFolder/${fileName}`);
//             const absolute_path_to_pdf = `./app/tempFolder/${fileName}`;
//             let pyoptions = {
//                 args: [absolute_path_to_pdf]
//             };
//             PythonShell.run('app/python_file/app.py', pyoptions).then(async (result) => {
                
//                 if (result.length == 1) {
//                     PythonShell.run('app/python_file/pdf_convert_image.py', pyoptions).then(async (convert_result) => {
                        
//                         var stdoutresult = '';
//                         const bash_run = childProcess.spawn('tesseract', [convert_result[0], "stdout"]);
//                         await bash_run.stdout.on('data', function (data) {
//                             stdoutresult += data.toString();
//                         });
//                         await bash_run.stderr.on('data', function (data) {
                            
//                         });
//                         bash_run.on('close', function (code) {
                            
//                             resolve({ data: stdoutresult, type: 'pdf_to_image' })
//                         });
//                     });
//                 } else {
//                     resolve({ data: result.join("\n"), type: 'pdf' })
//                 }
//             });
//         })();
//     })
// }

// function create_UUID() {
//     var dt = new Date().getTime();
//     var uuid = 'xxxx_xxxx_xxxx'.replace(/[xy]/g, function (c) {
//         var r = (dt + Math.random() * 8) % 8 | 0;
//         dt = Math.floor(dt / 8);
//         return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(8);
//     });
//     return uuid;
// }
// const uploadImageInwardDisposal = (userId, file) => new Promise(async (resolve, reject) => {
//     async function downloadFile(bucketName, fileName) {
//         var split = '';
//         var val = '';
//         var output = {
//             AccountDetails: '',
//             Amount: '',
//             BankOperationCode: '',
//             BeneficiaryCustomer: '',
//             BeneficiaryCustomerAddress: '',
//             BeneficiaryCustomerName: '',
//             CurrencyInstructedAmount: '',
//             CurrencyCode: '',
//             DetailsofCharges: '',
//             Orderinglnstitution: '',
//             Receiver: '',
//             ReceiversCorrespondent: '',
//             RemittanceInformation: '',
//             RemitterCustomerCode: '',
//             RemitterCustomerDetails: '',
//             RemittersCustomerName: '',
//             SenderCorrespondent: '',
//             SendersReference: '',
//             SenderCode: '',
//             SenderInformation: '',
//             Uniquedigitldentifier: '',
//             ValueDate32A31: '',
//             lntermediary: ''
//         };
//         function identifyPdf(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generatePdfJson()
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfJson() {
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             split.forEach(element => {
//                 if (element.includes('Account Details - ')) {
//                     output['AccountDetails'] = element?.replace('Account Details - ', '')
//                 }
//                 if (element.includes('Amount -32A')) {
//                     output['Amount'] = element?.replace('Amount -32A ', '')?.replace(/ /g, '')
//                 }
//                 if (element.includes('Bank Operation Code -')) {
//                     output['BankOperationCode'] = element.replace("Bank Operation Code -", '');
//                 }
//                 if (element.includes('Beneficiary Customer - 59A')) {
//                     output['BeneficiaryCustomer'] = element.replace("Beneficiary Customer - 59A /", '');
//                 }
//                 if (element.includes('Beneficiary Customer Address - 59A')) {
//                     output['BeneficiaryCustomerAddress'] = element.replace("Beneficiary Customer Address - 59A", '');
//                 }
//                 if (element.includes('Beneficiary Customer Name - 59A')) {
//                     output['BeneficiaryCustomerName'] = element.replace("Beneficiary Customer Name - 59A", '');
//                 }
//                 if (element.includes('Currency/Instructed Amount - 33B ')) {
//                     output['CurrencyInstructedAmount'] = element.replace("Currency/Instructed Amount - 33B ", '');
//                 }
//                 if (element.includes('Currency Code -32A')) {
//                     output['CurrencyCode'] = element.replace("Currency Code -32A", '')?.replace(/ /g, '');
//                 }
//                 if (element.includes('Details of Charges - 71A')) {
//                     output['DetailsofCharges'] = element.replace("Details of Charges - 71A", '');
//                 }
//                 if (element.includes('Ordering Institution - 52')) {
//                     output['Orderinglnstitution'] = element.replace("Ordering Institution - 52", '');
//                 }
//                 if (element.includes('Receiver -BIC')) {
//                     output['Receiver'] = element.replace("Receiver -BIC", '');
//                 }
//                 if (element.includes("Receiver's Correspondent - 54A")) {
//                     output['ReceiversCorrespondent'] = element.replace("Receiver's Correspondent - 54A", '');
//                 }
//                 if (element.includes('Remittance Information 70 ADVANCE IMPORT PYM INV -')) {
//                     output['RemittanceInformation'] = element.replace("Remittance Information 70 ADVANCE IMPORT PYM INV -", '');
//                 }
//                 if (element.includes('Remitter Customer Code - 50A/50k')) {
//                     output['RemitterCustomerCode'] = element.replace("Remitter Customer Code - 50A/50k /", '');
//                 }
//                 if (element.includes('Remitter Customer Details -50A/50K')) {
//                     output['RemitterCustomerDetails'] = element.replace("Remitter Customer Details -50A/50K", '');
//                 }
//                 if (element.includes('Remitter Customer Name - 50A/50K')) {
//                     output['RemittersCustomerName'] = element.replace("Remitter Customer Name - 50A/50K 1/", '');
//                 }
//                 if (element.includes("Sender's Correspondent - 53A")) {
//                     output['SenderCorrespondent'] = element.replace("Sender's Correspondent - 53A", '');
//                 }
//                 if (element.includes("Sender's Reference -72")) {
//                     output['SendersReference'] = element.replace("Sender's Reference -72", '');
//                 }
//                 if (element.includes('Sender Code -')) {
//                     output['SenderCode'] = element.replace("Sender Code -", '');
//                 }
//                 if (element.includes('Sender Information -72')) {
//                     output['SenderInformation'] = element.replace("Sender Information -72", '');
//                 }
//                 if (element.includes('Unique 16 digit Identifier -')) {
//                     output['Uniquedigitldentifier'] = element.replace("Unique 16 digit Identifier -", '');
//                 }
//                 if (element.includes('Value Date 32A')) {
//                     output['ValueDate32A31'] = element.replace("Value Date 32A", '')?.replace(/ /g, '');;
//                 }
//                 if (element.includes('Intermediary - 56A')) {
//                     output['lntermediary'] = element.replace("Intermediary - 56A", '');
//                 }
//                 counter++;
//             });
            
//             let res = [output, publicUrl];
//             setTimeout(() => { resolve(res) }, 1000)
            
//         }

//         function identifyImage(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generateImageJson()
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         function generateImageJson() {
            
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             split.forEach(element => {
//                 if (element.includes('Account Details - ')) {
//                     output['AccountDetails'] = element?.replace('Account Details - ', '')
//                 }
//                 if (element.includes('Amount -32A')) {
//                     output['Amount'] = element?.replace('Amount -32A ', '')?.replace(/ /g, '')
//                 }
//                 if (element.includes('Bank Operation Code -')) {
//                     output['BankOperationCode'] = element.replace("Bank Operation Code -", '');
//                 }
//                 if (element.includes('Beneficiary Customer - 59A')) {
//                     output['BeneficiaryCustomer'] = element.replace("Beneficiary Customer - 59A /", '');
//                 }
//                 if (element.includes('Beneficiary Customer Address - 59A')) {
//                     output['BeneficiaryCustomerAddress'] = element.replace("Beneficiary Customer Address - 59A", '');
//                 }
//                 if (element.includes('Beneficiary Customer Name - 59A')) {
//                     output['BeneficiaryCustomerName'] = element.replace("Beneficiary Customer Name - 59A", '');
//                 }
//                 if (element.includes('Currency/Instructed Amount - 33B ')) {
//                     output['CurrencyInstructedAmount'] = element.replace("Currency/Instructed Amount - 33B ", '');
//                 }
//                 if (element.includes('Currency Code -32A')) {
//                     output['CurrencyCode'] = element.replace("Currency Code -32A", '')?.replace(/ /g, '');
//                 }
//                 if (element.includes('Details of Charges - 71A')) {
//                     output['DetailsofCharges'] = element.replace("Details of Charges - 71A", '');
//                 }
//                 if (element.includes('Ordering Institution - 52')) {
//                     output['Orderinglnstitution'] = element.replace("Ordering Institution - 52", '');
//                 }
//                 if (element.includes('Receiver -BIC')) {
//                     output['Receiver'] = element.replace("Receiver -BIC", '');
//                 }
//                 if (element.includes("Receiver's Correspondent - 54A")) {
//                     output['ReceiversCorrespondent'] = element.replace("Receiver's Correspondent - 54A", '');
//                 }
//                 if (element.includes('Remittance Information 70 ADVANCE IMPORT PYM INV -')) {
//                     output['RemittanceInformation'] = element.replace("Remittance Information 70 ADVANCE IMPORT PYM INV -", '');
//                 }
//                 if (element.includes('Remitter Customer Code - 50A/50k')) {
//                     output['RemitterCustomerCode'] = element.replace("Remitter Customer Code - 50A/50k /", '');
//                 }
//                 if (element.includes('Remitter Customer Details -50A/50K')) {
//                     output['RemitterCustomerDetails'] = element.replace("Remitter Customer Details -50A/50K", '');
//                 }
//                 if (element.includes('Remitter Customer Name - 50A/50K')) {
//                     output['RemittersCustomerName'] = element.replace("Remitter Customer Name - 50A/50K 1/", '');
//                 }
//                 if (element.includes("Sender's Correspondent - 53A")) {
//                     output['SenderCorrespondent'] = element.replace("Sender's Correspondent - 53A", '');
//                 }
//                 if (element.includes("Sender's Reference -72")) {
//                     output['SendersReference'] = element.replace("Sender's Reference -72", '');
//                 }
//                 if (element.includes('Sender Code -')) {
//                     output['SenderCode'] = element.replace("Sender Code -", '');
//                 }
//                 if (element.includes('Sender Information -72')) {
//                     output['SenderInformation'] = element.replace("Sender Information -72", '');
//                 }
//                 if (element.includes('Unique 16 digit Identifier -')) {
//                     output['Uniquedigitldentifier'] = element.replace("Unique 16 digit Identifier -", '');
//                 }
//                 if (element.includes('Value Date 32A')) {
//                     output['ValueDate32A31'] = element.replace("Value Date 32A", '')?.replace(/ /g, '');;
//                 }
//                 if (element.includes('Intermediary - 56A')) {
//                     output['lntermediary'] = element.replace("Intermediary - 56A", '');
//                 }
//                 counter++;
//             });
            
//             let res = [output, publicUrl];
            
//             setTimeout(() => { resolve(res) }, 1000)
//         }
//         function identifyPdfImage(temp, pdfurl) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
                
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
                
//                 generatePdfImageJson()
//             } catch {
//                 let res = [output, pdfurl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfImageJson() {
            
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             let counter = 0;
//             split.forEach(element => {
//                 if (element.includes('Account Details - ')) {
//                     output['AccountDetails'] = element?.replace('Account Details - ', '')
//                 }
//                 if (element.includes('Amount -32A')) {
//                     output['Amount'] = element?.replace('Amount -32A ', '')?.replace(/ /g, '')
//                 }
//                 if (element.includes('Bank Operation Code -')) {
//                     output['BankOperationCode'] = element.replace("Bank Operation Code -", '');
//                 }
//                 if (element.includes('Beneficiary Customer - 59A')) {
//                     output['BeneficiaryCustomer'] = element.replace("Beneficiary Customer - 59A /", '');
//                 }
//                 if (element.includes('Beneficiary Customer Address - 59A')) {
//                     output['BeneficiaryCustomerAddress'] = element.replace("Beneficiary Customer Address - 59A", '');
//                 }
//                 if (element.includes('Beneficiary Customer Name - 59A')) {
//                     output['BeneficiaryCustomerName'] = element.replace("Beneficiary Customer Name - 59A", '');
//                 }
//                 if (element.includes('Currency/Instructed Amount - 33B ')) {
//                     output['CurrencyInstructedAmount'] = element.replace("Currency/Instructed Amount - 33B ", '');
//                 }
//                 if (element.includes('Currency Code -32A')) {
//                     output['CurrencyCode'] = element.replace("Currency Code -32A", '')?.replace(/ /g, '');
//                 }
//                 if (element.includes('Details of Charges - 71A')) {
//                     output['DetailsofCharges'] = element.replace("Details of Charges - 71A", '');
//                 }
//                 if (element.includes('Ordering Institution - 52')) {
//                     output['Orderinglnstitution'] = element.replace("Ordering Institution - 52", '');
//                 }
//                 if (element.includes('Receiver -BIC')) {
//                     output['Receiver'] = element.replace("Receiver -BIC", '');
//                 }
//                 if (element.includes("Receiver's Correspondent - 54A")) {
//                     output['ReceiversCorrespondent'] = element.replace("Receiver's Correspondent - 54A", '');
//                 }
//                 if (element.includes('Remittance Information 70 ADVANCE IMPORT PYM INV -')) {
//                     output['RemittanceInformation'] = element.replace("Remittance Information 70 ADVANCE IMPORT PYM INV -", '');
//                 }
//                 if (element.includes('Remitter Customer Code - 50A/50k')) {
//                     output['RemitterCustomerCode'] = element.replace("Remitter Customer Code - 50A/50k /", '');
//                 }
//                 if (element.includes('Remitter Customer Details -50A/50K')) {
//                     output['RemitterCustomerDetails'] = element.replace("Remitter Customer Details -50A/50K", '');
//                 }
//                 if (element.includes('Remitter Customer Name - 50A/50K')) {
//                     output['RemittersCustomerName'] = element.replace("Remitter Customer Name - 50A/50K 1/", '');
//                 }
//                 if (element.includes("Sender's Correspondent - 53A")) {
//                     output['SenderCorrespondent'] = element.replace("Sender's Correspondent - 53A", '');
//                 }
//                 if (element.includes("Sender's Reference -72")) {
//                     output['SendersReference'] = element.replace("Sender's Reference -72", '');
//                 }
//                 if (element.includes('Sender Code -')) {
//                     output['SenderCode'] = element.replace("Sender Code -", '');
//                 }
//                 if (element.includes('Sender Information -72')) {
//                     output['SenderInformation'] = element.replace("Sender Information -72", '');
//                 }
//                 if (element.includes('Unique 16 digit Identifier -')) {
//                     output['Uniquedigitldentifier'] = element.replace("Unique 16 digit Identifier -", '');
//                 }
//                 if (element.includes('Value Date 32A')) {
//                     output['ValueDate32A31'] = element.replace("Value Date 32A", '')?.replace(/ /g, '');;
//                 }
//                 if (element.includes('Intermediary - 56A')) {
//                     output['lntermediary'] = element.replace("Intermediary - 56A", '');
//                 }
//                 counter++;
//             });
            
//             let res = [output, publicUrl];
            
//             setTimeout(() => { resolve(res) }, 1000)
//         }
//         var publicUrl = `${BucketURL}/${userId}/${fileName}`;
//         var s3Params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + originalname,
//         };

//         let readStream = await s3.getObject(s3Params).createReadStream();
//         let writeStream = fs.createWriteStream(`./app/tempFolder/${fileName}`);
//         readStream.on('close', function () {
            
//             if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
//                 (async () => {
//                     let pyoptions = {
//                         args: [`./app/tempFolder/${fileName}`]
//                     };
//                     PythonShell.run('app/python_file/image_to_pdf.py', pyoptions).then(async (image_to_pdfresult) => {
                        
//                         const fileStream = await fs.createReadStream(`./app/tempFolder/${image_to_pdfresult[0]}`);
//                         var RANDOM_KEY = Date.now()
//                         const params = {
//                             Bucket: S3bucketName,
//                             Key: userId + '/' + 'CITP_' + RANDOM_KEY + '.pdf',
//                             ContentType: 'application/pdf',
//                             Body: fileStream
//                         }
//                         s3.upload(params, async (err, data) => {
//                             if (err) {
                                
//                             }
//                             const config = {
//                                 lang: "eng",
//                                 oem: 1,
//                                 psm: 1,
//                             }
//                             const img = fs.readFileSync(`./app/tempFolder/${fileName}`)
//                             tesseract.recognize(img, config).then((text) => {
//                                 var orginalResult = text.toString().split(/\r?\n/);
//                                 const ans = orginalResult.filter(x => !/^\s*$/.test(x));
                                
                                
//                                 publicUrl = `${BucketURL}/${params?.Key}`;
//                                 identifyImage(ans.join('\n'), publicUrl)
//                             }).catch((error) => {
                                
//                             })
//                         });
//                     });
//                 })();
//             } else if (fileName.includes("pdf")) {
//                 publicUrl = `${BucketURL}/${userId}/${fileName}`;
//                 pdfReader(fileName).then((responseReader) => {
//                     if (responseReader?.type == 'pdf_to_image') {
                        
//                         identifyPdfImage(responseReader?.data, publicUrl)
//                     } else {
                        
//                         identifyPdf(responseReader?.data, publicUrl)
//                     }
//                 })
//             }
            
//         }).pipe(writeStream);
//     }

//     const { originalname, buffer } = file;
//     const params = {
//         Bucket: S3bucketName,
//         Key: userId + '/' + originalname,
//         ContentType: 'application/pdf',
//         Body: buffer
//     }

//     s3.upload(params, (err, data) => {
//         if (err) {
            
//         }
//         SocketSendData('uploadImageInwardOutward', 'Upload pdf Sucessfully...')
//         downloadFile(S3bucketName, originalname).catch((err) => { 
//     })
// });

// const uploadImageInward = (userId, file) => new Promise((resolve, reject) => {
//     async function downloadFile(bucketName, fileName) {
//         var split = '';
//         var val = '';
//         var output = {};


//         function identifyPdf(temp) {
//             val = temp;
            
//             try {
//                 //
//                 split = val.split("\n");
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
//                 var boeNumberLine = getAllIndexes("BE No");
//                 var sbno = getAllIndexes("SB");
//                 // getJson()
//                 generatePdfJson()
//             } catch {
                
//                 let res = [output, publicUrl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfJson() {
//             // var removeEmpty = ['',]
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             split.forEach(element => {
//                 var split_text = element.split('-')
//                 output[(split_text[0]).trim()] = split_text[1];
                
//             });
            
//             //
//             //let res = [output]
//             let res = [output, publicUrl];
//             resolve(res);
            
//         }
//         //function to get all indexes of string
//         function getAllIndexes(val) {
//             var indexes = [],
//                 i = -1;
//             var line;
//             for (var m = 0; m < split.length; m++) {
//                 // 
//                 while ((i = split[m].indexOf(val, i + 1)) != -1) {
//                     if (line != m) indexes.push(m);
//                     line = m;
//                 }
//             }
//             return indexes;
//         }

//         function getValuesFromPdf(line, separator, index, str2) {
//             // 
//             // 
//             // 
//             // 
//             // 
//             // 
//             if (str2 == null) {
//                 return split[line].split(separator)[index];
//             } else if (str2 != null) {
//                 return str2.split(separator)[index];
//             }


//         }



//         //for Boe

//         function getJson() {


//             // Discharge port
//             var dischargePotLine = getAllIndexes("Port");
//             var dischargePort = getValuesFromPdf(dischargePotLine, ":", 2, null);
//             output["dischargePort"] = dischargePort;

//             //BOE number
//             var boeNumberLine = getAllIndexes("BE No");
//             var boeNumber = getValuesFromPdf(boeNumberLine, ":", "1", null);
//             output['boeNumber'] = boeNumber.split("/")[0];

//             //BOE date
//             var boeDate = getValuesFromPdf(boeNumberLine, ":", "1", null);
//             output['boeDate'] = [boeDate.split("/")[1], boeDate.split("/")[2], boeDate.split("/")[3]].join("/");

//             //IEC
//             var iecLine = getAllIndexes("Code");
//             var iecCode = getValuesFromPdf(iecLine, ":", "3", null);
//             output["adCode"] = iecCode;

//             //IEC NAME
//             var iecName = split[parseInt(iecLine) + 2];
//             output["iecName"] = "";

//             //AD CODE
//             var adCodeLine = getAllIndexes("AD Code");
//             var adCode = getValuesFromPdf(adCodeLine, ":", 3, null);
//             output["iecCode"] = "";

//             //Inv No
//             var invoiceNumberLine = getAllIndexes("Inv No");
//             var invoiceNumber1 = getValuesFromPdf(invoiceNumberLine, ":", 1, null);
//             var invoiceNumber = getValuesFromPdf(invoiceNumberLine, " ", 1, invoiceNumber1).split('=-').join('-');
//             output["invoiceNumber"] = invoiceNumber;

//             //Invoice Amount
//             var invoiceAmountLine = getAllIndexes("Inv Val");
//             var invoiceAmount1 = getValuesFromPdf(invoiceAmountLine, ":", 1, null);
//             var invoiceAmount = getValuesFromPdf(invoiceAmountLine, " ", 1, invoiceAmount1);
//             output["invoiceAmount"] = invoiceAmount;

//             //currency
//             output["currency"] = getValuesFromPdf(invoiceAmountLine, " ", 2, invoiceAmount1);

//             //Settled Amount
//             output["settledAmount"] = "";

//             //Status
//             output["status"] = "";

//             //Freight Amount
//             var freightAmountLine = getAllIndexes("Freight");
//             var freightAmount1 = getValuesFromPdf(freightAmountLine, ":", 1, null);
//             var freightAmount = getValuesFromPdf(freightAmountLine, " ", 1, freightAmount1);
//             output["freightAmount"] = freightAmount;

//             //Freight currency
//             var freightCurrency = getValuesFromPdf(freightAmountLine, " ", 2, freightAmount1);
//             output["freightCurrency"] = freightCurrency;

//             //Insurance amount
//             var insuranceAmountLine = getAllIndexes("Insurance");
//             var insuranceAmount1 = getValuesFromPdf(insuranceAmountLine, ":", 1, null);
//             var insuranceAmount = getValuesFromPdf(insuranceAmountLine, " ", 2, insuranceAmount1);
//             output["insuranceAmount"] = insuranceAmount;

//             //Insurance currency
//             var insuranceCurrency = getValuesFromPdf(insuranceAmountLine, " ", 3, insuranceAmount1);
//             output["insuranceCurrency"] = insuranceCurrency;

//             //Discount Amount
//             var discountAmountLine = getAllIndexes("Discount Amount");
//             var discountAmount = getValuesFromPdf(discountAmountLine, ":", 2, null);
//             output["discountAmount"] = discountAmount;

//             //Discount Currency
//             output["discountCurrency"] = "";


//             //Miscellaneous Amount
//             var misAmountLine = getAllIndexes("Misc");
//             var miscAmount1 = getValuesFromPdf(misAmountLine, ":", 1, null);
//             var miscAmount = getValuesFromPdf(misAmountLine, " ", 2, miscAmount1);
//             output["miscellaneousAmount"] = miscAmount;

//             //Miscellaneous currency
//             var miscCurrency = getValuesFromPdf(misAmountLine, " ", 3, miscAmount1);
//             output["miscellaneousCurrency"] = miscCurrency;

//             //Commission amount
//             output["commissionAmount"] = "";

//             //Commision Currency
//             output["commissionCurrency"] = "";

            
            
//             let res = [output, publicUrl];
//             resolve(res)
//         }

//         function getAllIndexes(val) {
//             var indexes = [],
//                 i = -1;
//             var line;
//             for (var m = 0; m < split.length; m++) {
//                 while ((i = split[m].indexOf(val, i + 1)) != -1) {
//                     if (line != m) indexes.push(m);
//                     line = m;
//                 }
//             }
//             return indexes;
//         }

//         function getValuesFromPdf(line, separator, index, str2) {
//             if (str2 == null) {
//                 return split[line].split(separator)[index];
//             } else if (str2 != null) {
//                 return str2.split(separator)[index];
//             }
//         }
//         const options = {
//             // The path to which the file should be downloaded, e.g. "./file.txt"
//             destination: `./app/tempFolder/${fileName}`,
//         };

//         var publicUrl = `${BucketURL}/${userId}/${fileName}`;
//         var s3Params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + originalname,
//         };

//         let readStream = await s3.getObject(s3Params).createReadStream();
//         let writeStream = fs.createWriteStream(`./app/tempFolder/${fileName}`);
//         readStream.pipe(writeStream)

//         setTimeout(() => {
//             if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
                
//                 (async () => {
                    
//                     await worker.load();
                    
//                     await worker.loadLanguage('eng');
                    
//                     await worker.initialize('eng');
                    
//                     resolve(publicUrl);
//                     const { data: { text } } = await worker.recognize(`./app/tempFolder/${fileName}`);
                    
                    

//                     await worker.terminate();
//                     resolve(publicUrl)
//                 })();
//             } else if (fileName.includes("pdf")) {
//                 async function splitPdf(pathToPdf) {
                    
//                     if (fs.existsSync(path)) {
//                         const docmentAsBytes = await fs.promises.readFile(pathToPdf);
//                         // Load your PDFDocument
//                         const pdfDoc = await PDFDocument.load(docmentAsBytes);
//                         const numberOfPages = pdfDoc.getPages().length;
                        
//                         // Create a new "sub" document
//                         const subDocument = await PDFDocument.create();
//                         // copy the page at current index
//                         const [copiedPage] = await subDocument.copyPages(pdfDoc, [0]);
//                         subDocument.addPage(copiedPage);
//                         const pdfBytes = await subDocument.save();
//                         await writePdfBytesToFile(`./app/tempFolder/${fileName}`, pdfBytes);
//                     } else {
                        
//                     }
//                 }

//                 async function writePdfBytesToFile(fileName, pdfBytes) {
                    
//                     return fs.promises.writeFile(fileName, pdfBytes);


//                 }

//                 (async () => {
                    
//                     await splitPdf(`./app/tempFolder/${fileName}`);
//                     const absolute_path_to_pdf = `./app/tempFolder/${fileName}`;
//                     const options = {
//                         type: 'ocr', // perform ocr to get the text within the scanned image
//                         ocr_flags: ['--psm 1'], // automatically detect page orientation
//                         clean: false
//                     };
//                     // const processor = pdf_extract(absolute_path_to_pdf, options, () => 
//                     // processor.on('complete', data => callback(null, data));
//                     // processor.on('error', callback);
//                     // var i = 0;
//                     // function callback(error, data) {
//                     //     error ? console.error(error) : console.error(data.text_pages[0]);
//                     //     identifyPdf(data.text_pages[0])
//                     // }
//                 })();
//             }
//         }, 1000);

        
//             `gs://${bucketName}/${fileName} downloaded to ./app/tempFolder/${fileName}.`
//         );
//     }
//     // const { originalname, buffer } = file;
//     // const params = {
//     //     Bucket: S3bucketName,
//     //     Key: userId + '/' + originalname,
//     //     ContentType: 'application/pdf',
//     //     Body: buffer
//     // }
//     // s3.upload(params, (err, data) => {
//     //     if (err) {
            
//     //     }
//     //     downloadFile(S3bucketName, originalname).catch((err) => { 
//     // })
// });
// const uploadImage1 = (userId, file) => new Promise((resolve, reject) => {
//     const { originalname, buffer } = file;
//     const params = {
//         Bucket: S3bucketName,
//         Key: userId + '/' + originalname,
//         ContentType: 'application/pdf',
//         Body: buffer
//     }
//     s3.upload(params, async (err, data) => {
//         if (err) {
            
//             reject(`Unable to upload image, something went wrong`)
//         }
        
//         var publicUrl = `${BucketURL}/${originalname}`;
        
//         resolve(publicUrl, file)
//     });

// });

// const uploadImageNormal = (file, userId) => new Promise((resolve, reject) => {
//     const { originalname, buffer } = file;
//     try {
//         const params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + create_UUID() + '_' + originalname,
//             ContentType: 'application/pdf',
//             Body: buffer
//         }
//         if (originalname == undefined || originalname == null) {
//             var publicUrl = `${BucketURL}/${params?.Key}`;
//             resolve(publicUrl, '');
//         } else {
//             s3.upload(params, async (err, data) => {
//                 if (err) {
                    
//                     reject(`Unable to upload image, something went wrong`)
//                 }
//                 const myFile = file;
//                 const name = myFile.originalname.replace(/ /g, "_");
//                 const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
//                 document.addDocument({
//                     userId: userId,
//                     docName: name,
//                     docSize: size,
//                     docType: myFile.mimetype
//                 }, (err, resp) => {
//                     var publicUrl = `${BucketURL}/${params?.Key}`;
                    
//                     resolve(publicUrl, file)
//                 })
//             });
//         }
//     } catch (error) {
        
//     }
// });
// const { fromPath } = require("pdf2pic");

// const uploadImagePdf2Image = (file, userId) => new Promise(async (resolve, reject) => {
//     const { originalname, buffer } = file;
//     try {
//         const params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + create_UUID() + '_' + originalname,
//             ContentType: 'application/pdf',
//             Body: buffer
//         }
//         if (originalname == undefined || originalname == null) {
//             var publicUrl = `${BucketURL}/${params?.Key}`;
//             resolve(publicUrl, '');
//         } else {
//             s3.upload(params, async (err, data) => {
//                 if (err) {
                    
//                     reject(`Unable to upload image, something went wrong`)
//                 }
//                 const myFile = file;
//                 const name = myFile.originalname.replace(/ /g, "_");
//                 const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
//                 document.addDocument({
//                     userId: userId,
//                     docName: name,
//                     docSize: size,
//                     docType: myFile.mimetype
//                 }, async (err, resp) => {
//                     var publicUrl = `${BucketURL}/${params?.Key}`;
                    
//                     var s3Params = {
//                         Bucket: S3bucketName,
//                         Key: params?.Key,
//                     };

//                     await s3.getObject(s3Params, async function (err, data) {
//                         let writeStream = await fs.writeFileSync(`./app/tempFolder/dump.pdf`, data?.Body);
//                         const pdfPath = `./app/tempFolder/dump.pdf`;
//                         let pyoptions = {
//                             args: [pdfPath]
//                         };
//                         await PythonShell.run('./app/python_file/pdf_convert_image.py', pyoptions).then(async (convert_result) => {
                            
//                             let writeStream = await fs.readFileSync(convert_result[0]?.replaceAll("\\", "/"), { encoding: 'base64' });
//                             resolve({ publicUrl: publicUrl, pdf2imgae: "data:image/jpg;base64," + writeStream })
//                             await fs.unlinkSync(convert_result[0]?.replaceAll("\\", "/"))
//                         });
//                     });
//                 })
//             });
//         }
//     } catch (error) {
        
//     }
// });

// async function convertPdfToImage(pdfPath, outputPath) {
//     const opts = {
//         format: 'jpeg',      // You can choose other formats like png or tiff
//         out_dir: outputPath,
//         out_prefix: 'page',
//         page: null           // Specify the page number here to convert a specific page, otherwise null to convert all pages
//     };
//     try {
//         await pdfPoppler.convert(pdfPath, opts);
        
//     } catch (error) {
//         console.error('Error converting PDF to image:', error);
//     }
// }


// var checking = () => {
//     async function downloadFile(bucketName, fileName) {
//         var split = '';
//         var val = '';
//         var output = {};
//         function identifyPdf(temp) {
//             val = temp;
            
//             try {
//                 split = val.split("\n");
//                 split = split.filter(function (el) {
//                     return el.trim() != '';
//                 });
//                 var boeNumberLine = getAllIndexes("BE No");
//                 var sbno = getAllIndexes("SB");
//                 generatePdfJson()
//             } catch {
                
//                 let res = [output, publicUrl];
//                 resolve(res);
                
//             }
//         }

//         function generatePdfJson() {
//             split = split.filter(function (el) {
//                 return el.trim() != '';
//             });
//             split.forEach(element => {
//                 var split_text = element.split('-')
//                 output[(split_text[0]).trim()] = split_text[1];
                
//             });
            
//             let res = [output, publicUrl];
//             resolve(res);
            
//         }

//         //function to get all indexes of string
//         function getAllIndexes(val) {
//             var indexes = [],
//                 i = -1;
//             var line;
//             for (var m = 0; m < split.length; m++) {
//                 while ((i = split[m].indexOf(val, i + 1)) != -1) {
//                     if (line != m) indexes.push(m);
//                     line = m;
//                 }
//             }
//             return indexes;
//         }
//         const options = {
//             destination: `./app/tempFolder/${fileName}`,
//         };
//         var publicUrl = `dvrod7xbz3mzi.cloudfront.net/${fileName}`;
//         var s3Params = {
//             Bucket: S3bucketName,
//             Key: userId + '/' + originalname,
//         };
//         if (fileName.includes(".jpeg") || fileName.includes(".jpg") || fileName.includes(".png")) {
            
//             (async () => {
                
//                 await worker.load();
                
//                 await worker.loadLanguage('eng');
                
//                 await worker.initialize('eng');
                
//                 resolve(publicUrl);
//                 const { data: { text } } = await worker.recognize(baseUrl);
                
                

//                 await worker.terminate();
//                 resolve(publicUrl)
//             })();
//         } else if (fileName.includes("pdf")) {
//             async function splitPdf(pathToPdf) {
                
//                 const docmentAsBytes = await fs.promises.readFile(pathToPdf);
//                 // Load your PDFDocument
//                 const pdfDoc = await PDFDocument.load(docmentAsBytes);
//                 const numberOfPages = pdfDoc.getPages().length;
//                 // Create a new "sub" document
//                 const subDocument = await PDFDocument.create();
//                 // copy the page at current index
//                 const [copiedPage] = await subDocument.copyPages(pdfDoc, [0]);
//                 subDocument.addPage(copiedPage);
//                 const pdfBytes = await subDocument.save();
//                 await writePdfBytesToFile(`./app/tempFolder/${fileName}`, pdfBytes);
//             }
//             async function writePdfBytesToFile(fileName, pdfBytes) {
                
//                 return fs.promises.writeFile(fileName, pdfBytes);
//             }
//             (async () => {
                
//                 await splitPdf(`./app/tempFolder/${fileName}`);
//                 const absolute_path_to_pdf = `./app/tempFolder/${fileName}`;
//                 const options = {
//                     type: 'ocr', // perform ocr to get the text within the scanned image
//                     ocr_flags: ['--psm 1'], // automatically detect page orientation
//                     clean: false
//                 };
//                 const processor = pdf_extract(absolute_path_to_pdf, options, () => 
//                 processor.on('complete', data => callback(null, data));
//                 processor.on('error', callback);
//                 var i = 0;
//                 function callback(error, data) {
//                     error ? console.error(error) : console.error(data.text_pages[0]);
//                     identifyPdf(data.text_pages[0])
//                 }
//             })();

//             // resolve(publicUrl)
//         }
        
//             `gs://${bucketName}/${fileName} downloaded to ./app/tempFolder/${fileName}.`
//         );
//     }
//     downloadFile(S3bucketName, 'New SB3.pdf')
// }
// let socket = null;
// function getSocketProperties(httpServer) {
//     socket = require('socket.io')(httpServer, { origins: '*:*' })
//     socket.on('connection', (socket) => { })
// }
// function SocketSendData(key, value) {
//     // socket.emit(key, value);
    
// }
// module.exports = {
//     uploadImage: uploadImage,
//     uploadImage1: uploadImage1,
//     uploadImageInward: uploadImageInward,
//     checking: checking,
//     uploadImageSB: uploadImageSB,
//     uploadImageInwardOutward: uploadImageInwardOutward,
//     getSocketProperties: getSocketProperties,
//     uploadImageBOE: uploadImageBOE,
//     uploadImageInwardDisposal: uploadImageInwardDisposal,
//     uploadImageNormal: uploadImageNormal,
//     uploadImagePdf2Image: uploadImagePdf2Image
// };