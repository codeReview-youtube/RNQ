const express = require('express');
const bodyParser = require('body-parser');
const photosRes = require('./photos');
const _ = require('lodash');

const app = express();
app.use(bodyParser.json());
/**
 * update photo.
 */
app.get('/api/photos', (req, res) => {
  if (req.headers.authorization) {
    res.status(200).send({
      ...photosRes,
      photos: _.shuffle(photosRes.photos),
    });
  } else {
    res.status(400).send({
      message: 'Cannot access',
    });
  }
  return;
});

app.get('/api/photo/:id', (req, res) => {
  if (req.params.id) {
    const id = parseInt(req.params.id);
    const photo = photosRes.photos.find((ph) => ph.id === id);
    if (photo) {
      res.status(200).send({
        photo,
      });
    } else {
      res.status(404).send({ message: 'Cannot find photo with id ' + id });
    }
  } else {
    res.status(404).send({ message: 'You missed id 😦' });
  }
  return;
});

app.post('/api/photo/:id', (req, res) => {
  if (req.body && req.params.id) {
    const id = req.params.id;
    const body = req.body;
    const foundPhoto = photosRes.photos.find(
      (photo) => photo.id === parseInt(id)
    );
    console.log(`Request: {id: ${id}, liked: ${body.liked}} `);
    if (foundPhoto) {
      res.json({
        id: foundPhoto.id,
        ...foundPhoto,
        liked: body.liked,
      });
      return;
    } else {
      res.status(400).json({
        message: 'Cannot get photo with id: ' + id,
        error: 400,
      });
      return;
    }
  }
  res.status(400).json({
    message: 'Nothing has been provided',
  });
  return; // stop execution for the 1 request.
});

app.listen(4000, () => {
  console.log('Listening on port localhost:4000');
});
