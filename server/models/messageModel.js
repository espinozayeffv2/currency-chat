import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
	username: String,
	message: String
},
{
	timestamps: true
});

export default mongoose.model('messages', messageSchema);