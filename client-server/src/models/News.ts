import mongoose, { Schema, model, models } from "mongoose";

const NewsSchema = new Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    stock: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    sentiment: {
      type: String,
      required: true,
      enum: ["BUY", "SELL", "HOLD"],
    },

    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },

    rsi: {
      type: Number,
      required: false,
      default: null,
    },

    macd: {
      type: Number,
      required: false,
      default: null,
    },

    source: {
      type: String,
      default: "NewsAPI",
    },

    publishedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const News = models.News || model("News", NewsSchema);