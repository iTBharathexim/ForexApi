
const piPoModel = require("../PI_PO/pi_po.model");
const irAdviceModel = require("../irAdvice/irAdvice.model");
const masterFileModel = require("../masterFile/master.model");
const blModel = require("../blCopyrefno/blcopy.model");
const edpmsModel = require("../edpms/edpms.model");
const pipoFile = require("../../projects/models/PI_PO.model");
const postMasterFile = require("../../projects/models/masterFile.model").MasterModel;
const irAdviceFile = require("../../projects/models/irAdvice.model").irAdviceModel;
const Inward_remittance = require("../Inward_remittance/Inward_remittance.model");
const blcopyFile = require("../../projects/models/blcopyref.model");
const edpmsFile = require("../../projects/models/edpms.model").edpms;
const IdpmsModel = require('../IDPMS/idpms.model');
const boeFile = require("../../shared/boeFile/boe.controller.js");
const ExportBillLodgementCtrl = require("../../ExportBillLodgement/ExportBillLodgement.controller");

const getDashboardData = async (req, res) => {
    let result = {}
    try {
        let pipo = await piPoModel.getPipobasedOnNumberAndcurrency(req, res)
        result.pipo = pipo

        let Orderpendingforshipment = await piPoModel.Orderpendingforshipment(req, res)
        result.Orderpendingforshipment = Orderpendingforshipment

        let ShippingBill = await masterFileModel.getSBbasedOnNumberAndcurrency(req, res)
        result.ShippingBill = ShippingBill

        let inwardData = await irAdviceModel.getInwardbasedOnNumberAndcurrency(req, res)
        result.inward = inwardData

        let sbPendingData = await masterFileModel.getSBPendingSubmission(req, res)
        result.sbPendingData = sbPendingData

        let docSubmitedAndNoAwaitedData = await blModel.getDocSubmitedNoAwaited(req, res)
        result.docSubmitedAndNoAwaitedData = docSubmitedAndNoAwaitedData

        let inwardRemittances = await Inward_remittance.getTotalInwardRemitances(req, res)
        result.inwardRemittances = inwardRemittances;

        let EDPMSData = await edpmsModel.getEDPMSData(req, res)
        result.EDPMSData = EDPMSData;

        let IDPMSData = await IdpmsModel.getIdpmsData(req, res)
        result.IDPMSData = IDPMSData;

        let billLoedgment = await blModel.getTotalBillLogdement(req, res)
        result.billLoedgment = billLoedgment

        let billLoedgmentData = await blModel.billLoedgmentData(req)
        result.billLoedgmentData = billLoedgmentData;

        let Realisation = await ExportBillLodgementCtrl.getAllById({ userId: req.user[0].companyId, TypeTransaction: "Export-Bill-Realisation", EBRCRef: { $ne: [] } })
        var billLoedgmentFully = [];
        var billLoedgmentPartial = [];
        Realisation?.forEach(billLoedgmentElement => {
            billLoedgmentElement?.SBRef?.forEach(SBRefElement => {
                SBRefElement?.blcopyRef?.forEach(blcopyRefElement => {
                    if (parseFloat(blcopyRefElement?.amount) == parseFloat(SBRefElement?.fobValue)) {
                        billLoedgmentFully.push({ blcopyRef: blcopyRefElement, SBRef: SBRefElement });
                    } else {
                        billLoedgmentPartial.push({ blcopyRef: blcopyRefElement, SBRef: SBRefElement });
                    }
                });
            });
        });
        result.billLoedgmentFully = billLoedgmentFully;
        result.billLoedgmentPartial = billLoedgmentPartial;

        let PackingCreditTransction = await ExportBillLodgementCtrl.getAllById({ userId: req.user[0].companyId, TypeTransaction: "Packing-Credit-Request" })
        result.PackingCreditTransction = PackingCreditTransction;

        await boeFile.getBoeData(req.user[0].companyId, async (err, response) => {
            var temp1 = { convertData: [], data: [] };
            response.forEach(async (element) => {
                await temp1['data'].push(element);
                await temp1['convertData'].push({ currency: element?._id[1], amount: element?.InvoiceAmountSum })
            });
            result.BOE_DEATILS = temp1;
            await ExportBillLodgementCtrl.getAllTransaction('Advance-Remittance-flow').then(async (resp) => {
                var temp2 = [];
                await resp.forEach(async (element) => {
                    await temp2.push(element?.data?.formdata)
                });
                result.OUTWARD_REMMITANCE = temp2;
                await boeFile.getBoeDatabyPendingSubmission(req.user[0].companyId, async (err, response) => {
                    result.Pending_BOE_Submission = response;
                    await boeFile.getBoeDatabyPendingSubmission(req.user[0].companyId, async (err, SubmissionResponse) => {
                        result.BOE_Submission = SubmissionResponse;
                        await res.send(result)
                    });
                });
            })
        })
    } catch (error) {
        
    }
};

const getExcelDashboardData = async (req, res) => {
    res.send({
        Import: await fetchedImportAlldata(req, res),
        Export: await fetchedExportAlldata(req, res)
    })
};

