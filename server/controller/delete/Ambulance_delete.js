import { AMBULANCE, AMBULANCE_FINAL } from '../../Database/Ambulance.js'

export const ambulance_delete = async (req, res) => {
    try {
        const { ids } = req.body;  

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Ids not found or not provided",
            });
        }

        const deletedItems = await AMBULANCE.deleteMany({
            _id: { $in: ids },  
        });

        if (deletedItems.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No ambulances found with the provided ids",
            });
        }

        return res.status(200).json({
            success: true,
            message: `${deletedItems.deletedCount} ambulances deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const ambulance_delete_Final = async (req, res) => {
    try {
        const { ids } = req.body;  

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Ids not found or not provided",
            });
        }

        const deletedItems = await AMBULANCE_FINAL.deleteMany({
            _id: { $in: ids },  
        });

        if (deletedItems.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No ambulances found with the provided ids",
            });
        }

        return res.status(200).json({
            success: true,
            message: `${deletedItems.deletedCount} ambulances deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


