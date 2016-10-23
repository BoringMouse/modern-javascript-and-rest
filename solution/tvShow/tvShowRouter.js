'use strict';
const express = require('express');
const tvShowService = require('./tvShowService');
const TvShow = require('./TvShow');
const tvShowRouter = express.Router();

// GET http://localhost:3000/tvshow/
tvShowRouter.get('/', (req, res) => {
  const tvShows = tvShowService.getAll();
  res.send(tvShows);
});

// POST http://localhost:3000/tvshow/ Body: { "name": {name}, "genre": {genre} }
tvShowRouter.post('/', (req, res) => {
  const name = req.body.name;
  const genre = req.body.genre;
  const newTvShow = tvShowService.createTvShow(name, genre);
  res.send(newTvShow);
});

tvShowRouter.route('/:tvShowId')
  // GET http://localhost:3000/tvshow/:tvShowId/
  .get((req, res) => {
    const tvShowId = req.params.tvShowId;
    const tvShow = tvShowService.getById(tvShowId);
    res.send(tvShow);
  })

  // PUT // http://localhost:3000/tvshow/:tvShowId/ Body: { "name": {name} }
  .put((req, res) => {
    const tvShowId = req.params.tvShowId;
    const tvShowToUpdate = req.body;
    const updatedTvShow = tvShowService.update(tvShowId, tvShowToUpdate);
    res.send(updatedTvShow);
  })

  // DELETE http://localhost:3000/tvshow/:tvShowId/
  .delete((req, res) => {
    const tvShowId = req.params.tvShowId;
    tvShowService.remove(tvShowId);
    const remainingTvShows = tvShowService.getAll();
    res.send(remainingTvShows);
  });

module.exports = tvShowRouter;
