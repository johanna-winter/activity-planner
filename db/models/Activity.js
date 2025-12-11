import mongoose from "mongoose";
import "./Category";

const { Schema } = mongoose;

const activitySchema = new Schema({
  title: { type: String, required: true, minlength: 3 },
  imageUrl: { type: String, required: true, default: "/img/placeholder-2.png" },
  imagePublicId: { type: String },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
  description: { type: String },
  area: { type: String },
  country: { type: String },
});

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
