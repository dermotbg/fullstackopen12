const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

const getTodoCount = async () => {
  const added_todos = await redis.getAsync('added_todos')
  if(!added_todos) return 0
  return Number(added_todos)
}

/* GET index data. */
router.get('/', async (req, res) => {
  visits++
  const added_todos = await getTodoCount()

  res.send({
    ...configs,
    visits,
    added_todos
  });
});

module.exports = router;
