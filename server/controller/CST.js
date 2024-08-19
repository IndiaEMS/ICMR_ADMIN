import { CSTFORM } from "../Database/CST.js";

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

export const CSTGetController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const state = req.params.state;

    var CSTData;
    if (id) {
      CSTData = await CSTFORM.findById({ _id: id });
    } else if (state) {
      CSTData = await CSTFORM.find();
    } else {
      CSTData = await CSTFORM.find();
    }

    if (!CSTData) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      data: CSTData,
    });
  } catch (error) {
    next(error);
  }
};
