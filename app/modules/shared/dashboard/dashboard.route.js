const express = require('express');
const  dashboardController= require('./dashboard.controller');
const router = express.Router();

router
  .route('/')
  .get(dashboardController.getDashboardData);
  router
  .route('/getExceldata')
  .get(dashboardController.getExcelDashboardData);

  router
  .route('/orderShipment')
  .get(dashboardController.getOrderShipmentData)


module.exports = router;