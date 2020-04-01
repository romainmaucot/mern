import { Schema } from 'mongoose';

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  UserName: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default messageSchema;
