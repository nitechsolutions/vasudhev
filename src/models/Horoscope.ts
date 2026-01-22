// models/Horoscope.ts
import mongoose, { Schema, Model, Document } from "mongoose";

export interface IHoroscope extends Document {
  zodiac: string;       // aries, taurus, etc
  date: string;         // YYYY-MM-DD
  content_hi: string;

  createdAt: Date;
  updatedAt: Date;
}

const HoroscopeSchema = new Schema<IHoroscope>(
  {
    zodiac: {
      type: String,
      required: true,
      index: true,
    },

    date: {
      type: String,
      required: true,
      index: true,
    },

    content_hi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 🚀 Prevent duplicate horoscope per zodiac per day
HoroscopeSchema.index({ zodiac: 1, date: 1 }, { unique: true });

const Horoscope: Model<IHoroscope> =
  mongoose.models.Horoscope ||
  mongoose.model<IHoroscope>("Horoscope", HoroscopeSchema);

export default Horoscope;
