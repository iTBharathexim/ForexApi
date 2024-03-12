const bcrypt = require('bcryptjs');
const rounds = 10;
const atob = require('atob');
const SECRET = process.env.SECRET;
let b64ToString;
let creds = [];
const jwt = require('jsonwebtoken');

function validateMobileNo(number) {
    if (number && (number.toString()).length > 6 && (number.toString()).length < 11) {
        return true;
    } else {
        return false;
    }
    return false;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function hashPassword(password, callback) {
    bcrypt.hash(password, rounds, function(err, hash) {
        if (err) {
            console.error('Error while hashing the password', rounds, password, err, hash);
            callback(err, null);
        } else if (hash) {
            
            //    
            console.
            info('Hash Successfully Created');
            callback(null, hash);
        } else {
            callback(null, null);
        }
    })
}

function decodeAuthString(authString, callback) {
    b64ToString = atob(authString);
    creds = b64ToString.split(':');
    if (creds && creds.length === 2) {
        callback(creds[0], creds[1]);
    } else {
        callback(null, null);
    }
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}
Date.prototype.addMintues = function(mintues) {
    this.setMinutes(mintues);
    return this;
}
function generateJWTToken(id, callback) {
    let ms = Date.now();    
    const payload = {
        _id: id,
        exp:add_minutes(new Date(ms), 120).getTime()
    };
    
    let token = jwt.sign(payload, SECRET,{});
    token = 'JWT ' + token;

    console.info('Successfully created an access token76575677567657', id, token);
    callback(null, token);
}

function generateJWTTokenRole(data, callback) {
    
    let ms = Date.now();    
    const payload = {
        _id: data?.id,
        role:data?.role,
        exp:add_minutes(new Date(ms), 120).getTime()
    };
    
    let token = jwt.sign(payload, SECRET,{});
    token = 'JWT ' + token;

    console.info('Successfully created an access tokenasdsde234234', data?.id, token);
    callback(null, token);
}

function add_minutes(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
}

function generateJWTTokenPdf(id, callback) {
    // Extracting Id and converting to string representation
    /* let id = new ObjectId(id);
    id = id.toHexString(); */
    const payload = {
        _id: id,
    };
    
    let token = jwt.sign(payload, SECRET, {
        expiresIn: 604800 * 20 //20 weeks
    });
    token = 'JWT ' + token;

    console.info('Successfully created an access token6878678678', id, token);
    callback(null, token);
}

function generateJWTTokenMember(email, name, companyId, companyName, callback) {
    const payload = {
        email: email,
        name: name,
        companyId: companyId,
        companyName: companyName
    };
    
    let token = jwt.sign(payload, SECRET, {
        expiresIn: 604800 * 20 //20 weeks
    });
    token = 'JWT ' + token;

    console.info('Successfully created an access token4543534534', email, token);
    callback(null, token);
}

function generateJWTTokenMemberAll(data,callback) {
    const payload = data
    
    let token = jwt.sign(payload, SECRET, {
        expiresIn:'300s' //20 weeks
    });
    token = 'JWT ' + token;

    console.info('Successfully created an access token3454543', data, token);
    callback(null, token);
}

module.exports = {
    validateMobileNo: validateMobileNo,
    validateEmail: validateEmail,
    hashPassword: hashPassword,
    decodeAuthString: decodeAuthString,
    generateJWTToken: generateJWTToken,
    generateJWTTokenMember: generateJWTTokenMember,
    generateJWTTokenPdf: generateJWTTokenPdf,
    generateJWTTokenMemberAll:generateJWTTokenMemberAll,
    generateJWTTokenRole:generateJWTTokenRole
};
