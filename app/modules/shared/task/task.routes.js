const router = require("express").Router();
const Task = require("../../projects/models/task.model");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const UserCtrl = require("../../user/user.controller");
const axios = require('axios');
const JSZip = require('jszip');
const fs = require('fs');
const zip = new JSZip();

router.post("/getPipo", async (req, res) => {
    
    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId }, function (err, values) {
            
            res.status(200).json({
                message: "Task succeddfully loaded",
                task: values,
            });
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getBoeTask", async (req, res) => {

    try {
        const result = await Task.find({ boeNumber: req.body.boeNumber, userId: req.user[0].companyId });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getSbTask", async (req, res) => {

    try {
        const result = await Task.find({ sbno: req.body.sbno, userId: req.user[0].companyId });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getTask", async (req, res) => {

    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId, file: req.body.file });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getBcTask", async (req, res) => {

    try {
        const result = await Task.find({ userId: req.user[0].companyId, file: req.body.file });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getCaTask", async (req, res) => {

    try {
        const result = await Task.find({ ca: true, caRequest: 'sent' });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getPipoCaTask", async (req, res) => {

    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId, ca: true });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getPipoInwardTask", async (req, res) => {

    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId, rbaPurpose: "yes" });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getAllTask", async (req, res) => {

    try {
        const result = await Task.find({ userId: req.user[0].companyId });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});


router.post("/getOne", async (req, res) => {

    try {
        const result = await Task.find({ _id: req.body.id });

        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/post", async (req, res, next) => {


    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let newTask = new Task({
        userId: req.user[0].companyId,
        pi_poNo: req.body.pi_poNo,
        pipoDetail: req.body.pipoDetail,
        beneDetail: req.body.beneDetail,
        completed: req.body.completed,
        url1: req.body.url1,
        url2: req.body.url2,
        boeNumber: req.body.boeNumber,
        sbno: req.body.sbno,
        sbDetails: req.body.sbDetails,
        file: req.body.file,
        boeDetails: req.body.boeDetails,
        bank: req.body.bank,
        rbaPurpose: req.body.rbaPurpose,
        ca: req.body.ca,

        caDone: req.body.caDone,
        caUrl: req.body.caUrl,
        email: req.user[0].emailId,
        caRequest: req.body.caRequest,
        transactionDate: `${day}/${month}/${year}`,
    });
    newTask.save((err, doc) => {
        if (!err) {
            res.status(200).json({
                message: "Task saved success",
            });
        } else {
            res.status(400).json({
                message: "Error saving the Task",
            });
        }
    });
});

router.post("/complete", async (req, res) => {
    Task.updateOne({
        _id: req.body._id,
    }, { $set: req.body.task },
        function (err, user) {
            if (err) {

                res.status(400).json({
                    message: "Fail",
                });
            } else if (user) {
                //
                res.status(200).json({
                    message: "Success",
                });
            } else {
                res.status(400).json({
                    message: "Fail",
                });
            }
        }
    );
});

router.post("/taskEmail", async (req, res) => {
    const msg = {
        to: req.body.task.email, // Change to your recipient
        from: "noreply@bharathexim.com", // Change to your verified sender
        subject: `Request Letter Sent ${req.body.task.file}`,
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        })
        .catch((error) => {
            console.error(error);
        });

});

router.post("/testEmail2", async (req, res) => {

});

router.post("/exportEmail", async (req, res) => {
    //


    const msg = {
        to: req.user[0].emailId, // Change to your recipient
        from: "noreply@bharathexim.com", // Change to your verified sender
        subject: `Bank Reference number ${req.body.task.file}`,
        text: `Message from ${req.user[0].fullName}`,
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        })
        .catch((error) => {
            console.error(error);
        });

});

router.post("/textpdf", async (req, res) => {
    const msg = {
        to: req.user[0].emailId, // Change to your recipient
        from: "noreply@bharathexim.com", // Change to your verified sender
        subject: `Bank Reference number ${req.body.task.number} & Amount : ${req.body.task.amount}`,
        text: `Message from ${req.user[0].fullName}`,
        attachments: [{ // encoded string as an attachment
            filename: 'Attachment.pdf',
            content: req.body.task.pdf,
            encoding: 'base64'
        }]
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        })
        .catch((error) => {
            console.error(error);
        });

});

router.post("/documentsmail", async (req, res) => {
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
        responseType: 'arraybuffer'
    }
    var tempattachments = []
    const requests = await req.body.documentsList.map((url) => axios.get(url, config));
    await axios.all(requests).then(async (responses) => {
        var counter = 1;
        await responses.forEach(async (element) => {
            tempattachments.push({
                filename: 'Attachment.pdf',
                content: _arrayBufferToBase64(element?.data),
                encoding: 'base64'
            })
            counter++;
        });
        delete req.body?.data?.documents
        delete req.body?.data?.pipo
        delete req.body?.data?.extradata
        
        var objectkeys=Object.keys(req.body?.data);
        var tableheader=`<thead><tr>`
        var tabletbody=`<tbody><tr>`

        for (let index = 0; index < objectkeys.length; index++) {
            const element = objectkeys[index];
            tableheader+=`<th scope="col">${element}</th>`
            tabletbody+=`<td scope="row">${req.body?.data[element]}</td>`
        }
        tableheader+='</tr>'
        tabletbody+='</tr>'
        var html_template=`<table>${tableheader} ${tabletbody} <table>`
        const msg = {
            to: req.user[0].emailId,
            from: "noreply@bharathexim.com",
            subject: req.body.subject,
            text: `Message from ${req.user[0].fullName}`,
            html:html_template,
            attachments: tempattachments,
            dynamic_template_data:req.body?.data
        };
       await sgMail.send(msg).then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        }).catch((error) => {
            console.error(error);
        });
    });

});

function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return Buffer.from(binary).toString('base64');
}


router.post("/sendmailnormal", async (req, res) => {
    
    UserCtrl.getProfilebyId({ _id: req.user[0]?.companyId }).then((data) => {
        
        var templ = '';
        for (const key in req?.body?.data) {
            templ += `<p>${key} :  ${req?.body?.data[key]}</p>`
        }
        const msg = {
            to: data.emailId, // Change to your recipient
            from: "noreply@bharathexim.com", // Change to your verified sender
            subject: req?.body?.subject,
            text: `Message from ${req.user[0].fullName} | ${req.user[0]?.emailId}`,
            html: templ,
        };
        sgMail.send(msg).then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        }).catch((error) => {
            console.error(error);
        });
    },
        (err) => resp.errorResponse(res, err)
    );


});


router.post("/pdfMail", async (req, res) => {
    const msg = {
        to: req.body.task.email, // Change to your recipient
        from: "noreply@bharathexim.com", // Change to your verified sender
        subject: `Request Letter Sent ${req.body.task.file}`,
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        })
        .catch((error) => {
            console.error(error);
        });

});

module.exports = router;
