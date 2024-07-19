const router = require('express').Router();
const {Status} = require('../../db/models')

router.get('/', async (req, res) => {
    try {
      const statuses = await Status.findAll(
    
    );
     
      if (statuses) {
        res.status(200).json({ message: 'success', statuses });
        return;
      }
      res.status(400).json({ message: 'увы и ах' });
    } catch ({ message }) {
      res.status(500).json({ error: message });
    }
  });

module.exports = router;