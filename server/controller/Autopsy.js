import { Autopsy } from "../Database/Autopsy.js";

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

export const AutopsyGetController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const state = req.params.state;

    var AutopsyData;
    if (id) {
      AutopsyData = await Autopsy.findById({ _id: id });
    } else if (state) {
      AutopsyData = await Autopsy.find();
    } else {
      AutopsyData = await Autopsy.find();
    }

    if (!AutopsyData) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      data: AutopsyData,
    });
  } catch (error) {
    next(error);
  }
};
