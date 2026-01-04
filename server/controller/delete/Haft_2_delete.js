import { HFAT2, HFAT2_FINAL } from "../../Database/HFAT-2.js";

export const deleteHfat2 = async (req, res) => {
    try {
        const { ids } = req.body; 

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Ids not found or not provided",
            });
        }

        const deletedItems = await HFAT2.deleteMany({
            _id: { $in: ids }, 
        });

        if (deletedItems.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No HFAT2 records found with the provided ids",
            });
        }

        return res.status(200).json({
            success: true,
            message: `${deletedItems.deletedCount} HFAT2 records deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const deleteHfat2Final = async (req, res) => {
    try {
        const { ids } = req.body; 

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Ids not found or not provided",
            });
        }

        const deletedItems = await HFAT2_FINAL.deleteMany({
            _id: { $in: ids }, 
        });

        if (deletedItems.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No HFAT2 records found with the provided ids",
            });
        }

        return res.status(200).json({
            success: true,
            message: `${deletedItems.deletedCount} HFAT2 records deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
