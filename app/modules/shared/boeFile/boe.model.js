const boeFile = require("../../projects/models/boefile.model").BoeModel;
function addBoeFile(project, callback) {
  if (isNaN(project.insuranceAmount)) {
    project.insuranceAmount = null;
  }
  boeFile.create(project, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}

function getBoe(user, callback) {
  boeFile.find({ userId: user.userId, $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo').sort({'_id': -1}).then((getuser) => {
    callback(null, getuser);
  }, (err) => {
    callback(err, null);
  });
}

function getBoeAll(user, callback) {
  boeFile.find({}).populate('pipo').then((getuser) => {
    callback(null, getuser);
  }, (err) => {
    callback(err, null);
  });
}


function getbyPartName(user, callback) {
  boeFile.find({ userId: user.userId, benneName: [user.benneName], $or: [{ "deleteflag": '0' }, { "deleteflag": '-1' }] }).populate('pipo').then((getuser) => {
    callback(null, getuser);
  }, (err) => {
    callback(err, null);
  });
}

function getOneBoe(project, callback) {
  boeFile.findOne(
    {
      _id: "6059ba551bb7562f8abb4421"
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

function updateBoe(id, project, callback) {
  boeFile.updateOne({
    _id: id
  },
    { $set: project }, function (err, user) {
      if (err) {
        callback(err, null);
      } else if (user) {
        callback(null, user);
      } else {
        callback(null, null);
      }
    });
}

function updateBoeByBoe(id, project, callback) {
  boeFile.updateOne({ boeNumber: id },
    { $set: project }, function (err, user) {
      if (err) {
        callback(err, null);
      } else if (user) {
        callback(null, user);
      } else {
        callback(null, null);
      }
    });
}

function getBoeByBoe(user, callback) {
  boeFile.findOne({ boeNumber: user.boeNumber, userId: user.userId }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}

function getBoeByBene(user, callback) {
  boeFile.find({ beneName: user.beneName, userId: user.userId }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}

function getBoebyPipo(user, callback) {
  boeFile.find({ beneName: [user?.beneName], userId: user.userId }, { beneName: 1, _id: 1, boeNumber: 1, boeDate: 1, invoiceNumber: 1 }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      callback(null, null);
    }
  });
}

function getBoeDatabyPendingSubmission(user, callback) {
  boeFile.aggregate([{ $match: { "userId": user, balanceAmount: { $ne: "0" } } }, {
    $group: {
      _id: ["$benneName", '$currency'],
      count: {
        $sum: 1
      },
      InvoiceAmountSum: { $sum: '$invoiceAmount' },
      freightAmountSum: { $sum: '$freightAmount' },
      insuranceAmountSum: { $sum: '$insuranceAmount' },
      discountAmountSum: { $sum: '$discountAmount' },
      miscellaneousAmountSum: { $sum: '$miscellaneousAmount' },
      commissionAmountSum: { $sum: '$commissionAmount' }
    }
  }]).then((getuser) => {
    callback(null, getuser);
  }, (err) => {
    callback(err, null);
  });
}

function getBoeDatabySubmission(user, callback) {
  boeFile.aggregate([{ $match: { "userId": user, balanceAmount: { $eq: "0" } } }, {
    $group: {
      _id: ["$benneName", '$currency'],
      count: {
        $sum: 1
      },
      InvoiceAmountSum: { $sum: '$invoiceAmount' },
      freightAmountSum: { $sum: '$freightAmount' },
      insuranceAmountSum: { $sum: '$insuranceAmount' },
      discountAmountSum: { $sum: '$discountAmount' },
      miscellaneousAmountSum: { $sum: '$miscellaneousAmount' },
      commissionAmountSum: { $sum: '$commissionAmount' }
    }
  }]).then((getuser) => {
    callback(null, getuser);
  }, (err) => {
    callback(err, null);
  });
}

function getBoeData(user, callback) {
  boeFile.aggregate([{ $match: { "userId": user } },
  {
    $group: {
      _id: ["$benneName", '$currency'],
      count: {
        $sum: 1
      },
      InvoiceAmountSum: { $sum: '$invoiceAmount' },
      freightAmountSum: { $sum: '$freightAmount' },
      insuranceAmountSum: { $sum: '$insuranceAmount' },
      discountAmountSum: { $sum: '$discountAmount' },
      miscellaneousAmountSum: { $sum: '$miscellaneousAmount' },
      commissionAmountSum: { $sum: '$commissionAmount' }
    }
  }]).then((getuser) => {
    callback(null, getuser);
  }, (err) => {
    callback(err, null);
  });
}

module.exports = {
  addBoeFile: addBoeFile,
  getBoe: getBoe,
  getOneBoe: getOneBoe,
  updateBoe: updateBoe,
  updateBoeByBoe: updateBoeByBoe,
  getBoeByBoe: getBoeByBoe,
  getBoeByBene: getBoeByBene,
  getbyPartName: getbyPartName,
  getBoeAll: getBoeAll,
  getBoeData: getBoeData,
  getBoeDatabyPendingSubmission: getBoeDatabyPendingSubmission,
  getBoeDatabySubmission: getBoeDatabySubmission,
  getBoebyPipo: getBoebyPipo
};
