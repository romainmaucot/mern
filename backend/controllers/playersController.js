import mongoose from 'mongoose';
import playerSchema from '../models/playerModel';

const Player = mongoose.model('Player', playerSchema);

export const add = (req, res) => {
  let newPlayer = new Player(req.body);
  newPlayer.save((err, createdPlayer) => {
    if (err) {
      res.send(err);
    }

    res.json(createdPlayer);
  });
};

export const getAll = (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      res.send('an error occured while trying to get players');
    }

    res.send(players);
  });
};

export const getById = (req, res) => {
  Player.find({ _id: req.params.id }, (err, player) => {
    if (err) {
      res.send('an error occured while trying to get player');
    }

    res.json(player);
  });
};

export const update = (req, res) => {
  Player.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, playerUpdated) => {
    if (err) {
      res.send('an error occured while trying to get player');
    }

    res.json(playerUpdated);
  });
};

export const deletePlayer = (req, res) => {
  Player.remove({ _id: req.params.id }, err => {
    if (err) {
      res.send('an error occured while trying to get player');
    }

    res.send('Le joueur a ete supprimé !');
  });
};
