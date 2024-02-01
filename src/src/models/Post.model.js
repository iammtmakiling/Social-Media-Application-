import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId, ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model('Post', PostSchema);