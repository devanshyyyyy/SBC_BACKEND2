const Esp_Devices = require("../models/deviceModel");

const addnewEsp_Device = async (req,res) => {
	const { serialNumber ,deviceId ,ipAddress ,MacAddress ,connectedPIDs } = req.body;

	if(!serialNumber || !deviceId || !ipAddress || !MacAddress || !connectedPIDs) {
        	res.status(401).json({
			message:"All fields are required"
		});
    	}
	
const existingDevice = await Esp_Devices.find({SerialNumber:serialNumber,Device_ID:deviceId,IP_Address:ipAddress,MAC:MacAddress,Connected_PIDs:connectedPIDs});
    	if(existingDevice){
		return res.status(404.).json({
			message:"Device already Exist"	
		})
    	}
	
	try{
		const newEspDevice = await Esp_Devices.create({
			SerialNumber:serialNumber,
			Device_ID:deviceId,
			IP_Address:ipAddress,
			MAC:MacAddress,
			Connected_PIDs:connectedPIDs
		});
		return res.status(200).json({
			message:"Device Added Successfully"
		});

    	}catch(error){
		res.status(404).json({
			message:"Failed Adding Device"
		});
    	}
	
}

const deleteEsp_Device = async (req,res) => {
	const {deviceId} = req.body;
 	
	try{
		if(!deviceId){
			return res.status(401).json({
				message:"Invalid Device"
			})
		}


	}catch(error){
		return res.status(400).json({
			message:"Something Went Wrong"
		});
	}
}


module.exports = {addnewEsp_Device, deleteEsp_Device};











