import mongoose from "mongoose";

const FileStorageSchema = new mongoose.Schema(
    {
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    filename:{
        type:String,
        required:true,
        trim:true
    },
    language:{
        type:String,
        required:true,
        enum:[
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
    code:{
        type: String,
        default: ""
    },
    folder:{
        type: String,
        default:"root"
    },
    isDeleted:{
            type:Boolean,
            default:false
    },
    isPublic:{
        type:Boolean,
        default:false
    },
    version: {
      type: Number,
      default: 1
    }
},
{
    timestamps:true
}
);

const FileStorage = mongoose.model("FileStrage" , FileStorageSchema);
export default FileStorage;