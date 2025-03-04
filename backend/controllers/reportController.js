import Report from "../models/report.js";

export const AddNewCrop = async (req, res) => {
    try {
        const { _id, cropName, image, growthStage, soilType, rainFall, temperature, soilpHLevel, cropArea, irrigationType, scientificName, location, id } = req.body;
        const crop = await Report.create({
            CropID: _id,
            user_id: id,
            CropName: cropName,
            Img: image,
            GrowthStage: growthStage,
            SoilType: soilType,
            RainFall: rainFall,
            Temperature: temperature,
            SoilpHLevel: soilpHLevel,
            CropArea: cropArea,
            IrrigationType: irrigationType,
            ScientificName: scientificName,
            Location: location
        });

        if (crop) {
            return res.json({
                msg: "Crop Added Successfully",
            });
        } else {
            return res.json({
                error: "Something Went Wrong",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const UpdateCrop = async (req, res) => {
    const id = req.params.id
    const { CropName, Img, GrowthStage, SoilType, RainFall, Temperature, SoilpHLevel, CropArea, IrrigationType, ScientificName, Location } = req.body
    try {
        const data = await Report.findByIdAndUpdate({ _id: id }, {
            CropName: CropName,
            Img: Img,
            GrowthStage: GrowthStage,
            SoilType: SoilType,
            RainFall: RainFall,
            Temperature: Temperature,
            SoilpHLevel: SoilpHLevel,
            CropArea: CropArea,
            IrrigationType: IrrigationType,
            ScientificName: ScientificName,
            Location: Location
        }, { new: true })
        res.send({ success: true, message: "data updated successfully", data: data })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};


export const DeleteCrop = async (req, res) => {
    try {
        const id = req.params.id;
        await Report.findByIdAndDelete({ _id: id });

    } catch (error) {
        console.log(error);
    }
};

export const getAllCrops = async (req, res) => {
    try {
        const myCrops = await Report.find({});
        res.json(myCrops);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getSingleCrops = async (req, res) => {
    try {
        const id = req.params.id;
        const myCrop = await Report.findById(id);
        res.json(myCrop);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}