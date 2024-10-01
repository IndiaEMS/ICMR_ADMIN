import { Autopsy } from '../../Database/Autopsy.js';

export const autopsy_delete = async (req, res) => {
    try {
        const { ids } = req.body;  

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Ids not found or not provided",
            });
        }

        const deletedItems = await Autopsy.deleteMany({
            _id: { $in: ids },  
        });

        if (deletedItems.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "No autopsy records found with the provided ids",
            });
        }

        return res.status(200).json({
            success: true,
            message: `${deletedItems.deletedCount} autopsy records deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
