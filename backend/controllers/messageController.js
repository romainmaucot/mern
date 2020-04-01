import mongoose from 'mongoose';
import messageSchema from '../models/messageModel';
import userSchema from '../models/user';

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);

export const add = async (req, res) => {
  let user = await User.findOne({ userName: req.body.userName });

  if (!user) {
    user = new User({ userName: req.body.userName });
  }
  const message = new Message({ message: req.body.msg });
  await message.save();

  user.messages.push(message);
  user = await user.save();

  res.send(user);
};
