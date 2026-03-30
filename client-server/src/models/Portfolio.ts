import mongoose, { Schema, model, models } from "mongoose";

const PortfolioSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stocks: [
      {
        type: String,
        uppercase: true,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Portfolio =
  models.Portfolio || model("Portfolio", PortfolioSchema);

