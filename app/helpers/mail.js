let nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
let transporter = nodemailer.createTransport(smtpPool({
  smtpPool: true,
  host: "uipep.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  secureConnection: false,
  service: 'uipep.com',
  tls: {
    rejectUnauthorized: false
  },
  auth: {
      user: "narendra@uipep.com",
      pass: "uipep12345"
  }
}));

exports = {};
exports.getWrkedMailConfig = () => {
  return {
    from: '"Wrked" <eswervarma@uipep.com>',
    to: '',
    subject: 'Your GDPR, Data Protection, Data Privacy, Data Compliance is one click away',
    html: '<!DOCTYPE html>\n' +
      '<html>\n' +
      '\n' +
      '<head>\n' +
      '    <meta charset="utf-8">\n' +
      '    <meta http-equiv="x-ua-compatible" content="ie=edge">\n' +
      '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '    <title>d8amatiks Ltd | Simplifying Data Privacy</title>\n' +
      '    <meta name="keywords" content="GDPR, Data Protection, Data Privacy, Data Compliance">\n' +
      '    <meta name="description" content="GDPR Privacy Protection compliance services, Gap Analysis, GDPR Readiness Solution Toolkit, GDPR Explanations, GDPR Implementation Assist">\n' +
      '    <script src="https://use.typekit.net/gub7oeq.js"></script>\n' +
      '    <script>try{Typekit.load({ async: true });}catch(e){}</script>\n' +
      '    <style>\n' +
      '        body {\n' +
      '            font-family: "europa", Helvetica, sans-serif;\n' +
      '        }\n' +
      '    </style>\n' +
      '    <!--Start of _chatlio Script-->\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '<div class="doc-div-wrapper">\n' +
      '    <div style="width: 100%; height: 600px; margin: 0 auto; margin-bottom: 100px;">\n' +
      '                  <div style="height: 160px;width: 700px;background: url(\'https://s3.eu-west-2.amazonaws.com/d8amatiks/admin/images/Email+temp+logo.png\') no-repeat center center;background-color: white;background-size: contain;"></div>\n' +
      '                 \n' +
      '                    <div style="width: 535px;font-size: 1rem;padding: 5px 90px;display:block;vertical-align:top;">\n' +
      '                      \n' +
      '                      \n' +
      '                    <div style="text-align: center; margin: auto; width: 80%; font-size: 12px;font-weight: 300; color: #212c27">\n' +
      '                    <h2 style="color: green;font-weight: bold;">Are you GDPR Ready?</h2>\n' +
      '                    <p>Whether you’re B2B or B2C, big or small, you’ve probably heard about the EU’s new regulation, the General Data Protection Regulation (GDPR). It’s a new set of laws aimed at enhancing the protection of EU citizens’ personal data and increasing the obligations of organizations to deal with that data in transparent and secure ways. The GDPR applies not only to EU-based businesses, but also to any business that controls or processes data of EU citizens.\n' +
      '</p>\n' +
      '                    <p>\n' +
      'At d8amatiks we have automated DIY GDPR toolkit for small and medium sized business that is affordable and simple to use. Our automated DIY toolkit will empower you to set up a GDPR compliant data protection framework and help you to manage GDPR compliance on an ongoing basis without you having to engage costly external experts.\n' +
      '\n' +
      '</p>\n' +
      '<p>\n' +
      'Checkout our simple GDPR toolkit now by clicking on <a href="https://www.d8amatiks.com">here</a>\n' +
      '</p>' +
      '<p>If you have any queries, please <a href="mailto:admin@d8amatiks.com" target="_top" style="color: #212c27;">contact us</a></p>\n' +
      '                  </div>\n' +
      '                  <div style="text-align: center;font-size: 11px;font-weight: 100;line-height: 1.5;color: #212c27;">\n' +
      '                              <div style="margin: 0.8rem 0;color: #dadada;"><a href="https://www.d8amatiks.com" target="_blank" style="color: #212c27;">d8amatiks</a></div>\n' +
      '                              <a href="https://www.d8amatiks.com/#/services" target="_blank" style="color: #473939 !important;">Terms of service</a> <span style="color: #212c27;">|</span> <a href="https://www.d8amatiks.com/#/privacy" target="_blank" style="color: #473939;">Privacy Policy</a>\n' +
      '                  </div>\n' +
      '                  <div style="text-align: center; font-size: 11px;font-weight: 100;line-height: 1.5;color: #212c27;">\n' +
      '                    <p style="margin: 3px !important; padding: 0!important"">Copyright © 2018 d8amatiks Ltd.</p>\n' +
      '                    <p style="margin: 3px !important; padding: 0!important"">All rights reserved </p>\n' +
      '                    <p style="margin: 3px !important; padding: 0!important"">Reading Bridge House * 8th Floor South * George Street, Reading, United Kingdom, RG1 8LS </p>\n' +
      '                    <p style="margin: 3px !important; padding: 0!important"">UK VAT Reg No. 285 9045 67</p>\n' +
      '                  </div>\n' +
      '                  </div>\n' +
      '                </div>\n' +
      '</div>\n' +
      '</body>\n' +
      '</html>'
  };
};
exports.getUIPEPMailConfig = (username, subject, content1, content2) => {
  return {
    from: '"UIPEP Technologies" <business@uipep.com>',
    to: '',
    subject: subject,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width"/><style type="text/css">*{margin:0;padding:0;font-size:100%;font-family:'Avenir Next',"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif;line-height:1.65}img{max-width:100%;margin:0 auto;display:block}body,.body-wrap{width:100% !important;height:100%;background:#f8f8f8}a{color:#ffb400;text-decoration:none}a:hover{text-decoration:underline}.text-center{text-align:center}.text-right{text-align:right}.text-left{text-align:left}.button{display:inline-block;color:white;background:#ffb400;border:solid #ffb400;border-width:10px 20px 8px;font-weight:bold;border-radius:4px}.button:hover{text-decoration:none}h1,h2,h3,h4,h5,h6{margin-bottom:20px;line-height:1.25}h1{font-size:32px}h2{font-size:28px}h3{font-size:24px}h4{font-size:20px}h5{font-size:16px}p,ul,ol{font-size:16px;font-weight:normal;margin-bottom:20px}.container{display:block !important;clear:both !important;margin:0 auto !important;max-width:580px !important}.container table{width:100% !important;border-collapse:collapse}.container .masthead{padding:80px 0;background:#ffb400;color:white}.container .masthead h1{margin:0 auto !important;max-width:90%;text-transform:uppercase}.container .content{background:white;padding:30px 35px}.container .content.footer{background:none}.container .content.footer p{margin-bottom:0;color:#888;text-align:center;font-size:14px}.container .content.footer a{color:#888;text-decoration:none;font-weight:bold}.container .content.footer a:hover{text-decoration:underline}</style></head><body><table class="body-wrap"><tr><td class="container"><table><tr><td class="content"><h2>Hi `+username+`,</h2><p>`+content1+`</p><p></p><p>`+content2+`</p><table><tr><td align="center"><p> <a href="https://uipep.com" class="button">Explore</a></p></td></tr></table><p>Checkout our gtmetrix performance report below we can do similar for webapp as well.</p> <img src="http://13.126.99.65/images/performancereport.png" height="250px" width="560px"/> <br /> <br /><p><em>– Mr. Eswarvarma</em></p></td></tr></table></td></tr><tr><td class="container"><table><tr><td class="content footer" align="center"><p>Sent by <a href="#">UIPEP Technologies Private Limited</a>, L34, First Floor, 2nd Main Rd, 6th Sector, HSR Layout, Bengaluru, Karnataka 560102</p><p><a href="mailto:">business@uipep.com</a></p></td></tr></table></td></tr></table></body></html>`}
};

exports.sendMail = (mailOptions, next) => {
  transporter.sendMail(mailOptions, (error, info) => {
    
    
    if (error) {
      
      next(error, null);
    } else {
      
      next(null, info.response);
    }
  });
};

exports.readFileAndGetArrayOfEmails = (cb) => {
  let fs = require('fs');
  let readline = require('readline');
  let stream = require('stream');
  let path = require('path');
  let instream = fs.createReadStream(path.join(__dirname,'/emaillist2.txt'));
  let outstream = new stream;
  let rl = readline.createInterface(instream, outstream);
  let arr = [];

  rl.on('line', function (line) {
    // process line here
    arr.push(line);
  });

  rl.on('close', function () {
    
    cb(arr);
  });
};
module.exports = exports;
