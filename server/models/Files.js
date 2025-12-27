import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const FileStorageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      unique: true, // Ensures uniqueness at database level
      required: true,
      default: uuidv4,
      index: true // Add index for faster lookups
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true // Add index for faster user file queries
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    filename: {
      type: String,
      required: true,
      trim: true
    },
    language: {
      type: String,
      required: true,
      enum: [
        "javascript",
        "typescript",
        "python",
        "cpp",
        "c",
        "java",
        "go",
        "rust"
      ]
    },
    code: {
      type: String,
      default: ""
    },
    folder: {
      type: String,
      default: "root"
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true // Add index for filtering deleted files
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    version: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

// Compound index for user file queries (owner + isDeleted)
FileStorageSchema.index({ owner: 1, isDeleted: 1 });

// Compound index for collaborator queries
FileStorageSchema.index({ collaborators: 1, isDeleted: 1 });

const FileStorage = mongoose.model("FileStorage", FileStorageSchema);
export default FileStorage;