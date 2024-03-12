let express = require('express');
let mailer = require('./mailautomator.model');
let mailutils = require('../../../helpers/mail');
let router = express.Router();
let Q = require('q');
let _ = require('underscore');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var request = require('request');
var fs = require("fs");

router.get('/autoemail', function(req, res, next) {
  let responsdTouser = (err, response) => {
    if(err) {
      res.send({success: false});
    }else {
      res.send({success: true});
    }
  };
  // Run though all given emails which are not sent, send a email and mark seen
  let continueToSendEmails = () => {
    mailer.find({sent: false} ,function(err, users) {
      if(err){
        next(err);
      } else {
        let promiser = (email) => {
          let deffered = Q.defer();
          let mailconfig = mailutils.getUIPEPMailConfig(
            "Kristo",
            "Improve your transfer-wise website performance with Angular server-side rendering",
            "We have analysed your tranferwise website and we see areas which it can be improved",
            "Will convert your Angular 1+ app to Angular 7+ server side rendering improving performance load time to 3s and page size to less than 2 mb");
          mailconfig.to = email.email.toString();
          mailutils.sendMail(mailconfig,function(err, response) {
            
            if(err){
              
              deffered.reject(err);
            } else {
              email.update({sent: true}, (err, response) => {
                
              });
             deffered.resolve(response);
            }
          });
          return deffered.promise;
        };
        let emailpromises = [];
        for(let i in users) {
          emailpromises.push(promiser(users[i]));
        }
        Q.all(emailpromises).then((response) => {
          
          responsdTouser(null, response);
        }, (error) => {
          
          responsdTouser(error, undefined);
        });
      }
    });
  };

  // Check the given email exists in the database if not add else ignore
  let continueToDb = (emails) => {
    let promiser = (email) => {
      let deffered = Q.defer();
      mailer.findOne({email: email} , (err, response)  => {
        if(err){
          deffered.reject(err);
        } else if(response) {
          
          deffered.resolve();
        } else {
          
          let mail = new mailer({email: email});
          mail.save((err, response) => {
            if(err) {
              deffered.reject(err);
            }else {
              deffered.resolve();
            }
          });
        }
      });
      return deffered.promise;
    };
    let emailpromises = [];
    for(let i in emails) {
      emailpromises.push(promiser(emails[i]));
    }
    Q.all(emailpromises).then((response) => {
      continueToSendEmails();
    }, (error) => {
      
    });
    //
  };
  // read the data from the file
  mailutils.readFileAndGetArrayOfEmails((array) => {
    continueToDb(array);
  });

});

router.get('/getemailsfromgithub', function(req, res, next) {
    //48346129


    let promiser = (lastid,startid, fileno, finaldata) => {
        
        var url = 'https://api.github.com/users?since='+lastid+'&per_page=100';
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request', 'Authorization': 'token 862d7b508adf9f15bf7cc5798b1997be0846e41a'}
        }, (err, response, data) => {
            if (err) {
                
                
            } else if (res.statusCode !== 200) {
                
                
            } else {
                // data is already parsed as JSON:
                for(let i in data) {
                    finaldata.push(data[i])
                }
                if(data.length) {
                    
                    if(lastid >= startid+10000) {
                        fs.writeFile("./object"+fileno+".json", JSON.stringify(finaldata), (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            
                            
                        });
                    } else {
                        promiser(data[data.length-1].id, startid,fileno, finaldata)
                    }
                }else {
                    
                }
            }
        });
    };
    let temp = (start) => {
        for(let i=start;i<=start+5;i++) {
            // if(i=1) {
            //     starter_at(i*108792, (i * 10) + 3)
            // }else {
            promiser(i*10000,i*10000, i, [])
            // }
        }
    };
    let starVal = 48;
    temp(starVal)
    // Q.all(emailpromises).then((response) => {
    //     // continueToSendEmails();
    //     res.send(response);
    // }, (error) => {
    //     
    // });
});

module.exports = router;
