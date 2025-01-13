import mongoose, { Schema } from "mongoose";
import { ItemRequest, RequestStatus } from "@/lib/types/request";

// Define MongoDB Schema based on ItemRequest interface & validation requirements
const RequestSchema: Schema = new Schema<ItemRequest>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  requestorName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  itemRequested: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  requestCreatedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastEditedDate: {
    type: Date,
    required: false,
    default: null,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(RequestStatus),
  },
});

// Create (if not exist) and export Request model
const Request =
  mongoose.models.Request || mongoose.model("Request", RequestSchema);

export default Request;
