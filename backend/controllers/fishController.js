import mongoose from 'mongoose';
import fishSchema from '../models/fishModel';

const Fish = mongoose.model('Fish', fishSchema);

export const getAll = async (req, res) => {
  const fishs = await Fish.find();
  res.json(fishs);
};

export const add = async (req, res) => {
  try {
    const fish = new Fish(req.body);
    await fish.save();
    return res.send(fish);
  } catch (err) {
    return res.status(401).send(err);
  }
};

export const deleteFish = async (req, res) => {
  Fish.remove({ _id: req.params.id }, err => {
    if (err) {
      res.status(401).send('an error occured while trying to delete fish');
    }
    res.send('Le poisson a ete supprimé !');
  });
};

export const update = (req, res) => {
  Fish.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, fishUpdated) => {
    if (err) {
      res.status(401).send('an error occured while trying to update fish');
    }

    res.json(fishUpdated);
  });
};
