import { LOT } from "../Database/LOT.js";
import { User } from "../Database/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const LOTController = (req, res) => {
  var { completeform } = req.body;
  console.log(completeform);
  

  completeform = JSON.parse(completeform);

  // Autopsy.create(completeform)
  //   .then((response) => {
  //     res.status(200).json({
  //       success: "Data submitted successfully!",
  //       response: response,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: "Error occured in saving data.",
  //     });
  //   });

  LOT.countDocuments({ LOTA2: completeform?.LOTA2 }).then((response) => {
    console.log(response);
    
    const combinedData = {
      ...completeform,
      uniqueCode: `${completeform.LOTA2}_${response + 1}`,
    };
    LOT.create(combinedData)
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
  });
};

export const LOTGet = async (req, res, next) => {
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

    var LOTData;
    if (role === "superadmin") {
      LOTData = await LOT.find();
    } else {
      LOTData = await LOT.find({ uniqueCode: { $regex: regex } });
    }

    if (!LOTData) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: LOTData,
    });
  } catch (error) {
    next(error);
  }
};

export const LOTDelete = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const LOTData = await LOT.deleteMany({ _id: { $in: ids } });

    if (!LOTData) {
      res.status(404).json({ error: "Data not found" });
    }

    // if(LOTData.deletedCount === 0){
    //   res.status(404).json({ error: "Data not found" });
    // }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};


export const LOTUpdateController = async (req, res) => {
  try {
    // const { id } = req.params;
    const data = req.body;
    const updatedData = await LOT.findByIdAndUpdate(data._id, data);
    res.status(200).json({updatedData,succes:true});
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
}
