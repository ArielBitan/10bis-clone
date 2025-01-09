const cloudinary = require("cloudinary");

// Helper function for image upload
const uploadImageToCloudinary = async (file) => {
  try {
    const base64Data = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Data}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
      resource_type: "image",
      quality: "auto",
      fetch_format: "auto",
    });

    return uploadResponse.url;
  } catch (error) {
    throw new Error(`Error uploading image to Cloudinary: ${error.message}`);
  }
};

const validateAndUploadImage = async (file) => {
  console.log(file);
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!file || !allowedMimeTypes.includes(file.mimetype)) {
    throw new Error("Invalid image type. Only JPEG, PNG and WebP are allowed");
  }
  return await uploadImageToCloudinary(file);
};

module.exports = validateAndUploadImage;
