const mongoose = require("mongoose");
const locationSchema = require("./location.model");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    website: { type: String },
    email: { type: String, required: true, unique: true },

    // Management
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Billing
    recharge_rate: {
      type: String,
      required: true,
      enum: ["weekly", "monthly", "quarterly", "annually"],
    },
    charge_amount: {
      type: Number,
      required: true,
      default: 0,
    },

    // Contact & Location
    location: { type: locationSchema },
    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
companySchema.index({ name: 1 });
companySchema.index({ registration_number: 1 }, { unique: true });
companySchema.index({ industry: 1 });

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
