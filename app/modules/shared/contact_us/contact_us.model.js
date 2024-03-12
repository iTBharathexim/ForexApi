const ContactUs = require("../../projects/models/contact_us.model").ContactUs;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EmailFormat = require("../../mails/mailhelper/email-store/email-formats");
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
})
var S3bucketName;
S3bucketName = process.env.AWS_S3_BUCKET;
BucketURL = process.env.AWS_S3_BUCKET_URL;

async function addEdpms(project, callback) {
    await sendcontactusAdminEmail(project, callback);
}

const sendcontactusAdminEmail = (dataObj, callback) => {
    try {
        let content = ``;
        content = content + `
                    <p>Company Name : ${dataObj?.CompanyName}</p><br/>
                    <p>Name : ${dataObj?.Name}</p><br/>
                    <p>Email Id : ${dataObj?.EmailId}</p><br/>
                    <p>Mobil No. : ${dataObj?.Phone}</p><br/>
                    <p>Subject : ${dataObj?.Subject}</p><br/>
                    <p>Message : <br/>` + dataObj?.Message + `</p><br/>`;
        const html = EmailFormat.generalFormat({ html: content, heading: "Contact Us for " + dataObj?.Type, host: process.env.WEBSITE_URL });
        let msg =  {
            to: ['noreply@bharathexim.com', dataObj?.EmailId], // Change to your recipient
            from: 'noreply@bharathexim.com', // Change to your verified sender
            subject: "Contact Us for " + dataObj?.Type,
            text: content,
            html: html,
        };
      
        sgMail.send(msg).then(() => setTimeout(() => {
            sendcontactusUserEmail(dataObj, callback);
        }, 200)).catch((error) => callback(error, null))
    } catch (error) {
        
    }
};

const sendcontactusUserEmail = (dataObj, callback) => {
    let content = ``;
    content = content + `<p>
    Dear ${dataObj?.Name},
    <br/>
    Welcome to Bharathexim Trade Automation tool! Thank you for choosing our company. <br/>
    I hope you're enjoying your experience so far. <br/>
    I want to invite you to our resources that may improve your experience and keep you informed. <br/>     
    Thanks again for choosing Bharathexim Trade Automation tool for your editing needs. <br/>
    Best, <br/>
    Bharathexim Trade Automation</p> <br/>
    <br/>`;
    const html = EmailFormat.generalFormat({ html: content, heading: "Thank you Contact Us for " + dataObj?.Type, host: process.env.WEBSITE_URL });
    const msg = {
        to: dataObj.EmailId, // Change to your recipient
        from: 'noreply@bharathexim.com', // Change to your verified sender
        subject: "Thank you Contact Us for " + dataObj?.Type,
        text: content,
        html: html,
    };
    sgMail.send(msg).then(async () => {
        try {
            if (dataObj.ScreenShot?.length != 0 && dataObj.ScreenShot?.length != undefined) {
                await uploadImage(dataObj, dataObj.userId, dataObj.ScreenShot, callback);
            } else {
                callback(null, { success: true });
            }
        } catch (error) {
            next(error)
        }
    }).catch((error) => callback(error, null))
};

const uploadImage = async (project, userId, filelist, callback) => new Promise(async (resolve, reject) => {

    if (filelist.length == 0) {
        ContactUs.create(project, function (err, user) {
            if (err) {
                callback(err, null);
            } else if (user) {
                callback(null, { success: true });
            } else {
                callback(null, null);
            }
        });
    } else {
        for (let index = 0; index < filelist.length; index++) {
            const element = filelist[index];
            let fileinfo = getFileExtension(element?.name)
            var buf = Buffer.from(element?.buffer.replace(/^data:image\/\w+;base64,/, ""), 'base64')
            const params = {
                Bucket: S3bucketName,
                Key: "ContactUs/" + userId + '/' + fileinfo[0] + '_' + new Date().getTime() + '.' + fileinfo[1],
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg'
            }
            await s3.upload(params, (err, data) => {
                if (err) {
                    callback(err, null);
                    
                }
                element.buffer = `${BucketURL}/${params?.Key}`
                if ((index + 1) == filelist.length) {
                    ContactUs.create(project, function (err, user) {
                        if (err) {
                            callback(err, null);
                        } else if (user) {
                            callback(null, { success: true });
                        } else {
                            callback(null, null);
                        }
                    });
                }
            })
        }

    }

});

