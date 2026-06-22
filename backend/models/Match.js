import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  matchedAt: { type: Date, default: Date.now },
}, { timestamps: true });

matchSchema.index({ users: 1 });

export default mongoose.model('Match', matchSchema);
