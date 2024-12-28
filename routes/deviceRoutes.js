const express = require('express');
const router = express.Router();
const {addnewEsp_Device,deleteEsp_Device} = require('../controllers/deviceController')


router.post("/add_new_Esp_Device",addnewEsp_Device);
router.delete("/delete_Esp_Device",deleteEsp_Device);


module.exports = router;