function getFileExtension(filename) {
    const extension = filename.split('.');
    return extension;
}

function getEdpms(user, callback) {
    ContactUs.find({ userId: user.userId, cleared: 'not-cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {

            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ sbNo: -1 }).limit(user?.limit);
}

function getEdpmsAll(user, callback) {
    ContactUs.find({ userId: user.userId, cleared: 'not-cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).countDocuments();
}

function getEdpmsCleared(user, callback) {
    ContactUs.find({ userId: user.userId, cleared: 'cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).sort({ sbNo: -1 }).limit(user?.limit);
}

function getEdpmsAllCleared(user, callback) {
    ContactUs.find({ userId: user.userId, cleared: 'cleared' }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    }).countDocuments();
}

function getOneEdpms(ID, callback) {
    ContactUs.findOne({
        _id: ID
    }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateEdpms(id, project, callback) {
    ContactUs.updateOne({
        _id: id
    }, { $set: project }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateEdpmsByEdpms(id, project, callback) {
    irAdviceFile.updateOne({
        sbNo: id
    }, { $set: project }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getEdpmsByEdpms(user, callback) {
    ContactUs.findOne({ sbNo: user.sbNo, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getEdpmsBySbno(user, callback) {
    ContactUs.find({ sbNo: user.sbNo, userId: user.userId }, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (user) {
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

const getEDPMSData = async (req, res) => {
    try {
        let data = {}
        let totalEDPMSEntries = await ContactUs.count({ userId: req.user[0].companyId })
        let uploadData = await ContactUs.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "sbNo",
                    foreignField: "sbno",
                    as: "docs"
                }
            },
            {
                $match: {
                    "docs": { "$ne": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])

        if (uploadData.length > 0) {
            uploadData = uploadData[0].count
        }

        let pendingData = await ContactUs.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "sbNo",
                    foreignField: "sbno",
                    as: "docs"
                }
            },
            {
                $match: {
                    "docs": { "$eq": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])
        if (pendingData.length > 0) {
            pendingData = pendingData[0].count
        }
        data = { totalEDPMSEntries: totalEDPMSEntries, uploadData: uploadData, pendingData: pendingData }
        return data
    } catch (err) {
    }
}

function comparedata(userId, project) {
    return new Promise(async (resolve, reject) => {
        await getAllSBExcelSheet(project).then(async (res) => {
            await getEdpms({ userId: userId, cleared: 'not-cleared' }, async function (err, user) {
                await resolve(user.filter(function (v) { return !res.includes(parseInt(v?.sbNo)) && v?.sbNo != undefined }))
            })
        })
    });
}
async function getAllSBExcelSheet(data) {
    var temp = [];
    return new Promise(async (resolve, reject) => {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (!temp.includes(parseInt(element?.['sbNo'])) && !isNaN(parseInt(element?.['sbNo']))) {
                await temp.push(parseInt(element?.['sbNo']))
            }
        }
        await resolve(temp);
    })
}

module.exports = {
    addEdpms: addEdpms,
    getEdpms: getEdpms,
    updateEdpms: updateEdpms,
    getOneEdpms: getOneEdpms,
    updateEdpmsByEdpms: updateEdpmsByEdpms,
    getEdpmsByEdpms: getEdpmsByEdpms,
    getEdpmsBySbno: getEdpmsBySbno,
    getEDPMSData: getEDPMSData,
    getEdpmsAll: getEdpmsAll,
    getEdpmsCleared: getEdpmsCleared,
    getEdpmsAllCleared: getEdpmsAllCleared
};
