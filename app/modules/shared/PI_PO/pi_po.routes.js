const express = require("express");
const router = express.Router();
module.exports = router;
const postPipo = require("./pi_po.controller");
const fs = require("fs");
const axios = require('axios');
const { PDFDocument } = require('pdf-lib');
const { PythonShell } = require('python-shell');
const AWS = require("aws-sdk");
const moment = require("moment");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

var S3bucketName;
var BucketURL;

S3bucketName = process.env.AWS_S3_BUCKET;
BucketURL = process.env.AWS_S3_BUCKET_URL;




router.post("/post", async (req, res, next) => {
  req.body.pipo.purchasedate = moment(new Date()).format("YYYY-MM-DD");
  req.body.pipo.userId = req.user[0].companyId;
  req.body.pipo.deleteflag = "0";

  postPipo.addPipoFile(req.body, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        message: "Pipo added Successfully",
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/getSinglePipo", async (req, res, next) => {
  postPipo.getSinglePipo({ id: req.body.id, userId: req.user[0].companyId }, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/getPipoById", async (req, res, next) => {
  postPipo.getSinglePipo({ id: req.body.id, userId: req.user[0].companyId }, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.get("/get", async (req, res, next) => {
  postPipo.getPipo({ userId: req.user[0].companyId, filetype: req.user[0]?.sideMenu }, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.get("/getPipoNo", async (req, res, next) => {
  postPipo.getPipoNo({ userId: req.user[0].companyId, filetype: req.user[0]?.sideMenu }, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  }
  );
});

router.post("/getPipoNoFilter", async (req, res, next) => {
  postPipo.getPipoNoCustom({ userId: req.user[0].companyId, filetype: req.user[0]?.sideMenu, query: req?.body?.query }, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/update", async (req, res, next) => {
  delete req.body.pipo?.updatedAt;
  delete req.body.pipo?.userId;
  delete req.body.pipo?.__v;
  delete req.body.pipo?._id;

  postPipo.updatePipo(req.body.id, req.body.pipo, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/updateSingle", async (req, res, next) => {
  postPipo.updateSinglePipo(
    req.body.id,
    req.body.file,
    req.body.doc,
    (err, resp) => {
      if (err) {
        res.status(400).json({
          message: "Some error",
        });
      } else if (resp) {
        res.status(200).json({
          data: resp,
        });
      } else {
        res.status(400).json({
          message: "Some error",
        });
      }
    }
  );
});

router.post("/getSinglePipo", async (req, res, next) => {
  postPipo.getSinglePipo(req.body.id, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/updateMany", async (req, res, next) => {
  postPipo.updateManyPipo(
    req.body.pipo,
    req.body.file,
    req.body.doc,
    req.body,
    req.user[0].companyId,
    (err, resp) => {
      if (err) {
        res.status(400).json({
          message: "Some error",
        });
      } else if (resp) {
        res.status(200).json({
          data: resp,
        });
      } else {
        res.status(400).json({
          message: "Some error",
        });
      }
    }
  );
});

router.post("/updateMany1", async (req, res, next) => {
  postPipo.updateManyPipo1(req.body.pipo, req.body.file, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/getMany", async (req, res, next) => {
  postPipo.getManyPipo(req.body.pipo, req.user[0].companyId, (err, resp) => {
    if (err) {
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/getPipoByBene", async (req, res, next) => {
  postPipo.getPipoByBene(
    {
      beneName: req.body.bene,
      userId: req.user[0].companyId,
    },
    (err, resp) => {
      if (err) {
        res.status(400).json({
          message: "Some error",
        });
      } else if (resp) {
        res.status(200).json({
          message: "Upload was successful",
          data: resp,
        });
      } else {
        res.status(400).json({
          message: "Some error",
        });
      }
    }
  );
});

router.post("/mergePdf", async (req, res, next) => {
  if (req.body.filename != '') {
    const res1 = s3.getObject({ Bucket: S3bucketName, Key: req.body.filename?.replace(BucketURL + '/', '') }).promise()
    res.send(res1.Body)
  } else {
    res.send('pdf not found');
  }
});

const { Poppler } = require("node-poppler");
let env_file = process.env.npm_lifecycle_event;
env_file = env_file.split(' ')

router.post("/ConvertPdfImage", async (req, res, next) => {
  try {
    if (req.body.filename != '') {
      const invoiceFileContents = new Buffer.from(req.body.filename, "base64");
      await fs.writeFileSync("app/tempFolder/convertImage/some.pdf", invoiceFileContents);
      const file = "app/tempFolder/convertImage/some.pdf";
      let poppler = null;
      if (env_file[0] == 'local') {
        poppler = new Poppler();
      } else {
        poppler = new Poppler("/usr/bin");
      }

      const options = {
        firstPageToConvert: 1,
        lastPageToConvert: 1,
        pngFile: true,
      };
      const outputFile = `app/tempFolder/convertImage/test_document`;
      await poppler.pdfToCairo(file, outputFile, options);
      let writeStream = await fs.readFileSync(outputFile + "-1.png"?.replaceAll("\\", "/"), { encoding: 'base64' });
      res.json({ pdf2imgae: "data:image/jpg;base64," + writeStream })
      await fs.unlinkSync(outputFile + "-1.png"?.replaceAll("\\", "/"))
    } else {
      res.send('pdf not found');
    }
  } catch (error) {
    
  }
});

router.post("/ConvertPdfDocx", async (req, res, next) => {
  try {
    if (req.body.filename != '') {
      const invoiceFileContents = new Buffer.from(req.body.filename, "base64");
      await fs.writeFileSync("app/tempFolder/convertImage/some.pdf", invoiceFileContents);
      const file = "app/tempFolder/convertImage/some.pdf";
      let pyoptions = {
        args: [file]
      };
      await PythonShell.run('./app/python_file/ConvertPdfDocx.py', pyoptions).then(async (convert_result) => {
        let writeStream = await fs.readFileSync("app/tempFolder/convertImage/ConvertPdfDocx.docx"?.replaceAll("\\", "/"), "base64");
        await res.json({ pdf2doc: writeStream })
        
      });
    } else {
      res.send('pdf not found');
    }
  } catch (error) {
    
  }
});

function toArrayBuffer(buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

router.post("/multiplemergePdf", async (req, res, next) => {
  if (req.body.filename != '') {
    try {
      removeurl(req.body.filename).then(async (newurllist) => {
        geturl(newurllist).then(async (promisesOfS3Objects) => {
          var temp = [];
          await promisesOfS3Objects?.data?.forEach(async (element) => {
            if (Buffer.byteLength(element?.Body) != 0) {
              await temp.push(element?.Body)
            }
          });
          await callback(promisesOfS3Objects?.URL_LIST,newurllist[0]?.split('/')[0]).then(async (res1) => {
            await NewMergePdfs(res1).then((url) => {
              var buf = Buffer.from(url?.merge.replace(/^data:.+;base64,/, ""), 'base64');
              const params = {
                Bucket: S3bucketName,
                Key: req.user[0].companyId + '/' + create_UUID() + '.pdf',
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'application/pdf'
              }
              s3.putObject(params, async function (err, data) {
                if (err) {
                  
                  
                  res.send('pdf not found');
                } else {
                  
                  var publicUrl = `${BucketURL}/${params?.Key}`;
                  await res.send({ pdfurl: publicUrl, actulapdfbase64: temp });
                }
              });
            });
          })

        });
      })
    } catch (error) {
      
      res.send('pdf not found');
    }
  } else {
    res.send('pdf not found');
  }
});

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

const merge = require('../../../python_file/PDF_Merger/PDFMerger');
function callback(pathList,userId) {
  return new Promise(async (resolve, reject) => {
    merge(pathList, `app/tempFolder/convertImage/${userId}.pdf`, function (err) {
      if (err) {
        reject(err)
        return 
      }
      
      for (let index = 0; index < pathList.length; index++) {
        const element = pathList[index];
        fs.unlinkSync(element);
      }
      resolve(`app/tempFolder/convertImage/${userId}.pdf`)
    });
  });
}

function removeurl(data) {
  return new Promise(async (resolve, reject) => {
    var temp = [];
    var listUrl = [
      'https://devapp.bharathexim.com',
      'https://liveassets.bharathexim.com',
      'https://devassets.bharathexim.com',
      'https://www.bharathexim.com',
      'http://localhost:4200',
      'https://staging.bharathexim.com'];
    await data.forEach(async (element) => {
      await listUrl.forEach(urlelement => {
        if (element?.indexOf(urlelement) != -1 || element?.indexOf(/^data:.+;base64,/, "") != -1) {
          temp.push(element?.replace(urlelement + '/', ''))
        }
      });
    });
    await resolve(temp);
  })
}

function geturl(data) {
  return new Promise(async (resolve, reject) => {
    let temp = [];
    let URL_LIST = [];
    for (let index = 0; index < data?.length; index++) {
      const element = data[index];
      var s3Params = {
        Bucket: S3bucketName,
        Key: element
      };
      temp.push(await s3.getObject(s3Params).promise())
      let readStream = await s3.getObject(s3Params).createReadStream();
      URL_LIST.push(`app/tempFolder/convertImage/${element?.split("/")[1]}`)
      let writeStream = fs.createWriteStream(`app/tempFolder/convertImage/${element?.split("/")[1]}`);
      readStream.on('close', async function () {
        
        if ((index + 1) == data?.length) {
          await resolve({ data: temp, URL_LIST: URL_LIST });
        }
      }).pipe(writeStream);
    }
  })
}

const getpdf = async (pdfname) => {
  let tempImage = null;
  tempImage = await s3.getObject({ Key: pdfname, Bucket: S3bucketName, }).promise();
  return tempImage;
}

const loopAllPdfAddToList = (pdflist) => {
  return (async () => {
    const promises = [];
    try {
      
      pdflist.forEach(element => {
        promises.push(s3.getObject({
          Bucket: S3bucketName,
          Key: element,
        }).promise());
      });
      const results = await Promise.all(promises);
      return results;
    } catch (err) {
      
      throw err;
    }
  })();
}

function mergePdfs(pdfsToMerges) {
  return new Promise(async (resolve, reject) => {
    try {
      const mergedPdf = await PDFDocument.create();
      for (let index = 0; index < pdfsToMerges.length; index++) {
        const element = pdfsToMerges[index];
        if (Buffer.byteLength(element?.Body) != 0) {
          const pdf = await PDFDocument.load(element?.Body, {
            ignoreEncryption: true,
          });
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          await copiedPages.forEach(async (page) => {
            await mergedPdf.addPage(page);
          });
        }
        if ((index + 1) == await pdfsToMerges.length) {
          const pdfDataUri = await mergedPdf.saveAsBase64({ dataUri: true });
          var data_pdf = await pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
          var merge = 'data:application/pdf;base64,' + data_pdf;
          await resolve({ merge: merge, pdfDataUri: pdfDataUri, data_pdf: data_pdf })
        }
      }
    } catch (err) {
      await resolve({ merge: "", pdfDataUri: "", data_pdf: "" });
      
    }

  })
}

function NewMergePdfs(filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      const fs = require('fs/promises'); //note fs/promises, not fs here
      const pdfData = await fs.readFile(filePath);
      const mergedPdf = await PDFDocument.create();
      const pdfDoc = await PDFDocument.load(pdfData);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      await copiedPages.forEach(async (page) => {
        await mergedPdf.addPage(page);
      });
      const pdfDataUri = await mergedPdf.saveAsBase64({ dataUri: true });
      var data_pdf = await pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
      var merge = 'data:application/pdf;base64,' + data_pdf;
      await resolve({ merge: merge, pdfDataUri: pdfDataUri, data_pdf: data_pdf })
    } catch (err) {
      await resolve({ merge: "", pdfDataUri: "", data_pdf: "" });
      
    }
  })
}

function toArrayBuffer(buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

mergeAllPDF = async (doc) => {
  return new Promise(async (resolve, reject) => {
    const pdfDoc = await PDFDocument.create();
    var appendAllFiles = async (pdflist, currentfile) => {
      if (currentfile < doc.length) {
        await appendEachFile(pdflist[currentfile]);
        await appendAllFiles(pdflist, currentfile + 1);
      } else {
        // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        // var data_pdf = pdfDataUri.substring(pdfDataUri.indexOf(',') + 1);
        // var merge = 'data:application/pdf;base64,' + data_pdf 
        const pdfData = await pdfDoc.save();
        resolve({ pdfmerge: await pdfDoc.saveAsBase64({ dataUri: true }), OrignalMerge: pdfData, buffer: pdfData })
      }
    };
    var appendEachPage = async (donorPdfDoc, currentpage, docLength) => {
      if (currentpage < docLength) {
        const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [currentpage]);
        pdfDoc.addPage(donorPage);
        await appendEachPage(donorPdfDoc, currentpage + 1, docLength);
      }
    };
    var appendEachFile = async (bytes) => {
      const donorPdfDoc = await PDFDocument.load(bytes);
      const docLength = donorPdfDoc.getPageCount();
      await appendEachPage(donorPdfDoc, 0, docLength);
    };
    // download all the pdfs
    let downloadAllFiles = async () => {
      var promises = [];
      for (var i = 0; i < doc.length; i++) {
        if (doc[i] != '' && doc[i] != undefined) {
          await promises.push(doc[i]);
        }
      }
      Promise.all(promises).then(async (pdfList) => {
        await appendAllFiles(pdfList, 0);
      });
    };
    downloadAllFiles();
  });
}
function _arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary);
}

function _arrayBufferToBase64_2(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary).toString('base64');
}

function joinBase64Strings(base64SList) {
  var bothData = ''
  base64SList.forEach(element => {
    bothData += Buffer.from(element, 'base64').toString('binary');
  });
  const joinedBase64Result = Buffer.from(bothData.toString()).toString('base64');

  return joinedBase64Result;
}
router.post("/doc_mergePdf", async (req, res, next) => {
  if (req.body.doclist != '' && req.body.doclist != undefined) {
    DOC_QUEUE(req.body.doclist).then((values) => {
      res.send(value)
    });
  } else {
    res.send('error data not found')
  }
});

async function DOC_QUEUE(doc) {
  var temp = [];
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    responseType: 'arraybuffer'
  }
  for (let index = 0; index < doc.length; index++) {
    if (doc[index] != undefined && doc[index] != null) {

      const res = await axios.get(doc[index], config);
      temp.push(res?.data)
    }
  }
  return temp;
}

router.get("/15CA", async (req, res, next) => {
  try {
    let bufferdata = {
      "metadata": {
        "filingType": "O",
        "refYearType": "FY",
        "financialQtr": "0",
        "refYear": "2023",
        "operation": "save",
        "subMode": "ON",
        "formName": "F15CA",
        "sn": "form15CAAnd15CBManageForm",
        "preview": "N",
        "returnUrl": "",
        "ackId": "",
        "workList": "N",
        "hash": "",
        "refMonth": ""
      },
      "data": {
        "entityNumber": "AFAPR7559G",
        "entityFirstName": "GANGADHARAN",
        "entityMidName": "",
        "entityLastName": "RAMAKRISHNAN",
        "entityAddrLine1Txt": "3/857,CHOKKANATHAPURAM",
        "entityAddrLine2Txt": "PALAKKAD",
        "entityPinCd": "678005",
        "entityLocalityCd": "",
        "entityLocalityDesc": "PALAKKAD",
        "entityStateCd": 16,
        "entityStateDesc": "Kerala",
        "entityCountryCd": "91",
        "entityCountryName": "INDIA",
        "entityDistrictCd": "",
        "entityDistrictDesc": "Chokkanathapuram S.O",
        "entityPostOfficeCd": "",
        "entityPostofficeDesc": "Palakkad",
        "entityTaxPayerCatgCd": "IND",
        "entityTaxPayerCatgDesc": "Individual",
        "entityJursdAreaCode": "CHE",
        "entityJursdAoTypeCode": "W",
        "entityJursdRangeCode": "191",
        "entityJursdAoNbr": "91",
        "entityPrimaryEmail": "sriram6174@gmail.com",
        "entitySecondaryEmail": "",
        "entityPrimaryMobile": "9567393083",
        "entitySecondaryMobile": "",
        "entityDesig": "Individual",
        "pcFirstName": "",
        "pcMidName": "",
        "pcLastName": "",
        "pcDesig": "",
        "arn": "",
        "citId": 1,
        "pcPan": "",
        "formVersion": 1,
        "schemaVersion": 1,
        "foreignEmail": "",
        "userId": "AFAPR7559G",
        "userFirstName": "GANGADHARAN",
        "userMidName": "",
        "userLastName": "RAMAKRISHNAN",
        "userRoleCd": "IND",
        "userPan": "",
        "userEmail": "sriram6174@gmail.com",
        "userMobile": "9567393083",
        "repPan": "",
        "repMobile": "",
        "repEmail": "",
        "repRole": "",
        "repName": "",
        "payeePan": "",
        "entityZipCd": "",
        "loginUserAddress": "",
        "part": "A",
        "partAName": "GANGADHARAN RAMAKRISHNAN",
        "partAPan": "AFAPR7559G",
        "partATan": "",
        "partARemStatus": "Individual",
        "partAResSatus": 1,
        "partAAddress": "3/857,CHOKKANATHAPURAM, PALAKKAD, PALAKKAD, Palakkad, Chokkanathapuram S.O, Kerala, INDIA - 678005",
        "partAEmail": "sriram6174@gmail.com",
        "partAMobile": "9567393083",
        "partARmtnceRcpnt": "",
        "partASaveRmtee": "",
        "partARcpntPan": "",
        "partAAddress1": "",
        "partARcpntEmail": "",
        "partARcpntPhone": "",
        "partARmtnceCntry": "",
        "partAAmtBfrTds": "",
        "partAAggAmt": "",
        "partAIfsc": "",
        "partABankName": "",
        "partABankBranch": "",
        "partAAuthDealer": "",
        "partAAuthDealerBranch": "",
        "partARmtnceDt": "",
        "partARmtnceNature": "",
        "partAOthRmtnceNatureDtls": "",
        "partARbiPpsCd": "",
        "partARbiSubPpsCd": "",
        "partATdsAmt": "",
        "partATdsRate": "",
        "partADeductionDt": "",
        "partAVerPronoun": "I",
        "partAVerName": "GANGADHARAN RAMAKRISHNAN",
        "partAVerFatherName": "",
        "partAVerDesig": "Individual",
        "partAVerPronoun1": "",
        "partAVerPlace": "152.58.153.90",
        "partAVerDate": "2023-11-30",
        "partAPersnPaying": "GANGADHARAN RAMAKRISHNAN",
        "partADesigPersnPaying": "Individual",
        "partBName": "",
        "partBPan": "",
        "partBTan": "",
        "partBRemStatus": "",
        "partBResSatus": "",
        "partBAddress": "",
        "partBEmail": "",
        "partBMobile": "",
        "partBRmtnceRcpnt": "",
        "partBSaveRmtee": "",
        "partBRcpntPan": "",
        "partBAddress1": "",
        "partBRcpntEmail": "",
        "partBRcpntPhone": "",
        "partBCertSec": "",
        "partBAoName": "",
        "partBAoDesig": "",
        "partBOrdrDt": "",
        "partBCertNum": "",
        "partBRemtCntry": "",
        "partBCurrency": "",
        "partBAmtForeignCurr": "",
        "partBAmtInr": "",
        "partBIfsc": "",
        "partBBankName": "",
        "partBBankBranch": "",
        "partBBankBsrCode": "",
        "partBAuthDealer": "",
        "partBAuthDealerBranch": "",
        "partBPrpsdRmtnceDt": "",
        "partBOthRmtnceNatureDtls": "",
        "partBOthRmtnceNatureDtlss": "",
        "partBRbiPpsCd": "",
        "partBRbiSubPpsCd": "",
        "partBTdsAmt": "",
        "partBTdsRate": "",
        "partBDeductionDt": "",
        "partBVerPronoun": "",
        "partBVerName": "",
        "partBVerFatherName": "",
        "partBVerDesig": "",
        "partBVerPronoun1": "",
        "partBVerPronoun2": "",
        "partBVerPlace": "",
        "partBVerDate": "",
        "partBPersnPaying": "",
        "partBDesigPersnPaying": "",
        "partCpreRmtnceRcpnt": "",
        "partCpreSaveRmtee": "",
        "partCpreRecRemittence": "",
        "partCpreStatus": "",
        "partCpreEmail": "",
        "partCpreMobile": "",
        "partCpreAccName": "",
        "partCpreMembNo": "",
        "partCpreRmtnceCntry": "",
        "partCpreCurrency": "",
        "partCpreFrgnCurrency": "",
        "partCpreIndCurrency": "",
        "partCpreIfsc": "",
        "partCpreBankName": "",
        "partCpreBankBranch": "",
        "partCpreBankBsrCode": "",
        "partCpreAuthDealer": "",
        "partCpreAuthDealerBranch": "",
        "partCpreRmtnceDt": "",
        "partCpreRmtnceNature": "",
        "partCpreRemittanceNatureOthTxt": "",
        "partCpreAttach1DocId": "",
        "partCprePincode": "",
        "partCprePrincPlace": "",
        "partCpostRemitterName": "",
        "partCpostRemitterPan": "",
        "partCpostRemitterTan": "",
        "partCpostStatus": "",
        "partCpostRemitterResSts": "",
        "partCpostAreaCode": "",
        "partCpostAoType": "",
        "partCpostRange": "",
        "partCpostAoNumb": "",
        "partCpostRmtrPrinPlBusiness": "",
        "partCpostRemitterAddress": "",
        "partCpostEmail": "",
        "partCpostMobile": "",
        "partCpostRmtnceRcpnt": "",
        "partCpostRecRemtncePan": "",
        "partCpostRemittenceStatus": "",
        "partCpostRemittanceAddr": "",
        "partCpostRmtCntry": "",
        "partCpostPrncplPlace": "",
        "partCpostEmailRmte": "",
        "partCpostMobileRmte": "",
        "partCpostAccName": "",
        "partCpostFirmName": "",
        "partCpostAccAddr": "",
        "partCpostMembNo": "",
        "partCpostCertiDate": "",
        "partCpostCertiNum": "",
        "partCpostRmtnceCntry": "",
        "partCpostCurrency": "",
        "partCpostFrgnCurrency": "",
        "partCpostIndCurrency": "",
        "partCpostIfsc": "",
        "partCpostBankName": "",
        "partCpostBankBranch": "",
        "partCpostBankBsrCode": "",
        "partCpostAuthDealer": "",
        "partCpostAuthDealerBranch": "",
        "partCpostRmtnceDt": "",
        "partCpostNatureRmtnce": "",
        "partCpostNatureRmtnceOth": "",
        "partCpostRbiPpsCd": "",
        "partCpostRbiSubPpsCd": "",
        "partCpostNetTax": "",
        "partCpostRelAct": "",
        "partCpostIncmCharge": "",
        "partCpostTaxLiabl": "",
        "partCpostTaxablIncm": "",
        "partCpostTaxResCerti": "",
        "partCpostDtaa": "",
        "partCpostDtaaArticle": "",
        "partCpostDtaaTaxIncm": "",
        "partCpostDtaaTaxLiabl": "",
        "partCpostRoyalities": "",
        "partCpostDtaaArticle2": "",
        "partCpostTdsRate": "",
        "partCpostRmtncBussIncm": "",
        "partCpostTaxLiablIndia": "",
        "partCpostDedRate": "",
        "partCpostbussIncTaxRsnTxtNoFlag": "",
        "partCpostRmtncGain": "",
        "partCpostLongCapGain": "",
        "partCpostShortCapGain": "",
        "partCpostArrivalIncme": "",
        "partCpostNotAbc": "",
        "partCpostRmtncNature": "",
        "partCpostTaxIndia": "",
        "partCpostTdsRateDtaa": "",
        "partCpostDtaaReasons": "",
        "partCpostFrgnCurrencyTaxDed": "",
        "partCpostIndianCurrencyTaxDed": "",
        "partCpostRateOfTDS": "",
        "partCpostSpecifyTdsRate": "",
        "partCpostIncmTax": "",
        "partCpostRmtnceTdsAmt": "",
        "partCpostDedRateSource": "",
        "partCpostVerPronoun": "",
        "partCpostVerName": "",
        "partCpostVerFatherName": "",
        "partCpostVerDesig": "",
        "partCpostVerPronoun1": "",
        "partCpostVerPronoun2": "",
        "partCpostVerPronoun3": "",
        "partCpostVerPronoun4": "",
        "partCpostVerPronoun5": "",
        "partCpostVerPronoun6": "",
        "partCpostVerPlace": "",
        "partCpostVerDate": "",
        "partCpostPersnPaying": "",
        "partCpostDesigPersnPaying": "",
        "partDName": "",
        "partDpan": "",
        "partDtan": "",
        "partDRemStatus": "",
        "partDResSatus": "",
        "partDAddress": "",
        "partDEmail": "",
        "partDMobile": "",
        "partDRmtnceRcpnt": "",
        "partDSaveRmtee": "",
        "partDRecRemittence": "",
        "partDAddress1": "",
        "partDRcpntEmail": "",
        "partDRcpntPhone": "",
        "partDRmtnceCntry": "",
        "partDCurrency": "",
        "partDFinCountry": "",
        "partDFrgnCurrency": "",
        "partDIndCurrency": "",
        "partDIfsc": "",
        "partDBankName": "",
        "partDBankBranch": "",
        "partDBankBsrCode": "",
        "partDAuthDealer": "",
        "partDAuthDealerBranch": "",
        "partDRmtnceDt": "",
        "partDRmtnceNature": "",
        "partDRmtnceNatureOther": "",
        "partDRbiPpsCd": "",
        "partDRbiSubPpsCd": "",
        "partDdeclaration": "",
        "partDsalutation": "",
        "partDVerName": "",
        "partDVerFatherName": "",
        "partDVerDesig": "",
        "partDVerPronoun1": "",
        "partDVerPronoun2": "",
        "partDVerPronoun3": "",
        "partDVerPronoun4": "",
        "partDVerPronoun5": "",
        "partDVerPlace": "",
        "partDVerDate": "",
        "partDPersnPaying": "",
        "partDDesigPersnPaying": "",
        "tempARN": "",
        "panel1flag": "",
        "panel1Fl": "",
        "panel1Save": "",
        "panel2flag": "",
        "panel2Fl": "",
        "panel2Save": "",
        "panel3flag": "",
        "panel3Fl": "",
        "panel3Save": "",
        "panel4flag": "",
        "panel4Fl": "",
        "panel4Save": "",
        "panel5flag": "",
        "panel5Fl": "",
        "panel5Save": "",
        "panel6flag": "",
        "panel6Fl": "",
        "panel6Save": "",
        "panel7flag": "",
        "panel7Fl": "",
        "panel7Save": "",
        "panel8flag": "",
        "panel8Fl": "",
        "panel8Save": "",
        "panel9flag": "",
        "panel9Fl": "",
        "panel9Save": "",
        "panel10flag": "",
        "panel10Fl": "",
        "panel10Save": "",
        "panel11flag": "",
        "panel11Fl": "",
        "panel11Save": "",
        "panel12flag": "",
        "panel12Fl": "",
        "panel12Save": "",
        "panel13flag": "",
        "panel13Fl": "",
        "panel13Save": "",
        "panel14flag": "",
        "panel14Fl": "",
        "panel14Save": "",
        "panel15flag": "",
        "panel15Fl": "",
        "panel15Save": "",
        "panel16flag": "",
        "panel16Fl": "",
        "panel16Save": "",
        "panel17flag": "",
        "panel17Fl": "",
        "panel17Save": "",
        "panel18flag": "",
        "panel18Fl": "",
        "panel18Save": "",
        "panel19flag": "",
        "panel19Fl": "",
        "panel19Save": "",
        "panel20flag": "",
        "panel20Fl": "",
        "panel20Save": "",
        "panel21flag": "",
        "panel21Fl": "",
        "panel21Save": "",
        "panel22flag": "",
        "panel22Fl": "",
        "panel22Save": "",
        "panel23flag": "",
        "panel23Fl": "",
        "panel23Save": "",
        "panel24flag": "",
        "panel24Fl": "",
        "panel24Save": "",
        "panel25flag": "",
        "panel25Fl": "",
        "panel25Save": "",
        "slaDuration": "",
        "startTime": "Thu Nov 30 2023 09:24:22 GMT+0530 (India Standard Time)",
        "form15caAlegalHireDesignation": "",
        "form15caAlegalHirePan": "",
        "form15caAverLegalHirePan": "",
        "form15caAverLegalHireDesig": "",
        "form15caAUserInputPlace": "",
        "verLegalAHireDesig": "",
        "form15caBlegalHireDesignation": "",
        "form15caBlegalHirePan": "",
        "form15caBverLegalHirePan": "",
        "form15caBverLegalHireDesig": "",
        "form15caBUserInputPlace": "",
        "verLegalBHireDesig": "",
        "form15caDlegalHireDesignation": "",
        "form15caDlegalHirePan": "",
        "form15caDverLegalHirePan": "",
        "form15caDverLegalHireDesig": "",
        "form15caDUserInputPlace": "",
        "verLegalDHireDesig": "",
        "form15caCUserInputPlace": "",
        "form15caClegalHireDesignation": "",
        "form15caClegalHirePan": "",
        "form15caCverLegalHirePan": "",
        "form15caCverLegalHireDesig": "",
        "verLegalCHireDesig": "",
        "form15caPartARmtAddress": {
          "country": 91,
          "addrLine1": "",
          "addrLine2": "",
          "pincode": "",
          "postOffice": "",
          "locality": "",
          "district": "",
          "state": "",
          "zipcode": "",
          "foreignPostOffice": "",
          "foreignLocality": "",
          "foreignDistrict": "",
          "foreignState": "",
          "address": ""
        },
        "form15caPartBRmtAddress": {
          "country": "",
          "addrLine1": "",
          "addrLine2": "",
          "pincode": "",
          "postOffice": "",
          "locality": "",
          "district": "",
          "state": "",
          "zipcode": "",
          "foreignPostOffice": "",
          "foreignLocality": "",
          "foreignDistrict": "",
          "foreignState": "",
          "address": ""
        },
        "form15caPartCRmtAddress": {
          "country": "",
          "addrLine1": "",
          "addrLine2": "",
          "pincode": "",
          "postOffice": "",
          "locality": "",
          "district": "",
          "state": "",
          "zipcode": "",
          "foreignPostOffice": "",
          "foreignLocality": "",
          "foreignDistrict": "",
          "foreignState": "",
          "address": ""
        },
        "form15caPartDRmtAddress": {
          "country": "",
          "addrLine1": "",
          "addrLine2": "",
          "pincode": "",
          "postOffice": "",
          "locality": "",
          "district": "",
          "state": "",
          "zipcode": "",
          "foreignPostOffice": "",
          "foreignLocality": "",
          "foreignDistrict": "",
          "foreignState": "",
          "address": ""
        }
      }
    }
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Content-Length":Buffer.byteLength(JSON.stringify(bufferdata)),
    //     Cookie: `693c4e2771754eedb1d75ba0debd40d8=9b52571dc9ff70be79b5a6b7da80afd1; 4a75cee7266fb5ae654dc5e51e6a9fe3=62ebf7ab37e08ebc6670b550e1da52fa; 735f08284897d8257a5156fc6c214f76=bf074cecd74dccef07db19b97084ab37; 64912cb2ff2ddd44f1b8a0441cd026fb=c0bc2924e0a86185138e9634dcb3d857; 2dcbb10b317da85bc2e359274540dc79=d8849bf51429e4e7c598fcc7967d93c7; eae3f7faaf0d5a512766019097a0d512=de68ca619a37cc5e1a533cc68b1bdbe7; 1580efbee52cfd917d7413e4b29c4e2e=1926ab26b15e4486a998e25cfa694f99; cb75fe3af6a15223fa5633039e60ed6f=31623c40bad3bb14788eceda4bc00ff9; 8da1c0cab872709a51577f4254876a39=821a15dfc339af98bfcbd25efdcee563; 83b39a8b4ea14550011a0e5e6ca7f4cc=5ff97d65b315ed8214ce227dba66274c; 49f6fb1f55554861258cb8d75043adee=7c83b4f75fce4b05068489a055de21c6; AuthToken=f3e47743242643e29235392551f5d163`
    //   }
    // }
    // const result = await axios.post('https://eportal.incometax.gov.in/iec/itfweb/auth/invoke', bufferdata, config);
    // 
    let logindata = {
      "errors": [],
      "reqId": "FOS003497188468",
      "entity": "AFAPR7559G",
      "entityType": "PAN",
      "role": "IN",
      "uidValdtnFlg": "true",
      "aadhaarMobileValidated": "false",
      "secAccssMsg": "",
      "secLoginOptions": "",
      "dtoService": "LOGIN",
      "exemptedPan": "false",
      "userConsent": "N",
      "imgByte": null,
      "pass": "Aruna@123",
      "passValdtnFlg": null,
      "otpGenerationFlag": null,
      "otp": null,
      "otpValdtnFlg": null,
      "otpSourceFlag": null,
      "contactPan": null,
      "contactMobile": null,
      "contactEmail": null,
      "email": null,
      "mobileNo": null,
      "forgnDirEmailId": null,
      "imagePath": null,
      "serviceName": "loginService"
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        "Content-Length": Buffer.byteLength(JSON.stringify(logindata)),
      }
    }
    const result = await axios.post('https://eportal.incometax.gov.in/iec/loginapi/login', logindata, config);
    
    await res.json({ data: result?.data })
  } catch (error) {
    
  }
});


function getByteArray(filePath) {
  let fileData = fs.readFileSync(filePath).toString('hex');
  let result = []
  for (var i = 0; i < fileData.length; i += 2)
    result.push('0x' + fileData[i] + '' + fileData[i + 1])
  return result;
}

router.get("/getPipos", async (req, res, next) => {
  let data = await postPipo.getPipos(req, res);
  res.send(data);
});

router.post("/deleteflag", async (req, res, next) => {
  let data = await postPipo.deleteflag(req, res);
  res.send(data);
});

router.delete("/deletePIPO/:id", async (req, res, next) => {
  let data = await postPipo.deletePIPOByid(req, res);
  res.send(data);
});

router.get("/getPipo/:id", async (req, res, next) => {
  let data = await postPipo.getPipoByid(req, res);
  res.send(data);
});
router.patch("/updatePipo/:id", async (req, res, next) => {
  let data = await postPipo.updatePipoByid(req, res);
  res.send(data);
});

router.post("/getPipoByCustomer", async (req, res, next) => {
  postPipo.getPipoByBeneBuyer({
    userId: req.user[0].companyId,
    deleteflag: '0',
    file: req.body.filetype,
    benneName: req.body.buyer,
  },
    (err, resp) => {
      if (err) {
        res.status(400).json({
          message: "Some error",
        });
      } else if (resp) {
        res.status(200).json({
          data: resp,
        });
      } else {
        res.status(400).json({
          message: "Some error",
        });
      }
    }
  );
});


router.get("/getPipoByType", async (req, res, next) => {

  let data = await postPipo.getPipoByType(
    {
      userId: req.user[0].companyId,
      deleteflag: 0,
      filetype: req.query.filetype,
    },
    res
  );

  res.send(data);
});
