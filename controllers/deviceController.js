const Esp_Devices = require("../models/deviceModel");

// Add New ESP Device
const addnewEsp_Device = async (req, res) => {
    const { serialNumber, deviceId, ipAddress, MacAddress, connectedPIDs } = req.body;

    // Validate required fields
    if (!serialNumber || !deviceId || !ipAddress || !MacAddress || !connectedPIDs) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        // Check if the device already exists
        const existingDevice = await Esp_Devices.findOne({
            SerialNumber: serialNumber,
            Device_ID: deviceId,
            IP_Address: ipAddress,
            MAC: MacAddress,
            Connected_PIDs: connectedPIDs,
        });
		// Check for existing Device
        if (existingDevice) {
            return res.status(409).json({
                success: false,
                message: "Device already exists",
            });
        }

        // Create a new device
        const newEspDevice = await Esp_Devices.create({
            SerialNumber: serialNumber,
            Device_ID: deviceId,
            IP_Address: ipAddress,
            MAC: MacAddress,
            Connected_PIDs: connectedPIDs,
        });

        return res.status(201).json({
            success: true,
            message: "Device added successfully",
            data: newEspDevice,
        });
    } catch (error) {
        console.error("Error adding ESP device:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to add device",
            error: error.message,
        });
    }
};

// Delete ESP Device
const deleteEsp_Device = async (req, res) => {
    const { deviceId } = req.body;

    // Validate device ID
    if (!deviceId) {
        return res.status(400).json({
            success: false,
            message: "Device ID is required",
        });
    }

    try {
        // Find and delete the device
        const deleteResult = await Esp_Devices.deleteOne({ Device_ID: deviceId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Device not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Device deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting ESP device:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete device",
            error: error.message,
        });
    }
};

// Get All Esp_Device
const get_Esp_Devices = async (req, res) => {
    try {
        const all_Esp_Devices = await Esp_Devices.find({});
		
        // Check if there are Devices in db
        if (!all_Esp_Devices || all_Esp_Devices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No ESP Devices found",
            });
        }

        return res.status(200).json({
            success: true,
            data: all_Esp_Devices,
        });
    } catch (error) {
        console.error("Error fetching ESP devices:", error.message);

        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching ESP devices",
            error: error.message,
        });
    }
};


module.exports = {addnewEsp_Device, deleteEsp_Device, get_Esp_Devices};