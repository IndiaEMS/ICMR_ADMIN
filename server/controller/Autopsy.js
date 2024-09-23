import { Autopsy } from "../Database/Autopsy.js";
import { User } from "../Database/user.js";

export const AutopsyController = (req, res) => {
  const { CompleteForm } = req.body;
  Autopsy.create(CompleteForm)
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

// export const AutopsyGetController = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const state = req.params.state;

//     var AutopsyData;
//     if (id) {
//       AutopsyData = await Autopsy.findById({ _id: id });
//     } else if (state) {
//       AutopsyData = await Autopsy.find();
//     } else {
//       AutopsyData = await Autopsy.find();
//     }

//     if (!AutopsyData) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: AutopsyData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const AutopsyGetController = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return next(new ErrorHandler("both id and state are required"));
    }

    const validateUser = await User.findById(adminId);

    if (!validateUser) {
      return next(new ErrorHandler("user is not authenticated"));
    }

    // const stateCode = state.split(",")[1]?.trim();
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

    var AutopsyData;
    if (role === "superadmin") {
      AutopsyData = await Autopsy.find();
    } else {
      AutopsyData = await Autopsy.find({ FA2: { $regex: regex } });
    }

    if (!AutopsyData) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: Autopsy,
    });
  } catch (error) {
    next(error);
  }
};
