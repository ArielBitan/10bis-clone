const MenuItem = require("../models/menu-item.model");
const restaurantService = require("../services/restaurant.service");
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

exports.createRestaurant = async (req, res) => {
  try {
    // Input validation
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({
        message: "Both background image and restaurant image are required",
      });
    }

    const [background_image, image] = req.files;

    // Validate file types
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (
      !allowedMimeTypes.includes(background_image.mimetype) ||
      !allowedMimeTypes.includes(image.mimetype)
    ) {
      return res.status(400).json({
        message: "Invalid file type. Only JPEG, PNG and WebP are allowed",
      });
    }

    // Handle image uploads
    const [backgroundImageUrl, imageUrl] = await Promise.all([
      uploadImageToCloudinary(background_image),
      uploadImageToCloudinary(image),
    ]);

    // Create restaurant with images
    const restaurantData = {
      ...req.body,
      background_image: backgroundImageUrl,
      image: imageUrl,
    };

    const restaurant = await restaurantService.createRestaurant(restaurantData);

    return res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    // Get restaurant by ID
    const restaurant = await restaurantService.getRestaurantById(req.params.id);

    // If the restaurant is not found, return 404
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Get the menu items for the restaurant
    const menuItems = await MenuItem.find({ restaurant_id: req.params.id });

    // Combine the restaurant details with the menu items
    const restaurantDetails = {
      ...restaurant.toObject(), // Convert restaurant document to plain object
      menuItems: menuItems, // Add menuItems to the response
    };

    // Send the combined response
    res.status(200).json(restaurantDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    let updateData = { ...req.body };
    console.log("data:" + req.body);
    console.log("images:" + req.files);
    // Check if restaurant exists
    const existingRestaurant = await restaurantService.getRestaurantById(
      restaurantId
    );
    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    // Handle image updates if files are provided
    if (req.files && req.files.length > 0) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

      // Process background image if provided
      if (req.files[0]) {
        const background_image = req.files[0];
        if (!allowedMimeTypes.includes(background_image.mimetype)) {
          return res.status(400).json({
            message:
              "Invalid background image type. Only JPEG, PNG and WebP are allowed",
          });
        }
        // Delete old image from Cloudinary if exists
        if (existingRestaurant.background_image) {
          await deleteImageFromCloudinary(existingRestaurant.background_image);
        }
        updateData.background_image = await uploadImageToCloudinary(
          background_image
        );
      }

      // Process main image if provided
      if (req.files[1]) {
        const image = req.files[1];
        if (!allowedMimeTypes.includes(image.mimetype)) {
          return res.status(400).json({
            message: "Invalid image type. Only JPEG, PNG and WebP are allowed",
          });
        }
        // Delete old image from Cloudinary if exists
        if (existingRestaurant.image) {
          await deleteImageFromCloudinary(existingRestaurant.image);
        }
        updateData.image = await uploadImageToCloudinary(image);
      }
    }

    const updatedRestaurant = await restaurantService.updateRestaurant(
      restaurantId,
      updateData
    );

    return res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await restaurantService.deleteRestaurant(
      req.params.id
    );
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
