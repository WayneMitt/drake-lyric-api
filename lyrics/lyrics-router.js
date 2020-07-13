const router = require('express').Router();

const Lyrics = require('./lyrics-model.js');

const restricted = require('../auth/restricted-middleware.js');

// for endpoints beginning with /api

router.post('/add-new-lyric', restricted, (req, res) => {
    const lyricData = req.body;
    const lyric = lyricData.lyric;
    const song = lyricData.song;
    const lyricObj = {lyric: lyric, song: song}

    Lyrics.add(lyricObj)
    .then(lyric => {
        res.status(201).json('lyric created successfully');
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create new lyric' });
    })
})

router.get('', (req, res) => {
  
    Lyrics.find()
    .then(lyrics => {
      if (lyrics.length) {
        res.json(lyrics);
      } else {
        res.status(404).json({ message: 'Could not find lyrics' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get lyrics' });
    });
  });

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Lyrics.findById(id)
    .then(lyrics => {
      if (lyrics) {
        res.json(lyrics);
      } else {
        res.status(404).json({ message: 'Could not find lyrics' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get lyrics' });
    });
  });

router.put('/:id', restricted, (req, res) => {
  const lyricData = req.body;
  const lyric = lyricData.lyric;
  const song = lyricData.lyric;
  const { id } = req.params;
  const changes = {lyric: lyric, song: song}

  Lyrics.findById(id)
  .then(lyric => {
    if (lyric) {
      Lyrics.update(changes, id)
      .then(updatedTask => {
        res.json(updatedTask);
      });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update task' });
  });
});

router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
  
    Lyrics.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find lyric with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete lyric' });
    });
  });



module.exports = router;