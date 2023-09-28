const uploadImage = async (req, res, next) => {
  try {
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).json({ error: "Image file not provided" });
    }

    const imageUrl = req.file.path;

    res.status(201).json({ imageUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
};
