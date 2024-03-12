const ThirdModel = require("./thirdParty.model");

function addThirdFile(newPackage, callback) {
    ThirdModel.addThirdFile(newPackage, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getSingleThird(userId, callback) {
    
    ThirdModel.getSingleThird(userId, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getThird(userId, callback) {
    
    ThirdModel.getThird(userId, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateThird(id, bene, callback) {
    
    ThirdModel.updateThird(id, bene, (err, res) => {
        // 
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
// function updateBoe(id,newPackage, callback) {
//     
//     BoeModel.updateBoe(id, newPackage, (err, res) => {
//         // 
//         if (err) {
//             callback(err, null);
//         } else if (res) {
//             callback(null, res);
//         } else {
//             callback(null, null);
//         }
//     });
// }

// function updateBoeByBoe(id,newPackage, callback) {
//     
//     BoeModel.updateBoeByBoe(id, newPackage, (err, res) => {
//         // 
//         if (err) {
//             callback(err, null);
//         } else if (res) {
//             callback(null, res);
//         } else {
//             callback(null, null);
//         }
//     });
// }

// function getBoeByBoe(boeNumber, callback) {
//     
//     BoeModel.getBoeByBoe(boeNumber, (err, res) => {
//         // 
//         if (err) {
//             callback(err, null);
//         } else if (res) {
//             callback(null, res);
//         } else {
//             callback(null, null);
//         }
//     });
// }

module.exports = {
    addThirdFile: addThirdFile,
    getThird: getThird,
    getSingleThird: getSingleThird,
    updateThird: updateThird,
};
