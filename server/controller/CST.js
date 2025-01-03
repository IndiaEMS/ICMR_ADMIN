import { CSTFORM } from "../Database/CST.js";
import { User } from "../Database/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const CSTConroller = (req, res) => {
  const { CompleteForm } = req.body;
  CSTFORM.create(CompleteForm)
    .then((response) => {
      res.status(200).json({
        success: "Data submitted successfully!",
        response: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error occured in saving data.",
      });
    });
};

// export const CSTGetController = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const state = req.params.state;

//     var CSTData;
//     if (id) {
//       CSTData = await CSTFORM.findById({ _id: id });
//     } else if (state) {
//       CSTData = await CSTFORM.find();
//     } else {
//       CSTData = await CSTFORM.find();
//     }

//     if (!CSTData) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: CSTData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const CSTGetController = async (req, res, next) => {
  try {
    const adminId = req.user._id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return next(new ErrorHandler("Both ID and state are required"));
    }

    const validateUser = await User.findById(adminId);
    if (!validateUser) {
      return next(new ErrorHandler("User is not authenticated"));
    }

    const stateCode = state?.trim();
    const states = [
      { value: "", label: "All" },
      { value: "GJBRC", label: "Gujarat" },
      { value: "ORPUR", label: "Odisha" },
      { value: "MPBHS", label: "Bhopal" },
      { value: "PBLDH", label: "Ludhiana" },
      { value: "PYPDY", label: "Pondicherry" },
    ];

    const matchedState = states.find((s) => s.label === stateCode);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    const regex = new RegExp(`^${matchedState.value}`);

    // Pagination
    let { page = 1, limit = 2000 } = req.query; // Default values
    const skip = (page - 1) * limit; // Correct skip calculation

    // Query based on role
    const query = role === "superadmin" ? {} : { AA2: { $regex: regex } };

    const CSTData = await CSTFORM.find(query).skip(skip).limit(limit);
    const totalRecords = await CSTFORM.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit);

    if (!CSTData || CSTData.length === 0) {
      return next(new ErrorHandler("Data not found"));
    }

    res.status(200).json({
      success: true,
      data: CSTData,
      totalRecords,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteCst = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ids not found or not provided",
      });
    }

    const deletedItems = await CSTFORM.deleteMany({
      _id: { $in: ids },
    });

    if (deletedItems.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No CST forms found with the provided ids",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${deletedItems.deletedCount} CST forms deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
