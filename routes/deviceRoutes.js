const express = require('express');
const router = express.Router();
const { addnewEsp_Device ,deleteEsp_Device ,get_Esp_Devices, getDeviceById } = require('../controllers/deviceController')


router.post("/add_new_Esp_Device",addnewEsp_Device);
router.get("/all_Esp_Devices",get_Esp_Devices)
router.delete("/delete_Esp_Device",deleteEsp_Device);
router.get("/device/:deviceId", getDeviceById);

module.exports = router;