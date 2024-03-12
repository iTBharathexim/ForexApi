const { format } = require('util');
const { createWorker } = require('tesseract.js');
var pdfUtil = require('pdf-to-text');
var inspect = require('eyes').inspector({ maxLength: 20000 });
var pdf_extract = require('pdf-extract');
var PDFImage = require("pdf-image").PDFImage;
const path = require("path");
const { CostExplorer } = require('aws-sdk');
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
        
        split = split.filter(function (el) {
          return el.trim() != '';
        });
        

        var boeNumberLine = getAllIndexes("BE No");

        var sbno = getAllIndexes("SB");

        // sample other pdfupload
        if (boeNumberLine == '') {
          
          output["pdfflag"] = "1";
          
          
          let res = [output, publicUrl];
          resolve(res)
        } else {
          getJson()
        }
      } catch {
        
      }
      
      
    }
    //for shipping bill
    function generatePdfJson() {


      // var removeEmpty = ['',]
      split = split.filter(function (el) {
        return el.trim() != '';
      });

      //AD BILL NO
      output["adBillNo"] = "";

      // SHIPPING BILL NO
      var sbno = getAllIndexes("SB");
      var sbDate;
      var sbDateTpggle = false;
      // 
      if (sbno.length > 0) {

        var sbNoValue = split[0].toLocaleLowerCase().includes("port") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 5, null) :
          split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) :
            getValuesFromPdf(parseInt(sbno) + 1, " ", 1, null);
        output["sbno"] = sbNoValue;
        if (sbNoValue.length < 2) {
          sbNoValue = split[0].toLocaleLowerCase().includes("port") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 6, null) :
            split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 1, " ", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) :
              getValuesFromPdf(parseInt(sbno) + 1, " ", 1, null);
          output["sbno"] = sbNoValue;
          if (sbNoValue.length == 0) {
            output["sbno"] = "";
          }
          sbDate = split[0].toLocaleLowerCase().includes("port") ?
            (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 7, null) + "-" + getValuesFromPdf(parseInt(sbno) + 1, " ", 8, null) + "-" + getValuesFromPdf(parseInt(sbno) + 1, " ", 9, null)) :
            split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);

          sbDateTpggle = true;
          output["sbdate"] = sbDate;
          if (sbDate.length == 0) {
            output["sbdate"] = "";
          }

        }
      } else if (sbno.length == 0) {
        output["sbno"] = "";
      }

      // // SHIPPING BILL DATE
      if (!sbDateTpggle) {
        if (sbno.length > 0) {
          sbDate = split[0].toLocaleLowerCase().includes("port") ?
            (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 6, null)) :
            split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);

          
          if (sbDate.length < 2) {
            sbDate = split[0].toLocaleLowerCase().includes("port") ?
              (split[parseInt(sbno) + 1].toLocaleLowerCase().includes("|") ? getValuesFromPdf(parseInt(sbno) + 1, "_", 1, getValuesFromPdf(parseInt(sbno) + 1, "|", 1, null)) : getValuesFromPdf(parseInt(sbno) + 1, " ", 7, null)) :
              split[1].toLocaleLowerCase().includes("status") ? getValuesFromPdf(parseInt(sbno) + 2, "|", 1, null) : getValuesFromPdf(parseInt(sbno) + 1, " ", 2, null);
            
          }
          output["sbdate"] = sbDate;
        } else if (sbno.length == 0) {
          output["sbdate"] = "";
        }
      }



      //PORT CODE
      var portCode = getValuesFromPdf(parseInt(sbno) + 1, " ", 4, null);
      output["portCode"] = portCode;
      if (portCode == undefined) {
        portCode = getValuesFromPdf(parseInt(sbno) + 1, " ", 0, null);
        output["portCode"] = portCode;
      }

      // MAWB No :
      var MAWBNo = split[2].toLocaleLowerCase().includes("MAWB No :") ? getAllIndexes("MAWB No :") : getAllIndexes("hhhhggh");;
      output["MAWBNo"] = MAWBNo;
      //IEC Code
      var iecCodeLine = split[2].toLocaleLowerCase().includes("central") ? getAllIndexes("EC/ Br") : getAllIndexes("hhhhggh");
      // 
      if (iecCodeLine.length > 0) {
        //
        var iecCode = getValuesFromPdf(iecCodeLine, " ", 9, null);
        
        output["ieccode"] = iecCode;
        
        if (iecCode.length < 5) {
          iecCode = getValuesFromPdf(iecCodeLine, " ", 9, null) + getValuesFromPdf(iecCodeLine, " ", 10, null);
          
          output["ieccode"] = iecCode;
        }
        // if (iecCode == "BOARD") {
        //     //
        //     var iecCode1 = getValuesFromPdf(iecCodeLine, "|", 1, null);
        //     var iecCode = getValuesFromPdf(iecCodeLine, " ", 1, iecCode1);
        //     output["ieccode"] = iecCode;
        // } else {
        //     //
        //     //
        //     output["ieccode"] = iecCode;
        // }
      } else if (iecCodeLine.length == 0) {
        
        iecCodeLine = getAllIndexes("EClBr");
        
        if (iecCodeLine.length > 0) {
          iecCode = getValuesFromPdf(iecCodeLine, " ", 2, null);
          
          output["ieccode"] = iecCode;
          
        } else {
          iecCode = getValuesFromPdf([2], " ", 9, null);
          output["ieccode"] = iecCode;
          if (iecCode == undefined) {
            output["ieccode"] = ""
          }
        }
      }

      //IEC Name
      // var iecNameLine = getValuesFromPdf(iecCodeLine, " ", IEC)
      // var iecName = split[parseInt(iecCodeLine) + 4]
      // 
      var iecNameLine = getAllIndexes("PKG");
      if (iecNameLine.length > 0) {
        var iecNameCode = getValuesFromPdf(iecNameLine, " ", 0, null) + " " + getValuesFromPdf(iecNameLine, " ", 1, null) + " " + getValuesFromPdf(iecNameLine, " ", 2, null) + " " + getValuesFromPdf(iecNameLine, " ", 3, null);
        
        output["iecName"] = iecNameCode;
      } else if (iecNameLine.length == 0) {
        output["iecName"] = "";
      }


      //AD Code
      var adCodeLine = getAllIndexes("AD CODE");
      if (adCodeLine.length > 0) {
        var adCode1 = getValuesFromPdf(adCodeLine, ":", 1, null);
        var adCode = getValuesFromPdf(adCodeLine, " ", 1, adCode1);
        output["adCode"] = adCode;
        if (adCode.length < 3) {
          adCode = getValuesFromPdf(adCodeLine, " ", 8, adCode1);
          output["adCode"] = adCode;
        }

      } else if (adCodeLine == 0) {
        output["adCode"] = "";
      }

      //LEO Date
      var leoDateLine = getAllIndexes("LEO Date");
      if (leoDateLine.length == 0) leoDateLine = getAllIndexes("LEo Date");

      if (leoDateLine.length == 0) leoDateLine = getAllIndexes("LEODate");
      if (leoDateLine.length > 0) {
        
        
        var n = split[leoDateLine].split(" ");
        
        var leoDate = n[n.length - 1];
        //return n[n.length - 1];
        //var leoDate = split[leoDateLine].split(" ")[leoDateLine[0] - 1];
        if (leoDate == undefined) {
          output["leodate"] = "dd-mm-yyyy";
        } else {
          output["leodate"] = leoDate;
        }

      } else if (leoDateLine.length == 0) {
        output["leodate"] = "dd-mm-yyyy";
      } else {
        output["leodate"] = "dd-mm-yyyy";
      }

      //Processing Status
      output["processingStaus"] = "";

      //Invoices
      var invoiceLine = getAllIndexes("2.INV NO");
      
      if (invoiceLine.length == 0) {
        invoiceLine = getAllIndexes("2.lNV No");
        
        if (invoiceLine.length > 0) {
          var invoiceValue = findInvoices(invoiceLine, "2.lNV No");
          output["invoices"] = invoiceValue;
          // 
          // var invoiceValue = getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 0, null)
          // var invCheckValue = /^[+-]?\d+(\.\d+)?$/.test(invValue)
          // output["invoices"] = invCheckValue ? invoiceValue : getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 6, null)

        } else if (invoiceLine.length == 0) {
          output["invoices"] = [{
            "sno": "1",
            "invoiceno": "",
            "amount": "",
            "currency": ""
          }]
        }

      } else if (invoiceLine.length > 0) {
        var invValue = getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 0, null);
        var invCheckValue = /^[+-]?\d+(\.\d+)?$/.test(invValue);
        output["invoices"] = invCheckValue ? invValue : getValuesFromPdf(parseInt(invoiceLine) + 1, " ", 6, null)
      }

      //FOB Currency
      currencyLine = getAllIndexes("USD");
      if (currencyLine.length == 0) {
        currencyLine = getAllIndexes("INR");
        if (currencyLine.length > 0) {
          output["fobCurrency"] = 'INR'
        } else if (currencyLine.length == 0) {
          output["fobCurrency"] = ''
        }
      } else if (currencyLine.length > 0) {
        output["fobCurrency"] = 'USD'
      }

      //FOB Value
      var fobValueLine = getAllIndexes("FOB ");
      if (fobValueLine.length > 0) {
        var fobValue = getValuesFromPdf(parseInt(fobValueLine) + 1, " ", 0, null);
        var checkValue = /^[+-]?\d+(\.\d+)?$/.test(fobValue);
        var fobValue2 = checkValue ? fobValue : getValuesFromPdf(parseInt(fobValueLine) + 1, " ", 1, null)
        var fobValue3 = parseFloat(fobValue2)
        
        output["fobValue"] = fobValue3
      } else if (fobValueLine.length == 0) {
        output["fobValue"] = "";
      }

      //REALIZED FOB
      currencyLine = getAllIndexes("USD");
      if (currencyLine.length == 0) {
        currencyLine = getAllIndexes("INR");
        if (currencyLine.length > 0) {
          output["realizedFobCurrency"] = 'INR'
        } else if (currencyLine.length == 0) {
          output["realizedFobCurrency"] = ''
        }
      } else if (currencyLine.length > 0) {
        output["realizedFobCurrency"] = 'USD'
      }


      //CURRENCY
      currencyLine = getAllIndexes("USD");
      if (currencyLine.length == 0) {
        currencyLine = getAllIndexes("INR");
        if (currencyLine.length > 0) {
          output["currency"] = 'INR'
        } else if (currencyLine.length == 0) {
          output["currency"] = ''
        }
      } else if (currencyLine.length > 0) {
        output["currency"] = 'USD'
      }


      //REALIZED FOB VALUE
      output["realizedFobValue"] = "";

      //EQUIVALENT FOB VALUE
      output["equivalentFobValue"] = "";

      //FREIGHT CURRENCY
      currencyLine = getAllIndexes("USD");
      if (currencyLine.length == 0) {
        currencyLine = getAllIndexes("INR");
        if (currencyLine.length > 0) {
          output["freightCurrency"] = 'INR'
        } else if (currencyLine.length == 0) {
          output["freightCurrency"] = ''
        }
      } else if (currencyLine.length > 0) {
        output["freightCurrency"] = 'USD'
      }

      //FREIGHT VALUE REALIZED
      // var freightLine = getAllIndexes("FREIGHT")
      // 
      // if (freightLine.length > 0) {
      //     var freightValue = getValuesFromPdf(parseInt(freightLine) + 1, " ", 0, null)
      //     var freightCheckValue = /^[+-]?\d+(\.\d+)?$/.test(freightValue)
      //     output["freightValueRealized"] = freightCheckValue ? freightValue : getValuesFromPdf(parseInt(freightLine) + 1, " ", 2, null)
      // } else if (freightLine.length == 0) {
      //     output["freightValueRealized"] = "";
      // }

      output["freightValueRealized"] = "";

      //Realized FREIGHT CURRENCY
      currencyLine = getAllIndexes("USD");
      if (currencyLine.length == 0) {
        currencyLine = getAllIndexes("INR");
        if (currencyLine.length > 0) {
          output["realizedFreightCurrency"] = 'INR'
        } else if (currencyLine.length == 0) {
          output["realizedFreightCurrency"] = ''
        }
      } else if (currencyLine.length > 0) {
        output["realizedFreightCurrency"] = 'USD'
      }

      //REALIZED FREIGHT VALUE
      // var freightLine = getAllIndexes("FREIGHT")
      // 
      // if (freightLine.length > 0) {
      //     var freightValue = getValuesFromPdf(parseInt(freightLine) + 1, " ", 0, null)
      //     var freightCheckValue = /^[+-]?\d+(\.\d+)?$/.test(freightValue)
      //     output["realizedFreightValue"] = freightCheckValue ? freightValue : getValuesFromPdf(parseInt(freightLine) + 1, " ", 2, null)
      // } else if (freightLine.length == 0) {
      output["realizedFreightValue"] = "";
      // }

      //INSURANCE CURRENCY
      currencyLine = getAllIndexes("USD");
      if (currencyLine.length == 0) {
        currencyLine = getAllIndexes("INR");
        if (currencyLine.length > 0) {
          output["insuranceCurrency"] = 'INR'
        } else if (currencyLine.length == 0) {
          output["insuranceCurrency"] = ''
        }
      } else if (currencyLine.length > 0) {
        output["insuranceCurrency"] = 'USD'
      }

      //INSURANCE VALUE
      var insurancLine = getAllIndexes("INSURANc");
      if (insurancLine.length > 0) {
        var insurancValue = getValuesFromPdf(parseInt(insurancLine) + 1, " ", 0, null);
        var insurancCheckValue = /^[+-]?\d+(\.\d+)?$/.test(insurancValue);
        output["insuranceValue"] = insurancCheckValue ? insurancValue : getValuesFromPdf(parseInt(insurancLine) + 1, " ", 3, null)
      } else if (insurancLine.length == 0) {
        var insurancLine = getAllIndexes("INSURANC");
        if (insurancLine.length > 0) {
          var insurancValue = getValuesFromPdf(parseInt(insurancLine) + 1, " ", 0, null);
          var insurancCheckValue = /^[+-]?\d+(\.\d+)?$/.test(insurancValue);
          output["insuranceValue"] = insurancCheckValue ? insurancValue : getValuesFromPdf(parseInt(insurancLine) + 1, " ", 3, null)
        } else if (insurancLine.length == 0) {
          output["insuranceValue"] = "";
        }
      } else {
        output["insuranceValue"] = "";
      }

      //REALIZED INSURANCE VALUE
      output["realizedInsuranceValue"] = "";

      //BANKING CHARGES
      output["bankingCharges"] = "";

      //EXPECTED PAYMENT LAST DATE
      output["expectedPaymentlastdate"] = "";

      //ADDED DATE
      output["AddedDate"] = "";

      //MODIFIED DATE
      output["modifiedDate"] = "";



      
      //
      //let res = [output]
      let res = [output, publicUrl];
      resolve(res);
      

    }

    // generatePdfJson(temp)

    //function to get all indexes of string
    function getAllIndexes(val) {
      var indexes = [],
        i = -1;
      var line;
      for (var m = 0; m < split.length; m++) {
        // 
        while ((i = split[m].indexOf(val, i + 1)) != -1) {
          if (line != m) indexes.push(m);
          line = m;
        }
      }
      return indexes;
    }

    function getValuesFromPdf(line, separator, index, str2) {
      // 
      // 
      if (str2 == null) {
        return split[line].split(separator)[index];
      } else if (str2 != null) {
        return str2.split(separator)[index];
      }


    }

    function findInvoices(line, str) {
      var invoices = [];
      var firstInvoiceNo = str == "a" ?
        (/^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) ? getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null)) :
          getValuesFromPdf(parseInt(line) + 1, " ", 2, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) : getValuesFromPdf(parseInt(line) + 1, "~", 1, getValuesFromPdf(parseInt(line) + 1, " ", 9, null));

      var firstInvoiceAmount = str == "a" ?
        (/^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) ? getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null)) :
          getValuesFromPdf((parseInt(getAllIndexes("INVOICE VALUE")) + 1), " ", 0, null)) :
        /^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 9, null)) ? getValuesFromPdf(parseInt(line) + 1, " ", 9, null) : getValuesFromPdf(parseInt(line) + 1, " ", 11, null);

      var firstInvoiceCurrency = str == "a" ?
        ((/^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))) ? getValuesFromPdf(parseInt(line) + 1, "__", 1, getValuesFromPdf(parseInt(line) + 1, "|", 1, null)) :
          getValuesFromPdf(parseInt(line) + 1, "-", 1, getValuesFromPdf(parseInt(line) + 1, " ", 4, getValuesFromPdf(parseInt(line) + 1, "|", 1, null))))) :
        /^[+-]?\d+(\.\d+)?$/.test(getValuesFromPdf(parseInt(line) + 1, " ", 9, null)) ? getValuesFromPdf(parseInt(line) + 1, " ", 10, null) : getValuesFromPdf(parseInt(line) + 1, " ", 12, null);
      invoices.push({
        "sno": "1",
        "invoiceno": firstInvoiceNo == undefined ? "" : firstInvoiceNo,
        "amount": firstInvoiceAmount == undefined ? "" : firstInvoiceAmount,
        "currency": firstInvoiceCurrency == undefined ? "" : firstInvoiceCurrency
      });
      var secondSNo = getValuesFromPdf(parseInt(line) + 1, " ", 5, null);
      var secondInvoiceNo = str == "a" ? getValuesFromPdf(parseInt(line) + 1, " ", 5, null) : getValuesFromPdf(parseInt(line) + 1, " ", 6, null);
      var secondInvoiceAmount = getValuesFromPdf(parseInt(line) + 1, " ", 7, null);
      var secondInvoiceCurrency = getValuesFromPdf(parseInt(line) + 1, " ", 8, null);
      if (secondInvoiceAmount != undefined && secondInvoiceCurrency != undefined) {
        invoices.push({
          "sno": secondSNo == undefined ? "" : secondSNo,
          "invoiceno": secondInvoiceNo == undefined ? "" : secondInvoiceNo,
          "amount": secondInvoiceAmount == undefined ? "" : secondInvoiceAmount,
          "currency": secondInvoiceCurrency == undefined ? "" : secondInvoiceCurrency
        })
      }

      return invoices;

    }


    //for Boe

    function getJson() {

      // Discharge port
      var dischargePotLine = getAllIndexes("Port");
      var dischargePort = getValuesFromPdf(dischargePotLine, ":", 2, null);
      output["dischargePort"] = dischargePort;

      //BOE number
      var boeNumberLine = getAllIndexes("BE No");
      var boeNumber = getValuesFromPdf(boeNumberLine, ":", "1", null);
      output['boeNumber'] = boeNumber.split("/")[0];

      //BOE date
      var boeDate = getValuesFromPdf(boeNumberLine, ":", "1", null);
      output['boeDate'] = [boeDate.split("/")[1], boeDate.split("/")[2], boeDate.split("/")[3]].join("/");

      //IEC
      var iecLine = getAllIndexes("Code");
      var iecCode = getValuesFromPdf(iecLine, ":", "3", null);
      output["iecCode"] = iecCode;

      //IEC NAME
      var iecName = split[parseInt(iecLine) + 2];
      output["iecName"] = iecName;

      //AD CODE
      var adCodeLine = getAllIndexes("AD Code");
      var adCode = getValuesFromPdf(adCodeLine, ":", 3, null);
      output["adCode"] = adCode;

      //Inv No
      var invoiceNumberLine = getAllIndexes("Inv No");
      var invoiceNumber1 = getValuesFromPdf(invoiceNumberLine, ":", 1, null);
      var invoiceNumber = getValuesFromPdf(invoiceNumberLine, " ", 1, invoiceNumber1).split('=-').join('-');
      output["invoiceNumber"] = invoiceNumber;

      //Invoice Amount
      var invoiceAmountLine = getAllIndexes("Inv Val");
      
      if (invoiceAmountLine.length === 0) {
        invoiceAmountLine = getAllIndexes("Inv Pal");
        
        if (invoiceAmountLine.length === 0) {
          output["invoiceAmount"] = " ";
        } else {
          var invoiceAmount1 = getValuesFromPdf(invoiceAmountLine, ":", 1, null);
          
          var invoiceAmount = getValuesFromPdf(invoiceAmountLine, " ", 1, invoiceAmount1);
          // 
          var invoiceAmount2 = parseFloat(invoiceAmount)
          
          output["invoiceAmount"] = invoiceAmount2;
        }
      } else {
        var invoiceAmount1 = getValuesFromPdf(invoiceAmountLine, ":", 1, null);
        
        var invoiceAmount = getValuesFromPdf(invoiceAmountLine, " ", 1, invoiceAmount1);
        
        var invoiceAmount3 = parseFloat(invoiceAmount)
        
        output["invoiceAmount"] = invoiceAmount3;
      }




      //currency
      output["currency"] = getValuesFromPdf(invoiceAmountLine, " ", 2, invoiceAmount1);

      //Settled Amount
      // var settleNumberLine = getAllIndexes("Set Val");

      output["settledAmount"] = "";

      //Status
      output["status"] = "";

      output["PdfFile"] = "";

      //Freight Amount
      var freightAmountLine = getAllIndexes("Freight");
      var freightAmount1 = getValuesFromPdf(freightAmountLine, ":", 1, null);
      var freightAmount = getValuesFromPdf(freightAmountLine, " ", 1, freightAmount1);
      var freightAmount2 = parseFloat(freightAmount)
      
      output["freightAmount"] = freightAmount2;

      //Freight currency
      var freightCurrency = getValuesFromPdf(freightAmountLine, " ", 2, freightAmount1);
      output["freightCurrency"] = freightCurrency;

      //Insurance amount
      var insuranceAmountLine = getAllIndexes("Insurance");
      var insuranceAmount1 = getValuesFromPdf(insuranceAmountLine, ":", 1, null);
      var insuranceAmount = getValuesFromPdf(insuranceAmountLine, " ", 1, insuranceAmount1);
      var insuranceAmount2 = parseFloat(insuranceAmount)
      
      output["insuranceAmount"] = insuranceAmount2;

      //Insurance currency
      var insuranceCurrency = getValuesFromPdf(insuranceAmountLine, " ", 2, insuranceAmount1);
      output["insuranceCurrency"] = insuranceCurrency;

      //Discount Amount
      var discountAmountLine = getAllIndexes("Discount Amount");
      var discountAmount = getValuesFromPdf(discountAmountLine, ":", 2, null);
      var discountAmount2 = parseFloat(discountAmount)
      
      output["discountAmount"] = discountAmount2;

      //Discount Currency
      var discountCurrency = getValuesFromPdf(discountAmountLine, " ", 2, discountAmount);
      if (discountCurrency === undefined) {
        output["discountCurrency"] = "";
      } else {
        output["discountCurrency"] = discountCurrency;
      }


      //Miscellaneous Amount
      var misAmountLine = getAllIndexes("Misc");
      var miscAmount1 = getValuesFromPdf(misAmountLine, ":", 1, null);
      var miscAmount = getValuesFromPdf(misAmountLine, " ", 2, miscAmount1);
      var miscAmount2 = parseFloat(miscAmount)
      
      output["miscellaneousAmount"] = miscAmount2;

      //Miscellaneous currency
      var miscCurrency = getValuesFromPdf(misAmountLine, " ", 3, miscAmount1);
      output["miscellaneousCurrency"] = miscCurrency;

      //Commission amount
      output["commissionAmount"] = "";

      //Commision Currency
      output["commissionCurrency"] = "";
     
     // MAWB No :
       var MAWBNoLine = getAllIndexes("MAWB No");
       var MAWBNo = getValuesFromPdf(MAWBNoLine, ":", 1, null);
      output["AWBNo"] = MAWBNo.replace(' HAWB No ','');
      
       
     // HAWB No :
     var HAWBNoLine = getAllIndexes("HAWB No");
     var HAWBBNo = getValuesFromPdf(HAWBNoLine, ":", 1, null);
    output["HAWBNo"] = HAWBBNo;
      
      
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
          // setInterval(() => {
          //     
          // }, 1000);
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

const uploadImage1 = (userId,file) => new Promise(async (resolve, reject) => {
  
  const { originalname, buffer } = file;

  let readStream = await s3.getObject(s3Params).createReadStream();
  let writeStream = fs.createWriteStream(`./app/tempFolder/${file}`);
  readStream.pipe(writeStream)
  writeStream.on('finish', async () => {
    var publicUrl = `${BucketURL}/${file}`;
    
    resolve(publicUrl, file)
  }).on('error', (err) => {
    
    reject(`Unable to upload image, something went wrong`)
  })
    .end(buffer);
});

module.exports = {
  uploadImage: uploadImage,
  uploadImage1: uploadImage1
};