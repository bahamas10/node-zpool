var zpool = require('../');

zpool.status(function(err, list) {
  if (err) throw err;
  console.log(JSON.stringify(list, null, 2));
});
