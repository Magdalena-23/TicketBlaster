const uploadImage = async (req, res, next) => {
  try {
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).json({ error: "Image file not provided" });
    }

    // The uploaded file will be available at `req.file.path`
    const imageUrl = req.file.path;

    // Return the local path of the uploaded image
    res.status(201).json({ imageUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
};
