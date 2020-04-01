import jwt from 'jwt-simple';
import moment from 'moment';
import Person from '../models/personModel';
const ensureIsAuthentificated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('token is missing');
  }

  const token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send('Invalid Token');
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send('Token expired');
  }

  const personId = payload.iss;

  Person.findById(personId, (err, person) => {
    if (err) {
      return res.status(401).send('PersonNotFound');
    }
    req.userId = personId;
    next();
  });
};

export default ensureIsAuthentificated;