const getOrderShipmentData = async (req, res) => {
    let orderShipMentData = await piPoModel.getOrderPendingforShipment(req, res)
    res.send(orderShipMentData)
}
const fetchedImportAlldata = async (req, res) => {
    return {
        "PIPO": await getPIPOExcelData(req, res, 'import'),
        "Shipping bill": await getShippingbillExcelData(req, res, 'import'),
        "Inward Remittances": await getInwardData(req, res, 'import'),
        "Document pending for submission": await getExcelSBPendingSubmission(req, res, 'import'),
        "Document submitted to bank": await getExcelDocSubmitedNoAwaited(req, res, 'import'),
        "Totalinwardremittancespendingfordocumentsubmission": await getTotalInwardRemitances('import'),
        "Total EDPMS entries": [await getExcelEDPMSData(req, res)],
        "Shipping bill pending realisation": [],
        "Order pending for shipment": [],
        "Packing credit availed": [],
        "Total bill lodged": []
    };
}
const fetchedExportAlldata = async (req, res) => {
    return {
        "PIPO": await getPIPOExcelData(req, res, 'export'),
        "Shipping bill": await getShippingbillExcelData(req, res, 'export'),
        "Inward Remittances": await getInwardData(req, res, 'export'),
        "Document pending for submission": await getExcelSBPendingSubmission(req, res, 'export'),
        "Document submitted to bank": await getExcelDocSubmitedNoAwaited(req, res, 'export'),
        "Tota document submission": await getTotalInwardRemitances('export'),
        "Total EDPMS entries": [await getExcelEDPMSData(req, res)],
        "Shipping bill pending realisation": [],
        "Order pending for shipment": [],
        "Packing credit availed": [],
        "Total bill lodged": []
    };
}
const getPIPOExcelData = async (req, res, fileType) => {
    var data = {}
    try {
        let currencyWiseImportData = await pipoFile.aggregate([
            { $match: { "file": fileType, userId: req.user[0].companyId } },
            {
                "$group": {
                    _id: '$currency',
                    value: { $addToSet: { currency: '$currency', amount: '$amount', buyerName: '$buyerName' } },
                }
            }
        ]);
        data = [];
        for (let index = 0; index < currencyWiseImportData.length; index++) {
            currencyWiseImportData[index]['value'].forEach(element => {
                data.push(element)
            });
        }
        return data
    } catch (err) {

        return err
    }
}
const getShippingbillExcelData = async (req, res, fileType) => {
    var data = {}
    try {
        let currencyWiseImportData = await postMasterFile.aggregate([
            { $match: { "file": fileType, userId: req.user[0].companyId } },
            {
                "$group": {
                    _id: '$fobCurrency',
                    value: { $addToSet: { currency: '$fobCurrency', amount: '$fobValue', buyerName: '$buyerName' } },
                }
            }
        ]);
        data = [];
        for (let index = 0; index < currencyWiseImportData.length; index++) {
            currencyWiseImportData[index]['value'].forEach(element => {
                data.push(element)
            });
        }
        return data
    } catch (err) {

        return err
    }
}
const getInwardData = async (req, res, fileType) => {
    var data = {}
    try {
        let currencyWiseImportData = await irAdviceFile.aggregate([
            { $match: { "file": fileType, userId: req.user[0].companyId } },
            {
                "$group": {
                    _id: '$currency',
                    value: { $addToSet: { currency: '$currency', amount: { $toDouble: '$amount' }, buyerName: '$buyerName' } },
                }
            }
        ]);
        data = [];
        for (let index = 0; index < currencyWiseImportData.length; index++) {
            currencyWiseImportData[index]['value'].forEach(element => {
                data.push(element)
            });
        }
        return data
    } catch (err) {

        return err
    }
}
const getExcelSBPendingSubmission = async (req, res, fileType) => {
    var data = {}
    try {
        let formDate = new Date()
        let toDate = new Date()
        formDate.setDate(toDate.getDate() - 21)
        let currencyWiseImportData = await postMasterFile.aggregate([
            { $match: { sbdate: { $gte: formDate, $lt: toDate }, "file": fileType, userId: req.user[0].companyId } },
            {
                "$group": {
                    _id: '$buyerName',
                    value: { $addToSet: { currency: '$currency', amount: '$fobValue', "Party Name": '$buyerName' } },
                }
            }
        ]);
        return currencyWiseImportData
    } catch (err) {

        return err
    }
}
const getExcelDocSubmitedNoAwaited = async (req, res, fileType) => {
    var data = {}
    try {
        let currencyWiseImportData = await blcopyFile.aggregate([
            { $match: { "file": fileType, userId: req.user[0].companyId } },
            {
                "$group": {
                    _id: '$buyerName',
                    value: { $addToSet: { buyerName: '$buyerName', blcopyrefNumber: '$blcopyrefNumber' } }
                }
            }
        ]);
        data = [];
        for (let index = 0; index < currencyWiseImportData.length; index++) {
            currencyWiseImportData[index]['value'].forEach(element => {
                data.push(element)
            });
        }
        return data
    } catch (err) {

        return err
    }
}
const getTotalInwardRemitances = async (FileType) => {
    var data = []
    try {
        let totalExportCount = await irAdviceFile.count({ file: FileType, userId: req.user[0].companyId })
        let exportInward = await irAdviceFile.aggregate([
            { $match: { file: FileType, userId: req.user[0].companyId } },
            {
                $group: {
                    _id: null,
                    pendingCount: { $sum: 1 },
                    value: { $addToSet: { amount: '$amount', buyerName: '$buyerName' } },
                }
            }
        ])
        data = [];
        if (data != null) {
            for (let index = 0; index < exportInward.length; index++) {
                exportInward[index]['value'].forEach(element => {
                    var temp = Object.assign({ pendingCount: exportInward[index]['pendingCount'] }, element)
                    data.push(temp)
                });
            }
            for (let index = 0; index < data.length; index++) {
                data[index]['totalCount'] = totalExportCount
            }
        }
        return data
    } catch (err) {


        return err
    }
}
const getExcelEDPMSData = async (req, res) => {
    try {
        let data = {}

        let totalEDPMSEntries = await edpmsFile.count({ userId: req.user[0].companyId })

        let uploadData = await edpmsFile.aggregate([
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


        let pendingData = await edpmsFile.aggregate([
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

module.exports = {
    getDashboardData,
    getOrderShipmentData,
    getExcelDashboardData
};
